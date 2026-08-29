import assert from 'node:assert/strict';
import test from 'node:test';
import {
  onPreBuild,
  onSuccess,
} from './index.js';
import { changedCanonicalUrls } from './diff.js';
import {
  normalizeIndexNowUrls,
  submitIndexNow,
} from '../../../scripts/submit-indexnow.mjs';

const page = (pathname, contentHash) => ({
  canonical: `https://theharborgame.com${pathname}`,
  contentHash,
});

test('manifest diff returns only new, changed, and removed canonical URLs', () => {
  const previous = [page('/', 'same'), page('/changed/', 'old'), page('/removed/', 'old')];
  const current = [page('/', 'same'), page('/changed/', 'new'), page('/new/', 'new')];

  assert.deepEqual(changedCanonicalUrls(previous, current), [
    'https://theharborgame.com/changed/',
    'https://theharborgame.com/new/',
    'https://theharborgame.com/removed/',
  ]);
  assert.deepEqual(changedCanonicalUrls(current, current), []);
});

test('first deploy or a legacy manifest without hashes submits every known canonical URL', () => {
  const current = [page('/', 'home'), page('/trailer/', 'video')];
  assert.deepEqual(changedCanonicalUrls(null, current), current.map(({ canonical }) => canonical));
  assert.deepEqual(changedCanonicalUrls([{ canonical: 'https://theharborgame.com/legacy/' }], current), [
    ...current.map(({ canonical }) => canonical),
    'https://theharborgame.com/legacy/',
  ]);
});

test('IndexNow URL validation rejects URLs outside the canonical HTTPS host', () => {
  assert.throws(() => normalizeIndexNowUrls(['http://theharborgame.com/']), /outside/);
  assert.throws(() => normalizeIndexNowUrls(['https://example.com/']), /outside/);
  assert.throws(() => normalizeIndexNowUrls(['https://theharborgame.com:8443/']), /outside/);
  assert.throws(() => normalizeIndexNowUrls(['https://user@theharborgame.com/']), /outside/);
});

test('IndexNow retries HTTP 429 and then accepts HTTP 202', async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    return calls === 1
      ? new Response('retry', { status: 429, headers: { 'Retry-After': '0.001' } })
      : new Response(null, { status: 202 });
  };

  const result = await submitIndexNow(['https://theharborgame.com/trailer/'], {
    fetchImpl,
    maxAttempts: 2,
    retryDelays: [0],
    timeoutMs: 100,
  });
  assert.equal(calls, 2);
  assert.equal(result.status, 202);
});

test('IndexNow retries a network failure', async () => {
  let calls = 0;
  const fetchImpl = async () => {
    calls += 1;
    if (calls === 1) throw new Error('temporary network failure');
    return new Response(null, { status: 200 });
  };

  const result = await submitIndexNow(['https://theharborgame.com/'], {
    fetchImpl,
    maxAttempts: 2,
    retryDelays: [0],
    timeoutMs: 100,
  });
  assert.equal(calls, 2);
  assert.equal(result.status, 200);
});

test('IndexNow timeout also covers a stalled error response body', async () => {
  const fetchImpl = async (_url, { signal }) => ({
    status: 503,
    headers: new Headers(),
    text: () => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('body aborted')), { once: true });
    }),
  });

  await assert.rejects(
    submitIndexNow(['https://theharborgame.com/'], {
      fetchImpl,
      maxAttempts: 1,
      retryDelays: [0],
      timeoutMs: 5,
    }),
    /failed after 1 attempts: body aborted/,
  );
});

test('Build Plugin lifecycle never submits for preview or local builds', async () => {
  const originalContext = process.env.CONTEXT;
  try {
    process.env.CONTEXT = 'deploy-preview';
    await onPreBuild({ constants: { IS_LOCAL: false } });
    await onSuccess({ constants: { IS_LOCAL: false, PUBLISH_DIR: 'missing-preview-dist' } });

    process.env.CONTEXT = 'production';
    await onPreBuild({ constants: { IS_LOCAL: true } });
    await onSuccess({ constants: { IS_LOCAL: true, PUBLISH_DIR: 'missing-local-dist' } });
  } finally {
    if (originalContext === undefined) delete process.env.CONTEXT;
    else process.env.CONTEXT = originalContext;
  }
});
