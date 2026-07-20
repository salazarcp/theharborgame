import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import { gameFaqs, type SiteLocale } from '@/content/gameContent';

gsap.registerPlugin(ScrollTrigger);

interface FAQProps {
  locale?: SiteLocale;
}

const FAQ = ({ locale = 'en' }: FAQProps) => {
  const isTurkish = locale === 'tr';
  const faqs = gameFaqs[locale];
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
      id={isTurkish ? 'sss' : 'faq'}
      className="relative section-padding bg-[#1a1410]"
      aria-labelledby={`${locale}-faq-title`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id={`${locale}-faq-title`} className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            {isTurkish ? <>SIKÇA SORULAN <span className="text-gradient">SORULAR</span></> : <>FREQUENTLY ASKED <span className="text-gradient">QUESTIONS</span></>}
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            {isTurkish ? 'Harbor hakkında en çok aranan soruların doğrulanmış yanıtları.' : 'Verified answers to the most common questions about Harbor.'}
          </p>
        </div>

        {/* FAQ Content */}
        <div ref={contentRef} className="max-w-4xl mx-auto space-y-3">
          {faqs.map(({ question, answer }, index) => (
            <details
              key={question}
              open={index === 0}
              className="group bg-[#241a14] rounded-xl border border-amber-900/20 open:border-orange-500/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left font-orbitron font-semibold text-amber-100">
                <span>{question}</span>
                <ChevronDown className="h-5 w-5 flex-none text-orange-400 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="border-t border-amber-900/20 px-6 py-5">
                <p className="text-amber-100/70 leading-relaxed">{answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-amber-100/60 mb-4">{isTurkish ? 'Başka bir sorunuz mu var?' : 'Still have questions?'}</p>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-rajdhani font-semibold text-lg transition-colors duration-300"
          >
            <span>{isTurkish ? 'Destek ekibiyle iletişime geç' : 'Contact Support'}</span>
          </button>
        </div>
      </div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
};

export default FAQ;
