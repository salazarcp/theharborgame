import { ArrowRight, BookOpen, CalendarClock, FileText, Scale } from 'lucide-react';
import type { SiteLocale } from '@/content/gameContent';

interface KnowledgeHubProps {
  locale?: SiteLocale;
}

const hubContent = {
  en: {
    eyebrow: 'OFFICIAL HARBOR KNOWLEDGE HUB',
    title: 'FACTS, NOT GUESSWORK',
    intro: 'Direct, source-backed answers for players, search engines, AI assistants, journalists, and creators. Release-sensitive facts are dated and unknown details stay clearly marked.',
    cards: [
      { href: '/gameplay/', title: 'Gameplay guide', description: 'PvP, co-op, scarcity, crafting, building, safe-zone trading, vehicles, and the survival loop.', icon: BookOpen },
      { href: '/release/', title: 'Release & requirements', description: '2026 status, confirmed platform, price status, languages, and official PC requirements.', icon: CalendarClock },
      { href: '/games-like-rust-dayz-scum/', title: 'Rust, DayZ & SCUM comparison', description: 'Where Harbor overlaps, where it differs, and what cannot be judged before release.', icon: Scale },
      { href: '/press/', title: 'Official press kit', description: 'Canonical facts, descriptions, sources, logo, screenshots, and media contact.', icon: FileText },
    ],
    label: 'Read the guide',
  },
  tr: {
    eyebrow: 'RESMİ HARBOR BİLGİ MERKEZİ',
    title: 'TAHMİN DEĞİL, DOĞRULANMIŞ BİLGİ',
    intro: 'Oyuncular, arama motorları, yapay zekâlar, basın ve içerik üreticileri için doğrudan ve kaynaklı yanıtlar. Değişebilen bilgiler tarihlendirilir; bilinmeyenler açıkça belirtilir.',
    cards: [
      { href: '/tr/oynanis/', title: 'Oynanış rehberi', description: 'PvP, co-op, kıtlık, crafting, üs kurma, güvenli bölge ticareti, araçlar ve survival döngüsü.', icon: BookOpen },
      { href: '/tr/cikis/', title: 'Çıkış ve gereksinimler', description: '2026 durumu, doğrulanmış platform, fiyat durumu, diller ve resmi PC gereksinimleri.', icon: CalendarClock },
      { href: '/tr/rust-dayz-scum-benzeri/', title: 'Rust, DayZ ve SCUM karşılaştırması', description: 'Harbor’ın ortak noktaları, farkları ve çıkıştan önce değerlendirilemeyecek başlıklar.', icon: Scale },
      { href: '/tr/basin/', title: 'Resmi basın kiti', description: 'Ana bilgiler, tanıtım metinleri, kaynaklar, logo, ekran görüntüleri ve basın iletişimi.', icon: FileText },
    ],
    label: 'Rehberi aç',
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  title: string;
  intro: string;
  cards: Array<{ href: string; title: string; description: string; icon: typeof BookOpen }>;
  label: string;
}>;

const KnowledgeHub = ({ locale = 'en' }: KnowledgeHubProps) => {
  const content = hubContent[locale];

  return (
    <section className="relative section-padding overflow-hidden bg-[#120e0a]" aria-labelledby={`${locale}-knowledge-title`}>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      <div className="container-custom relative z-10">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-4 font-rajdhani text-sm font-semibold tracking-[0.26em] text-orange-400">{content.eyebrow}</p>
          <h2 id={`${locale}-knowledge-title`} className="font-orbitron text-4xl font-black leading-tight text-amber-100 md:text-5xl lg:text-6xl">{content.title}</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-amber-100/65">{content.intro}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {content.cards.map(({ href, title, description, icon: Icon }) => (
            <a key={href} href={href} className="group rounded-2xl border border-amber-900/25 bg-[#1a1410]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/45">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-orange-500/25 bg-orange-500/10">
                  <Icon className="h-5 w-5 text-orange-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-orbitron text-lg font-bold text-amber-100 group-hover:text-orange-300">{title}</h3>
                  <p className="mt-3 leading-7 text-amber-100/60">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-400">
                    {content.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
