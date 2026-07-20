import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const distDirectory = path.resolve('dist');

const pages = [
  {
    route: '/',
    file: 'index.html',
    language: 'en',
    canonical: 'https://theharborgame.com/',
    title: 'Harbor | Open-World Multiplayer Survival Game',
    coreCopy: 'open-world multiplayer survival',
  },
  {
    route: '/tr/',
    file: path.join('tr', 'index.html'),
    language: 'tr',
    canonical: 'https://theharborgame.com/tr/',
    title: 'Harbor | Açık Dünya Multiplayer Survival Oyunu',
    coreCopy: 'açık dünya multiplayer survival',
  },
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const page of pages) {
  const filePath = path.join(distDirectory, page.file);
  assert(existsSync(filePath), `${page.route}: missing ${page.file}`);

  const html = readFileSync(filePath, 'utf8');
  const prefix = `${page.route}:`;

  assert(html.length > 20_000, `${prefix} page was not prerendered`);
  assert(!html.includes('<div id="root"></div>'), `${prefix} root is empty`);
  assert((html.match(/<h1\b/g) ?? []).length === 1, `${prefix} expected exactly one H1`);
  assert(html.includes(`<html lang="${page.language}">`), `${prefix} wrong html language`);
  assert(html.includes(`<title>${page.title}</title>`), `${prefix} wrong title`);
  assert(
    html.includes(`<link rel="canonical" href="${page.canonical}"`),
    `${prefix} wrong canonical`,
  );
  assert(
    html.includes('hreflang="en"') && html.includes('hreflang="tr"') && html.includes('hreflang="x-default"'),
    `${prefix} incomplete hreflang links`,
  );
  const localeSwitchHref = page.language === 'tr' ? '/' : '/tr/';
  assert(html.includes(`href="${localeSwitchHref}"`), `${prefix} missing visible language switch`);
  assert(html.toLowerCase().includes(page.coreCopy), `${prefix} missing core visible copy`);

  const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert(jsonLdMatch, `${prefix} missing JSON-LD`);

  const structuredData = JSON.parse(jsonLdMatch[1]);
  const graph = structuredData['@graph'];
  const types = graph.map((entry) => entry['@type']);

  for (const type of ['Organization', 'WebSite', 'VideoGame', 'WebPage', 'FAQPage']) {
    assert(types.includes(type), `${prefix} missing ${type} structured data`);
  }

  const faqPage = graph.find((entry) => entry['@type'] === 'FAQPage');
  assert(faqPage.mainEntity.length === 10, `${prefix} expected 10 structured FAQ answers`);

  const localAssetUrls = [...html.matchAll(/(?:src|href)="(\/(?!\/)[^"#]+)"/g)]
    .map((match) => match[1].split('?')[0])
    .filter((url) => url !== '/' && url !== '/tr/');

  for (const url of new Set(localAssetUrls)) {
    assert(existsSync(path.join(distDirectory, url)), `${prefix} missing local asset ${url}`);
  }

  console.log(`${page.route} OK · ${html.length} bytes · H1=1 · FAQ=10 · ${types.join(', ')}`);
}

const robots = readFileSync(path.join(distDirectory, 'robots.txt'), 'utf8');
const sitemap = readFileSync(path.join(distDirectory, 'sitemap.xml'), 'utf8');
const llms = readFileSync(path.join(distDirectory, 'llms.txt'), 'utf8');

assert(robots.includes('Allow: /'), 'robots.txt does not allow crawling');
assert(robots.includes('https://theharborgame.com/sitemap.xml'), 'robots.txt is missing sitemap URL');
assert(sitemap.includes('https://theharborgame.com/tr/'), 'sitemap.xml is missing Turkish page');
assert(llms.includes('Official Steam page'), 'llms.txt is missing official entity sources');

console.log('Discovery files OK · robots.txt · sitemap.xml · llms.txt');
