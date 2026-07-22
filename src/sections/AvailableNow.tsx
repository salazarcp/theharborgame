import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Platform {
  id: number;
  name: string;
  logo: string;
  href?: string;
  status: string;
}

const platforms: Platform[] = [
  {
    id: 1,
    name: 'Steam',
    logo: '/steam.svg',
    href: 'https://store.steampowered.com/app/2714930/Harbor',
    status: 'Page live · Wishlist now',
  },
  {
    id: 2,
    name: 'Epic Games Store',
    logo: '/epic.svg',
    status: 'Planned · Store page coming soon',
  },
];

const AvailableNow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.platform-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="purchase"
      className="relative section-padding overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#241a14] to-[#1a1410]" />

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[200px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            WISHLIST <span className="text-gradient">NOW</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto mb-8">
            Add Harbor to your wishlist and be the first to know when it launches.
          </p>

          {/* CTA Button */}
          <a 
            href="https://store.steampowered.com/app/2714930/Harbor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-lg mb-12"
          >
            <span>WISHLIST ON STEAM</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Available Platforms */}
        <div className="text-center">
          <p className="text-amber-100/50 text-sm mb-6">Planned PC Stores</p>
          
          {/* Platform Cards */}
          <div
            ref={cardsRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {platforms.map((platform) => (
              <div key={platform.id} className="min-w-52">
                {platform.href ? (
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.name}
                    className="platform-card group h-14 md:h-16 px-6 md:px-8 bg-amber-100/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30 transition-all duration-300 hover:bg-amber-500/20 hover:border-orange-500/50 hover:scale-105"
                  >
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="h-6 md:h-7 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                ) : (
                  <div
                    aria-label={`${platform.name}: ${platform.status}`}
                    className="platform-card h-14 md:h-16 px-6 md:px-8 bg-amber-100/5 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/20"
                  >
                    <img src={platform.logo} alt={platform.name} className="h-7 md:h-8 w-auto opacity-70" />
                  </div>
                )}
                <p className="mt-3 text-xs text-amber-100/55">{platform.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-amber-100/40 text-sm">
            Planned for Windows PC in 2026. Steam page live; Epic Games Store page coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AvailableNow;
