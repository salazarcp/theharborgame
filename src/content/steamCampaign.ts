import { STEAM_URL } from './gameIdentity';

// Stable public campaign labels. No visitor identity or incoming query string.
export const STEAM_CAMPAIGN = 'harbor_score_pilot_20260906';
export function steamCampaignUrl(path: string, placement: string) {
  const page = path === '/' ? 'home' : path.replace(/^\/+|\/+$/g, '').replaceAll('/', '_');
  if (!/^[a-z0-9_-]+$/.test(page) || !/^[a-z0-9_-]+$/.test(placement)) {
    throw new Error('Invalid Steam campaign label');
  }
  const url = new URL(STEAM_URL);
  url.searchParams.set('utm_source', 'theharborgame.com');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', STEAM_CAMPAIGN);
  url.searchParams.set('utm_content', `${page}_${placement}`);
  return url.href;
}
