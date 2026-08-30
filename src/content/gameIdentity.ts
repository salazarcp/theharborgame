export const BASE_URL = 'https://theharborgame.com';
export const STEAM_APP_ID = '2714930';
export const STEAM_URL = `https://store.steampowered.com/app/${STEAM_APP_ID}/Harbor`;
export const STEAM_COMMUNITY_URL = `https://steamcommunity.com/app/${STEAM_APP_ID}`;
export const STEAM_NEWS_URL = `https://store.steampowered.com/news/app/${STEAM_APP_ID}`;
export const TRAILER_URL = 'https://www.youtube.com/watch?v=3E5J4DY8OhI';
export const TRAILER_EMBED_URL = 'https://www.youtube-nocookie.com/embed/3E5J4DY8OhI';
export const GAME_PLATFORM = 'Windows PC';
export const RELEASE_WINDOW = '2026';
export const FACT_CHECK_DATE = '2026-08-29';
export const SITE_PUBLISHED_DATE = '2026-07-22';
export const MEDIA_CONTACT = 'info@castilva.com';

export const DEVELOPER = {
  id: `${BASE_URL}/#organization`,
  name: 'CastilvaGames',
  alternateName: 'Castilva Games',
  website: `${BASE_URL}/`,
  youtube: 'https://www.youtube.com/@CastilvaGames',
  youtubeChannel: 'https://www.youtube.com/channel/UCspM1vFpfxClONUfJen5Dcg',
  discord: 'https://discord.gg/DQaJMQGvNn',
  x: 'https://x.com/CastilvaGames',
} as const;

export const GAME_PUBLISHER = {
  id: `${BASE_URL}/#game-publisher`,
  name: 'Wandering Wizard',
  website: 'https://www.wanderingwizard.com/',
  steam: 'https://store.steampowered.com/publisher/WanderingWizard/',
  franchise: 'https://store.steampowered.com/franchise/WanderingWizard',
  linkedin: 'https://www.linkedin.com/company/wandering-wizard',
} as const;

export const GAME_ID = `${BASE_URL}/#game`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
export const TRAILER_VIDEO_ID = `${BASE_URL}/trailer/#video`;

/**
 * The three site-wide entities below are shared by every page and are keyed on a
 * root-scoped `@id`. They MUST serialize identically on every route: a consumer
 * merging the graph across crawls would otherwise see one entity asserting two
 * different values for the same property.
 *
 * Locale-specific text belongs on the page-scoped `WebPage` / `Article` nodes,
 * never here.
 */

export const DEVELOPER_ORGANIZATION = {
  '@type': 'Organization',
  '@id': DEVELOPER.id,
  name: DEVELOPER.name,
  alternateName: DEVELOPER.alternateName,
  url: DEVELOPER.website,
  email: MEDIA_CONTACT,
  description: 'CastilvaGames is the independent studio developing Harbor, a competitive post-apocalyptic open-world survival game for Windows PC.',
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 350,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'press',
    email: MEDIA_CONTACT,
    url: `${BASE_URL}/press/`,
    availableLanguage: ['en', 'tr'],
  },
  knowsAbout: [
    'Open-world survival games',
    'Post-apocalyptic game worlds',
    'Online PvP and co-op multiplayer design',
    'Survival crafting and base building',
    'Windows PC game development',
  ],
  sameAs: [
    DEVELOPER.youtube,
    DEVELOPER.youtubeChannel,
    DEVELOPER.x,
    DEVELOPER.discord,
  ],
} as const;

export const PUBLISHER_ORGANIZATION = {
  '@type': 'Organization',
  '@id': GAME_PUBLISHER.id,
  name: GAME_PUBLISHER.name,
  url: GAME_PUBLISHER.website,
  sameAs: [
    GAME_PUBLISHER.steam,
    GAME_PUBLISHER.franchise,
    GAME_PUBLISHER.linkedin,
  ],
} as const;

export const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${BASE_URL}/`,
  name: 'Harbor Official Website',
  alternateName: 'theharborgame.com',
  description: "Official website for Harbor, CastilvaGames' competitive post-apocalyptic open-world survival game for Windows PC.",
  inLanguage: ['en', 'tr'],
  publisher: { '@id': DEVELOPER.id },
} as const;

export const GAME_NODE = {
  '@type': 'VideoGame',
  '@id': GAME_ID,
  name: 'Harbor',
  url: `${BASE_URL}/`,
  mainEntityOfPage: { '@id': `${BASE_URL}/#webpage` },
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Steam App ID',
    value: STEAM_APP_ID,
  },
  disambiguatingDescription: 'Harbor is CastilvaGames’ competitive post-apocalyptic open-world survival game for Windows PC, identified on Steam as App 2714930.',
  description: 'Harbor is a competitive post-apocalyptic open-world survival game built around one safe zone, scarce resources, online PvP, co-op, crafting, building, and trading.',
  image: [
    `${BASE_URL}/hero-bg.webp`,
    `${BASE_URL}/feature-harbor.jpg`,
    `${BASE_URL}/feature-rulers.jpg`,
  ],
  genre: [
    'Open World Survival Craft',
    'Survival',
    'Multiplayer',
    'Online PvP',
    'Online Co-op',
    'First-Person Shooter',
    'Post-apocalyptic',
    'Building',
    'Driving',
  ],
  gamePlatform: GAME_PLATFORM,
  // The string form carries the verified "64-bit" fact that an array of two OS
  // names drops. Matches public/harbor-facts.json.
  operatingSystem: 'Windows 10 or Windows 11, 64-bit',
  playMode: ['https://schema.org/MultiPlayer', 'https://schema.org/CoOp'],
  applicationCategory: 'Game',
  inLanguage: ['en', 'fr', 'it', 'de', 'es', 'zh-Hans', 'ja', 'ko', 'pt-PT', 'ru', 'tr'],
  creator: { '@id': DEVELOPER.id },
  publisher: { '@id': GAME_PUBLISHER.id },
  copyrightHolder: { '@id': DEVELOPER.id },
  sameAs: [STEAM_URL, STEAM_COMMUNITY_URL],
  trailer: { '@id': TRAILER_VIDEO_ID },
  // Verified against the official Steam listing; mirrored in
  // public/harbor-facts.json. No price, release date or rating is announced, so
  // none is asserted here.
  processorRequirements: 'Minimum: Intel Core i3-4170 or AMD FX-8120. Recommended: Intel Core i5-8400 or AMD Ryzen 7 1800X.',
  memoryRequirements: 'Minimum: 12 GB RAM. Recommended: 16 GB RAM.',
  storageRequirements: '15 GB available space',
  softwareRequirements: 'DirectX 12, Secure Boot and TPM 2.0, Easy Anti-Cheat',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Release window',
      value: RELEASE_WINDOW,
    },
    {
      '@type': 'PropertyValue',
      name: 'Release status',
      value: 'Unreleased; Steam Early Access planned',
    },
  ],
  potentialAction: {
    '@type': 'ViewAction',
    name: 'View Harbor on Steam',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: STEAM_URL,
    },
  },
} as const;
