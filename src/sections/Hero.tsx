import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, Play } from 'lucide-react';
import PictureImage from '@/components/PictureImage';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { opacity: 0, y: 50, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05 },
          0.3
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        1
      );

      tl.fromTo(
        platformsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        1.2
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const platforms = [
    { name: 'Steam', logo: '/steam.svg', href: 'https://store.steampowered.com/app/2714930/Harbor' },
    { name: 'Epic Games Store', logo: '/epic.svg', href: 'https://store.epicgames.com' },
  ];

  const titleText = 'WISHLIST NOW';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 ken-burns">
          <img
            src="/hero-bg.webp"
            alt="Last Harbor - Desert Wasteland"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410]/40 via-[#1a1410]/30 to-[#1a1410]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410]/50 via-transparent to-[#1a1410]/50" />
      </div>

      {/* Animated Dust Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none sand-dust" />

      {/* Main Content */}
      <div className="relative z-10 container-custom text-center pt-20">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <div className="inline-flex items-center gap-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 relative">
              <PictureImage
                src="/logo.png"
                alt="Castilva Games"
                loading="eager"
                width={80}
                height={80}
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
            <div className="text-left">
              <span className="font-orbitron font-bold text-2xl lg:text-3xl text-amber-100 block tracking-wider">
                CASTILVA
              </span>
              <span className="font-orbitron font-bold text-xl lg:text-2xl text-orange-500 tracking-widest">
                GAMES
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-100 mb-6 tracking-tight perspective-1000"
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-amber-100/70 max-w-2xl mx-auto mb-10 font-light"
        >
          Lost in a sea of sand and rust. Is 'Harbor' the final refuge? Scavenge, fight and survive the wasteland.
        </p>

        {/* Platform Icons */}
        <div
          ref={platformsRef}
          className="flex items-center justify-center gap-6 md:gap-10 mb-10"
        >
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.name}
              className="group h-12 md:h-14 px-5 md:px-6 bg-amber-100/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30 transition-all duration-300 hover:bg-amber-500/20 hover:border-orange-500/50 hover:scale-105"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="h-5 md:h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://store.steampowered.com/app/2714930/Harbor" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2 text-lg"
          >
            <span>WISHLIST NOW</span>
          </a>
          <a 
            href="https://youtu.be/3E5J4DY8OhI" 
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 text-lg"
          >
            <Play className="w-5 h-5" />
            <span>WATCH TRAILER</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#news" className="flex flex-col items-center gap-2 text-amber-100/50 hover:text-amber-100 transition-colors duration-300">
          <span className="text-xs font-rajdhani tracking-widest">SCROLL DOWN</span>
          <ChevronDown className="w-6 h-6 animate-bounce-arrow" />
        </a>
      </div>

      {/* Side Decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden xl:block">
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-r"
              style={{ opacity: 1 - i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
