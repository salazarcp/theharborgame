import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import sharp from 'sharp';
import { createServer } from 'vite';

const root = process.cwd();
const distDirectory = path.join(root, 'dist');
const indexPath = path.join(distDirectory, 'index.html');
const template = await readFile(indexPath, 'utf8');
process.env.HARBOR_PRERENDER = 'true';

const BASE_URL = 'https://theharborgame.com';
const HOME_MODIFIED_DATE = '2026-08-29';
const PRIVACY_MODIFIED_DATE = '2026-08-29';
const EXPECTED_ROUTES = [
  '/',
  '/tr/',
  '/gameplay/',
  '/release/',
  '/games-like-rust-dayz-scum/',
  '/press/',
  '/trailer/',
  '/tr/oynanis/',
  '/tr/cikis/',
  '/tr/rust-dayz-scum-benzeri/',
  '/tr/basin/',
  '/tr/fragman/',
];

const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

const homePages = [
  {
    route: '/',
    locale: 'en',
    alternateEn: '/',
    alternateTr: '/tr/',
    title: 'Harbor | Open-World Multiplayer Survival Game',
    description: 'Harbor is a competitive post-apocalyptic open-world survival game for PC. One safe zone, scarce resources, building, trading, online PvP and co-op.',
    image: '/hero-bg.webp',
    imageAlt: 'Harbor in a post-apocalyptic desert wasteland',
    ogType: 'website',
    schemaTypes: ['Organization', 'WebSite', 'VideoGame', 'WebPage'],
    minWords: 450,
    modifiedDate: HOME_MODIFIED_DATE,
  },
  {
    route: '/tr/',
    locale: 'tr',
    alternateEn: '/',
    alternateTr: '/tr/',
    title: 'Harbor | Açık Dünya Multiplayer Survival Oyunu',
    description: 'Harbor, PC için rekabetçi post-apocalyptic açık dünya survival oyunudur. Tek güvenli bölge, kıt kaynaklar, building, online PvP ve co-op.',
    image: '/hero-bg.webp',
    imageAlt: 'Harbor post-apocalyptic çöl ve hayatta kalma dünyası',
    ogType: 'website',
    schemaTypes: ['Organization', 'WebSite', 'VideoGame', 'WebPage'],
    minWords: 300,
    modifiedDate: HOME_MODIFIED_DATE,
  },
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const replaceRequired = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`Prerender failed: missing ${label} in index template`);
  }
  return html.replace(pattern, replacement);
};

