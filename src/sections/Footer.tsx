import { useState } from 'react';
import { CheckCircle2, MessageCircle, Youtube } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: 'Games', href: '#games' },
    { label: 'News', href: '#news' },
    { label: 'Support', href: '#support' },
    { label: 'Careers', href: '#careers' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy.html' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'Security', href: '#security' },
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
                <img
                  src="/logo.png"
                  alt="Castilva Games"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
              <span className="font-orbitron font-bold text-lg text-amber-100">
                CASTILVA <span className="text-orange-500">GAMES</span>
              </span>
            </a>
            <p className="text-amber-100/50 text-sm leading-relaxed mb-6">
              Survive in a world of sand and rust. Fight for resources, build your convoy, and conquer the wasteland.
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
                <MessageCircle className="w-5 h-5" />
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

          {/* Legal Links */}
          <div>
            <h4 className="font-orbitron font-semibold text-amber-100 mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
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
                <form className="flex gap-2" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-amber-100/5 border border-amber-900/30 rounded-lg px-4 py-2 text-amber-100 text-sm placeholder:text-amber-100/30 focus:outline-none focus:border-orange-500 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-amber-100 text-sm font-semibold rounded-lg transition-colors duration-300"
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
            <p className="text-amber-100/40 text-xs text-center md:text-left">
              © 2026 CASTILVA GAMES. All rights reserved.
            </p>

            {/* Platform Logos */}
            <div className="flex items-center gap-6">
              <span className="text-amber-100/30 text-xs">Available on:</span>
              <div className="flex items-center gap-4">
                {['Steam', 'Epic'].map((platform) => (
                  <span
                    key={platform}
                    className="text-amber-100/40 text-xs font-rajdhani font-semibold"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Text */}
          <p className="text-amber-100/30 text-[10px] mt-4 text-center md:text-left leading-relaxed">
            Internet connection, Castilva ID user account (+13), third-party platform account, and acceptance of the Castilva Games Terms of Service and End User License Agreement are required to play. Age restrictions apply (13+).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
