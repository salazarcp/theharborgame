import type { SiteLocale } from '@/content/gameContent';
import {
  BASE_URL,
  DEVELOPER,
  GAME_PLATFORM,
  GAME_PUBLISHER,
  STEAM_APP_ID,
  STEAM_URL,
} from '@/content/gameIdentity';

interface StructuredDataProps {
  locale?: SiteLocale;
}

const StructuredData = ({ locale = 'en' }: StructuredDataProps) => {
  const pageUrl = locale === 'tr' ? `${BASE_URL}/tr/` : `${BASE_URL}/`;
  const description = locale === 'tr'
    ? 'Harbor, tek güvenli bölge ve kıt kaynaklar çevresinde online PvP, co-op, crafting, building ve ticareti birleştiren rekabetçi post-apocalyptic açık dünya survival oyunudur.'
    : 'Harbor is a competitive post-apocalyptic open-world survival game built around one safe zone, scarce resources, online PvP, co-op, crafting, building, and trading.';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': DEVELOPER.id,
        name: DEVELOPER.name,
        alternateName: DEVELOPER.alternateName,
        url: DEVELOPER.website,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
          width: 512,
          height: 350,
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
        description,
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
        url: pageUrl,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        description,
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
        operatingSystem: ['Windows 10', 'Windows 11'],
        playMode: ['https://schema.org/MultiPlayer', 'https://schema.org/CoOp'],
        applicationCategory: 'Game',
        inLanguage: ['en', 'fr', 'it', 'de', 'es', 'zh-Hans', 'ja', 'ko', 'pt-PT', 'ru', 'tr'],
        creator: { '@id': DEVELOPER.id },
        publisher: { '@id': GAME_PUBLISHER.id },
        sameAs: [STEAM_URL],
        copyrightHolder: { '@id': DEVELOPER.id },
        potentialAction: {
          '@type': 'ViewAction',
          name: locale === 'tr' ? 'Steam istek listesine ekle' : 'Wishlist Harbor on Steam',
          target: STEAM_URL,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: locale === 'tr'
          ? 'Harbor | Açık Dünya Multiplayer Survival Oyunu'
          : 'Harbor | Open-World Multiplayer Survival Game',
        description,
        inLanguage: locale,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#game` },
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

export default StructuredData;
