import { ExternalLink, Play } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import GameOverview from '@/sections/GameOverview';
import FAQ from '@/sections/FAQ';
import PictureImage from '@/components/PictureImage';

const STEAM_URL = 'https://store.steampowered.com/app/2714930/Harbor';

const TurkishLanding = () => (
  <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
    <StructuredData locale="tr" />

    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1410]/90 backdrop-blur-xl border-b border-amber-900/20">
      <div className="container-custom h-20 flex items-center justify-between">
        <a href="/tr/" className="flex items-center gap-3" aria-label="Harbor Türkçe ana sayfa">
          <PictureImage
            src="/logo.png"
            alt="Harbor geliştiricisi CastilvaGames"
            loading="eager"
            width={40}
            height={40}
            className="w-10 h-10 object-contain filter brightness-110"
          />
          <span className="font-orbitron font-bold text-lg md:text-xl text-amber-100 tracking-wider">
            CASTILVA <span className="text-orange-500">GAMES</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          <a href="#oyun" className="nav-link font-rajdhani font-semibold text-sm tracking-wider">OYUN</a>
          <a href="#oynanis" className="nav-link font-rajdhani font-semibold text-sm tracking-wider">OYNANIŞ</a>
          <a href="#sss" className="nav-link font-rajdhani font-semibold text-sm tracking-wider">SSS</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="/" lang="en" hrefLang="en" className="text-amber-100/65 hover:text-amber-100 text-sm font-semibold">
            EN
          </a>
          <a
            href={STEAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-4 md:!px-6 !py-3 text-xs md:text-sm font-orbitron tracking-wider"
          >
            İSTEK LİSTESİ
          </a>
        </div>
      </div>
    </nav>

    <main>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.webp"
            alt="Harbor açık dünya multiplayer survival oyununun post-apocalyptic çöl dünyası"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410]/45 via-[#1a1410]/35 to-[#1a1410]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410]/55 via-transparent to-[#1a1410]/55" />
        </div>

        <div className="relative z-10 container-custom text-center pt-24">
          <p className="font-rajdhani font-semibold tracking-[0.22em] text-sm md:text-base text-orange-300 mb-5">
            AÇIK DÜNYA MULTIPLAYER SURVIVAL OYUNU
          </p>
          <h1 className="hero-title-glow font-orbitron font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-amber-100 mb-6 tracking-tight">
            HARBOR
          </h1>
          <p className="text-lg md:text-xl text-amber-100/75 max-w-3xl mx-auto mb-10 leading-relaxed" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>
            Kum ve pas denizinde kayboldunuz. Kaynak toplayın, üretin, üs kurun, araç kullanın ve online PvP ile co-op dünyasında hayatta kalın. Harbor son sığınağınız olabilir mi?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-lg">
              <span>STEAM İSTEK LİSTESİ</span>
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="https://youtu.be/3E5J4DY8OhI" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2 text-lg">
              <Play className="w-5 h-5" aria-hidden="true" />
              <span>FRAGMANI İZLE</span>
            </a>
          </div>
        </div>
      </section>

      <GameOverview locale="tr" />

      <section id="oynanis" className="relative section-padding bg-[#120e0a]" aria-labelledby="gameplay-title-tr">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="font-rajdhani font-semibold tracking-[0.24em] text-sm text-orange-400 mb-4">FPS · PVP · CO-OP · CRAFTING</p>
              <h2 id="gameplay-title-tr" className="font-orbitron font-bold text-4xl md:text-5xl text-amber-100 mb-6 leading-tight">
                ÇÖL ATMOSFERİNDE <span className="text-gradient">YÜKSEK RİSKLİ SURVIVAL</span>
              </h2>
              <div className="space-y-5 text-amber-100/70 text-lg leading-relaxed">
                <p>
                  Harbor; gerçekçi ve atmosferik bir post-apocalyptic açık dünyada FPS çatışmalarını, kaynak kıtlığını ve oyuncu kararlarını merkezine alır. Ölüm, uğruna savaştığınız her şeyi kaybetmek anlamına gelebilir.
                </p>
                <p>
                  Temiz kan ve yakıt en kritik kaynaklardır. War Truck ile Blackrail treninin peşine araçlarla düşün; araç gereç, silah ve kıyafet üretin; sığınağınızı güçlendirin ve bölgenizi savunun.
                </p>
                <p>
                  Harbor güvenli bölgesinde görev alın, ticaret yapın ve geçici güvenlik bulun. Kapıların dışında ise ittifak kurmakla hiçbir oyuncuya güvenmemek arasındaki seçim size aittir.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/30 shadow-2xl">
              <PictureImage
                src="/feature-harbor.jpg"
                alt="Harbor oyunundaki güvenli bölge ve açık dünya survival ortamı"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120e0a]/65 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <FAQ locale="tr" />

      <section className="relative section-padding overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#241a14] to-[#1a1410]" />
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container-custom relative z-10">
          <p className="font-rajdhani font-semibold tracking-[0.24em] text-sm text-orange-400 mb-4">2026 · STEAM EARLY ACCESS</p>
          <h2 className="font-orbitron font-bold text-4xl md:text-6xl text-amber-100 mb-5">
            HARBOR’I <span className="text-gradient">İSTEK LİSTENE EKLE</span>
          </h2>
          <p className="text-amber-100/65 text-lg max-w-2xl mx-auto mb-8">
            Kapılar açıldığında haberdar olmak ve resmi geliştirme güncellemelerini takip etmek için Harbor’ı Steam’de istek listene ekle.
          </p>
          <a href={STEAM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-lg">
            STEAM SAYFASINA GİT <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>

    <footer className="bg-[#120e0a] border-t border-amber-900/20">
      <div className="container-custom py-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="text-amber-100/60 text-sm text-center md:text-left">
          © 2026 CastilvaGames · Harbor resmi Türkçe oyun sayfası
        </p>
        <div className="flex items-center gap-5 text-sm">
          <a href="/privacy-policy.html" className="text-amber-100/60 hover:text-orange-400">Gizlilik</a>
          <a href="https://discord.gg/DQaJMQGvNn" target="_blank" rel="noopener noreferrer" className="text-amber-100/60 hover:text-orange-400">Discord</a>
          <a href="https://www.youtube.com/@CastilvaGames" target="_blank" rel="noopener noreferrer" className="text-amber-100/60 hover:text-orange-400">YouTube</a>
          <a href="/" lang="en" hrefLang="en" className="text-orange-400 hover:text-orange-300">English</a>
        </div>
      </div>
    </footer>
  </div>
);

export default TurkishLanding;
