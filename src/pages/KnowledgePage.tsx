import { ArrowRight, CalendarDays, Download, ExternalLink, Menu } from 'lucide-react';
import KnowledgeStructuredData from '@/components/KnowledgeStructuredData';
import PictureImage from '@/components/PictureImage';
import type { KnowledgePageData } from '@/content/knowledgePages';
import { knowledgePages, STEAM_URL } from '@/content/knowledgePages';

interface KnowledgePageProps {
  page: KnowledgePageData;
}

const labels = {
  en: {
    home: 'Home',
    menu: 'Guide menu',
    answer: 'Direct answer',
    contents: 'On this page',
    faq: 'Questions answered',
    sources: 'Sources',
    download: 'Download original',
    factsSource: 'Verified against official first-party sources. Changing release details are dated and unknowns are left unknown.',
    steam: 'Wishlist on Steam',
    language: 'Türkçe',
    copyright: 'Official Harbor game guide by CastilvaGames.',
  },
  tr: {
    home: 'Ana sayfa',
    menu: 'Rehber menüsü',
    answer: 'Doğrudan cevap',
    contents: 'Bu sayfada',
    faq: 'Yanıtlanan sorular',
    sources: 'Kaynaklar',
    download: 'Orijinali indir',
    factsSource: 'Resmi birinci taraf kaynaklarla doğrulandı. Değişebilen bilgiler tarihlendirildi; bilinmeyenler tahmin edilmedi.',
    steam: 'Steam istek listesi',
    language: 'English',
    copyright: 'CastilvaGames resmi Harbor oyun rehberi.',
  },
} as const;

