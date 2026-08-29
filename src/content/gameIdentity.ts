export const BASE_URL = 'https://theharborgame.com';
export const STEAM_APP_ID = '2714930';
export const STEAM_URL = `https://store.steampowered.com/app/${STEAM_APP_ID}/Harbor`;
export const TRAILER_URL = 'https://www.youtube.com/watch?v=3E5J4DY8OhI';
export const TRAILER_EMBED_URL = 'https://www.youtube-nocookie.com/embed/3E5J4DY8OhI';
export const GAME_PLATFORM = 'Windows PC';
export const RELEASE_WINDOW = '2026';
export const FACT_CHECK_DATE = '2026-08-29';

export const DEVELOPER = {
  id: `${BASE_URL}/#organization`,
  name: 'CastilvaGames',
  alternateName: 'Castilva Games',
  website: `${BASE_URL}/`,
  youtube: 'https://www.youtube.com/@CastilvaGames',
  discord: 'https://discord.gg/DQaJMQGvNn',
} as const;

export const GAME_PUBLISHER = {
  id: `${BASE_URL}/#game-publisher`,
  name: 'Wandering Wizard',
  website: 'https://www.wanderingwizard.com/',
  steam: 'https://store.steampowered.com/publisher/WanderingWizard/',
} as const;
