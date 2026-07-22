import { readFile } from 'node:fs/promises';
import path from 'node:path';

const KEY = '2421833290844345a8caca4492858067';
const HOST = 'theharborgame.com';
const manifestPath = path.resolve('dist', 'seo-manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const urlList = [...new Set(manifest.map(({ canonical }) => canonical))];

if (urlList.length === 0) {
  throw new Error('IndexNow submission aborted: no canonical URLs found in dist/seo-manifest.json');
}

for (const url of urlList) {
  if (new URL(url).hostname !== HOST) {
    throw new Error(`IndexNow submission aborted: URL is outside ${HOST}: ${url}`);
  }
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text();
  throw new Error(`IndexNow rejected the submission with HTTP ${response.status}: ${body}`);
}

console.log(`IndexNow accepted ${urlList.length} Harbor URLs (HTTP ${response.status})`);
