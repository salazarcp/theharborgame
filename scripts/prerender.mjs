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

const englishSeo = {
  title: 'Harbor | Open-World Multiplayer Survival Game',
  description: 'Harbor is an upcoming open-world multiplayer survival FPS for PC. Scavenge, craft, build, drive, trade, and fight in online PvP and co-op.',
};

const turkishSeo = {
  title: 'Harbor | Açık Dünya Multiplayer Survival Oyunu',
  description: 'Harbor, PC için açık dünya multiplayer survival FPS oyunudur. Kaynak topla, üret, üs kur, araç kullan ve online PvP ile co-op dünyasında hayatta kal.',
};

const injectMarkup = (html, markup) => {
  const placeholder = '<div id="root"></div>';

  if (!html.includes(placeholder)) {
    throw new Error('Prerender failed: #root placeholder was not found in dist/index.html');
  }

  return html.replace(placeholder, `<div id="root">${markup}</div>`);
};

const localizeTurkishHead = (html) => html
  .replace('<html lang="en">', '<html lang="tr">')
  .replaceAll(englishSeo.title, turkishSeo.title)
  .replaceAll(englishSeo.description, turkishSeo.description)
  .replace(
    '<link rel="canonical" href="https://theharborgame.com/" />',
    '<link rel="canonical" href="https://theharborgame.com/tr/" />',
  )
  .replace(
    '<meta property="og:url" content="https://theharborgame.com/" />',
    '<meta property="og:url" content="https://theharborgame.com/tr/" />',
  )
  .replace(
    '<meta property="og:locale" content="en_US" />',
    '<meta property="og:locale" content="tr_TR" />',
  )
  .replace(
    '<meta property="og:locale:alternate" content="tr_TR" />',
    '<meta property="og:locale:alternate" content="en_US" />',
  );

try {
  const { default: SiteRoot } = await vite.ssrLoadModule('/src/SiteRoot.tsx');
  const render = (pathname) => renderToString(React.createElement(SiteRoot, { pathname }));

  const englishHtml = injectMarkup(template, render('/'));
  await writeFile(indexPath, englishHtml, 'utf8');

  const turkishDirectory = path.join(distDirectory, 'tr');
  await mkdir(turkishDirectory, { recursive: true });
  const turkishHtml = localizeTurkishHead(injectMarkup(template, render('/tr/')));
  await writeFile(path.join(turkishDirectory, 'index.html'), turkishHtml, 'utf8');

  console.log('Prerendered / and /tr/');
} finally {
  await vite.close();
}
