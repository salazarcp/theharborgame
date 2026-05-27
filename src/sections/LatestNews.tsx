import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Update 2.0 - New Season Begins',
    date: 'January 27, 2026',
    category: 'Update',
    image: '/news-1.jpg',
  },
  {
    id: 2,
    title: 'New Map: Rust Valley',
    date: 'January 25, 2026',
    category: 'Content',
    image: '/news-2.jpg',
  },
  {
    id: 3,
    title: 'Roadmap: Q1 2026',
    date: 'January 22, 2026',
    category: 'Announcement',
    image: '/news-3.jpg',
  },
  {
    id: 4,
    title: 'New Character: The Raider',
    date: 'January 20, 2026',
    category: 'Character',
    image: '/news-4.jpg',
  },
];

const LatestNews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.news-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      id="news"
      className="relative section-padding bg-[#1a1410]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            LATEST <span className="text-gradient">NEWS</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            Stay updated with the latest developments, updates, and announcements from the Last Harbor universe.
          </p>
        </div>

        {/* News Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="news-card group relative bg-[#241a14] rounded-xl overflow-hidden border border-amber-900/20 transition-all duration-400 hover:-translate-y-3 hover:border-orange-500/30"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241a14] to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-600/80 backdrop-blur-sm text-amber-100 text-xs font-rajdhani font-semibold rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-amber-100/40 text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="font-rajdhani">{item.date}</span>
                </div>
                <h3 className="font-orbitron font-semibold text-amber-100 text-lg leading-tight group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent" />
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="#all-news"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-rajdhani font-semibold text-lg transition-colors duration-300 group"
          >
            <span>View All News</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
