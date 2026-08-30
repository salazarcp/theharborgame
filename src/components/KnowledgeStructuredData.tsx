import type { KnowledgePageData } from '@/content/knowledgePages';
import {
  BASE_URL,
  DEVELOPER,
  DEVELOPER_ORGANIZATION,
  GAME_ID,
  GAME_NODE,
  PUBLISHER_ORGANIZATION,
  WEBSITE_ID,
  WEBSITE_NODE,
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
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': GAME_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${BASE_URL}${page.heroImage}`,
      caption: page.heroAlt,
    },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    publisher: { '@id': DEVELOPER.id },
    // Both selectors are stable ids rendered by KnowledgePage.tsx.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#direct-answer', '#faq'],
    },
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
    about: { '@id': GAME_ID },
    // CreativeWork rather than a bare URL string, so each source carries its
    // own identity instead of coercing to anonymous Text.
    citation: page.sources.map(({ label, url }) => ({
      '@type': 'CreativeWork',
      name: label,
      url,
    })),
  } : null;

  // Note: no `inLanguage` and no `contentUrl` here — verify-seo-pages.mjs
  // forbids both (the trailer's spoken language is unverified, and a YouTube
  // watch page is not a valid contentUrl).
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
    creator: { '@id': DEVELOPER.id },
    about: { '@id': GAME_ID },
    subjectOf: { '@id': GAME_ID },
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    sameAs: [page.video.watchUrl],
  } : null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Site-wide entities, shared verbatim with StructuredData so the same
      // `@id` never asserts two different values.
      DEVELOPER_ORGANIZATION,
      PUBLISHER_ORGANIZATION,
      WEBSITE_NODE,
      GAME_NODE,
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
