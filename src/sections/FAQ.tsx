import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactModal from '@/components/ContactModal';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
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
      id="community"
      className="relative section-padding bg-[#1a1410]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            FREQUENTLY ASKED <span className="text-gradient">QUESTIONS</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            Find answers to common questions about Harbor.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div ref={contentRef} className="max-w-3xl mx-auto">
          <div className="bg-[#241a14] rounded-xl border border-amber-900/20 p-12 text-center">
            <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-amber-100 mb-4">
              COMING <span className="text-orange-500">SOON</span>
            </h3>
            <p className="text-amber-100/60 text-lg">
              FAQ section is under construction. Check back later for more information.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-amber-100/60 mb-4">Still have questions?</p>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-rajdhani font-semibold text-lg transition-colors duration-300"
          >
            <span>Contact Support</span>
          </button>
        </div>
      </div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default FAQ;
