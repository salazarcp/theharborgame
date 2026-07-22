import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const distDirectory = path.resolve('dist');
const manifestPath = path.join(distDirectory, 'seo-manifest.json');

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const visibleWordCount = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z0-9#]+;/gi, ' ')
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .length;

assert(existsSync(manifestPath), 'Missing dist/seo-manifest.json; run npm run build first');
const pages = JSON.parse(readFileSync(manifestPath, 'utf8'));

assert(pages.length === 10, `Expected 10 canonical language pages, found ${pages.length}`);
assert(new Set(pages.map(({ route }) => route)).size === pages.length, 'Duplicate routes in SEO manifest');
assert(new Set(pages.map(({ canonical }) => canonical)).size === pages.length, 'Duplicate canonical URLs in SEO manifest');

for (const page of pages) {
  const filePath = path.join(distDirectory, page.file);
  const prefix = `${page.route}:`;
  assert(existsSync(filePath), `${prefix} missing ${page.file}`);

  const html = readFileSync(filePath, 'utf8');
  const wordCount = visibleWordCount(html);
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

  if (page.directAnswer) {
    assert(html.includes(page.directAnswer), `${prefix} missing the visible direct answer`);
  }

  const jsonLdMatches = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(jsonLdMatches.length > 0, `${prefix} missing JSON-LD`);

  const graph = jsonLdMatches.flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data['@graph'] ?? [data];
  });
  const types = graph.flatMap((entry) => Array.isArray(entry['@type']) ? entry['@type'] : [entry['@type']]);
  for (const type of page.schemaTypes) {
    assert(types.includes(type), `${prefix} missing ${type} structured data`);
  }

  const faqPage = graph.find((entry) => entry['@type'] === 'FAQPage');
  assert(faqPage?.mainEntity?.length === page.faqCount, `${prefix} expected ${page.faqCount} structured FAQ answers`);

  const localImageUrls = [...html.matchAll(/(?:src|srcSet)="(\/(?!\/)[^"#?]+)(?:\?[^"#]*)?"/g)]
    .map((match) => match[1]);
  for (const url of new Set(localImageUrls)) {
    assert(existsSync(path.join(distDirectory, url)), `${prefix} missing local image ${url}`);
  }

  console.log(`${page.route} OK · ${wordCount} words · H1=1 · FAQ=${page.faqCount} · ${page.schemaTypes.join(', ')}`);
}

const robots = readFileSync(path.join(distDirectory, 'robots.txt'), 'utf8');
const sitemap = readFileSync(path.join(distDirectory, 'sitemap.xml'), 'utf8');
const llms = readFileSync(path.join(distDirectory, 'llms.txt'), 'utf8');
const facts = JSON.parse(readFileSync(path.join(distDirectory, 'harbor-facts.json'), 'utf8'));

assert(robots.includes('User-agent: *') && robots.includes('Allow: /'), 'robots.txt does not allow crawling');
assert(robots.includes('https://theharborgame.com/sitemap.xml'), 'robots.txt is missing the canonical sitemap URL');
for (const page of pages) {
  assert(sitemap.includes(`<loc>${page.canonical}</loc>`), `sitemap.xml is missing ${page.canonical}`);
  assert(llms.includes(page.canonical), `llms.txt is missing ${page.canonical}`);
}
assert(facts.name === 'Harbor', 'harbor-facts.json has the wrong game entity');
assert(facts.steamAppId === 2714930, 'harbor-facts.json has the wrong Steam App ID');
assert(facts.release?.status === 'unreleased', 'harbor-facts.json must identify the current unreleased status');
assert(facts.release?.plannedWindow === '2026', 'harbor-facts.json has the wrong release window');
assert(facts.platforms?.confirmed?.length === 1 && facts.platforms.confirmed[0] === 'Windows PC via Steam', 'harbor-facts.json has unsupported confirmed platforms');

console.log(`Discovery files OK · ${pages.length} sitemap URLs · robots.txt · llms.txt · harbor-facts.json`);
