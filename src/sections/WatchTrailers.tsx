import { useEffect, useRef, useState } from 'react'; // useState eklendi
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WatchTrailers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Video oynatılıyor mu kontrolü için state
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        playerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: playerRef.current,
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
      id="trailers"
      className="relative section-padding overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#241a14] to-[#1a1410]" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-amber-100 mb-4">
            WATCH <span className="text-gradient">TRAILER</span>
          </h2>
          <p className="text-amber-100/60 text-lg max-w-2xl mx-auto">
            Experience the wasteland. Witness the action firsthand.
          </p>
        </div>

        {/* Main Video Player */}
        <div ref={playerRef} className="max-w-5xl mx-auto mb-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-amber-900/30 shadow-2xl bg-black">
            
            {!isPlaying ? (
              /* --- STATE 1: HENÜZ OYNATILMIYORSA (Kapak Görseli) --- */
              <>
                <img
                  src="/trailer-thumb.webp"
                  alt="Harbor - Official Trailer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay ve Play Butonu */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="group relative cursor-pointer focus:outline-none"
                    aria-label="Play Video"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 relative z-10">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-amber-100 ml-1" fill="currentColor" />
                    </div>
                    {/* Ping Animation */}
                    <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-30" />
                  </button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <h3 className="font-orbitron font-bold text-xl md:text-2xl text-amber-100">
                    Harbor - Official Trailer
                  </h3>
                  <span className="text-amber-100/60 font-rajdhani">1:55</span>
                </div>
              </>
            ) : (
              /* --- STATE 2: OYNATILIYORSA (YouTube Embed) --- */
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/3E5J4DY8OhI?autoplay=1&rel=0"
                title="Harbor - Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            )}

          </div>
        </div>

        {/* Watch on YouTube Link (Alt kısımdaki linki koruduk, isteyen YouTube'a gidebilir) */}
        <div className="text-center">
          <a 
            href="https://youtu.be/3E5J4DY8OhI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-rajdhani font-semibold text-lg transition-colors duration-300"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WatchTrailers;