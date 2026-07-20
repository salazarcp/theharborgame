import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import GameOverview from './sections/GameOverview';
// import LatestNews from './sections/LatestNews'; // geçici olarak kaldırıldı, sonra geri eklenecek
import WatchTrailers from './sections/WatchTrailers';
import NewMap from './sections/NewMap';
import GameFeatures from './sections/GameFeatures';
import AvailableNow from './sections/AvailableNow';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import StructuredData from './components/StructuredData';
import { Toaster } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll('.animate-section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">
      <StructuredData />
      <Navigation />
      <main>
        <Hero />
        <GameOverview />
        {/* <LatestNews /> */}
        <WatchTrailers />
        <NewMap />
        <GameFeatures />
        <AvailableNow />
        <FAQ />
      </main>
      <Footer />
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  );
}

export default App;
