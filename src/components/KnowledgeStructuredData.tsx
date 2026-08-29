import type { KnowledgePageData } from '@/content/knowledgePages';
import {
  BASE_URL,
  DEVELOPER,
  GAME_PLATFORM,
  GAME_PUBLISHER,
  STEAM_APP_ID,
  STEAM_URL,
} from '@/content/gameIdentity';

interface KnowledgeStructuredDataProps {
  page: KnowledgePageData;
}

const KnowledgeStructuredData = ({ page }: KnowledgeStructuredDataProps) => {
  const pageUrl = `${BASE_URL}${page.route}`;
  const homeUrl = page.locale === 'tr' ? `${BASE_URL}/tr/` : `${BASE_URL}/`;
  const homeLabel = page.locale === 'tr' ? 'Harbor ana sayfa' : 'Harbor home';

  const webPage = {
    '@type': page.schemaType === 'AboutPage' ? 'AboutPage' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.metaTitle,
    headline: page.title,
    description: page.metaDescription,
    inLanguage: page.locale,
    datePublished: page.publishedDate,
    dateModified: page.modifiedDate,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': `${BASE_URL}/#game` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${BASE_URL}${page.heroImage}`,
      caption: page.heroAlt,
    },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    publisher: { '@id': DEVELOPER.id },
    ...(page.video ? { mainEntity: { '@id': `${pageUrl}#video` } } : {}),
  };

  const article = page.schemaType === 'Article' ? {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    headline: page.title,
    description: page.directAnswer,
    inLanguage: page.locale,
    datePublished: page.publishedDate,
    dateModified: page.modifiedDate,
    author: { '@id': DEVELOPER.id },
    publisher: { '@id': DEVELOPER.id },
    image: `${BASE_URL}${page.heroImage}`,
    about: { '@id': `${BASE_URL}/#game` },
    citation: page.sources.map(({ url }) => url),
  } : null;

  const video = page.video ? {
    '@type': 'VideoObject',
    '@id': `${pageUrl}#video`,
    url: pageUrl,
    name: page.video.name,
    description: page.video.description,
    thumbnailUrl: `${BASE_URL}${page.video.thumbnailUrl}`,
    uploadDate: page.video.uploadDate,
    duration: page.video.duration,
    embedUrl: page.video.embedUrl,
    publisher: { '@id': DEVELOPER.id },
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    sameAs: [page.video.watchUrl],
  } : null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': DEVELOPER.id,
        name: DEVELOPER.name,
        alternateName: DEVELOPER.alternateName,
        url: DEVELOPER.website,
        email: 'info@castilva.com',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
        },
        sameAs: [
          DEVELOPER.youtube,
          DEVELOPER.discord,
        ],
      },
      {
        '@type': 'Organization',
        '@id': GAME_PUBLISHER.id,
        name: GAME_PUBLISHER.name,
        url: GAME_PUBLISHER.website,
        sameAs: [GAME_PUBLISHER.steam],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: 'Harbor Official Website',
        alternateName: 'theharborgame.com',
        inLanguage: ['en', 'tr'],
        publisher: { '@id': DEVELOPER.id },
      },
      {
        '@type': 'VideoGame',
        '@id': `${BASE_URL}/#game`,
        name: 'Harbor',
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'Steam App ID',
          value: STEAM_APP_ID,
        },
        disambiguatingDescription: 'Harbor is CastilvaGames’ competitive post-apocalyptic open-world survival game for Windows PC, identified on Steam as App 2714930.',
        url: `${BASE_URL}/`,
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
        operatingSystem: 'Windows 10 or Windows 11, 64-bit',
        playMode: ['https://schema.org/MultiPlayer', 'https://schema.org/CoOp'],
        applicationCategory: 'Game',
        inLanguage: ['en', 'fr', 'it', 'de', 'es', 'zh-Hans', 'ja', 'ko', 'pt-PT', 'ru', 'tr'],
        creator: { '@id': DEVELOPER.id },
        publisher: { '@id': GAME_PUBLISHER.id },
        sameAs: [STEAM_URL],
        copyrightHolder: { '@id': DEVELOPER.id },
        potentialAction: {
          '@type': 'ViewAction',
          name: page.locale === 'tr' ? 'Harbor Steam sayfasını aç' : 'View Harbor on Steam',
          target: STEAM_URL,
        },
      },
      webPage,
      ...(article ? [article] : []),
      ...(video ? [video] : []),
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeLabel,
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  );
};

export default KnowledgeStructuredData;
