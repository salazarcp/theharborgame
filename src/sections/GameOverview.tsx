import { Crosshair, Hammer, Route, Users } from 'lucide-react';
import type { SiteLocale } from '@/content/gameContent';

interface GameOverviewProps {
  locale?: SiteLocale;
}

const overviewContent = {
  en: {
    eyebrow: 'SURVIVE THE WASTELAND',
    titleBefore: 'OPEN-WORLD MULTIPLAYER',
    titleAccent: 'SURVIVAL',
    paragraphs: [
      'Harbor is an upcoming first-person, open-world multiplayer survival game for PC. Enter a post-apocalyptic wasteland where clean blood, fuel, and every resource you carry can decide whether you make it back alive.',
      'Scavenge and craft essential gear, build and upgrade shelters, drive across the desert, trade inside the Harbor safe zone, or form alliances for online co-op. Beyond the gates, online PvP means every survivor may become your next threat.',
    ],
    cards: [
      {
        title: 'SURVIVE & SCAVENGE',
        description: 'Manage hunger and thirst while fighting for clean blood, fuel, weapons, and limited resources.',
        icon: Crosshair,
      },
      {
        title: 'BUILD & CRAFT',
        description: 'Gather materials, craft tools and equipment, then build and upgrade shelters worth defending.',
        icon: Hammer,
      },
      {
        title: 'ONLINE PVP & CO-OP',
        description: 'Play with friends, form alliances, trade with survivors, or fight rivals in high-stakes online PvP.',
        icon: Users,
      },
      {
        title: 'DRIVE THE WASTELAND',
        description: 'Use vehicles to cross the open world and pursue mobile sources of precious fuel and resources.',
        icon: Route,
      },
    ],
  },
  tr: {
    eyebrow: 'ÇORAK DÜNYADA HAYATTA KAL',
    titleBefore: 'AÇIK DÜNYA MULTIPLAYER',
    titleAccent: 'SURVIVAL',
    paragraphs: [
      'Harbor, PC için geliştirilen birinci şahıs bakış açılı açık dünya multiplayer survival oyunudur. Temiz kanın, yakıtın ve taşıdığınız her kaynağın hayatta kalıp kalmayacağınızı belirlediği post-apocalyptic bir çorak dünyaya adım atın.',
      'Kaynak toplayın, temel ekipmanları üretin, sığınaklar kurup geliştirin, çölde araç kullanın ve Harbor güvenli bölgesinde ticaret yapın. Arkadaşlarınızla online co-op ittifakları kurabilir veya kapıların dışında yüksek riskli online PvP savaşlarına girebilirsiniz.',
    ],
    cards: [
      {
        title: 'HAYATTA KAL & KAYNAK TOPLA',
        description: 'Açlık ve susuzlukla mücadele ederken temiz kan, yakıt, silah ve sınırlı kaynaklar için savaşın.',
        icon: Crosshair,
      },
      {
        title: 'ÜRET & ÜS KUR',
        description: 'Malzeme toplayın, araç gereç ve ekipman üretin; savunmaya değer sığınaklar kurup geliştirin.',
        icon: Hammer,
      },
      {
        title: 'ONLINE PVP & CO-OP',
        description: 'Arkadaşlarınızla oynayın, ittifak kurun, ticaret yapın veya yüksek riskli online PvP’de rakiplerle savaşın.',
        icon: Users,
      },
      {
        title: 'ÇORAK DÜNYADA SÜR',
        description: 'Açık dünyayı araçlarla aşın; yakıt ve değerli kaynak taşıyan hareketli hedeflerin peşine düşün.',
        icon: Route,
      },
    ],
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  paragraphs: string[];
  cards: Array<{
    title: string;
    description: string;
    icon: typeof Crosshair;
  }>;
}>;

const GameOverview = ({ locale = 'en' }: GameOverviewProps) => {
  const content = overviewContent[locale];

  return (
    <section
      id={locale === 'tr' ? 'oyun' : 'overview'}
      className="animate-section relative section-padding bg-[#1a1410]"
      aria-labelledby={`${locale}-overview-title`}
    >
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 gradient-mesh opacity-70" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <p className="font-rajdhani font-semibold tracking-[0.28em] text-sm text-orange-400 mb-4">
            {content.eyebrow}
          </p>
          <h2
            id={`${locale}-overview-title`}
            className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-7 leading-tight"
          >
            {content.titleBefore} <span className="text-gradient">{content.titleAccent}</span>
          </h2>
          <div className="space-y-5 text-amber-100/70 text-lg leading-relaxed">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {content.cards.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="bg-[#241a14]/90 rounded-xl border border-amber-900/25 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40"
            >
              <div className="w-11 h-11 rounded-lg bg-orange-500/10 border border-orange-500/25 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-orange-400" aria-hidden="true" />
              </div>
              <h3 className="font-orbitron font-semibold text-lg text-amber-100 mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-amber-100/60 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameOverview;
