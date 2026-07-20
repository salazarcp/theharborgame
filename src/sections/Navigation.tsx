import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import PictureImage from '@/components/PictureImage';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // BURASI GÜNCELLENDİ: Games -> HARBOR oldu, About silindi.
  const navItems = [
    { label: 'ABOUT', href: '#overview' },
    { label: 'GAMEPLAY', href: '#games' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#1a1410]/95 backdrop-blur-xl border-b border-amber-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <PictureImage
                src="/logo.png"
                alt="CastilvaGames, developer of Harbor"
                loading="eager"
                width={40}
                height={40}
                className="w-full h-full object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
              />
            </div>
            <span className="font-orbitron font-bold text-xl text-amber-100 tracking-wider">
              CASTILVA <span className="text-orange-500">GAMES</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link font-rajdhani font-semibold text-sm tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/DQaJMQGvNn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="text-amber-100/60 hover:text-amber-100 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@CastilvaGames"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-amber-100/60 hover:text-amber-100 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <a
              href="/tr/"
              lang="tr"
              hrefLang="tr"
              aria-label="T?rk?e"
              className="text-amber-100/60 hover:text-orange-400 text-sm font-semibold transition-colors"
            >
              TR
            </a>
            {/* CTA Button */}
            <a
              href="https://store.steampowered.com/app/2714930/Harbor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm font-orbitron tracking-wider"
            >
              WISHLIST NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-amber-100 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-amber-900/30">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-amber-100/80 hover:text-amber-100 py-2 font-rajdhani font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/tr/"
              lang="tr"
              hrefLang="tr"
              className="block text-amber-100/80 hover:text-orange-400 py-2 font-rajdhani font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              T?RK?E
            </a>
            <a 
              href="https://store.steampowered.com/app/2714930/Harbor" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center block mt-4"
            >
              WISHLIST NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;