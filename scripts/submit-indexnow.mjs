import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const INDEXNOW_KEY = '2421833290844345a8caca4492858067';
export const INDEXNOW_HOST = 'theharborgame.com';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const retryableStatuses = new Set([429, 500, 502, 503, 504]);
const defaultRetryDelays = [500, 1_500, 3_500];

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const retryDelay = (response, attempt, fallbackDelays) => {
  const retryAfter = response.headers?.get?.('retry-after');
  if (retryAfter) {
    const seconds = Number(retryAfter);
    const retryAt = Date.parse(retryAfter);
    const milliseconds = Number.isFinite(seconds)
      ? seconds * 1_000
      : Number.isFinite(retryAt) ? retryAt - Date.now() : 0;
    if (milliseconds > 0) return Math.min(milliseconds, 10_000);
  }
  return fallbackDelays[Math.min(attempt, fallbackDelays.length - 1)];
};

export const normalizeIndexNowUrls = (urls) => {
  const uniqueUrls = [...new Set(urls.map((value) => value.trim()).filter(Boolean))];
  if (uniqueUrls.length === 0) {
    throw new Error('IndexNow submission aborted: no URLs were provided');
  }
  if (uniqueUrls.length > 10_000) {
    throw new Error(`IndexNow submission aborted: ${uniqueUrls.length} URLs exceeds the 10,000 URL request limit`);
  }

  for (const value of uniqueUrls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error(`IndexNow submission aborted: invalid URL: ${value}`);
    }
    if (url.origin !== `https://${INDEXNOW_HOST}` || url.username || url.password) {
      throw new Error(`IndexNow submission aborted: URL is outside https://${INDEXNOW_HOST}: ${value}`);
    }
  }
  return uniqueUrls;
};

export const readManifestUrls = async (manifestPath = path.resolve('dist', 'seo-manifest.json')) => {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  return normalizeIndexNowUrls(manifest.map(({ canonical }) => canonical));
};

export const submitIndexNow = async (urls, {
  dryRun = false,
  fetchImpl = globalThis.fetch,
  maxAttempts = 4,
  retryDelays = defaultRetryDelays,
  timeoutMs = 10_000,
} = {}) => {
  const urlList = normalizeIndexNowUrls(urls);
  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  if (dryRun) {
    console.log(`IndexNow dry run · ${urlList.length} URL${urlList.length === 1 ? '' : 's'}`);
    console.log(JSON.stringify(payload, null, 2));
    return { dryRun: true, status: null, urlList };
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('IndexNow submission aborted: fetch is unavailable');
  }

  let lastError;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let response;
    let responseBody = '';
    let requestError;
    try {
      response = await fetchImpl(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (![200, 202].includes(response.status)) {
        responseBody = (await response.text()).slice(0, 1_000);
      }
    } catch (error) {
      requestError = error;
    } finally {
      clearTimeout(timeout);
    }

    if (requestError) {
      lastError = requestError;
      if (attempt + 1 >= maxAttempts) {
        throw new Error(`IndexNow request failed after ${maxAttempts} attempts: ${requestError.message}`, { cause: requestError });
      }
      await wait(retryDelays[Math.min(attempt, retryDelays.length - 1)]);
      continue;
    }

    if ([200, 202].includes(response.status)) {
      console.log(`IndexNow accepted ${urlList.length} Harbor URL${urlList.length === 1 ? '' : 's'} (HTTP ${response.status})`);
      return { dryRun: false, status: response.status, urlList };
    }

    lastError = new Error(`IndexNow rejected the submission with HTTP ${response.status}${responseBody ? `: ${responseBody}` : ''}`);
    if (!retryableStatuses.has(response.status) || attempt + 1 >= maxAttempts) {
      throw lastError;
    }
    await wait(retryDelay(response, attempt, retryDelays));
  }

  throw lastError ?? new Error('IndexNow submission failed without a response');
};

const runCli = async () => {
  const arguments_ = process.argv.slice(2);
  const dryRun = arguments_.includes('--dry-run');
  const explicitUrls = arguments_.filter((argument) => argument !== '--dry-run');
  const unknownOption = explicitUrls.find((argument) => argument.startsWith('-'));
  if (unknownOption) {
    throw new Error(`Unknown IndexNow option: ${unknownOption}`);
  }
  const urls = explicitUrls.length > 0 ? explicitUrls : await readManifestUrls();
  await submitIndexNow(urls, { dryRun });
};

const isMainModule = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMainModule) {
  await runCli();
}
