import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageLightbox from '@/components/ImageLightbox';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  align: 'left' | 'right';
}

const beyondImages = [
  '/beyond-48.png',
  '/beyond-55.png',
  '/beyond-54.png',
  '/beyond-51.png',
  '/beyond-42.png',
  '/beyond-36.png',
  '/beyond-16.png',
  '/beyond-14.png',
  '/beyond-8.png',
];

const features: Feature[] = [
  {
    id: 1,
    title: 'THE HARBOR BAR',
    description:
      'At the heart of the safe zone, the bar is where survivors gather to drink, swap stories, and broker deals before heading back into the wasteland.',
    image: '/feature-harbor-bar.png',
    align: 'left',
  },
  {
    id: 2,
    title: 'KING OF THE HILL',
    description:
      'Sanctioned fight events inside the safe zone. Step into the ring, take down other survivors, and build a reputation that carries beyond Harbor.',
    image: '/feature-king-of-the-hill.png',
    align: 'right',
  },
  {
    id: 3,
    title: 'THE CITADEL',
    description:
      'Carved into the red cliffs, the Citadel holds the master valve. Open it, water returns to the wasteland, and your name is written into the map itself.',
    image: '/feature-citadel.png',
    align: 'left',
  },
  {
    id: 4,
    title: 'HARBOR',
    description:
      'Harbor sits at the center of the wasteland. The only safe haven where you can catch your breath, restock, and gather your nerve before the next run.',
    image: '/feature-harbor.png',
    align: 'right',
  },
  {
    id: 5,
    title: 'DIESEL RING',
    description:
      'The only place on the map to refuel. Anyone running on fumes is already on their way, and they will fight you for every drop.',
    image: '/feature-diesel-ring.png',
    align: 'left',
  },
  {
    id: 6,
    title: 'BLACKRAIL',
    description:
      'Most of the wasteland is one ride away. Hop the Blackrail to skip the long runs, and shelter inside its cars where even the radiation cannot reach you.',
    image: '/feature-blackrail.png',
    align: 'right',
  },
  {
    id: 7,
    title: 'THE BULLET QUARRY',
    description:
      'The richest alloy deposits in the wasteland. Remember it well, because every survivor runs out of bullets eventually, and a mine cart drops you straight to the bottom when that day comes.',
    image: '/feature-bullet-quarry.png',
    align: 'left',
  },
  {
    id: 8,
    title: 'GREENWOUND',
    description:
      'Without clean blood, the radiation finds you with every step. The Blackrail is the only way in that lets you walk back out.',
    image: '/feature-greenwound.png',
    align: 'right',
  },
  {
    id: 9,
    title: 'BLACKMIRE',
    description:
      'A swamp standing between you and what is worth crossing for. Pull yourself tree to tree with the harpoon, and keep an eye on the water, because not everything down there is dead.',
    image: '/feature-blackmire.jpeg',
    align: 'left',
  },
  {
    id: 10,
    title: 'RULERS OF THE HARBOR',
    description:
      'The only ground in Harbor a clan can take and hold. Claim it, and the gates open at your name, your colors fly above the walls, and every drop of fuel outside the Diesel Ring runs through your people.',
    image: '/feature-rulers.png',
    align: 'right',
  },
];

const GameFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const featureBlocks = document.querySelectorAll('.feature-block');

      featureBlocks.forEach((block) => {
        const text = block.querySelector('.feature-text');
        const image = block.querySelector('.feature-image');

        gsap.fromTo(
          text,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%',
            },
          }
        );

        gsap.fromTo(
          image,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <section
      ref={sectionRef}
      id="games"
      className="relative section-padding bg-[#1a1410]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            GAME <span className="text-gradient">FEATURES</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            Experience the ultimate wasteland adventure with Last Harbor.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`feature-block grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                feature.align === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div
                className={`feature-text ${feature.align === 'right' ? 'lg:order-2' : ''}`}
              >
                <h3 className="font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl text-amber-100 mb-2 leading-tight">
                  {feature.title}
                </h3>
                {feature.subtitle && (
                  <h4 className="font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl text-orange-500 mb-6">
                    {feature.subtitle}
                  </h4>
                )}
                <p className="text-amber-100/70 text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                </div>
              </div>

              {/* Image */}
              <div
                className={`feature-image ${feature.align === 'right' ? 'lg:order-1' : ''}`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxSrc(feature.image)}
                  className="relative group block w-full text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
                  aria-label={`Open ${feature.title} screenshot`}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image Container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-900/30">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/60 via-transparent to-transparent" />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/50" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/50" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/50" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AND MORE BEYOND - Full-bleed marquee */}
      <div className="relative z-10 mt-24 lg:mt-32">
        <div className="container-custom text-center mb-12">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            AND MORE <span className="text-gradient">BEYOND</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            Wishlist Harbor now so you don't miss the moment the gates open.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#1a1410] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#1a1410] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex gap-6">
            {[...beyondImages, ...beyondImages].map((src, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setLightboxSrc(src)}
                aria-label="Open screenshot"
                className="flex-none w-[320px] md:w-[400px] lg:w-[480px] aspect-video relative rounded-xl overflow-hidden border border-amber-900/30 group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/60 via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-orange-500/40" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/40" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>

    <ImageLightbox
      open={lightboxSrc !== null}
      onOpenChange={(open) => !open && setLightboxSrc(null)}
      src={lightboxSrc}
    />
    </>
  );
};

export default GameFeatures;