const applyHead = (html, metadata) => {
  const canonical = `https://theharborgame.com${metadata.route}`;
  const alternateEn = `https://theharborgame.com${metadata.alternateEn}`;
  const alternateTr = `https://theharborgame.com${metadata.alternateTr}`;
  const image = `https://theharborgame.com${metadata.image}`;
  const locale = metadata.locale === 'tr' ? 'tr_TR' : 'en_US';
  const alternateLocale = metadata.locale === 'tr' ? 'en_US' : 'tr_TR';

  let output = html;
  output = replaceRequired(output, /<html lang="[^"]+">/, `<html lang="${metadata.locale}">`, 'html lang');
  output = replaceRequired(output, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`, 'title');
  output = replaceRequired(output, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`, 'description');
  output = replaceRequired(output, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`, 'canonical');
  output = replaceRequired(output, /<link rel="alternate" hreflang="en" href="[^"]*" \/>/, `<link rel="alternate" hreflang="en" href="${alternateEn}" />`, 'English hreflang');
  output = replaceRequired(output, /<link rel="alternate" hreflang="tr" href="[^"]*" \/>/, `<link rel="alternate" hreflang="tr" href="${alternateTr}" />`, 'Turkish hreflang');
  output = replaceRequired(output, /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/, `<link rel="alternate" hreflang="x-default" href="${alternateEn}" />`, 'x-default hreflang');
  output = replaceRequired(output, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`, 'og:title');
  output = replaceRequired(output, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`, 'og:description');
  output = replaceRequired(output, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${metadata.ogType}" />`, 'og:type');
  output = replaceRequired(output, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`, 'og:url');
  output = replaceRequired(output, /<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${locale}" />`, 'og:locale');
  output = replaceRequired(output, /<meta property="og:locale:alternate" content="[^"]*" \/>/, `<meta property="og:locale:alternate" content="${alternateLocale}" />`, 'og:locale:alternate');
  output = replaceRequired(output, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`, 'og:image');
  output = replaceRequired(output, /<meta property="og:image:type" content="[^"]*" \/>/, `<meta property="og:image:type" content="${metadata.imageType}" />`, 'og:image:type');
  output = replaceRequired(output, /<meta property="og:image:width" content="[^"]*" \/>/, `<meta property="og:image:width" content="${metadata.imageWidth}" />`, 'og:image:width');
  output = replaceRequired(output, /<meta property="og:image:height" content="[^"]*" \/>/, `<meta property="og:image:height" content="${metadata.imageHeight}" />`, 'og:image:height');
  output = replaceRequired(output, /<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`, 'og:image:alt');
  output = replaceRequired(output, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`, 'twitter:title');
  output = replaceRequired(output, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`, 'twitter:description');
  output = replaceRequired(output, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`, 'twitter:image');
  output = replaceRequired(output, /<meta name="twitter:image:alt" content="[^"]*" \/>/, `<meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />`, 'twitter:image:alt');
  return output;
};

const injectMarkup = (html, markup) => {
  const placeholder = '<div id="root"></div>';
  if (!html.includes(placeholder)) {
    throw new Error('Prerender failed: #root placeholder was not found in dist/index.html');
  }
  return html.replace(placeholder, `<div id="root">${markup}</div>`);
};

const outputPathForRoute = (route) => {
  if (route === '/') return indexPath;
  return path.join(distDirectory, route.replace(/^\/+|\/+$/g, ''), 'index.html');
};

const absoluteUrl = (value) => new URL(value, BASE_URL).href;

const imageSize = async (image) => {
  const imagePath = path.join(distDirectory, image.replace(/^\/+/, ''));
  const { width, height, format } = await sharp(imagePath).metadata();
  const imageType = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  }[format];
  if (!width || !height || !imageType) {
    throw new Error(`Prerender failed: could not read supported image metadata for ${image}`);
  }
  return { imageWidth: width, imageHeight: height, imageType };
};

const assertExactRoutes = (pages) => {
  const actual = [...new Set(pages.map(({ route }) => route))].sort();
  const expected = [...EXPECTED_ROUTES].sort();
  if (pages.length !== actual.length || JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Prerender failed: canonical route set mismatch. Expected ${expected.join(', ')}; found ${actual.join(', ')}`);
  }
};

const assetCandidatesFromHtml = (html) => [...html.matchAll(/\b(?:src|srcSet)="([^"]+)"/gi)]
  .flatMap(([, value]) => value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]))
  .filter(Boolean);

const fingerprintAssets = (page, html) => [...new Set([
  page.image,
  page.video?.thumbnailUrl,
  ...assetCandidatesFromHtml(html),
]
  .filter(Boolean)
  .map((value) => new URL(value, BASE_URL))
  .filter(({ origin }) => origin === BASE_URL)
  .map(({ pathname }) => pathname))]
  .sort();

const pageContentHash = async (page, html) => {
  const hash = createHash('sha256')
    .update(html)
    .update(`\0modifiedDate\0${page.modifiedDate}`);
  for (const asset of fingerprintAssets(page, html)) {
    hash.update(`\0asset\0${asset}\0`);
    hash.update(await readFile(path.join(distDirectory, asset.replace(/^\/+/, ''))));
  }
  return hash.digest('hex');
};

