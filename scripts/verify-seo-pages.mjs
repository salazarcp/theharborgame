import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const BASE_URL = 'https://theharborgame.com';
const PUBLISHER_WEBSITE = 'https://www.wanderingwizard.com/';
const PUBLISHER_STEAM = 'https://store.steampowered.com/publisher/WanderingWizard/';
const distDirectory = path.resolve('dist');
const manifestPath = path.join(distDirectory, 'seo-manifest.json');
const indexNowKey = '2421833290844345a8caca4492858067';
const expectedRoutes = [
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
const expectedVideoRoutes = ['/trailer/', '/tr/fragman/'];
const expectedImageDimensions = new Map([
  ['/hero-bg.webp', [6336, 3724]],
  ['/feature-harbor.jpg', [1920, 935]],
  ['/feature-rulers.jpg', [1920, 1040]],
  ['/trailer-thumb.webp', [6336, 3724]],
]);
const expectedTrailer = {
  name: 'Harbor Announcement Trailer',
  uploadDate: '2025-01-07T22:51:14-08:00',
  duration: 'PT1M55S',
  durationSeconds: 115,
  embedUrl: 'https://www.youtube-nocookie.com/embed/3E5J4DY8OhI',
  watchUrl: 'https://www.youtube.com/watch?v=3E5J4DY8OhI',
  thumbnailUrl: `${BASE_URL}/trailer-thumb.webp`,
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const escapeXml = escapeHtml;

const visibleWordCount = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .length;

const asArray = (value) => value === undefined ? [] : Array.isArray(value) ? value : [value];
const entryTypes = (entry) => asArray(entry?.['@type']);
const referenceIds = (value) => asArray(value).map((item) => typeof item === 'string' ? item : item?.['@id']).filter(Boolean);

const parseGraph = (html, prefix) => {
  const matches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(matches.length > 0, `${prefix} missing JSON-LD`);
  return matches.flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data['@graph'] ?? [data];
  });
};

const assertPublisherRelationships = (graph, prefix) => {
  const organizations = graph.filter((entry) => entryTypes(entry).includes('Organization'));
  const developer = organizations.find(({ name }) => name === 'CastilvaGames');
  const publisher = organizations.find(({ name }) => name === 'Wandering Wizard');
  assert(developer?.['@id'], `${prefix} missing the CastilvaGames developer Organization`);
  assert(publisher?.['@id'], `${prefix} missing the Wandering Wizard publisher Organization`);
  assert(developer['@id'] !== publisher['@id'], `${prefix} developer and publisher must be distinct entities`);
  assert(publisher.url === PUBLISHER_WEBSITE, `${prefix} Wandering Wizard Organization has the wrong official URL`);
  assert(asArray(publisher.sameAs).includes(PUBLISHER_STEAM), `${prefix} Wandering Wizard Organization is missing its Steam publisher page`);

  const game = graph.find((entry) => entryTypes(entry).includes('VideoGame'));
  assert(game, `${prefix} missing VideoGame structured data`);
  const developerReferences = [...referenceIds(game.creator), ...referenceIds(game.developer)];
  assert(developerReferences.includes(developer['@id']), `${prefix} VideoGame must identify CastilvaGames as developer/creator`);
  assert(!developerReferences.includes(publisher['@id']), `${prefix} Wandering Wizard must not be identified as the game developer`);
  const gamePublisherReferences = referenceIds(game.publisher);
  assert(gamePublisherReferences.length === 1 && gamePublisherReferences[0] === publisher['@id'], `${prefix} VideoGame publisher must be only Wandering Wizard`);

  const website = graph.find((entry) => entryTypes(entry).includes('WebSite'));
  const websitePublisherReferences = referenceIds(website?.publisher);
  assert(websitePublisherReferences.length === 1 && websitePublisherReferences[0] === developer['@id'], `${prefix} WebSite publisher must remain only CastilvaGames`);

  for (const article of graph.filter((entry) => entryTypes(entry).includes('Article'))) {
    const articlePublisherReferences = referenceIds(article.publisher);
    assert(articlePublisherReferences.length === 1 && articlePublisherReferences[0] === developer['@id'], `${prefix} Article publisher must remain only CastilvaGames`);
  }

  for (const video of graph.filter((entry) => entryTypes(entry).includes('VideoObject'))) {
    const videoPublisherReferences = referenceIds(video.publisher);
    assert(videoPublisherReferences.length === 1 && videoPublisherReferences[0] === developer['@id'], `${prefix} trailer publisher must remain only CastilvaGames`);
  }
};

