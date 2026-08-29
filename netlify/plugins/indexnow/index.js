import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { submitIndexNow } from '../../../scripts/submit-indexnow.mjs';
import { changedCanonicalUrls } from './diff.js';

const LIVE_MANIFEST_URL = 'https://theharborgame.com/seo-manifest.json';
const FETCH_TIMEOUT_MS = 8_000;

let productionDeploy = false;
let previousManifest = null;

const readManifest = async (manifestPath) => JSON.parse(await readFile(manifestPath, 'utf8'));

const fetchPreviousManifest = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const url = new URL(LIVE_MANIFEST_URL);
    url.searchParams.set('indexnow_previous', Date.now().toString());
    const response = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' },
      signal: controller.signal,
    });
    if (!response.ok) {
      console.log(`IndexNow: no previous production manifest (HTTP ${response.status}); all canonical URLs will be eligible.`);
      return null;
    }
    const manifest = await response.json();
    if (!Array.isArray(manifest)) {
      console.log('IndexNow: previous production manifest was invalid; all canonical URLs will be eligible.');
      return null;
    }
    return manifest;
  } catch (error) {
    console.log(`IndexNow: previous production manifest unavailable (${error.message}); all canonical URLs will be eligible.`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

export const onPreBuild = async ({ constants }) => {
  productionDeploy = process.env.CONTEXT === 'production' && !constants.IS_LOCAL;
  previousManifest = null;
  if (!productionDeploy) {
    console.log(`IndexNow: skipped for ${constants.IS_LOCAL ? 'local build' : `${process.env.CONTEXT ?? 'unknown'} context`}.`);
    return;
  }
  previousManifest = await fetchPreviousManifest();
};

export const onSuccess = async ({ constants, utils }) => {
  if (!productionDeploy || process.env.CONTEXT !== 'production' || constants.IS_LOCAL) {
    console.log('IndexNow: no submission outside a successful production deploy.');
    return;
  }

  try {
    const currentManifest = await readManifest(path.join(constants.PUBLISH_DIR, 'seo-manifest.json'));
    if (!Array.isArray(currentManifest) || currentManifest.some(({ canonical, contentHash }) => !canonical || !contentHash)) {
      throw new Error('IndexNow: deployed SEO manifest is invalid or missing contentHash values.');
    }

    const urls = changedCanonicalUrls(previousManifest, currentManifest);
    if (urls.length === 0) {
      console.log('IndexNow: no new, changed, or removed canonical URLs to submit.');
      return;
    }

    await submitIndexNow(urls);
  } catch (error) {
    if (utils?.build?.failPlugin) {
      return utils.build.failPlugin('IndexNow post-deploy notification failed.', { error });
    }
    throw error;
  }
};