try {
  const [{ default: SiteRoot }, { knowledgePages }] = await Promise.all([
    vite.ssrLoadModule('/src/SiteRoot.tsx'),
    vite.ssrLoadModule('/src/content/knowledgePages.ts'),
  ]);

  const contentPages = knowledgePages.map((page) => {
    const englishRoute = page.locale === 'en' ? page.route : page.alternateRoute;
    const turkishRoute = page.locale === 'tr' ? page.route : page.alternateRoute;
    const pageSchemaType = page.schemaType === 'Article' ? 'Article' : page.schemaType;
    const video = page.video ? {
      ...page.video,
      thumbnailUrl: absoluteUrl(page.video.thumbnailUrl),
      watchUrl: absoluteUrl(page.video.watchUrl),
    } : undefined;

    return {
      route: page.route,
      locale: page.locale,
      alternateEn: englishRoute,
      alternateTr: turkishRoute,
      title: page.metaTitle,
      description: page.metaDescription,
      directAnswer: page.directAnswer,
      image: page.heroImage,
      imageAlt: page.heroAlt,
      ogType: page.schemaType === 'Article' ? 'article' : 'website',
      schemaTypes: ['Organization', 'WebSite', 'VideoGame', pageSchemaType, 'BreadcrumbList', ...(video ? ['VideoObject'] : [])],
      minWords: page.minWords ?? 650,
      modifiedDate: page.modifiedDate,
      video,
    };
  });

  const pages = await Promise.all(
    [...homePages, ...contentPages].map(async (page) => ({ ...page, ...await imageSize(page.image) })),
  );
  assertExactRoutes(pages);

  const renderedPages = [];

  for (const page of pages) {
    const markup = renderToString(React.createElement(SiteRoot, { pathname: page.route }));
    const html = applyHead(injectMarkup(template, markup), page);
    const outputPath = outputPathForRoute(page.route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    renderedPages.push({
      page,
      contentHash: await pageContentHash(page, html),
    });
    console.log(`Prerendered ${page.route} · ${html.length} bytes`);
  }

  const manifest = renderedPages.map(({ page, contentHash }) => ({
    ...page,
    canonical: `${BASE_URL}${page.route}`,
    alternateEn: `${BASE_URL}${page.alternateEn}`,
    alternateTr: `${BASE_URL}${page.alternateTr}`,
    file: path.relative(distDirectory, outputPathForRoute(page.route)).replaceAll('\\', '/'),
    contentHash,
  }));
  await writeFile(path.join(distDirectory, 'seo-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  const sitemapEntries = manifest.map((page) => `  <url>
    <loc>${escapeXml(page.canonical)}</loc>
    <lastmod>${page.modifiedDate}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(page.alternateEn)}" />
    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(page.alternateTr)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(page.alternateEn)}" />
    <image:image>
      <image:loc>${escapeXml(`https://theharborgame.com${page.image}`)}</image:loc>
      <image:title>${escapeXml(page.imageAlt)}</image:title>
    </image:image>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${sitemapEntries}
  <url>
    <loc>https://theharborgame.com/privacy-policy.html</loc>
    <lastmod>${PRIVACY_MODIFIED_DATE}</lastmod>
  </url>
</urlset>
`;
  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');

  const videoPages = manifest.filter(({ video }) => video);
  const videoEntries = videoPages.map((page) => `  <url>
    <loc>${escapeXml(page.canonical)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(page.video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(page.video.name)}</video:title>
      <video:description>${escapeXml(page.video.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(page.video.embedUrl)}</video:player_loc>
      <video:duration>${page.video.durationSeconds}</video:duration>
      <video:publication_date>${escapeXml(page.video.uploadDate)}</video:publication_date>
    </video:video>
  </url>`).join('\n');
  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${videoEntries}
</urlset>
`;
  await writeFile(path.join(distDirectory, 'video-sitemap.xml'), videoSitemap, 'utf8');
  await writeFile(path.join(root, 'public', 'video-sitemap.xml'), videoSitemap, 'utf8');

  console.log(`Prerender complete · ${pages.length} canonical HTML pages`);
} finally {
  await vite.close();
}