const extractSitemapEntries = (xml) => [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
  const block = match[1];
  const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1];
  return { block, loc };
});

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

const pageContentHash = (page, html) => {
  const hash = createHash('sha256')
    .update(html)
    .update(`\0modifiedDate\0${page.modifiedDate}`);
  for (const asset of fingerprintAssets(page, html)) {
    hash.update(`\0asset\0${asset}\0`);
    hash.update(readFileSync(path.join(distDirectory, asset.replace(/^\/+/, ''))));
  }
  return hash.digest('hex');
};

assert(existsSync(manifestPath), 'Missing dist/seo-manifest.json; run npm run build first');
const pages = JSON.parse(readFileSync(manifestPath, 'utf8'));
const actualRoutes = [...new Set(pages.map(({ route }) => route))].sort();
const sortedExpectedRoutes = [...expectedRoutes].sort();

assert(pages.length === actualRoutes.length, 'Duplicate routes in SEO manifest');
assert(JSON.stringify(actualRoutes) === JSON.stringify(sortedExpectedRoutes), `Canonical route set mismatch. Expected ${sortedExpectedRoutes.join(', ')}; found ${actualRoutes.join(', ')}`);
assert(new Set(pages.map(({ canonical }) => canonical)).size === pages.length, 'Duplicate canonical URLs in SEO manifest');

