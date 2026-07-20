import { useState } from 'react';
import { CheckCircle2, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import PictureImage from '@/components/PictureImage';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: 'About Harbor', href: '#overview' },
    { label: 'Official Trailer', href: '#trailers' },
    { label: 'Gameplay', href: '#games' },
    { label: 'FAQ', href: '#faq' },
  ];

  const officialLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy.html' },
    { label: 'Steam', href: 'https://store.steampowered.com/app/2714930/Harbor' },
    { label: 'Discord', href: 'https://discord.gg/DQaJMQGvNn' },
    { label: 'YouTube', href: 'https://www.youtube.com/@CastilvaGames' },
  ];

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setLoading(true);
    const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
      body: { email: trimmed },
    });
    setLoading(false);

    if (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
      return;
    }

    const status = (data as { status?: string } | null)?.status;

    if (status === 'already_confirmed') {
      toast.info('You are already subscribed.');
      setSubscribed(true);
    } else if (status === 'resent') {
      toast.success('Confirmation email re-sent. Check your inbox.');
      setSubscribed(true);
    } else {
      toast.success('Almost done. Check your inbox to confirm.');
      setSubscribed(true);
    }
    setEmail('');
  };

  return (
    <footer className="relative bg-[#120e0a] border-t border-amber-900/20">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <PictureImage
                  src="/logo.png"
                  alt="CastilvaGames, developer of Harbor"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <span className="font-orbitron font-bold text-lg text-amber-100">
                CASTILVA <span className="text-orange-500">GAMES</span>
              </span>
            </a>
            <p className="text-amber-100/50 text-sm leading-relaxed mb-6">
              Harbor is an open-world multiplayer survival FPS. Gather scarce resources, craft essentials, build shelters, trade, and defend what you have.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/DQaJMQGvNn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-100/5 rounded-lg flex items-center justify-center text-amber-100/50 hover:text-amber-100 hover:bg-orange-500/20 transition-all duration-300"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@CastilvaGames"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-amber-100/5 rounded-lg flex items-center justify-center text-amber-100/50 hover:text-amber-100 hover:bg-orange-500/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-amber-100 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-amber-100/50 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-amber-100 mb-6">Official Links</h4>
            <ul className="space-y-3">
              {officialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-amber-100/50 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron font-semibold text-amber-100 mb-6">Newsletter</h4>
            {subscribed ? (
              <div className="flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-100 text-sm font-semibold mb-1">
                    Check your inbox
                  </p>
                  <p className="text-amber-100/60 text-xs leading-relaxed">
                    We sent you a confirmation link. Click it to finish signing up and start getting news from the wasteland.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-amber-100/50 text-sm mb-4">
                  Subscribe to our newsletter for the latest news and updates.
                </p>
                <form className="flex gap-2" onSubmit={handleSubscribe} aria-label="Newsletter signup">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email address for newsletter"
                    className="flex-1 bg-amber-100/5 border border-amber-900/30 rounded-lg px-4 py-2 text-amber-100 text-sm placeholder:text-amber-100/60 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-orange-700 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-amber-50 text-sm font-bold rounded-lg transition-colors duration-300"
                  >
                    {loading ? '...' : 'Subscribe'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-900/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-amber-100/70 text-xs text-center md:text-left">
              © 2026 CASTILVA GAMES. All rights reserved.
            </p>

            {/* Platform Logos */}
            <div className="flex items-center gap-6">
              <span className="text-amber-100/70 text-xs">Coming to:</span>
              <div className="flex items-center gap-4">
                {['Steam', 'Epic'].map((platform) => (
                  <span
                    key={platform}
                    className="text-amber-100/80 text-xs font-rajdhani font-semibold"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Text */}
          <p className="text-amber-100/70 text-[10px] mt-4 text-center md:text-left leading-relaxed">
            Internet connection, Castilva ID user account (+13), third-party platform account, and acceptance of the Castilva Games Terms of Service and End User License Agreement are required to play. Age restrictions apply (13+).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