const KnowledgePage = ({ page }: KnowledgePageProps) => {
  const copy = labels[page.locale];
  const localePages = knowledgePages.filter(({ locale }) => locale === page.locale);
  const homeHref = page.locale === 'tr' ? '/tr/' : '/';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-amber-100 overflow-x-hidden">
      <KnowledgeStructuredData page={page} />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-900/25 bg-[#120e0a]/95 backdrop-blur-xl">
        <div className="container-custom flex h-20 items-center justify-between gap-4">
          <a href={homeHref} className="flex min-w-0 items-center gap-3" aria-label={copy.home}>
            <PictureImage
              src="/logo.png"
              alt="CastilvaGames"
              loading="eager"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="hidden font-orbitron text-sm font-bold tracking-wider text-amber-100 sm:inline md:text-base">
              HARBOR <span className="text-orange-500">GUIDE</span>
            </span>
          </a>

          <nav className="hidden items-center gap-5 xl:flex" aria-label={copy.menu}>
            {localePages.map((item) => (
              <a
                key={item.route}
                href={item.route}
                aria-current={item.route === page.route ? 'page' : undefined}
                className={`font-rajdhani text-sm font-semibold tracking-wider transition-colors ${
                  item.route === page.route ? 'text-orange-400' : 'text-amber-100/65 hover:text-amber-100'
                }`}
              >
                {item.key === 'gameplay'
                  ? (page.locale === 'tr' ? 'OYNANIŞ' : 'GAMEPLAY')
                  : item.key === 'release'
                    ? (page.locale === 'tr' ? 'ÇIKIŞ' : 'RELEASE')
                    : item.key === 'comparison'
                      ? (page.locale === 'tr' ? 'KARŞILAŞTIR' : 'COMPARE')
                      : (page.locale === 'tr' ? 'BASIN' : 'PRESS')}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={page.alternateRoute}
              hrefLang={page.locale === 'tr' ? 'en' : 'tr'}
              lang={page.locale === 'tr' ? 'en' : 'tr'}
              className="text-sm font-semibold text-amber-100/65 transition-colors hover:text-orange-400"
            >
              {copy.language}
            </a>
            <a
              href={STEAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded bg-gradient-to-r from-orange-700 to-amber-700 px-4 py-2.5 font-orbitron text-xs font-bold text-white transition-colors hover:from-orange-600 hover:to-amber-600 sm:inline-flex"
            >
              {copy.steam}
            </a>
            <details className="relative xl:hidden">
              <summary className="flex cursor-pointer list-none items-center rounded border border-amber-800/40 p-2 text-amber-100/80" aria-label={copy.menu}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </summary>
              <nav className="absolute right-0 top-12 w-56 rounded-xl border border-amber-900/30 bg-[#1a1410] p-3 shadow-2xl" aria-label={copy.menu}>
                <a href={homeHref} className="block rounded px-3 py-2 text-sm text-amber-100/70 hover:bg-orange-500/10 hover:text-orange-300">{copy.home}</a>
                {localePages.map((item) => (
                  <a key={item.route} href={item.route} className="block rounded px-3 py-2 text-sm text-amber-100/70 hover:bg-orange-500/10 hover:text-orange-300">
                    {item.metaTitle}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="absolute inset-0">
            <PictureImage
              src={page.heroImage}
              alt=""
              loading="eager"
              width={1920}
              height={1080}
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/55 via-[#0a0a0f]/85 to-[#0a0a0f]" />
            <div className="absolute inset-0 grid-pattern opacity-25" />
          </div>

          <div className="container-custom relative z-10">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm text-amber-100/55">
              <ol className="flex flex-wrap items-center gap-2">
                <li><a href={homeHref} className="hover:text-orange-400">{copy.home}</a></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-amber-100/75">{page.title}</li>
              </ol>
            </nav>

            <div className="max-w-5xl">
              <p className="mb-5 font-rajdhani text-sm font-semibold tracking-[0.24em] text-orange-400">{page.eyebrow}</p>
              <h1 className="max-w-5xl font-orbitron text-4xl font-black leading-tight text-amber-100 sm:text-5xl lg:text-7xl">
                {page.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-2">
                {page.badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-amber-100/55">
                <CalendarDays className="h-4 w-4 text-orange-400" aria-hidden="true" />
                <time dateTime={page.modifiedDate}>{page.updatedLabel}</time>
              </div>

              <div className="mt-10 rounded-2xl border border-orange-500/30 bg-[#1a1410]/90 p-6 shadow-2xl shadow-black/30 md:p-8">
                <p className="mb-3 font-rajdhani text-sm font-bold uppercase tracking-[0.2em] text-orange-400">{copy.answer}</p>
                <p className="text-lg leading-8 text-amber-50/90 md:text-xl">{page.directAnswer}</p>
                <p className="mt-5 border-t border-amber-900/25 pt-4 text-sm leading-relaxed text-amber-100/55">{copy.factsSource}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-xl border border-amber-900/25 bg-[#120e0a] p-5" aria-label={copy.contents}>
              <p className="mb-4 font-orbitron text-xs font-bold uppercase tracking-wider text-orange-400">{copy.contents}</p>
              <ol className="space-y-3 text-sm">
                <li><a href="#facts" className="text-amber-100/60 hover:text-orange-300">{page.factsTitle}</a></li>
                {page.sections.map((section) => (
                  <li key={section.id}><a href={`#${section.id}`} className="text-amber-100/60 hover:text-orange-300">{section.title}</a></li>
                ))}
                {page.assets && <li><a href="#assets" className="text-amber-100/60 hover:text-orange-300">{page.assetsTitle}</a></li>}
                <li><a href="#faq" className="text-amber-100/60 hover:text-orange-300">{copy.faq}</a></li>
                <li><a href="#sources" className="text-amber-100/60 hover:text-orange-300">{copy.sources}</a></li>
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 space-y-16">
            <section id="facts" aria-labelledby="facts-title" className="scroll-mt-28">
              <h2 id="facts-title" className="mb-7 font-orbitron text-3xl font-bold text-amber-100 md:text-4xl">{page.factsTitle}</h2>
              <dl className="overflow-hidden rounded-2xl border border-amber-900/25 bg-[#120e0a]">
                {page.facts.map(({ label, value }, index) => (
                  <div key={label} className={`grid gap-2 p-5 md:grid-cols-[190px_1fr] md:gap-8 ${index > 0 ? 'border-t border-amber-900/20' : ''}`}>
                    <dt className="font-rajdhani font-bold uppercase tracking-wider text-orange-400">{label}</dt>
                    <dd className="leading-relaxed text-amber-100/75">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {page.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
                <h2 id={`${section.id}-title`} className="font-orbitron text-3xl font-bold leading-tight text-amber-100 md:text-4xl">{section.title}</h2>
                <p className="mt-5 border-l-4 border-orange-500 pl-5 text-lg font-medium leading-8 text-amber-50/90">{section.answer}</p>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-lg leading-8 text-amber-100/68">{paragraph}</p>
                ))}

                {section.cards && (
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {section.cards.map((card) => (
                      <div key={card.title} className="rounded-xl border border-amber-900/25 bg-[#16100c] p-5">
                        <h3 className="font-orbitron text-base font-bold text-orange-300">{card.title}</h3>
                        <p className="mt-3 leading-7 text-amber-100/65">{card.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-7 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-7 text-amber-100/70">
                        <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-orange-500" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="mt-8 overflow-x-auto rounded-xl border border-amber-900/25">
                    <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                      <caption className="bg-[#1a1410] px-5 py-4 text-left font-rajdhani font-semibold text-amber-100/75">{section.table.caption}</caption>
                      <thead className="bg-orange-950/35">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th key={header} scope="col" className="border-t border-amber-900/25 px-5 py-4 font-orbitron text-xs uppercase tracking-wide text-orange-300">{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row) => (
                          <tr key={row.join('|')} className="border-t border-amber-900/20 bg-[#120e0a] align-top">
                            {row.map((cell, index) => index === 0 ? (
                              <th key={cell} scope="row" className="px-5 py-4 font-semibold leading-6 text-amber-100">{cell}</th>
                            ) : (
                              <td key={`${cell}-${index}`} className="px-5 py-4 leading-6 text-amber-100/65">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.image && (
                  <figure className="mt-8 overflow-hidden rounded-2xl border border-amber-900/25 bg-[#120e0a]">
                    <PictureImage src={section.image.src} alt={section.image.alt} width={1920} height={1080} className="aspect-video w-full object-cover" />
                    <figcaption className="px-5 py-4 text-sm leading-6 text-amber-100/55">{section.image.caption}</figcaption>
                  </figure>
                )}

                {section.note && (
                  <p className="mt-7 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm leading-7 text-amber-100/65">{section.note}</p>
                )}
              </section>
            ))}

            {page.assets && (
              <section id="assets" aria-labelledby="assets-title" className="scroll-mt-28">
                <h2 id="assets-title" className="font-orbitron text-3xl font-bold text-amber-100 md:text-4xl">{page.assetsTitle}</h2>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {page.assets.map((asset) => (
                    <article key={asset.name} className="overflow-hidden rounded-xl border border-amber-900/25 bg-[#120e0a]">
                      <div className="flex aspect-video items-center justify-center overflow-hidden bg-black/30 p-3">
                        <PictureImage src={asset.preview} alt={asset.alt} width={960} height={540} className="max-h-full w-full object-contain" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-orbitron text-base font-bold text-amber-100">{asset.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-amber-100/55">{asset.description}</p>
                        <a href={asset.href} download className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300">
                          <Download className="h-4 w-4" aria-hidden="true" /> {copy.download}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28">
              <h2 id="faq-title" className="font-orbitron text-3xl font-bold text-amber-100 md:text-4xl">{copy.faq}</h2>
              <div className="mt-7 space-y-3">
                {page.faqs.map(({ question, answer }, index) => (
                  <details key={question} open={index === 0} className="group rounded-xl border border-amber-900/25 bg-[#120e0a] open:border-orange-500/30">
                    <summary className="cursor-pointer list-none px-5 py-5 font-orbitron text-base font-semibold text-amber-100">{question}</summary>
                    <p className="border-t border-amber-900/20 px-5 py-5 leading-7 text-amber-100/68">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="sources" aria-labelledby="sources-title" className="scroll-mt-28">
              <h2 id="sources-title" className="font-orbitron text-3xl font-bold text-amber-100 md:text-4xl">{page.sourcesTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-amber-100/65">{page.sourcesIntro}</p>
              <ol className="mt-7 space-y-4">
                {page.sources.map((source) => (
                  <li key={source.url} className="rounded-xl border border-amber-900/25 bg-[#120e0a] p-5">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-orange-400 hover:text-orange-300">
                      {source.label} <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <p className="mt-2 text-sm leading-6 text-amber-100/55">{source.note}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="related-title">
              <h2 id="related-title" className="font-orbitron text-3xl font-bold text-amber-100 md:text-4xl">{page.relatedTitle}</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {page.related.map((item) => (
                  <a key={item.href} href={item.href} className="group rounded-xl border border-amber-900/25 bg-[#120e0a] p-5 transition-colors hover:border-orange-500/40">
                    <h3 className="flex items-center justify-between gap-3 font-orbitron text-sm font-bold text-amber-100 group-hover:text-orange-300">
                      {item.label} <ArrowRight className="h-4 w-4 flex-none" aria-hidden="true" />
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-amber-100/55">{item.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </article>
        </div>

        <section className="relative overflow-hidden border-y border-amber-900/25 bg-[#1a1410] py-20 text-center">
          <div className="absolute inset-0 gradient-mesh opacity-70" />
          <div className="container-custom relative z-10">
            <h2 className="font-orbitron text-3xl font-black text-amber-100 md:text-5xl">{page.ctaTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-amber-100/65">{page.ctaText}</p>
            <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 inline-flex items-center gap-2">
              {page.ctaLabel} <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c0907]">
        <div className="container-custom flex flex-col items-center justify-between gap-5 py-10 text-center text-sm text-amber-100/55 md:flex-row md:text-left">
          <div>
            <p>© 2026 CastilvaGames. {copy.copyright}</p>
            <p className="mt-2"><a href="mailto:info@castilva.com" className="hover:text-orange-400">info@castilva.com</a></p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <a href={homeHref} className="hover:text-orange-400">{copy.home}</a>
            <a href="/privacy-policy.html" className="hover:text-orange-400">Privacy</a>
            <a href="/llms.txt" className="hover:text-orange-400">llms.txt</a>
            <a href="/harbor-facts.json" className="hover:text-orange-400">Facts JSON</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KnowledgePage;
