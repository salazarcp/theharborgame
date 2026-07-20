import { gameFaqs, type SiteLocale } from '@/content/gameContent';

interface StructuredDataProps {
  locale?: SiteLocale;
}

const BASE_URL = 'https://theharborgame.com';
const STEAM_URL = 'https://store.steampowered.com/app/2714930/Harbor';

const StructuredData = ({ locale = 'en' }: StructuredDataProps) => {
  const pageUrl = locale === 'tr' ? `${BASE_URL}/tr/` : `${BASE_URL}/`;
  const description = locale === 'tr'
    ? 'Harbor, açık dünya survival crafting ile online PvP, online co-op, FPS, üs kurma, kaynak toplama ve araç kullanımını bir araya getiren, PC için geliştirilen post-apocalyptic multiplayer oyundur.'
    : 'Harbor is an upcoming open-world multiplayer survival FPS for PC with online PvP, online co-op, crafting, shelter building, resource gathering, trading, exploration, and driving.';

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
        name: 'The Harbor Game',
        alternateName: ['Harbor Game', 'Harbor'],
        description,
        inLanguage: ['en', 'tr'],
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'VideoGame',
        '@id': `${BASE_URL}/#game`,
        name: 'Harbor',
        alternateName: ['The Harbor Game', 'Harbor Game'],
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
