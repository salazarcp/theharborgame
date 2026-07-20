export type SiteLocale = 'en' | 'tr';

export interface FaqItem {
  question: string;
  answer: string;
}

export const gameFaqs: Record<SiteLocale, FaqItem[]> = {
  en: [
    {
      question: 'What is Harbor?',
      answer:
        'Harbor is an upcoming first-person, open-world multiplayer survival game for PC from CastilvaGames. In a post-apocalyptic wasteland, players scavenge limited resources, craft essential gear, build shelters, trade, form alliances, and fight to survive.',
    },
    {
      question: 'Is Harbor an open-world multiplayer survival game?',
      answer:
        'Yes. Harbor combines open-world survival crafting with online PvP and online co-op. The world revolves around scarce resources, exploration, player alliances, shelter building, trading, and the Harbor safe zone.',
    },
    {
      question: 'Can I play Harbor with friends?',
      answer:
        'Yes. Harbor supports online co-op as well as online PvP. You can form alliances, build and trade with other survivors, while still protecting your resources from threats across the wasteland.',
    },
    {
      question: 'Does Harbor combine FPS, PvP, and survival mechanics?',
      answer:
        'Yes. Harbor is a first-person survival shooter with online PvP, resource scarcity, crafting, building, exploration, and high-stakes deaths where you can lose what you have gathered.',
    },
    {
      question: 'Does Harbor include base building, crafting, and resource gathering?',
      answer:
        'Yes. Players gather resources to craft tools, weapons, clothing, and other essentials. Harbor also includes shelter building, structure upgrades, territory defense, and workbenches designed for fast setup.',
    },
    {
      question: 'Are there vehicles and vehicle-based objectives in Harbor?',
      answer:
        'Yes. Driving is part of Harbor, and vehicles are needed to pursue moving sources of valuable resources such as the War Truck and the Blackrail train. Fuel is one of the wasteland\'s most critical resources.',
    },
    {
      question: 'Is Harbor a Mad Max-style open-world survival game?',
      answer:
        'Harbor is an original game and is not affiliated with the Mad Max franchise. It may appeal to players searching for desert-set, post-apocalyptic survival with scarce fuel, vehicles, scavenging, building, and online PvP, while telling its own story in its own world.',
    },
    {
      question: 'What is the Harbor safe zone?',
      answer:
        'Harbor is the wasteland\'s only safe zone. Players can take on missions, trade resources, restock, and gain temporary safety there before returning to the open world.',
    },
    {
      question: 'When will Harbor be released?',
      answer:
        'Harbor is planned to launch in Steam Early Access in 2026. The game is not available yet, so wishlist it on Steam for official release notifications and development updates.',
    },
    {
      question: 'Is Harbor suitable for new survival-game players?',
      answer:
        'Harbor is designed around tense, high-stakes survival rather than an easy mode: resources are limited and death can cost you everything you carry. New players can cooperate, form alliances, trade, and use the Harbor safe zone while learning the wasteland.',
    },
  ],
  tr: [
    {
      question: 'Harbor nasıl bir oyun?',
      answer:
        'Harbor, CastilvaGames tarafından PC için geliştirilen, birinci şahıs bakış açılı açık dünya multiplayer survival oyunudur. Post-apocalyptic dünyada sınırlı kaynakları toplar; ekipman üretir, sığınak kurar, ticaret yapar, ittifaklar oluşturur ve hayatta kalmak için savaşırsınız.',
    },
    {
      question: 'Harbor açık dünya multiplayer survival oyunu mu?',
      answer:
        'Evet. Harbor; açık dünya survival crafting, online PvP ve online co-op özelliklerini bir araya getirir. Oynanış; kaynak toplama, keşif, üs kurma, ticaret, ittifaklar ve Harbor güvenli bölgesi etrafında şekillenir.',
    },
    {
      question: 'Harbor arkadaşlarla oynanabilir mi?',
      answer:
        'Evet. Harbor hem online co-op hem de online PvP destekler. Arkadaşlarınızla ittifak kurabilir, sığınak inşa edebilir ve ticaret yapabilir; aynı zamanda kaynaklarınızı diğer tehditlere karşı koruyabilirsiniz.',
    },
    {
      question: 'Harbor FPS, PvP ve survival mekaniklerini birleştiriyor mu?',
      answer:
        'Evet. Harbor; FPS çatışmalarını online PvP, kaynak kıtlığı, crafting, building, keşif ve ölümde topladıklarınızı kaybetme riski taşıyan survival mekanikleriyle birleştirir.',
    },
    {
      question: 'Harbor’da üs kurma, crafting ve kaynak toplama var mı?',
      answer:
        'Evet. Topladığınız kaynaklarla araç gereç, silah, kıyafet ve diğer temel eşyaları üretebilirsiniz. Sığınak kurma, yapıları geliştirme, çalışma tezgâhları ve bölgenizi savunma da oynanışın parçasıdır.',
    },
    {
      question: 'Harbor’da araç kullanma ve araç savaşları var mı?',
      answer:
        'Araç kullanma Harbor’ın önemli parçalarından biridir. Değerli kaynak taşıyan War Truck ve Blackrail trenini yakalamak için araçlara ihtiyaç duyarsınız; yakıt ise çorak dünyanın en kritik kaynaklarından biridir.',
    },
    {
      question: 'Harbor, Mad Max tarzı açık dünya survival oyunu mu?',
      answer:
        'Harbor özgün bir oyundur ve Mad Max markasıyla bağlantılı değildir. Çöl atmosferi, post-apocalyptic dünya, kıt yakıt, araçlar, kaynak toplama, üs kurma ve online PvP arayan oyunculara benzer bir genel tür deneyimi sunarken kendi evrenini kurar.',
    },
    {
      question: 'Harbor’daki güvenli bölge nedir?',
      answer:
        'Harbor, çorak dünyanın tek güvenli bölgesidir. Burada görev alabilir, kaynak ticareti yapabilir, ihtiyaçlarınızı tamamlayabilir ve yeniden açık dünyaya çıkmadan önce geçici güvenlik sağlayabilirsiniz.',
    },
    {
      question: 'Harbor ne zaman çıkacak?',
      answer:
        'Harbor’ın 2026 yılında Steam Early Access olarak çıkması planlanıyor. Oyun henüz erişime açık değil; resmi çıkış bildirimi ve geliştirme güncellemeleri için Steam istek listenize ekleyebilirsiniz.',
    },
    {
      question: 'Harbor yeni başlayanlar için uygun bir online survival oyunu mu?',
      answer:
        'Harbor kolay bir deneyim vadetmez: kaynaklar sınırlıdır ve ölüm taşıdığınız her şeyi kaybetmenize yol açabilir. Yeni oyuncular ittifak kurarak, arkadaşlarıyla co-op oynayarak, ticaret yaparak ve Harbor güvenli bölgesini kullanarak dünyayı öğrenebilir.',
    },
  ],
};

export const seoCopy = {
  en: {
    title: 'Harbor | Open-World Multiplayer Survival Game',
    description:
      'Harbor is an upcoming open-world multiplayer survival FPS for PC. Scavenge, craft, build, drive, trade, and fight in online PvP and co-op.',
  },
  tr: {
    title: 'Harbor | Açık Dünya Multiplayer Survival Oyunu',
    description:
      'Harbor, PC için açık dünya multiplayer survival FPS oyunudur. Kaynak topla, üret, üs kur, araç kullan ve online PvP ile co-op dünyasında hayatta kal.',
  },
} satisfies Record<SiteLocale, { title: string; description: string }>;
