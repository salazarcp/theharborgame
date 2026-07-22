import type { FaqItem, SiteLocale } from './gameContent';

export const BASE_URL = 'https://theharborgame.com';
export const STEAM_URL = 'https://store.steampowered.com/app/2714930/Harbor';
export const TRAILER_URL = 'https://www.youtube.com/watch?v=3E5J4DY8OhI';

export interface KnowledgeSource {
  label: string;
  url: string;
  note: string;
}

export interface KnowledgeTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface KnowledgeCard {
  title: string;
  text: string;
}

export interface KnowledgeSection {
  id: string;
  title: string;
  answer: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: KnowledgeCard[];
  table?: KnowledgeTable;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  note?: string;
}

export interface KnowledgeAsset {
  name: string;
  description: string;
  href: string;
  preview: string;
  alt: string;
}

export interface RelatedPage {
  href: string;
  label: string;
  description: string;
}

export interface KnowledgePageData {
  key: 'gameplay' | 'release' | 'comparison' | 'press';
  locale: SiteLocale;
  route: string;
  alternateRoute: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  directAnswer: string;
  updatedLabel: string;
  publishedDate: string;
  modifiedDate: string;
  heroImage: string;
  heroAlt: string;
  badges: string[];
  factsTitle: string;
  facts: Array<{ label: string; value: string }>;
  sections: KnowledgeSection[];
  faqs: FaqItem[];
  sourcesTitle: string;
  sourcesIntro: string;
  sources: KnowledgeSource[];
  assets?: KnowledgeAsset[];
  assetsTitle?: string;
  relatedTitle: string;
  related: RelatedPage[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  schemaType: 'Article' | 'AboutPage';
}

const officialHarborSource: KnowledgeSource = {
  label: 'Harbor on Steam',
  url: STEAM_URL,
  note: 'Official store listing maintained by CastilvaGames; source for release status, modes, features, languages, and PC requirements.',
};

const officialWebsiteSource: KnowledgeSource = {
  label: 'Official Harbor website',
  url: `${BASE_URL}/`,
  note: 'First-party game world, screenshots, trailer, and feature descriptions.',
};

const officialTrailerSource: KnowledgeSource = {
  label: 'Harbor official trailer',
  url: TRAILER_URL,
  note: 'Official video published by CastilvaGames.',
};

const englishRelated: Record<KnowledgePageData['key'], RelatedPage> = {
  gameplay: {
    href: '/gameplay/',
    label: 'Gameplay guide',
    description: 'The verified survival loop, PvP, co-op, building, vehicles, trading, and the Harbor safe zone.',
  },
  release: {
    href: '/release/',
    label: 'Release & PC requirements',
    description: 'Current release window, confirmed platform, price status, languages, and system requirements.',
  },
  comparison: {
    href: '/games-like-rust-dayz-scum/',
    label: 'Rust, DayZ & SCUM comparison',
    description: 'An evidence-based explanation of the overlap, differences, and limits of comparing an unreleased game.',
  },
  press: {
    href: '/press/',
    label: 'Press kit',
    description: 'Official facts, descriptions, links, logo, screenshots, and media contact information.',
  },
};

const turkishRelated: Record<KnowledgePageData['key'], RelatedPage> = {
  gameplay: {
    href: '/tr/oynanis/',
    label: 'Oynanış rehberi',
    description: 'Survival döngüsü, PvP, co-op, üs kurma, araçlar, ticaret ve Harbor güvenli bölgesi.',
  },
  release: {
    href: '/tr/cikis/',
    label: 'Çıkış ve PC gereksinimleri',
    description: 'Güncel çıkış aralığı, doğrulanmış platform, fiyat durumu, diller ve sistem gereksinimleri.',
  },
  comparison: {
    href: '/tr/rust-dayz-scum-benzeri/',
    label: 'Rust, DayZ ve SCUM karşılaştırması',
    description: 'Henüz çıkmamış Harbor ile türün bilinen oyunları arasındaki ortak noktalar ve dürüst sınırlar.',
  },
  press: {
    href: '/tr/basin/',
    label: 'Basın kiti',
    description: 'Resmi oyun bilgileri, kısa tanıtım metinleri, bağlantılar, logo ve ekran görüntüleri.',
  },
};

const relatedExcept = (
  pages: Record<KnowledgePageData['key'], RelatedPage>,
  current: KnowledgePageData['key'],
) => Object.entries(pages)
  .filter(([key]) => key !== current)
  .map(([, page]) => page);

const gameplayEn: KnowledgePageData = {
  key: 'gameplay',
  locale: 'en',
  route: '/gameplay/',
  alternateRoute: '/tr/oynanis/',
  metaTitle: 'Harbor Gameplay: PvP, Co-op, Building & Vehicles',
  metaDescription: 'Official Harbor gameplay guide: survival loop, scarce resources, crafting, base building, PvP, co-op, vehicles, trading, and the safe zone.',
  eyebrow: 'OFFICIAL GAMEPLAY GUIDE',
  title: 'Harbor Gameplay: Survival, PvP, Building, Trading & Vehicles',
  directAnswer: 'Harbor is a competitive, first-person, post-apocalyptic open-world survival game for Windows PC. Its verified loop is to scavenge scarce resources, manage hunger and thirst, craft equipment, build and upgrade shelters, pursue mobile resource targets, trade and take missions inside the only safe zone, then return to an online PvP and co-op world where death can cost everything you carry. Harbor is still in development for a 2026 PC release; Steam lists Early Access and an Epic Games Store release is planned.',
  updatedLabel: 'Fact-checked July 22, 2026',
  publishedDate: '2026-07-22',
  modifiedDate: '2026-07-22',
  heroImage: '/feature-harbor.jpg',
  heroAlt: 'The Harbor safe zone in the open-world multiplayer survival game Harbor',
  badges: ['First-person', 'Online PvP', 'Online co-op', 'Open-world survival craft'],
  factsTitle: 'Harbor gameplay at a glance',
  facts: [
    { label: 'Core objective', value: 'Survive and protect the limited resources you collect.' },
    { label: 'Critical resources', value: 'Clean Blood and Fuel.' },
    { label: 'Modes', value: 'Online PvP and online co-op; alliances are supported.' },
    { label: 'Crafting and building', value: 'Tools, weapons, clothing, shelters, workbenches, and three-stage structure upgrades.' },
    { label: 'World movement', value: 'Open-world exploration and driving; vehicles are required to catch moving resource targets.' },
    { label: 'Safe zone', value: 'Harbor: missions, resource trading, restocking, and temporary safety.' },
    { label: 'Death penalty', value: 'Death can mean losing everything carried.' },
    { label: 'Current status', value: 'Unreleased; planned for Windows PC in 2026 on Steam and Epic Games Store.' },
  ],
  sections: [
    {
      id: 'core-loop',
      title: 'What is the core gameplay loop in Harbor?',
      answer: 'The official loop is scavenge, survive, craft, build, move, trade, and defend—then risk those gains again in the open world.',
      cards: [
        { title: '1. Scavenge', text: 'Explore the wasteland for limited resources while managing hunger, thirst, Clean Blood, and Fuel.' },
        { title: '2. Craft', text: 'Transform gathered resources into tools, weapons, clothing, and other essential equipment.' },
        { title: '3. Build', text: 'Create shelters, use redesigned workbenches, and upgrade structures through three stronger stages.' },
        { title: '4. Move', text: 'Drive through the open world and pursue mobile sources of valuable resources, including the War Truck and Blackrail train.' },
        { title: '5. Trade', text: 'Enter Harbor to accept missions, exchange resources, restock, and gain temporary safety.' },
        { title: '6. Risk', text: 'Cooperate or fight outside the gates; online PvP and a high-stakes death penalty put collected gear at risk.' },
      ],
    },
    {
      id: 'resources',
      title: 'How do resource scarcity and survival work?',
      answer: 'Harbor makes limited resources the center of decision-making. The official Steam page identifies Clean Blood and Fuel as the two most critical resources, alongside hunger and thirst.',
      paragraphs: [
        'Scarcity connects exploration, combat, building, trading, and transport. Fuel is not only an inventory need: it determines whether players can use vehicles to reach valuable moving targets. Clean Blood is tied to surviving the hostile, irradiated world shown in official Harbor material.',
        'The published death rule is severe: dying can mean losing everything you worked for and carried. The final balance, rates, and recovery rules have not been published, so this page does not invent numbers or promise a specific wipe model.',
      ],
      image: {
        src: '/feature-greenwound.jpg',
        alt: 'Greenwound, an irradiated location in Harbor where Clean Blood matters',
        caption: 'Official Harbor material connects Clean Blood to survival in irradiated areas such as Greenwound.',
      },
    },
    {
      id: 'building-crafting',
      title: 'Does Harbor have base building and crafting?',
      answer: 'Yes. Players can craft essential equipment, build shelters, defend territory, use workbenches, and upgrade structures through a planned three-stage improvement system.',
      bullets: [
        'Craftable categories named on Steam include tools, weapons, clothing, and other essentials.',
        'Shelters can be built to secure the player and defend territory.',
        'The public development plan describes faster, redesigned workbenches and a more user-friendly building flow.',
        'Structures are planned to progress through three stronger upgrade levels.',
      ],
      note: 'Harbor is in development. The existence of these systems is official; exact costs, timers, durability, raid rules, and server settings are not yet public.',
    },
    {
      id: 'safe-zone-economy',
      title: 'What is the Harbor safe zone?',
      answer: 'Harbor is the game world’s only safe zone. It is where players can accept missions, trade resources, restock, and obtain temporary safety before returning to the wasteland.',
      paragraphs: [
        'This makes Harbor more than a visual landmark: it is the published hub for missions and player-facing economic activity. The game still presents cooperation as a choice rather than a guarantee, because alliances and trade exist alongside online PvP and the instruction to trust no one outside the safe zone.',
      ],
      image: {
        src: '/feature-harbor-bar.jpg',
        alt: 'The Harbor Bar where survivors gather and trade inside the safe zone',
        caption: 'The Harbor Bar is presented as a meeting and deal-making point inside the safe zone.',
      },
    },
    {
      id: 'vehicles-objectives',
      title: 'Are vehicles important in Harbor?',
      answer: 'Yes. Driving is a confirmed gameplay feature, and the official description says players need vehicles to catch the War Truck and a train carrying valuable resources.',
      paragraphs: [
        'Official Harbor material names the train Blackrail and presents it as both transport and a moving part of the world. Fuel scarcity gives vehicle use a strategic cost: reaching a resource target can also consume one of the resources players are trying to secure.',
      ],
      image: {
        src: '/feature-blackrail.jpg',
        alt: 'The Blackrail train in Harbor',
        caption: 'Blackrail is a named moving feature in Harbor’s wasteland.',
      },
    },
    {
      id: 'multiplayer',
      title: 'Is Harbor PvP, co-op, or both?',
      answer: 'Both. Steam lists online PvP and online co-op, while the official description says players can form alliances, build shelters, and trade with others.',
      paragraphs: [
        'The public material supports cooperative play and player conflict, but it does not publish final server sizes, private-server support, solo-server rules, cross-play, or matchmaking details. Those points remain unconfirmed until CastilvaGames announces them.',
      ],
    },
  ],
  faqs: [
    { question: 'Is Harbor a first-person survival game?', answer: 'Yes. Harbor is listed as first-person and FPS, with open-world survival crafting, exploration, building, driving, online PvP, and online co-op.' },
    { question: 'Can I play Harbor with friends?', answer: 'Yes. Online co-op is confirmed on Steam, and the official description says players can form alliances. Final party and server-size details have not been announced.' },
    { question: 'Does Harbor have full-loot PvP?', answer: 'The official description says death means losing everything you worked for. CastilvaGames has not yet published the exact inventory, recovery, server, or wipe rules, so “full-loot” should be treated as a high-level description rather than a complete ruleset.' },
    { question: 'Can players trade in Harbor?', answer: 'Yes. Trading is confirmed, and the Harbor safe zone is specifically described as a place to trade resources and take missions.' },
    { question: 'Does Harbor have vehicles?', answer: 'Yes. Driving is a Steam tag and official descriptions say vehicles are needed to catch the War Truck and train that provide valuable resources.' },
    { question: 'Is Harbor already playable?', answer: 'No public release is available as of July 22, 2026. Harbor is planned for Windows PC in 2026; the Steam page is live and the Epic Games Store page is coming later.' },
  ],
  sourcesTitle: 'Official sources and verification',
  sourcesIntro: 'Gameplay claims on this page are limited to public first-party material. Unknown values are identified instead of estimated.',
  sources: [officialHarborSource, officialWebsiteSource, officialTrailerSource],
  relatedTitle: 'Continue the official Harbor guide',
  related: relatedExcept(englishRelated, 'gameplay'),
  ctaTitle: 'Follow the game’s development',
  ctaText: 'Wishlist Harbor on Steam to receive the official release notification and follow development updates.',
  ctaLabel: 'Wishlist Harbor on Steam',
  schemaType: 'Article',
};

const releaseEn: KnowledgePageData = {
  key: 'release',
  locale: 'en',
  route: '/release/',
  alternateRoute: '/tr/cikis/',
  metaTitle: 'Harbor Release Date, Platforms & PC Requirements (2026)',
  metaDescription: 'Harbor is planned for Windows PC in 2026 on Steam and Epic Games Store. See the release window, price status, languages, and PC requirements.',
  eyebrow: 'CURRENT RELEASE INFORMATION',
  title: 'Harbor Release Date, Platforms, Price & PC Requirements',
  directAnswer: 'Harbor is planned for Windows PC in 2026, with no exact day or month announced. Steam lists Harbor for Early Access, and CastilvaGames also plans an Epic Games Store release; the Epic store page is not public yet. No launch price is displayed, and no PlayStation, Xbox, macOS, or Linux release is announced as of July 22, 2026. Steam wishlisting is currently the public way to receive a release notification.',
  updatedLabel: 'Fact-checked July 22, 2026',
  publishedDate: '2026-07-22',
  modifiedDate: '2026-07-22',
  heroImage: '/hero-bg.webp',
  heroAlt: 'Harbor post-apocalyptic open-world survival game key art',
  badges: ['Planned: 2026', 'Windows PC', 'Steam page live', 'Epic Games Store planned', 'Price: not announced'],
  factsTitle: 'Release status at a glance',
  facts: [
    { label: 'Planned release', value: '2026; no exact date announced.' },
    { label: 'Release model', value: 'Early Access on Steam; Epic Games Store release planned.' },
    { label: 'Availability', value: 'Not yet publicly playable; the Steam page is live.' },
    { label: 'Confirmed platform', value: 'Windows PC (64-bit); Steam and Epic Games Store are the planned storefronts.' },
    { label: 'Price', value: 'No launch price published.' },
    { label: 'Developer and publisher', value: 'CastilvaGames.' },
    { label: 'Steam App ID', value: '2714930.' },
    { label: 'Supported languages', value: '11 interface/subtitle languages; English full audio.' },
  ],
  sections: [
    {
      id: 'release-date',
      title: 'When is Harbor coming out?',
      answer: 'The current official window is 2026 for Windows PC. Steam lists Early Access; no exact release day or month has been announced.',
      paragraphs: [
        'Any page naming a specific month or day is going beyond the current official listing. Early Access also means the game will release as a work in progress and continue developing with community feedback.',
        'CastilvaGames says its current goal is to leave Early Access within roughly one year, but that duration depends on player feedback and is a development goal—not a guaranteed full-release date.',
      ],
    },
    {
      id: 'platforms',
      title: 'Which platforms are confirmed for Harbor?',
      answer: 'Windows PC is the confirmed platform. Steam and Epic Games Store are planned storefronts; the Steam page is public and the Epic page is not yet live.',
      table: {
        caption: 'Harbor platform and storefront status',
        headers: ['Platform', 'Status', 'Evidence'],
        rows: [
          ['Windows PC / Steam', 'Confirmed', 'Official Steam listing; Windows 10–11 64-bit requirements are published.'],
          ['Windows PC / Epic Games Store', 'Planned; page pending', 'CastilvaGames confirms the planned storefront; no public Epic product URL is available yet.'],
          ['PlayStation', 'Not announced', 'No official PlayStation listing or announcement located.'],
          ['Xbox', 'Not announced', 'No official Xbox listing or announcement located.'],
          ['macOS / Linux', 'Not announced', 'Steam currently lists Windows support only.'],
        ],
      },
      note: 'The Epic Games Store plan is first-party information from CastilvaGames. This page will add the official product URL when it becomes public; console and non-Windows versions remain unannounced.',
    },
    {
      id: 'price',
      title: 'Will Harbor be free or paid?',
      answer: 'No launch price is currently published, so a specific price—or a claim that Harbor will be free—cannot be verified.',
      paragraphs: [
        'The developer’s Steam Early Access FAQ says the full version is expected to have a higher price than the Early Access version. That indicates a priced Early Access plan, but the amount and regional pricing remain unannounced. Check the official Steam page before relying on third-party price claims.',
      ],
    },
    {
      id: 'requirements',
      title: 'What are Harbor’s PC system requirements?',
      answer: 'Harbor requires a 64-bit Windows 10 or 11 PC, DirectX 12, and 15 GB of available storage. Steam currently lists 12 GB RAM minimum and 16 GB recommended.',
      table: {
        caption: 'Official Harbor PC requirements on Steam, checked July 22, 2026',
        headers: ['Component', 'Minimum', 'Recommended'],
        rows: [
          ['Operating system', 'Windows 10–11, 64-bit', 'Windows 10–11, 64-bit'],
          ['Processor', 'Intel Core i3-4170 or AMD FX-8120', 'Intel Core i5-8400 or AMD Ryzen 7 1800X'],
          ['Memory', '12 GB RAM', '16 GB RAM'],
          ['Graphics', 'GeForce GTX 1080–2070 3 GB+ or AMD equivalent (as listed on Steam)', 'GeForce RTX 2070 or AMD Radeon RX 5700 XT'],
          ['DirectX', 'Version 12', 'Version 12'],
          ['Storage', '15 GB available', '15 GB available'],
        ],
      },
      note: 'Steam also lists Easy Anti-Cheat with boot protection requiring Secure Boot and TPM 2.0. Requirements can change during development; Steam is the controlling source.',
    },
    {
      id: 'languages',
      title: 'Which languages will Harbor support?',
      answer: 'Steam lists 11 supported interface and subtitle languages. English is the only language currently marked for full audio.',
      bullets: [
        'English (interface, full audio, subtitles)',
        'French, Italian, German, Spanish – Spain',
        'Simplified Chinese, Japanese, Korean',
        'Portuguese – Portugal, Russian, Turkish',
      ],
    },
  ],
  faqs: [
    { question: 'What is Harbor’s exact release date?', answer: 'No exact day or month has been announced. The official Steam page lists a planned 2026 Early Access release.' },
    { question: 'Is Harbor available now?', answer: 'No. Steam states that the game is not yet available and offers a wishlist notification for release.' },
    { question: 'Is Harbor coming to Epic Games Store?', answer: 'Yes. CastilvaGames plans an Epic Games Store release in 2026, but the public Epic product page is not live yet.' },
    { question: 'Is Harbor coming to consoles?', answer: 'No PlayStation or Xbox release is currently listed or announced. Windows PC is the confirmed platform, with Steam and Epic Games Store planned as storefronts.' },
    { question: 'How much will Harbor cost?', answer: 'The price has not been announced. Steam’s Early Access FAQ says the full release is expected to cost more than the Early Access version, but no amount is published.' },
    { question: 'Does Harbor require DirectX 12?', answer: 'Yes. The official Steam requirements say DirectX 12 is required and the game will not run on systems without DirectX 12 capability.' },
  ],
  sourcesTitle: 'Official sources and change policy',
  sourcesIntro: 'Release details are time-sensitive. This page combines the current Steam listing with CastilvaGames’ first-party plan and avoids filling unknowns with estimates.',
  sources: [officialHarborSource, officialWebsiteSource],
  relatedTitle: 'Learn more about Harbor',
  related: relatedExcept(englishRelated, 'release'),
  ctaTitle: 'Get the official release notification',
  ctaText: 'Add Harbor to your Steam wishlist for the current release status and notification when Early Access opens.',
  ctaLabel: 'Open Harbor on Steam',
  schemaType: 'Article',
};

const comparisonEn: KnowledgePageData = {
  key: 'comparison',
  locale: 'en',
  route: '/games-like-rust-dayz-scum/',
  alternateRoute: '/tr/rust-dayz-scum-benzeri/',
  metaTitle: 'Is Harbor Like Rust, DayZ or SCUM? Honest Comparison',
  metaDescription: 'Harbor overlaps with Rust, DayZ and SCUM in open-world multiplayer survival, PvP and co-op. See verified differences and what remains unknown.',
  eyebrow: 'EVIDENCE-BASED GENRE COMPARISON',
  title: 'Is Harbor Like Rust, DayZ or SCUM?',
  directAnswer: 'Harbor belongs in the same broad genre neighborhood as Rust, DayZ, and SCUM because all four are presented on Steam as multiplayer survival games with online PvP and co-op. Harbor is not a released or reviewed alternative yet, so it cannot responsibly be called “better.” Its verified identity centers on a post-apocalyptic wasteland, one named safe zone, Clean Blood and Fuel scarcity, mission and trading activity, shelter upgrades, and vehicles used to pursue moving resource targets.',
  updatedLabel: 'Compared from official Steam pages on July 22, 2026',
  publishedDate: '2026-07-22',
  modifiedDate: '2026-07-22',
  heroImage: '/feature-rulers.jpg',
  heroAlt: 'Clan territory in Harbor, an upcoming open-world multiplayer survival game',
  badges: ['Genre overlap, not affiliation', 'Official sources', 'No paid ranking', 'Harbor is unreleased'],
  factsTitle: 'The honest short version',
  facts: [
    { label: 'Shared territory', value: 'Open-world survival, multiplayer, online PvP, online co-op, scarcity, exploration.' },
    { label: 'Harbor emphasis', value: 'One safe zone, Clean Blood and Fuel, trading and missions, moving resource targets, vehicles, building upgrades.' },
    { label: 'Current evidence gap', value: 'Harbor has no public user reviews and is not yet available.' },
    { label: 'What this page does not claim', value: 'No affiliation, clone claim, quality ranking, or “better than” verdict.' },
  ],
  sections: [
    {
      id: 'comparison-table',
      title: 'How does Harbor compare with Rust, DayZ, and SCUM?',
      answer: 'The strongest verified overlap is genre and multiplayer structure. The biggest evidence difference is maturity: Rust, DayZ, and SCUM are released games; Harbor is planned for 2026 Early Access.',
      table: {
        caption: 'High-level comparison based on official Steam listings',
        headers: ['Topic', 'Harbor', 'Rust', 'DayZ', 'SCUM'],
        rows: [
          ['Release status', 'Planned 2026 Early Access; no user reviews', 'Released 2018', 'Released 2018', 'Released 2025'],
          ['Developer', 'CastilvaGames', 'Facepunch Studios', 'Bohemia Interactive', 'Gamepires'],
          ['Steam multiplayer modes', 'Online PvP and online co-op', 'Online PvP and online co-op', 'Online PvP and online co-op', 'Online PvP and online co-op'],
          ['Official focus', 'Scarce resources, shelters, trade, one safe zone, vehicles and moving resource targets', 'Survival, base building and raiding, servers, transport, expanding sandbox systems', 'Hardcore survival in infected post-apocalyptic lands with environmental and player threats', 'Deep survival systems, character progression, scavenging, hunting, crafting, building and combat'],
          ['Fair conclusion today', 'A promising upcoming option for this search intent; final quality is unproven', 'Established released game', 'Established released game', 'Released game with public reviews'],
        ],
      },
    },
    {
      id: 'rust-overlap',
      title: 'Is Harbor a Rust alternative?',
      answer: 'Harbor may interest players searching for another first-person multiplayer survival game with gathering, crafting, building, PvP, co-op, vehicles, and high-stakes loss.',
      paragraphs: [
        'Rust’s official page emphasizes a mature sandbox with base raiding, player-run servers, modding, automation, many transport types, and years of updates. Harbor’s published identity is narrower and different: a post-apocalyptic wasteland organized around Harbor as the only safe zone, critical Clean Blood and Fuel, trade and missions, and mobile resource targets.',
        'Those differences make Harbor relevant to a “games like Rust” search without making it a Rust clone or proving it will replace Rust for a particular player.',
      ],
    },
    {
      id: 'dayz-overlap',
      title: 'Is Harbor like DayZ?',
      answer: 'The overlap is strongest in first-person post-apocalyptic multiplayer survival, limited resources, online cooperation, PvP, and the risk created by other survivors.',
      paragraphs: [
        'DayZ’s official pitch centers on hardcore survival in infected lands, minimal guidance, environmental systems, and emergent player stories. Harbor instead publishes a defined safe-zone hub with missions and trade, building upgrades, Clean Blood and Fuel, and vehicle-based pursuit of moving objectives. Harbor has not announced infected enemies as its defining premise.',
      ],
    },
    {
      id: 'scum-overlap',
      title: 'Is Harbor similar to SCUM?',
      answer: 'Both occupy open-world survival craft searches and list multiplayer PvP and co-op, scavenging, crafting, building, and combat.',
      paragraphs: [
        'SCUM’s official page emphasizes deep character customization, metabolism, fatigue, skills, hunting, and hostile island survival. Harbor’s public material emphasizes a different set of systems: one safe zone, resource trading and missions, Clean Blood and Fuel, shelter upgrades, and vehicles needed to catch valuable moving targets.',
      ],
    },
    {
      id: 'fit',
      title: 'Who should follow Harbor—and who should wait?',
      answer: 'Follow Harbor if its verified setting and systems match what you want; wait for release evidence if reviews, exact balance, server rules, or proven performance are essential to your decision.',
      cards: [
        { title: 'Harbor may fit', text: 'You want an upcoming Windows survival game with desert-like post-apocalyptic atmosphere, first-person PvP/co-op, building, trading, vehicles, and a central safe zone.' },
        { title: 'Wait for evidence', text: 'You need an already released game, independent reviews, exact server and wipe rules, final performance data, a confirmed price, or console support.' },
        { title: 'Wishlist without overclaiming', text: 'A Steam wishlist follows development and sends the release notification; it is not proof that the finished game will suit every Rust, DayZ, or SCUM player.' },
      ],
    },
  ],
  faqs: [
    { question: 'Is Harbor better than Rust?', answer: 'There is no responsible basis for that claim. Rust is a released, extensively reviewed game; Harbor is unreleased and has no public user reviews. The games can be compared by published features, not final quality.' },
    { question: 'Is Harbor a Rust clone?', answer: 'No such claim is supported. Harbor shares broad survival-crafting and multiplayer features but presents its own named world, safe zone, resources, objectives, and development identity.' },
    { question: 'Does Harbor have zombies like DayZ or SCUM?', answer: 'Zombies are not identified as Harbor’s defining threat in the current official Steam description. Do not assume infected or zombie systems unless CastilvaGames announces them.' },
    { question: 'Does Harbor have base building and PvP?', answer: 'Yes. Shelter building, structure upgrades, territory defense, online PvP, and online co-op are all part of the public feature set.' },
    { question: 'Can I play Harbor now instead of Rust, DayZ, or SCUM?', answer: 'No public Harbor release is available yet. Steam lists a planned 2026 Early Access release.' },
  ],
  sourcesTitle: 'Sources and comparison method',
  sourcesIntro: 'This comparison uses current first-party Steam descriptions and feature listings. Review scores and temporary prices are intentionally excluded because Harbor has no equivalent release evidence.',
  sources: [
    officialHarborSource,
    { label: 'Rust on Steam', url: 'https://store.steampowered.com/app/252490/Rust/', note: 'Official Rust store page by Facepunch Studios.' },
    { label: 'DayZ on Steam', url: 'https://store.steampowered.com/app/221100/DayZ/', note: 'Official DayZ store page by Bohemia Interactive.' },
    { label: 'SCUM on Steam', url: 'https://store.steampowered.com/app/513710/SCUM/', note: 'Official SCUM store page by Gamepires.' },
  ],
  relatedTitle: 'Use the official Harbor facts',
  related: relatedExcept(englishRelated, 'comparison'),
  ctaTitle: 'Judge Harbor from official updates',
  ctaText: 'Wishlist Harbor on Steam and follow CastilvaGames for new release evidence as development continues.',
  ctaLabel: 'View Harbor on Steam',
  schemaType: 'Article',
};

const pressAssets: KnowledgeAsset[] = [
  { name: 'CastilvaGames / Harbor logo', description: 'Transparent PNG logo for editorial identification.', href: '/logo.png', preview: '/logo.png', alt: 'CastilvaGames logo' },
  { name: 'Harbor key art', description: 'Wide post-apocalyptic wasteland hero image.', href: '/hero-bg.webp', preview: '/hero-bg.webp', alt: 'Harbor key art showing the post-apocalyptic wasteland' },
  { name: 'Harbor safe zone', description: 'Official in-game screenshot of the central safe zone.', href: '/feature-harbor.jpg', preview: '/feature-harbor.webp', alt: 'Harbor safe zone screenshot' },
  { name: 'Blackrail', description: 'Official in-game screenshot of the named train.', href: '/feature-blackrail.jpg', preview: '/feature-blackrail.webp', alt: 'Blackrail train screenshot from Harbor' },
  { name: 'Rulers of the Harbor', description: 'Official clan-territory screenshot.', href: '/feature-rulers.jpg', preview: '/feature-rulers.webp', alt: 'Rulers of the Harbor clan territory screenshot' },
  { name: 'Harbor map', description: 'Official world difficulty map image.', href: '/new-map.jpg', preview: '/new-map.webp', alt: 'Harbor open-world difficulty map' },
];

const pressEn: KnowledgePageData = {
  key: 'press',
  locale: 'en',
  route: '/press/',
  alternateRoute: '/tr/basin/',
  metaTitle: 'Harbor Press Kit | Official Facts, Logos & Screenshots',
  metaDescription: 'Official Harbor press kit: verified game facts, short descriptions, Steam and trailer links, logo, screenshots, system details, and media contact.',
  eyebrow: 'OFFICIAL PRESS & CREATOR RESOURCES',
  title: 'Harbor Press Kit',
  directAnswer: 'Harbor is a competitive first-person, post-apocalyptic open-world survival game for Windows PC, developed and published by CastilvaGames. Planned for 2026 on Steam and Epic Games Store, it combines online PvP and co-op with scarce resources, crafting, shelter building, trading, missions, driving, and a world built around one safe zone called Harbor. This page is the canonical source for media facts and downloadable first-party assets.',
  updatedLabel: 'Press facts verified July 22, 2026',
  publishedDate: '2026-07-22',
  modifiedDate: '2026-07-22',
  heroImage: '/trailer-thumb.webp',
  heroAlt: 'Harbor official trailer artwork',
  badges: ['Developer: CastilvaGames', 'Steam App 2714930', 'Windows PC', 'Planned: 2026', 'Steam + Epic planned'],
  factsTitle: 'Official quick facts',
  facts: [
    { label: 'Title', value: 'Harbor' },
    { label: 'Developer / publisher', value: 'CastilvaGames' },
    { label: 'Genre', value: 'Action, adventure, indie, open-world survival craft, first-person shooter' },
    { label: 'Modes', value: 'Online PvP and online co-op' },
    { label: 'Platform', value: 'Windows PC via Steam and Epic Games Store' },
    { label: 'Release status', value: 'Planned for 2026; exact day or month not announced' },
    { label: 'Official website', value: 'theharborgame.com' },
    { label: 'Steam App ID', value: '2714930' },
    { label: 'Media contact', value: 'info@castilva.com' },
  ],
  sections: [
    {
      id: 'short-description',
      title: 'Short Harbor description',
      answer: 'Harbor is a first-person open-world multiplayer survival game where scarce resources, shelter building, trade, driving, alliances, and online PvP shape every trip beyond the world’s only safe zone.',
      note: 'Editorial teams may use or adapt this factual description. Please preserve the title “Harbor” and developer name “CastilvaGames.”',
    },
    {
      id: 'long-description',
      title: '100-word Harbor description',
      answer: 'Harbor is a competitive first-person open-world survival game from CastilvaGames. In a post-apocalyptic wasteland, players manage hunger and thirst, compete for limited resources, craft tools and equipment, build and upgrade shelters, drive, trade, take missions, and form alliances. Clean Blood and Fuel are critical, while the War Truck and Blackrail create moving resource targets across the world. Harbor itself is the only safe zone, offering temporary protection before players return to online PvP and co-op. Death can cost everything carried. Harbor is planned for Windows PC in 2026 on Steam and Epic Games Store.',
    },
    {
      id: 'story-angles',
      title: 'Verified editorial angles',
      answer: 'The following angles are supported by current public material without inventing release claims or review verdicts.',
      bullets: [
        'A competitive 2026 post-apocalyptic survival game built around scarcity and high-stakes loss.',
        'A multiplayer survival world with one named safe zone for missions, trade, and temporary safety.',
        'Clean Blood and Fuel as critical resources that connect survival and transport decisions.',
        'Vehicles used to pursue moving resource targets such as the War Truck and Blackrail.',
        'A redesigned building system with workbenches and three-stage structure upgrades.',
        'Community-led Early Access development with feedback gathered through Steam, Discord, and social channels.',
      ],
      note: 'Harbor has not released and has no public user reviews. Avoid “best,” score, sales, player-count, exact-price, or exact-date claims unless supported by a newer official announcement.',
    },
    {
      id: 'brand-usage',
      title: 'Brand and attribution guidance',
      answer: 'Use “Harbor” for the game and “CastilvaGames” for both developer and publisher. Harbor is an original game and is not affiliated with Rust, DayZ, SCUM, Mad Max, Fallout, or their owners.',
      bullets: [
        'Recommended image credit: “Courtesy of CastilvaGames.”',
        'Copyright line: “© 2026 CastilvaGames. All rights reserved.”',
        'Link the game title to the official Steam page or theharborgame.com.',
        'Do not present planned or in-development features as independently reviewed final behavior.',
      ],
    },
    {
      id: 'contact',
      title: 'Press and creator contact',
      answer: 'For interview requests, review access questions, asset needs, or factual corrections, contact CastilvaGames at info@castilva.com.',
      paragraphs: [
        'Include your publication or channel, audience, deadline, requested assets, and the link where coverage will appear. Community discussion and development feedback are also available through the official Discord and Steam community links.',
      ],
    },
  ],
  faqs: [
    { question: 'Who develops and publishes Harbor?', answer: 'CastilvaGames is both the developer and publisher listed on Steam.' },
    { question: 'What is Harbor’s release date?', answer: 'Steam lists a planned 2026 Early Access release. No exact day or month is currently announced.' },
    { question: 'Which Harbor platform is confirmed?', answer: 'Windows PC is confirmed, with Steam and Epic Games Store planned as storefronts. The Steam page is public; the Epic page is pending.' },
    { question: 'Are these assets official?', answer: 'Yes. The files linked on this page are hosted on the official Harbor website and originate from CastilvaGames material.' },
    { question: 'Where should factual corrections be sent?', answer: 'Send press and factual correction requests to info@castilva.com.' },
  ],
  sourcesTitle: 'Canonical official links',
  sourcesIntro: 'Use these first-party destinations when verifying changing release or feature information.',
  sources: [
    officialHarborSource,
    officialWebsiteSource,
    officialTrailerSource,
    { label: 'CastilvaGames on YouTube', url: 'https://www.youtube.com/@CastilvaGames', note: 'Official developer video channel.' },
    { label: 'Harbor Discord', url: 'https://discord.gg/DQaJMQGvNn', note: 'Official community invite linked by the Harbor website.' },
    { label: 'Machine-readable Harbor facts', url: `${BASE_URL}/harbor-facts.json`, note: 'Structured first-party fact sheet for tools and editorial workflows.' },
  ],
  assets: pressAssets,
  assetsTitle: 'Download official Harbor assets',
  relatedTitle: 'Background research for coverage',
  related: relatedExcept(englishRelated, 'press'),
  ctaTitle: 'See the current store listing',
  ctaText: 'Steam is the controlling source for Harbor’s current release status, public requirements, and supported languages.',
  ctaLabel: 'Open the official Steam page',
  schemaType: 'AboutPage',
};

const gameplayTr: KnowledgePageData = {
  ...gameplayEn,
  locale: 'tr',
  route: '/tr/oynanis/',
  alternateRoute: '/gameplay/',
  metaTitle: 'Harbor Oynanış: PvP, Co-op, Üs Kurma ve Araçlar',
  metaDescription: 'Resmi Harbor oynanış rehberi: survival döngüsü, kaynak kıtlığı, crafting, üs kurma, PvP, co-op, araçlar, ticaret ve güvenli bölge.',
  eyebrow: 'RESMİ OYNANIŞ REHBERİ',
  title: 'Harbor Oynanış Rehberi: Survival, PvP, Üs Kurma ve Araçlar',
  directAnswer: 'Harbor, Windows PC için geliştirilen rekabetçi, birinci şahıs bakış açılı post-apocalyptic açık dünya survival oyunudur. Doğrulanmış oyun döngüsü; kıt kaynakları toplamak, açlık ve susuzluğu yönetmek, ekipman üretmek, sığınak kurup geliştirmek, hareketli kaynak hedeflerini takip etmek, tek güvenli bölgede ticaret ve görev yapmak, ardından ölümün taşıdığınız her şeye mal olabileceği online PvP ve co-op dünyasına dönmektir. Oyun 2026 PC çıkışı için geliştirilmektedir; Steam Early Access sayfası açık, Epic Games Store çıkışı planlıdır.',
  updatedLabel: 'Bilgiler 22 Temmuz 2026’da doğrulandı',
  heroAlt: 'Harbor açık dünya multiplayer survival oyunundaki güvenli bölge',
  badges: ['Birinci şahıs', 'Online PvP', 'Online co-op', 'Açık dünya survival craft'],
  factsTitle: 'Kısa Harbor oynanış özeti',
  facts: [
    { label: 'Temel amaç', value: 'Hayatta kalmak ve topladığınız sınırlı kaynakları korumak.' },
    { label: 'Kritik kaynaklar', value: 'Clean Blood ve Fuel.' },
    { label: 'Modlar', value: 'Online PvP ve online co-op; ittifak kurulabilir.' },
    { label: 'Crafting ve building', value: 'Araç gereç, silah, kıyafet, sığınak, workbench ve üç aşamalı yapı geliştirme.' },
    { label: 'Dünya hareketi', value: 'Açık dünya keşfi ve sürüş; hareketli kaynak hedefleri için araç gerekir.' },
    { label: 'Güvenli bölge', value: 'Harbor: görevler, kaynak ticareti, ikmal ve geçici güvenlik.' },
    { label: 'Ölüm riski', value: 'Ölüm, taşınan her şeyin kaybedilmesi anlamına gelebilir.' },
    { label: 'Güncel durum', value: 'Henüz çıkmadı; Windows PC için 2026’da Steam ve Epic Games Store planlanıyor.' },
  ],
  sections: [
    {
      id: 'temel-dongu',
      title: 'Harbor’ın temel oynanış döngüsü nedir?',
      answer: 'Resmi döngü kaynak topla, hayatta kal, üret, üs kur, hareket et, ticaret yap ve savun; sonra açık dünyada kazandıklarını yeniden riske at şeklindedir.',
      cards: [
        { title: '1. Kaynak topla', text: 'Açlık, susuzluk, Clean Blood ve Fuel ihtiyacını yönetirken çorak dünyada sınırlı kaynak ara.' },
        { title: '2. Üret', text: 'Toplanan kaynakları araç gereç, silah, kıyafet ve temel ekipmanlara dönüştür.' },
        { title: '3. Üs kur', text: 'Sığınak inşa et, yenilenen workbench’leri kullan ve yapıları üç daha güçlü aşamada geliştir.' },
        { title: '4. Hareket et', text: 'Açık dünyada araç kullan; War Truck ve Blackrail gibi hareketli kaynak hedeflerinin peşine düş.' },
        { title: '5. Ticaret yap', text: 'Harbor’a girerek görev al, kaynak değiş tokuşu yap, ikmal tamamla ve geçici güvenlik kazan.' },
        { title: '6. Riske gir', text: 'Kapıların dışında iş birliği yap veya savaş; online PvP ve ağır ölüm cezası ekipmanını riske atar.' },
      ],
    },
    {
      id: 'kaynaklar',
      title: 'Kaynak kıtlığı ve survival nasıl çalışıyor?',
      answer: 'Harbor’da sınırlı kaynaklar kararların merkezindedir. Resmi Steam sayfası açlık ve susuzluğun yanında Clean Blood ile Fuel’ı en kritik iki kaynak olarak tanımlar.',
      paragraphs: [
        'Kıtlık; keşif, çatışma, üs kurma, ticaret ve ulaşımı birbirine bağlar. Yakıt sadece envanter ihtiyacı değildir: değerli hareketli hedeflere ulaşmak için kullanılacak araçları da belirler. Clean Blood ise resmi Harbor materyallerinde radyasyonlu dünyada hayatta kalmayla ilişkilendirilir.',
        'Yayınlanan ölüm kuralı serttir: ölmek, uğruna çalıştığınız ve taşıdığınız her şeyi kaybetmek anlamına gelebilir. Kesin oranlar, geri alma kuralları ve wipe modeli açıklanmadığı için bu sayfa sayı uydurmaz.',
      ],
      image: { src: '/feature-greenwound.jpg', alt: 'Harbor oyunundaki radyasyonlu Greenwound bölgesi', caption: 'Resmi Harbor materyalleri Clean Blood kaynağını Greenwound gibi radyasyonlu bölgelerde hayatta kalmayla ilişkilendirir.' },
    },
    {
      id: 'us-kurma',
      title: 'Harbor’da üs kurma ve crafting var mı?',
      answer: 'Evet. Oyuncular temel ekipman üretebilir, sığınak kurabilir, bölgesini savunabilir, workbench kullanabilir ve yapıları planlanan üç aşamalı sistemle geliştirebilir.',
      bullets: [
        'Steam’de adı geçen üretilebilir kategoriler: araç gereç, silah, kıyafet ve diğer temel eşyalar.',
        'Oyuncu güvenliği ve bölge savunması için sığınak kurulabilir.',
        'Geliştirme planı daha hızlı, yenilenen workbench’ler ve kullanıcı dostu bir building akışı tarif eder.',
        'Yapıların üç daha güçlü geliştirme seviyesine çıkarılması planlanır.',
      ],
      note: 'Bu sistemlerin varlığı resmidir; kesin maliyet, süre, dayanıklılık, raid ve sunucu ayarları henüz yayınlanmadı.',
    },
    {
      id: 'guvenli-bolge',
      title: 'Harbor güvenli bölgesi nedir?',
      answer: 'Harbor, oyun dünyasındaki tek güvenli bölgedir. Oyuncular burada görev alabilir, kaynak ticareti yapabilir, ikmal tamamlayabilir ve çorak dünyaya dönmeden önce geçici güvenlik kazanabilir.',
      paragraphs: ['Harbor yalnızca görsel bir merkez değildir; görevlerin ve oyuncu ekonomisinin resmi merkezidir. İttifak ve ticaret, online PvP ile aynı dünyada bulunduğu için iş birliği bir garanti değil, oyuncu kararıdır.'],
      image: { src: '/feature-harbor-bar.jpg', alt: 'Harbor güvenli bölgesindeki Harbor Bar', caption: 'Harbor Bar, güvenli bölge içinde oyuncuların buluşup anlaşma yaptığı bir nokta olarak tanıtılır.' },
    },
    {
      id: 'araclar',
      title: 'Harbor’da araçlar önemli mi?',
      answer: 'Evet. Sürüş doğrulanmış bir oynanış özelliğidir ve resmi açıklamaya göre değerli kaynak taşıyan War Truck ile treni yakalamak için araç gerekir.',
      paragraphs: ['Resmi Harbor materyalleri trene Blackrail adını verir. Yakıt kıtlığı, araç kullanımına stratejik maliyet ekler: bir kaynak hedefini yakalamak, güvence altına almaya çalıştığınız kritik yakıtı tüketebilir.'],
      image: { src: '/feature-blackrail.jpg', alt: 'Harbor oyunundaki Blackrail treni', caption: 'Blackrail, Harbor çorak dünyasının isimlendirilmiş hareketli özelliklerinden biridir.' },
    },
    {
      id: 'multiplayer',
      title: 'Harbor PvP mi, co-op mu?',
      answer: 'İkisi de. Steam online PvP ve online co-op özelliklerini listeler; resmi açıklama oyuncuların ittifak kurabileceğini, sığınak inşa edebileceğini ve ticaret yapabileceğini söyler.',
      paragraphs: ['Son sunucu kapasitesi, özel sunucu desteği, solo sunucu kuralları, cross-play ve matchmaking ayrıntıları henüz yayınlanmadı. CastilvaGames açıklayana kadar bu başlıklar doğrulanmamış kalır.'],
    },
  ],
  faqs: [
    { question: 'Harbor birinci şahıs survival oyunu mu?', answer: 'Evet. Harbor; birinci şahıs, FPS, açık dünya survival crafting, keşif, building, sürüş, online PvP ve online co-op özellikleriyle listelenir.' },
    { question: 'Harbor arkadaşlarla oynanabilir mi?', answer: 'Evet. Online co-op Steam’de doğrulanmıştır ve resmi açıklama ittifak kurulabileceğini söyler. Parti ve sunucu kapasitesi henüz açıklanmadı.' },
    { question: 'Harbor full-loot PvP mi?', answer: 'Resmi açıklama ölümün uğruna çalışılan her şeyi kaybettirebileceğini söyler. Kesin envanter, geri alma, sunucu ve wipe kuralları açıklanmadığı için “full-loot” ifadesi ayrıntılı bir kurallar bütünü değil, yüksek seviyeli bir tanımdır.' },
    { question: 'Harbor’da ticaret var mı?', answer: 'Evet. Ticaret doğrulanmıştır; Harbor güvenli bölgesi kaynak ticareti ve görev alma noktası olarak açıklanır.' },
    { question: 'Harbor’da araç var mı?', answer: 'Evet. Sürüş Steam etiketleri arasındadır ve resmi açıklama War Truck ile değerli kaynak taşıyan treni yakalamak için araç gerektiğini söyler.' },
    { question: 'Harbor şu an oynanabilir mi?', answer: '22 Temmuz 2026 itibarıyla herkese açık bir sürüm yoktur. Windows PC çıkışı 2026 için planlıdır; Steam sayfası açık, Epic Games Store sayfası daha sonra gelecektir.' },
  ],
  sourcesTitle: 'Resmi kaynaklar ve doğrulama',
  sourcesIntro: 'Bu sayfadaki oynanış iddiaları halka açık birinci taraf materyalle sınırlıdır; bilinmeyen değerler tahmin edilmez.',
  sources: [officialHarborSource, officialWebsiteSource, officialTrailerSource],
  relatedTitle: 'Resmi Harbor rehberine devam et',
  related: relatedExcept(turkishRelated, 'gameplay'),
  ctaTitle: 'Geliştirme sürecini takip et',
  ctaText: 'Resmi çıkış bildirimini ve geliştirme güncellemelerini almak için Harbor’ı Steam istek listene ekle.',
  ctaLabel: 'Steam istek listesine ekle',
};

const releaseTr: KnowledgePageData = {
  ...releaseEn,
  locale: 'tr',
  route: '/tr/cikis/',
  alternateRoute: '/release/',
  metaTitle: 'Harbor Çıkış Tarihi, Platformlar ve Sistem Gereksinimleri',
  metaDescription: 'Harbor’ın 2026’da Windows PC için Steam ve Epic Games Store’a çıkması planlanıyor. Fiyat, diller ve resmi PC sistem gereksinimleri.',
  eyebrow: 'GÜNCEL ÇIKIŞ BİLGİLERİ',
  title: 'Harbor Çıkış Tarihi, Platformlar, Fiyat ve Sistem Gereksinimleri',
  directAnswer: 'Harbor’ın 2026’da Windows PC için çıkması planlanıyor; kesin gün veya ay açıklanmadı. Steam Harbor’ı Early Access olarak listeliyor; CastilvaGames ayrıca Epic Games Store çıkışını planlıyor ancak Epic mağaza sayfası henüz açık değil. 22 Temmuz 2026 itibarıyla çıkış fiyatı gösterilmiyor; PlayStation, Xbox, macOS veya Linux sürümü açıklanmadı. Şu anda resmi çıkış bildirimi almanın açık yolu Steam istek listesidir.',
  updatedLabel: 'Bilgiler 22 Temmuz 2026’da doğrulandı',
  heroAlt: 'Harbor post-apocalyptic açık dünya survival oyunu ana görseli',
  badges: ['Planlanan: 2026', 'Windows PC', 'Steam sayfası açık', 'Epic Games Store planlı', 'Fiyat: açıklanmadı'],
  factsTitle: 'Kısa çıkış özeti',
  facts: [
    { label: 'Planlanan çıkış', value: '2026; kesin tarih açıklanmadı.' },
    { label: 'Çıkış modeli', value: 'Steam’de Early Access; Epic Games Store çıkışı planlı.' },
    { label: 'Erişilebilirlik', value: 'Henüz herkese açık değil; Steam sayfası yayında.' },
    { label: 'Doğrulanmış platform', value: '64-bit Windows PC; planlanan mağazalar Steam ve Epic Games Store.' },
    { label: 'Fiyat', value: 'Çıkış fiyatı yayınlanmadı.' },
    { label: 'Geliştirici ve yayıncı', value: 'CastilvaGames.' },
    { label: 'Steam App ID', value: '2714930.' },
    { label: 'Dil desteği', value: '11 arayüz/altyazı dili; İngilizce tam seslendirme.' },
  ],
  sections: [
    {
      id: 'cikis-tarihi',
      title: 'Harbor ne zaman çıkacak?',
      answer: 'Güncel resmi çıkış penceresi Windows PC için 2026’dır. Steam Early Access listeler; kesin gün veya ay açıklanmadı.',
      paragraphs: [
        'Belirli bir ay veya gün veren sayfalar mevcut resmi listenin ötesine geçer. Early Access, oyunun geliştirme aşamasında yayınlanacağı ve topluluk geri bildirimiyle devam edeceği anlamına gelir.',
        'CastilvaGames’in mevcut hedefi Early Access’ten yaklaşık bir yıl içinde çıkmaktır; ancak bu süre oyuncu geri bildirimine bağlı bir geliştirme hedefidir, garanti edilmiş tam sürüm tarihi değildir.',
      ],
    },
    {
      id: 'platformlar',
      title: 'Harbor hangi platformlara çıkacak?',
      answer: 'Doğrulanan platform Windows PC’dir. Planlanan mağazalar Steam ve Epic Games Store’dur; Steam sayfası açık, Epic sayfası henüz yayınlanmadı.',
      table: {
        caption: 'Harbor platform ve mağaza durumu',
        headers: ['Platform', 'Durum', 'Kanıt'],
        rows: [
          ['Windows PC / Steam', 'Doğrulandı', 'Resmi Steam sayfası; Windows 10–11 64-bit gereksinimleri yayınlandı.'],
          ['Windows PC / Epic Games Store', 'Planlı; sayfa bekleniyor', 'CastilvaGames mağaza çıkışını doğruladı; halka açık Epic ürün URL’si henüz yok.'],
          ['PlayStation', 'Açıklanmadı', 'Resmi PlayStation listesi veya duyurusu yok.'],
          ['Xbox', 'Açıklanmadı', 'Resmi Xbox listesi veya duyurusu yok.'],
          ['macOS / Linux', 'Açıklanmadı', 'Steam şu anda yalnızca Windows desteği listeliyor.'],
        ],
      },
      note: 'Epic Games Store planı CastilvaGames’in birinci taraf bilgisidir. Resmi ürün URL’si açıldığında buraya eklenecek; konsol ve Windows dışı sürümler açıklanmadı.',
    },
    {
      id: 'fiyat',
      title: 'Harbor ücretsiz mi, ücretli mi?',
      answer: 'Çıkış fiyatı yayınlanmadığı için belirli bir ücret veya Harbor’ın ücretsiz olacağı iddiası doğrulanamaz.',
      paragraphs: ['Steam Early Access SSS’sinde geliştirici, tam sürüm fiyatının Early Access sürümünden daha yüksek olmasını beklediğini belirtir. Bu ücretli Early Access planına işaret eder; ancak tutar ve bölgesel fiyat açıklanmamıştır.'],
    },
    {
      id: 'sistem-gereksinimleri',
      title: 'Harbor PC sistem gereksinimleri neler?',
      answer: 'Harbor; 64-bit Windows 10 veya 11, DirectX 12 ve 15 GB boş alan ister. Steam şu anda minimum 12 GB, önerilen 16 GB RAM listeler.',
      table: {
        caption: '22 Temmuz 2026’da Steam’de yayınlanan resmi Harbor PC gereksinimleri',
        headers: ['Bileşen', 'Minimum', 'Önerilen'],
        rows: [
          ['İşletim sistemi', 'Windows 10–11, 64-bit', 'Windows 10–11, 64-bit'],
          ['İşlemci', 'Intel Core i3-4170 veya AMD FX-8120', 'Intel Core i5-8400 veya AMD Ryzen 7 1800X'],
          ['Bellek', '12 GB RAM', '16 GB RAM'],
          ['Ekran kartı', 'GeForce GTX 1080–2070 3 GB+ veya AMD eşdeğeri (Steam’de yazdığı şekliyle)', 'GeForce RTX 2070 veya AMD Radeon RX 5700 XT'],
          ['DirectX', 'Sürüm 12', 'Sürüm 12'],
          ['Depolama', '15 GB boş alan', '15 GB boş alan'],
        ],
      },
      note: 'Steam ayrıca Secure Boot ve TPM 2.0 isteyen boot korumalı Easy Anti-Cheat listeler. Gereksinimler geliştirme sırasında değişebilir; güncel kaynak Steam’dir.',
    },
    {
      id: 'diller',
      title: 'Harbor hangi dilleri destekleyecek?',
      answer: 'Steam 11 arayüz ve altyazı dili listeler. Tam seslendirme şu anda yalnızca İngilizce için işaretlidir.',
      bullets: ['İngilizce (arayüz, tam seslendirme, altyazı)', 'Fransızca, İtalyanca, Almanca, İspanyolca – İspanya', 'Basitleştirilmiş Çince, Japonca, Korece', 'Portekizce – Portekiz, Rusça, Türkçe'],
    },
  ],
  faqs: [
    { question: 'Harbor’ın kesin çıkış tarihi ne?', answer: 'Kesin gün veya ay açıklanmadı. Resmi Steam sayfası 2026 Early Access planını listeler.' },
    { question: 'Harbor şu an oynanabilir mi?', answer: 'Hayır. Steam oyunun henüz erişilebilir olmadığını belirtir ve çıkış için istek listesi bildirimi sunar.' },
    { question: 'Harbor Epic Games Store’a çıkacak mı?', answer: 'Evet. CastilvaGames 2026 için Epic Games Store çıkışını planlıyor; ancak halka açık Epic ürün sayfası henüz yayınlanmadı.' },
    { question: 'Harbor konsollara çıkacak mı?', answer: 'Şu anda PlayStation veya Xbox sürümü listelenmiyor. Doğrulanan platform Windows PC; planlanan mağazalar Steam ve Epic Games Store’dur.' },
    { question: 'Harbor kaç TL olacak?', answer: 'Fiyat açıklanmadı. Steam Early Access SSS’si tam sürümün Early Access’ten daha pahalı olmasının beklendiğini söyler; herhangi bir tutar yayınlanmaz.' },
    { question: 'Harbor DirectX 12 istiyor mu?', answer: 'Evet. Resmi Steam gereksinimleri DirectX 12 ister ve DirectX 12 desteklemeyen sistemlerde oyunun çalışmayacağını belirtir.' },
  ],
  sourcesTitle: 'Resmi kaynaklar ve değişiklik politikası',
  sourcesIntro: 'Çıkış bilgileri zamanla değişebilir. Bu sayfa güncel Steam listesi ile CastilvaGames’in birinci taraf planını birleştirir ve bilinmeyenleri tahminle doldurmaz.',
  sources: [officialHarborSource, officialWebsiteSource],
  relatedTitle: 'Harbor hakkında daha fazla bilgi',
  related: relatedExcept(turkishRelated, 'release'),
  ctaTitle: 'Resmi çıkış bildirimini al',
  ctaText: 'Güncel çıkış durumu ve Early Access açıldığında bildirim için Harbor’ı Steam istek listene ekle.',
  ctaLabel: 'Harbor Steam sayfasını aç',
};

const comparisonTr: KnowledgePageData = {
  ...comparisonEn,
  locale: 'tr',
  route: '/tr/rust-dayz-scum-benzeri/',
  alternateRoute: '/games-like-rust-dayz-scum/',
  metaTitle: 'Harbor Rust, DayZ veya SCUM Benzeri mi? Karşılaştırma',
  metaDescription: 'Harbor; açık dünya multiplayer survival, PvP ve co-op yönleriyle Rust, DayZ ve SCUM’la kesişir. Doğrulanmış farklar ve bilinmeyenler.',
  eyebrow: 'KANITA DAYALI TÜR KARŞILAŞTIRMASI',
  title: 'Harbor; Rust, DayZ veya SCUM Benzeri Bir Oyun mu?',
  directAnswer: 'Harbor; Steam’de açık dünya multiplayer survival, online PvP ve co-op özellikleriyle sunulduğu için Rust, DayZ ve SCUM ile aynı geniş tür çevresinde yer alır. Ancak henüz çıkmış veya incelenmiş bir alternatif değildir; bu yüzden “daha iyi” demek doğru olmaz. Harbor’ın doğrulanmış kimliği; post-apocalyptic çorak dünya, tek güvenli bölge, Clean Blood ve Fuel kıtlığı, görev ve ticaret, sığınak geliştirme ve hareketli kaynak hedeflerini kovalayan araçlar etrafında şekillenir.',
  updatedLabel: 'Resmi Steam sayfaları 22 Temmuz 2026’da karşılaştırıldı',
  heroAlt: 'Harbor açık dünya multiplayer survival oyunundaki klan bölgesi',
  badges: ['Tür benzerliği, marka bağlantısı değil', 'Resmi kaynaklar', 'Ücretli sıralama yok', 'Harbor henüz çıkmadı'],
  factsTitle: 'Dürüst kısa cevap',
  facts: [
    { label: 'Ortak alan', value: 'Açık dünya survival, multiplayer, online PvP, online co-op, kıtlık ve keşif.' },
    { label: 'Harbor’ın odağı', value: 'Tek güvenli bölge, Clean Blood ve Fuel, ticaret ve görevler, hareketli hedefler, araçlar ve yapı geliştirme.' },
    { label: 'Mevcut kanıt eksiği', value: 'Harbor herkese açık değil ve kullanıcı incelemesi yok.' },
    { label: 'Bu sayfanın iddia etmediği', value: 'Marka bağlantısı, kopya, kalite sıralaması veya “daha iyi” hükmü yok.' },
  ],
  sections: [
    {
      id: 'karsilastirma',
      title: 'Harbor; Rust, DayZ ve SCUM ile nasıl karşılaştırılır?',
      answer: 'En güçlü doğrulanmış ortaklık tür ve multiplayer yapısıdır. En büyük kanıt farkı olgunluktur: Rust, DayZ ve SCUM çıkmış oyunlardır; Harbor 2026 Early Access için planlanır.',
      table: {
        caption: 'Resmi Steam sayfalarına dayalı üst düzey karşılaştırma',
        headers: ['Başlık', 'Harbor', 'Rust', 'DayZ', 'SCUM'],
        rows: [
          ['Çıkış durumu', '2026 Early Access planlanıyor; kullanıcı incelemesi yok', '2018’de çıktı', '2018’de çıktı', '2025’te çıktı'],
          ['Geliştirici', 'CastilvaGames', 'Facepunch Studios', 'Bohemia Interactive', 'Gamepires'],
          ['Steam multiplayer modları', 'Online PvP ve online co-op', 'Online PvP ve online co-op', 'Online PvP ve online co-op', 'Online PvP ve online co-op'],
          ['Resmi odak', 'Kıt kaynaklar, sığınak, ticaret, tek güvenli bölge, araçlar ve hareketli hedefler', 'Survival, base building/raiding, sunucular, ulaşım ve gelişen sandbox sistemleri', 'Enfekte post-apocalyptic dünyada çevre ve oyuncu tehditleriyle hardcore survival', 'Derin survival sistemleri, karakter gelişimi, toplama, avlanma, crafting, building ve çatışma'],
          ['Bugünkü adil sonuç', 'Bu arama niyeti için gelecek vadeden bir oyun; nihai kalite kanıtlanmadı', 'Yerleşik, çıkmış oyun', 'Yerleşik, çıkmış oyun', 'İncelemeleri bulunan çıkmış oyun'],
        ],
      },
    },
    {
      id: 'rust',
      title: 'Harbor bir Rust alternatifi mi?',
      answer: 'Kaynak toplama, crafting, building, PvP, co-op, araçlar ve yüksek kayıp riski olan başka bir birinci şahıs multiplayer survival oyunu arayanların ilgisini çekebilir.',
      paragraphs: [
        'Rust’ın resmi sayfası base raiding, oyuncu sunucuları, modlama, otomasyon, çok sayıda ulaşım türü ve yıllara yayılan güncellemeleri öne çıkarır. Harbor’ın yayınlanan kimliği daha farklıdır: tek güvenli bölge Harbor, kritik Clean Blood ve Fuel, ticaret ve görevler ile hareketli kaynak hedefleri.',
        'Bu farklar Harbor’ı “Rust benzeri oyunlar” aramasında ilgili kılar; ancak Rust kopyası veya Rust’ın yerini alacağı kanıtı yapmaz.',
      ],
    },
    {
      id: 'dayz',
      title: 'Harbor DayZ’ye benziyor mu?',
      answer: 'Ortaklık; birinci şahıs post-apocalyptic multiplayer survival, kıt kaynaklar, online iş birliği, PvP ve diğer oyuncuların yarattığı riskte yoğundur.',
      paragraphs: ['DayZ’nin resmi sunumu enfekte bölgelerde hardcore survival, az yönlendirme, çevresel sistemler ve oyuncu hikâyelerine odaklanır. Harbor ise görev ve ticaret içeren güvenli bölge, yapı geliştirme, Clean Blood/Fuel ve araçla kovalanan hareketli hedefler yayınlar. Harbor, enfekte düşmanları ana vaadi olarak açıklamamıştır.'],
    },
    {
      id: 'scum',
      title: 'Harbor SCUM’a benziyor mu?',
      answer: 'İkisi de açık dünya survival craft aramalarında yer alır; multiplayer PvP/co-op, kaynak toplama, crafting, building ve çatışma özellikleri listeler.',
      paragraphs: ['SCUM’ın resmi sayfası derin karakter özelleştirmesi, metabolizma, yorgunluk, beceriler ve avlanmayı öne çıkarır. Harbor ise tek güvenli bölge, kaynak ticareti ve görevler, Clean Blood/Fuel, sığınak geliştirme ve araçla yakalanan hareketli hedeflere odaklanır.'],
    },
    {
      id: 'kime-uygun',
      title: 'Harbor’ı kim takip etmeli, kim beklemeli?',
      answer: 'Doğrulanmış atmosfer ve sistemler istediğiniz deneyime uyuyorsa takip edin; inceleme, kesin denge, sunucu kuralları veya kanıtlanmış performans kararınız için şartsa çıkış kanıtını bekleyin.',
      cards: [
        { title: 'Harbor sana uyabilir', text: 'Çöl benzeri post-apocalyptic atmosfer, birinci şahıs PvP/co-op, building, ticaret, araçlar ve merkez güvenli bölge içeren yeni bir Windows survival oyunu arıyorsan.' },
        { title: 'Kanıtı bekle', text: 'Çıkmış oyun, bağımsız inceleme, kesin sunucu/wipe kuralları, nihai performans, açıklanmış fiyat veya konsol desteği istiyorsan.' },
        { title: 'Abartmadan takip et', text: 'Steam istek listesi geliştirmeyi takip eder ve çıkış bildirimi yollar; bitmiş oyunun her Rust, DayZ veya SCUM oyuncusuna uyacağını kanıtlamaz.' },
      ],
    },
  ],
  faqs: [
    { question: 'Harbor Rust’tan daha mı iyi?', answer: 'Bunu söylemek için sorumlu bir kanıt yoktur. Rust çıkmış ve kapsamlı biçimde incelenmiş bir oyundur; Harbor henüz çıkmadı ve kullanıcı incelemesi yoktur. Özellikler karşılaştırılabilir, nihai kalite değil.' },
    { question: 'Harbor bir Rust kopyası mı?', answer: 'Bunu destekleyen kanıt yoktur. Harbor geniş survival-crafting ve multiplayer özelliklerini paylaşır; ancak kendi isimlendirilmiş dünyasını, güvenli bölgesini, kaynaklarını ve hedeflerini sunar.' },
    { question: 'Harbor’da DayZ veya SCUM gibi zombi var mı?', answer: 'Zombiler mevcut resmi Steam açıklamasında Harbor’ın temel tehdidi olarak tanımlanmaz. CastilvaGames duyurmadıkça enfekte veya zombi sistemi varsayılmamalıdır.' },
    { question: 'Harbor’da base building ve PvP var mı?', answer: 'Evet. Sığınak kurma, yapı geliştirme, bölge savunması, online PvP ve online co-op yayınlanan özellikler arasındadır.' },
    { question: 'Harbor şu anda Rust, DayZ veya SCUM yerine oynanabilir mi?', answer: 'Hayır. Harbor’ın herkese açık sürümü henüz yoktur. Steam 2026 Early Access planını listeler.' },
  ],
  sourcesTitle: 'Kaynaklar ve karşılaştırma yöntemi',
  sourcesIntro: 'Karşılaştırma güncel birinci taraf Steam açıklamaları ve özellik listelerini kullanır. Harbor’ın eşdeğer çıkış kanıtı olmadığı için inceleme puanları ve geçici fiyatlar karşılaştırmaya katılmaz.',
  sources: comparisonEn.sources,
  relatedTitle: 'Resmi Harbor bilgilerini kullan',
  related: relatedExcept(turkishRelated, 'comparison'),
  ctaTitle: 'Harbor’ı resmi güncellemelerle değerlendir',
  ctaText: 'Geliştirme sürerken yeni kanıtları görmek için Harbor’ı Steam istek listene ekle ve CastilvaGames’i takip et.',
  ctaLabel: 'Harbor Steam sayfasını aç',
};

const pressTr: KnowledgePageData = {
  ...pressEn,
  locale: 'tr',
  route: '/tr/basin/',
  alternateRoute: '/press/',
  metaTitle: 'Harbor Basın Kiti | Resmi Bilgiler, Logo ve Görseller',
  metaDescription: 'Resmi Harbor basın kiti: doğrulanmış oyun bilgileri, kısa tanıtım metinleri, Steam ve fragman bağlantıları, logo, ekran görüntüleri ve iletişim.',
  eyebrow: 'RESMİ BASIN VE İÇERİK ÜRETİCİ KAYNAKLARI',
  title: 'Harbor Basın Kiti',
  directAnswer: 'Harbor, CastilvaGames tarafından geliştirilen ve yayınlanan, Windows PC için rekabetçi birinci şahıs post-apocalyptic açık dünya survival oyunudur. 2026’da Steam ve Epic Games Store için planlanan oyun; online PvP ve co-op’u kaynak kıtlığı, crafting, sığınak kurma, ticaret, görevler, sürüş ve Harbor adlı tek güvenli bölge çevresinde birleştirir. Bu sayfa basın bilgileri ve indirilebilir birinci taraf görseller için resmi merkezdir.',
  updatedLabel: 'Basın bilgileri 22 Temmuz 2026’da doğrulandı',
  heroAlt: 'Harbor resmi fragman görseli',
  badges: ['Geliştirici: CastilvaGames', 'Steam App 2714930', 'Windows PC', 'Planlanan: 2026', 'Steam + Epic planlı'],
  factsTitle: 'Resmi hızlı bilgiler',
  facts: [
    { label: 'Oyun adı', value: 'Harbor' },
    { label: 'Geliştirici / yayıncı', value: 'CastilvaGames' },
    { label: 'Tür', value: 'Aksiyon, macera, bağımsız, açık dünya survival craft, birinci şahıs shooter' },
    { label: 'Modlar', value: 'Online PvP ve online co-op' },
    { label: 'Platform', value: 'Steam ve Epic Games Store üzerinden Windows PC' },
    { label: 'Çıkış durumu', value: '2026 planlanıyor; kesin gün veya ay açıklanmadı' },
    { label: 'Resmi site', value: 'theharborgame.com' },
    { label: 'Steam App ID', value: '2714930' },
    { label: 'Basın iletişimi', value: 'info@castilva.com' },
  ],
  sections: [
    {
      id: 'kisa-tanitim',
      title: 'Kısa Harbor tanıtımı',
      answer: 'Harbor; kıt kaynakların, sığınak kurmanın, ticaretin, araçların, ittifakların ve online PvP’nin, dünyanın tek güvenli bölgesinden yapılan her yolculuğu şekillendirdiği birinci şahıs açık dünya multiplayer survival oyunudur.',
      note: 'Editörler bu doğrulanmış metni kullanabilir veya uyarlayabilir. “Harbor” oyun adını ve “CastilvaGames” geliştirici adını koruyun.',
    },
    {
      id: 'uzun-tanitim',
      title: '100 kelimelik Harbor tanıtımı',
      answer: 'Harbor, CastilvaGames’in rekabetçi birinci şahıs açık dünya survival oyunudur. Post-apocalyptic çorak dünyada oyuncular açlık ve susuzluğu yönetir; sınırlı kaynaklar için yarışır; araç gereç ve ekipman üretir; sığınak kurup geliştirir; araç kullanır; ticaret ve görev yapar; ittifaklar oluşturur. Clean Blood ile Fuel kritiktir; War Truck ve Blackrail dünyada hareketli kaynak hedefleri yaratır. Harbor adlı merkez, geçici güvenlik sağlayan tek güvenli bölgedir. Dışarıda online PvP ve co-op devam eder; ölüm taşınan her şeye mal olabilir. Oyun 2026’da Windows PC için Steam ve Epic Games Store’a planlanmaktadır.',
    },
    {
      id: 'haber-acilari',
      title: 'Doğrulanmış içerik ve haber açıları',
      answer: 'Aşağıdaki başlıklar, çıkış veya inceleme sonucu uydurmadan güncel halka açık materyalle desteklenir.',
      bullets: [
        'Kıtlık ve yüksek kayıp riski üzerine kurulan rekabetçi 2026 post-apocalyptic survival oyunu.',
        'Görev, ticaret ve geçici güvenlik sunan tek isimlendirilmiş güvenli bölgeye sahip multiplayer dünya.',
        'Survival ve ulaşım kararlarını birleştiren Clean Blood ve Fuel kaynakları.',
        'War Truck ve Blackrail gibi hareketli kaynak hedeflerini kovalamak için kullanılan araçlar.',
        'Workbench ve üç aşamalı yapı geliştirmesi içeren yenilenen building sistemi.',
        'Steam, Discord ve sosyal kanallardan geri bildirimle ilerleyen topluluk odaklı Early Access.',
      ],
      note: 'Harbor henüz çıkmadı ve kullanıcı incelemesi yok. Yeni resmi kanıt bulunmadıkça “en iyi”, puan, satış, oyuncu sayısı, kesin fiyat veya kesin tarih iddiası kullanmayın.',
    },
    {
      id: 'marka',
      title: 'Marka ve atıf kuralları',
      answer: 'Oyun için “Harbor”, geliştirici ve yayıncı için “CastilvaGames” kullanın. Harbor özgün bir oyundur; Rust, DayZ, SCUM, Mad Max, Fallout veya hak sahipleriyle bağlantılı değildir.',
      bullets: [
        'Önerilen görsel kredisi: “CastilvaGames’in izniyle.”',
        'Telif satırı: “© 2026 CastilvaGames. Tüm hakları saklıdır.”',
        'Oyun adını resmi Steam sayfasına veya theharborgame.com’a bağlayın.',
        'Planlanan özellikleri bağımsız olarak incelenmiş nihai davranış gibi sunmayın.',
      ],
    },
    {
      id: 'iletisim',
      title: 'Basın ve içerik üreticisi iletişimi',
      answer: 'Röportaj, inceleme erişimi, özel görsel veya bilgi düzeltme talepleri için CastilvaGames’e info@castilva.com adresinden ulaşın.',
      paragraphs: ['Yayın veya kanal adını, hedef kitleyi, son tarihi, istenen dosyaları ve içeriğin yayınlanacağı bağlantıyı ekleyin. Topluluk ve geliştirme geri bildirimleri için resmi Discord ile Steam topluluk alanları da kullanılabilir.'],
    },
  ],
  faqs: [
    { question: 'Harbor’ı kim geliştiriyor ve yayınlıyor?', answer: 'Steam’de hem geliştirici hem yayıncı CastilvaGames olarak listelenir.' },
    { question: 'Harbor ne zaman çıkacak?', answer: 'Steam 2026 Early Access planını listeler. Kesin gün veya ay açıklanmadı.' },
    { question: 'Harbor için hangi platform doğrulandı?', answer: 'Windows PC doğrulandı; Steam ve Epic Games Store planlanan mağazalardır. Steam sayfası açık, Epic sayfası bekleniyor.' },
    { question: 'Bu görseller resmi mi?', answer: 'Evet. Bu sayfadaki dosyalar resmi Harbor sitesinde barındırılan CastilvaGames materyalleridir.' },
    { question: 'Bilgi düzeltmeleri nereye gönderilmeli?', answer: 'Basın ve bilgi düzeltme taleplerini info@castilva.com adresine gönderin.' },
  ],
  sourcesTitle: 'Resmi ana bağlantılar',
  sourcesIntro: 'Değişebilen çıkış ve özellik bilgilerini doğrularken bu birinci taraf kaynakları kullanın.',
  sources: pressEn.sources,
  assets: pressAssets,
  assetsTitle: 'Resmi Harbor görsellerini indir',
  relatedTitle: 'İçerik için arka plan bilgileri',
  related: relatedExcept(turkishRelated, 'press'),
  ctaTitle: 'Güncel mağaza sayfasını gör',
  ctaText: 'Harbor’ın güncel çıkış durumu, gereksinimleri ve dil desteği için belirleyici kaynak Steam’dir.',
  ctaLabel: 'Resmi Steam sayfasını aç',
};

export const knowledgePages: KnowledgePageData[] = [
  gameplayEn,
  releaseEn,
  comparisonEn,
  pressEn,
  gameplayTr,
  releaseTr,
  comparisonTr,
  pressTr,
];

const normalizePath = (pathname: string) => {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || '/';
  return withoutQuery === '/' ? '/' : `${withoutQuery.replace(/\/+$/, '')}/`;
};

export const getKnowledgePage = (pathname: string) => {
  const normalized = normalizePath(pathname);
  return knowledgePages.find((page) => page.route === normalized);
};