for (const page of pages) {
  const filePath = path.join(distDirectory, page.file);
  const prefix = `${page.route}:`;
  assert(existsSync(filePath), `${prefix} missing ${page.file}`);

  const html = readFileSync(filePath, 'utf8');
  const wordCount = visibleWordCount(html);
  const contentHash = pageContentHash(page, html);
  assert(html.length > 20_000, `${prefix} page was not fully prerendered`);
  assert(!html.includes('<div id="root"></div>'), `${prefix} root is empty`);
  assert((html.match(/<h1\b/g) ?? []).length === 1, `${prefix} expected exactly one H1`);
  assert(html.includes(`<html lang="${page.locale}">`), `${prefix} wrong html language`);
  assert(html.includes(`<title>${escapeHtml(page.title)}</title>`), `${prefix} wrong title`);
  assert(html.includes(`<link rel="canonical" href="${page.canonical}"`), `${prefix} wrong canonical`);
  assert(html.includes(`<link rel="alternate" hreflang="en" href="${page.alternateEn}"`), `${prefix} wrong English hreflang`);
  assert(html.includes(`<link rel="alternate" hreflang="tr" href="${page.alternateTr}"`), `${prefix} wrong Turkish hreflang`);
  assert(html.includes(`<link rel="alternate" hreflang="x-default" href="${page.alternateEn}"`), `${prefix} wrong x-default hreflang`);
  assert(wordCount >= page.minWords, `${prefix} expected at least ${page.minWords} visible words, found ${wordCount}`);
  assert(!/[ÃÄÅ]|â€|T\?RK\?E/.test(html), `${prefix} contains likely encoding corruption`);
  assert(!new RegExp('\\bLast' + ' Harbor\\b', 'i').test(html), `${prefix} contains an incorrect game title`);
  assert(/^[a-f0-9]{64}$/.test(page.contentHash), `${prefix} missing a valid SHA-256 contentHash`);
  assert(page.contentHash === contentHash, `${prefix} contentHash does not match the prerendered HTML`);
  assert(page.modifiedDate === '2026-08-29', `${prefix} expected modifiedDate 2026-08-29`);

  if (page.directAnswer) {
    assert(html.includes(page.directAnswer), `${prefix} missing the visible direct answer`);
  }

  const graph = parseGraph(html, prefix);
  const types = graph.flatMap(entryTypes);
  for (const type of page.schemaTypes) {
    assert(types.includes(type), `${prefix} missing ${type} structured data`);
  }
  assert(!types.includes('FAQPage'), `${prefix} must not emit obsolete FAQPage structured data`);
  assertPublisherRelationships(graph, prefix);

  const expectedDimensions = expectedImageDimensions.get(page.image);
  assert(expectedDimensions, `${prefix} has an unverified social image ${page.image}`);
  const imagePath = path.join(distDirectory, page.image.replace(/^\/+/, ''));
  assert(existsSync(imagePath), `${prefix} missing social image ${page.image}`);
  const { width, height, format } = await sharp(imagePath).metadata();
  const imageType = format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
  assert(width === expectedDimensions[0] && height === expectedDimensions[1], `${prefix} ${page.image} is ${width}x${height}; expected ${expectedDimensions[0]}x${expectedDimensions[1]}`);
  assert(page.imageWidth === width && page.imageHeight === height, `${prefix} manifest dimensions do not match ${page.image}`);
  assert(page.imageType === imageType, `${prefix} manifest media type does not match ${page.image}`);
  assert(html.includes(`<meta property="og:image:type" content="${imageType}"`), `${prefix} wrong og:image:type`);
  assert(html.includes(`<meta property="og:image:width" content="${width}"`), `${prefix} wrong og:image:width`);
  assert(html.includes(`<meta property="og:image:height" content="${height}"`), `${prefix} wrong og:image:height`);

  const heroTag = [...html.matchAll(/<img\b[^>]*>/g)]
    .map(([tag]) => tag)
    .find((tag) => tag.includes(`src="${page.image}"`));
  assert(heroTag, `${prefix} missing hero img for ${page.image}`);
  assert(heroTag.includes(`width="${width}"`) && heroTag.includes(`height="${height}"`), `${prefix} hero intrinsic dimensions do not match ${page.image}`);

  const localImageUrls = [...html.matchAll(/(?:src|srcSet)="(\/(?!\/)[^"#?]+)(?:\?[^"#]*)?"/g)].map((match) => match[1]);
  for (const url of new Set(localImageUrls)) {
    assert(existsSync(path.join(distDirectory, url.replace(/^\/+/, ''))), `${prefix} missing local image ${url}`);
  }

  const videoObjects = graph.filter((entry) => entryTypes(entry).includes('VideoObject'));
  const iframeSources = [...html.matchAll(/<iframe\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
  const isVideoPage = expectedVideoRoutes.includes(page.route);
  if (isVideoPage) {
    assert(page.video, `${prefix} missing video manifest data`);
    assert(videoObjects.length === 1, `${prefix} expected exactly one VideoObject`);
    assert(iframeSources.includes(expectedTrailer.embedUrl), `${prefix} trailer iframe is not present in the initial HTML`);
    assert(page.video.name === expectedTrailer.name, `${prefix} wrong trailer name`);
    assert(page.video.uploadDate === expectedTrailer.uploadDate, `${prefix} wrong trailer uploadDate`);
    assert(page.video.duration === expectedTrailer.duration, `${prefix} wrong ISO 8601 trailer duration`);
    assert(page.video.durationSeconds === expectedTrailer.durationSeconds, `${prefix} wrong trailer durationSeconds`);
    assert(page.video.embedUrl === expectedTrailer.embedUrl, `${prefix} wrong trailer embedUrl`);
    assert(page.video.watchUrl === expectedTrailer.watchUrl, `${prefix} wrong original YouTube watchUrl`);
    assert(page.video.thumbnailUrl === expectedTrailer.thumbnailUrl, `${prefix} wrong trailer thumbnailUrl`);

    const video = videoObjects[0];
    const thumbnails = asArray(video.thumbnailUrl);
    assert(video.name === page.video.name, `${prefix} VideoObject name does not match the manifest`);
    assert(video.description === page.video.description, `${prefix} VideoObject description does not match the manifest`);
    assert(thumbnails.includes(page.video.thumbnailUrl), `${prefix} VideoObject thumbnailUrl does not match the manifest`);
    assert(video.embedUrl === page.video.embedUrl, `${prefix} VideoObject embedUrl does not match the manifest`);
    assert(video.uploadDate === page.video.uploadDate, `${prefix} VideoObject uploadDate does not match the manifest`);
    assert(video.duration === page.video.duration, `${prefix} VideoObject duration does not match the manifest`);
    assert(!('inLanguage' in page.video) && !('inLanguage' in video), `${prefix} must not assert an unverified trailer language`);
    assert(video.url === page.canonical, `${prefix} VideoObject url must be the canonical site watch page`);
    assert(asArray(video.sameAs).includes(page.video.watchUrl), `${prefix} VideoObject sameAs must reference the original YouTube watch page`);
    assert(!('contentUrl' in video), `${prefix} VideoObject must not use a YouTube watch page as contentUrl`);
    const webPage = graph.find((entry) => entryTypes(entry).includes('WebPage'));
    const videoPageId = `${page.canonical}#webpage`;
    const videoId = video['@id'];
    const linkedFromVideo = referenceIds(video.mainEntityOfPage).includes(videoPageId);
    const linkedFromPage = referenceIds(webPage?.mainEntity).includes(videoId);
    assert(linkedFromVideo || linkedFromPage, `${prefix} VideoObject must be the watch page's main entity`);
  } else {
    assert(!page.video, `${prefix} non-watch page unexpectedly has video manifest data`);
    assert(videoObjects.length === 0, `${prefix} VideoObject is only allowed on dedicated watch pages`);
    assert(!iframeSources.includes(expectedTrailer.embedUrl), `${prefix} trailer iframe is only allowed on dedicated watch pages`);
  }

  console.log(`${page.route} OK · ${wordCount} words · H1=1 · ${page.schemaTypes.join(', ')}`);
}

const robots = readFileSync(path.join(distDirectory, 'robots.txt'), 'utf8');
const sitemap = readFileSync(path.join(distDirectory, 'sitemap.xml'), 'utf8');
const videoSitemap = readFileSync(path.join(distDirectory, 'video-sitemap.xml'), 'utf8');
const llms = readFileSync(path.join(distDirectory, 'llms.txt'), 'utf8');
const facts = JSON.parse(readFileSync(path.join(distDirectory, 'harbor-facts.json'), 'utf8'));
const publishedIndexNowKey = readFileSync(path.join(distDirectory, `${indexNowKey}.txt`), 'utf8').trim();
const bundledJavaScript = readdirSync(path.join(distDirectory, 'assets'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(path.join(distDirectory, 'assets', file), 'utf8'))
  .join('\n');

assert(robots.includes('User-agent: *') && robots.includes('Allow: /'), 'robots.txt does not allow crawling');
assert(robots.includes(`${BASE_URL}/sitemap.xml`), 'robots.txt is missing the canonical sitemap URL');
assert(robots.includes(`${BASE_URL}/video-sitemap.xml`), 'robots.txt is missing the video sitemap URL');
assert(!sitemap.includes('<changefreq>') && !sitemap.includes('<priority>'), 'sitemap.xml must not include ignored changefreq or priority hints');
assert(sitemap === readFileSync(path.resolve('public', 'sitemap.xml'), 'utf8'), 'public/sitemap.xml is out of sync with the generated sitemap');
assert(videoSitemap === readFileSync(path.resolve('public', 'video-sitemap.xml'), 'utf8'), 'public/video-sitemap.xml is out of sync with the generated video sitemap');

const sitemapEntries = extractSitemapEntries(sitemap);
const sitemapLocs = sitemapEntries.map(({ loc }) => loc).sort();
const expectedSitemapLocs = [...pages.map(({ canonical }) => canonical), `${BASE_URL}/privacy-policy.html`].sort();
assert(JSON.stringify(sitemapLocs) === JSON.stringify(expectedSitemapLocs), 'sitemap.xml URL set does not match the canonical manifest plus privacy policy');
for (const page of pages) {
  const entry = sitemapEntries.find(({ loc }) => loc === page.canonical);
  assert(entry?.block.includes(`<lastmod>${page.modifiedDate}</lastmod>`), `sitemap.xml has the wrong lastmod for ${page.canonical}`);
  assert(llms.includes(page.canonical), `llms.txt is missing ${page.canonical}`);
}
const privacyEntry = sitemapEntries.find(({ loc }) => loc === `${BASE_URL}/privacy-policy.html`);
assert(privacyEntry?.block.includes('<lastmod>2026-08-29</lastmod>'), 'privacy policy sitemap lastmod must be 2026-08-29');

const videoSitemapEntries = extractSitemapEntries(videoSitemap);
assert(JSON.stringify(videoSitemapEntries.map(({ loc }) => loc).sort()) === JSON.stringify(expectedVideoRoutes.map((route) => `${BASE_URL}${route}`).sort()), 'video-sitemap.xml must contain exactly the two localized watch pages');
for (const route of expectedVideoRoutes) {
  const page = pages.find((item) => item.route === route);
  const entry = videoSitemapEntries.find(({ loc }) => loc === page.canonical);
  assert(entry.block.includes(`<video:thumbnail_loc>${escapeXml(page.video.thumbnailUrl)}</video:thumbnail_loc>`), `${route}: video sitemap thumbnail mismatch`);
  assert(entry.block.includes(`<video:title>${escapeXml(page.video.name)}</video:title>`), `${route}: video sitemap title mismatch`);
  assert(entry.block.includes(`<video:description>${escapeXml(page.video.description)}</video:description>`), `${route}: video sitemap description mismatch`);
  assert(entry.block.includes(`<video:player_loc allow_embed="yes">${escapeXml(page.video.embedUrl)}</video:player_loc>`), `${route}: video sitemap player URL mismatch`);
  assert(entry.block.includes(`<video:duration>${page.video.durationSeconds}</video:duration>`), `${route}: video sitemap duration mismatch`);
  assert(entry.block.includes(`<video:publication_date>${escapeXml(page.video.uploadDate)}</video:publication_date>`), `${route}: video sitemap publication date mismatch`);
}

assert(facts.name === 'Harbor', 'harbor-facts.json has the wrong game entity');
assert(facts.developer === 'CastilvaGames', 'harbor-facts.json has the wrong developer');
assert(facts.publisher === 'Wandering Wizard', 'harbor-facts.json has the wrong publisher');
assert(facts.publisherLinks?.website === PUBLISHER_WEBSITE, 'harbor-facts.json has the wrong publisher website');
assert(facts.publisherLinks?.steam === PUBLISHER_STEAM, 'harbor-facts.json has the wrong publisher Steam page');
assert(facts.steamAppId === 2714930, 'harbor-facts.json has the wrong Steam App ID');
assert(facts.release?.status === 'unreleased', 'harbor-facts.json must identify the current unreleased status');
assert(facts.release?.plannedWindow === '2026', 'harbor-facts.json has the wrong release window');
assert(facts.release?.exactDate === null, 'harbor-facts.json must not invent an exact release date');
assert(facts.platforms?.confirmed?.length === 1 && facts.platforms.confirmed[0] === 'Windows PC', 'harbor-facts.json has unsupported confirmed platforms');
assert(facts.platforms?.storefronts?.some(({ name, url }) => name === 'Steam' && url?.includes('/app/2714930/Harbor')), 'harbor-facts.json is missing the official Steam storefront');
assert(facts.platforms?.storefronts?.some(({ name, url }) => name === 'Epic Games Store' && url === null), 'harbor-facts.json must record the planned Epic storefront and pending URL');
assert(llms.includes('- Developer: CastilvaGames'), 'llms.txt is missing the developer fact');
assert(llms.includes('- Commercial game publisher: Wandering Wizard'), 'llms.txt is missing the commercial publisher fact');
assert(!llms.includes('Developer and publisher: CastilvaGames'), 'llms.txt still conflates the developer and publisher');
assert(bundledJavaScript.includes('G-XMBR4ENVMK'), 'production bundle is missing the GA4 measurement ID');
assert(['steam_store_click', 'trailer_click', 'trailer_page_click', 'discord_click'].every((eventName) => bundledJavaScript.includes(eventName)), 'production bundle is missing analytics conversion events');
assert(bundledJavaScript.includes('analytics_storage') && bundledJavaScript.includes('denied'), 'production bundle is missing consent-first analytics defaults');
assert(publishedIndexNowKey === indexNowKey, 'IndexNow key file is missing or invalid');

console.log(`Discovery files OK · ${pages.length} canonical URLs · 2 video URLs · publisher relationships · image dimensions · IndexNow key`);
