import type { KnowledgePageData } from '@/content/knowledgePages';
import { BASE_URL, STEAM_URL } from '@/content/knowledgePages';

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
    publisher: { '@id': `${BASE_URL}/#organization` },
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
    author: { '@id': `${BASE_URL}/#organization` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    image: `${BASE_URL}${page.heroImage}`,
    about: { '@id': `${BASE_URL}/#game` },
    citation: page.sources.map(({ url }) => url),
  } : null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'CastilvaGames',
        alternateName: 'Castilva Games',
        url: `${BASE_URL}/`,
        email: 'info@castilva.com',
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/logo.png`,
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
        inLanguage: ['en', 'tr'],
        publisher: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'VideoGame',
        '@id': `${BASE_URL}/#game`,
        name: 'Harbor',
        alternateName: ['The Harbor Game', 'Harbor Game'],
        url: `${BASE_URL}/`,
        description: 'Harbor is an upcoming first-person, open-world multiplayer survival game for Windows PC with online PvP, online co-op, crafting, building, trading, driving, and scarce resources.',
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
        gamePlatform: 'Windows PC',
        operatingSystem: 'Windows 10 or Windows 11, 64-bit',
        playMode: ['https://schema.org/MultiPlayer', 'https://schema.org/CoOp'],
        applicationCategory: 'Game',
        inLanguage: ['en', 'fr', 'it', 'de', 'es', 'zh-Hans', 'ja', 'ko', 'pt-PT', 'ru', 'tr'],
        creator: { '@id': `${BASE_URL}/#organization` },
        publisher: { '@id': `${BASE_URL}/#organization` },
        sameAs: [STEAM_URL],
        potentialAction: {
          '@type': 'ViewAction',
          name: page.locale === 'tr' ? 'Harbor Steam sayfasını aç' : 'View Harbor on Steam',
          target: STEAM_URL,
        },
      },
      webPage,
      ...(article ? [article] : []),
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
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        url: `${pageUrl}#faq`,
        inLanguage: page.locale,
        mainEntity: page.faqs.map(({ question, answer }) => ({
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

export default KnowledgeStructuredData;
