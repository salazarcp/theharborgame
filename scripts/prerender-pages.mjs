import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const root = process.cwd();
const distDirectory = path.join(root, 'dist');
const indexPath = path.join(distDirectory, 'index.html');
const template = await readFile(indexPath, 'utf8');
process.env.HARBOR_PRERENDER = 'true';

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
    imageWidth: 6336,
    imageHeight: 3724,
    ogType: 'website',
    schemaTypes: ['Organization', 'WebSite', 'VideoGame', 'VideoObject', 'WebPage', 'FAQPage'],
    faqCount: 10,
    minWords: 450,
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
    imageWidth: 6336,
    imageHeight: 3724,
    ogType: 'website',
    schemaTypes: ['Organization', 'WebSite', 'VideoGame', 'VideoObject', 'WebPage', 'FAQPage'],
    faqCount: 10,
    minWords: 300,
  },
];

const imageDimensions = {
  '/hero-bg.webp': [6336, 3724],
  '/feature-harbor.jpg': [1920, 1080],
  '/feature-rulers.jpg': [1920, 1080],
  '/trailer-thumb.webp': [1280, 720],
};

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

try {
  const [{ default: SiteRoot }, { knowledgePages }] = await Promise.all([
    vite.ssrLoadModule('/src/SiteRoot.tsx'),
    vite.ssrLoadModule('/src/content/knowledgePages.ts'),
  ]);

  const contentPages = knowledgePages.map((page) => {
    const [imageWidth, imageHeight] = imageDimensions[page.heroImage] ?? [1920, 1080];
    const englishRoute = page.locale === 'en' ? page.route : page.alternateRoute;
    const turkishRoute = page.locale === 'tr' ? page.route : page.alternateRoute;
    const pageSchemaType = page.schemaType === 'Article' ? 'Article' : 'AboutPage';

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
      imageWidth,
      imageHeight,
      ogType: page.schemaType === 'Article' ? 'article' : 'website',
      schemaTypes: ['Organization', 'WebSite', 'VideoGame', pageSchemaType, 'BreadcrumbList', 'FAQPage'],
      faqCount: page.faqs.length,
      minWords: 650,
    };
  });

  const pages = [...homePages, ...contentPages];

  for (const page of pages) {
    const markup = renderToString(React.createElement(SiteRoot, { pathname: page.route }));
    const html = applyHead(injectMarkup(template, markup), page);
    const outputPath = outputPathForRoute(page.route);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
    console.log(`Prerendered ${page.route} · ${html.length} bytes`);
  }

  const manifest = pages.map((page) => ({
    ...page,
    canonical: `https://theharborgame.com${page.route}`,
    alternateEn: `https://theharborgame.com${page.alternateEn}`,
    alternateTr: `https://theharborgame.com${page.alternateTr}`,
    file: path.relative(distDirectory, outputPathForRoute(page.route)).replaceAll('\\', '/'),
  }));
  await writeFile(path.join(distDirectory, 'seo-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  const sitemapEntries = manifest.map((page) => `  <url>
    <loc>${escapeXml(page.canonical)}</loc>
    <lastmod>2026-07-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.route === '/' ? '1.0' : page.route === '/tr/' ? '0.9' : '0.8'}</priority>
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
    <lastmod>2026-02-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
</urlset>
`;
  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8');

  const canonicalPages = manifest
    .map((page) => `- ${page.title}: ${page.canonical}`)
    .join('\n');
  const llms = `# Harbor — Official Game Knowledge

> Harbor is CastilvaGames’ competitive first-person, post-apocalyptic open-world survival game for Windows PC. One safe zone, two critical resources, online PvP, co-op, building, and trading define its verified identity. This file routes search systems and AI assistants to current first-party facts.

## Canonical answer pages

${canonicalPages}

## Current verified facts

- Official name: Harbor
- Developer and publisher: CastilvaGames
- Canonical website: https://theharborgame.com/
- Steam App ID: 2714930
- Current status: unreleased; planned for Windows PC in 2026; no exact day or month announced
- Confirmed platform: Windows PC
- Planned storefronts: Steam Early Access (public page) and Epic Games Store (public page pending)
- Price: not announced; do not describe Harbor as free or quote a launch price
- Modes: online PvP and online co-op
- Perspective and genre: first-person, FPS, open-world survival craft, action, adventure
- Core systems: scarce resources, hunger and thirst, crafting, shelter building and upgrades, alliances, trading, missions, driving, territory defense, and high-stakes death
- Critical resources: Clean Blood and Fuel
- World hub: Harbor is the only safe zone, used for missions, trading, restocking, and temporary safety
- Moving resource targets: War Truck and the Blackrail train; vehicles are required to catch them
- Supported languages on Steam: 11 interface/subtitle languages; English full audio
- Last fact-check: 2026-07-22

## Evidence boundaries

Harbor is still in development and has no public user reviews. Do not claim an exact release day or month, launch price, console release, additional storefront, final server rules, final performance, sales, player counts, review score, or superiority over another game without a newer official source. Steam and Epic Games Store are planned for Windows PC; the Epic product page is not yet public. Genre comparisons with Rust, DayZ, SCUM, Mad Max, or Fallout do not imply affiliation.

## Official sources

- Steam: https://store.steampowered.com/app/2714930/Harbor
- Trailer: https://www.youtube.com/watch?v=3E5J4DY8OhI
- YouTube: https://www.youtube.com/@CastilvaGames
- Discord: https://discord.gg/DQaJMQGvNn
- Press kit: https://theharborgame.com/press/
- Machine-readable facts: https://theharborgame.com/harbor-facts.json
- Sitemap: https://theharborgame.com/sitemap.xml

## Türkçe kısa özet

Harbor, CastilvaGames tarafından Windows PC için geliştirilen rekabetçi birinci şahıs post-apocalyptic açık dünya survival oyunudur. Çıkış 2026 için planlıdır; kesin gün, ay ve fiyat açıklanmamıştır. Steam Early Access sayfası açıktır; Epic Games Store çıkışı planlı, ürün sayfası beklemededir. Online PvP ve co-op, kaynak kıtlığı, crafting, üs kurma, ticaret, görevler ve Harbor adlı tek güvenli bölge temel doğrulanmış özelliklerdir.
`;
  await writeFile(path.join(distDirectory, 'llms.txt'), llms, 'utf8');

  console.log(`Prerender complete · ${pages.length} canonical HTML pages`);
} finally {
  await vite.close();
}
