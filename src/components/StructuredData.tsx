import type { SiteLocale } from '@/content/gameContent';
import {
  BASE_URL,
  DEVELOPER_ORGANIZATION,
  FACT_CHECK_DATE,
  GAME_ID,
  GAME_NODE,
  PUBLISHER_ORGANIZATION,
  SITE_PUBLISHED_DATE,
  WEBSITE_ID,
  WEBSITE_NODE,
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
      // Site-wide entities, shared verbatim with KnowledgeStructuredData so the
      // same `@id` never asserts two different values.
      DEVELOPER_ORGANIZATION,
      PUBLISHER_ORGANIZATION,
      WEBSITE_NODE,
      GAME_NODE,
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: locale === 'tr'
          ? 'Harbor | Açık Dünya Multiplayer Survival Oyunu'
          : 'Harbor | Open-World Multiplayer Survival Game',
        description,
        inLanguage: locale,
        datePublished: SITE_PUBLISHED_DATE,
        dateModified: FACT_CHECK_DATE,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': GAME_ID },
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
