import { gameFaqs, type SiteLocale } from '@/content/gameContent';

interface StructuredDataProps {
  locale?: SiteLocale;
}

const BASE_URL = 'https://theharborgame.com';
const STEAM_URL = 'https://store.steampowered.com/app/2714930/Harbor';

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
        '@id': `${BASE_URL}/#organization`,
        name: 'CastilvaGames',
        alternateName: 'Castilva Games',
        url: `${BASE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
          width: 512,
          height: 350,
        },
        sameAs: [
          'https://www.youtube.com/@CastilvaGames',
          'https://discord.gg/DQaJMQGvNn',
          STEAM_URL,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: 'Harbor Official Website',
        alternateName: 'theharborgame.com',
        description,
        inLanguage: ['en', 'tr'],
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'VideoGame',
        '@id': `${BASE_URL}/#game`,
        name: 'Harbor',
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'Steam App ID',
          value: '2714930',
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
        gamePlatform: 'PC (Windows)',
        operatingSystem: ['Windows 10', 'Windows 11'],
        playMode: ['https://schema.org/MultiPlayer', 'https://schema.org/CoOp'],
        applicationCategory: 'Game',
        inLanguage: ['en', 'fr', 'it', 'de', 'es', 'zh-Hans', 'ja', 'ko', 'pt-PT', 'ru', 'tr'],
        creator: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        sameAs: [STEAM_URL],
        copyrightHolder: { '@id': `${BASE_URL}/#organization` },
        potentialAction: {
          '@type': 'ViewAction',
          name: locale === 'tr' ? 'Steam istek listesine ekle' : 'Wishlist Harbor on Steam',
          target: STEAM_URL,
        },
      },
      {
        '@type': 'VideoObject',
        '@id': `${BASE_URL}/#announcement-trailer`,
        name: 'Harbor Announcement Trailer',
        description: 'The official Harbor announcement trailer from CastilvaGames, showing the post-apocalyptic open world, survival atmosphere, and multiplayer action.',
        thumbnailUrl: [`${BASE_URL}/trailer-thumb.webp`],
        uploadDate: '2025-01-07T22:51:14-08:00',
        duration: 'PT1M55S',
        embedUrl: 'https://www.youtube.com/embed/3E5J4DY8OhI',
        contentUrl: 'https://www.youtube.com/watch?v=3E5J4DY8OhI',
        inLanguage: 'en',
        publisher: { '@id': `${BASE_URL}/#organization` },
        about: { '@id': `${BASE_URL}/#game` },
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
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: `${pageUrl}#${locale === 'tr' ? 'sss' : 'faq'}`,
        inLanguage: locale,
        mainEntity: gameFaqs[locale].map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
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
