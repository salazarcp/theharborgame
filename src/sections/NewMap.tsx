import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NewMap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="new-map"
      className="relative section-padding bg-[#1a1410]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            NEW <span className="text-gradient">MAP</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            A larger, harsher Harbor is taking shape.
          </p>
        </div>

        {/* Map Image */}
        <div ref={imageRef} className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-amber-900/30 shadow-2xl bg-black">
            <img
              src="/new-map.png"
              alt="Game Difficulty Level Heat Map"
              className="w-full h-auto object-contain"
            />
            {/* Subtle inner glow */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-orange-500/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMap;
