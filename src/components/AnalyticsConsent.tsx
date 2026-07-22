import { useEffect, useState } from 'react';
import {
  ANALYTICS_SETTINGS_EVENT,
  getAnalyticsConsent,
  prepareAnalyticsConsent,
  saveAnalyticsConsent,
  startAnalytics,
  trackAnalyticsEvent,
  type AnalyticsConsent,
} from '@/lib/analytics';

interface AnalyticsConsentBannerProps {
  pathname: string;
}

const classifyLink = (href: string) => {
  if (href.includes('store.steampowered.com/app/2714930')) return 'steam_store_click';
  if (href.includes('youtu.be/3E5J4DY8OhI') || href.includes('youtube.com/watch?v=3E5J4DY8OhI')) return 'trailer_click';
  if (href.includes('discord.gg/')) return 'discord_click';
  if (href.includes('store.epicgames.com/')) return 'epic_store_click';
  return null;
};

const AnalyticsConsentBanner = ({ pathname }: AnalyticsConsentBannerProps) => {
  const [open, setOpen] = useState(false);
  const isTr = /^\/tr(?:\/|$)/.test(pathname);

  useEffect(() => {
    const savedConsent = getAnalyticsConsent();
    prepareAnalyticsConsent();
    const revealTimer = window.setTimeout(() => setOpen(savedConsent === null), 0);
    if (savedConsent === 'granted') startAnalytics();

    const handleSettingsRequest = () => setOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, handleSettingsRequest);
    return () => {
      window.clearTimeout(revealTimer);
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, handleSettingsRequest);
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const eventName = classifyLink(link.href);
      if (!eventName) return;

      trackAnalyticsEvent(eventName, {
        link_url: link.href,
        link_text: (link.textContent ?? link.getAttribute('aria-label') ?? '').trim().slice(0, 100),
        page_path: window.location.pathname,
        page_language: isTr ? 'tr' : 'en',
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isTr]);

  const choose = (nextChoice: AnalyticsConsent) => {
    saveAnalyticsConsent(nextChoice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="analytics-consent-title"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-xl border border-amber-500/30 bg-[#17100c]/95 p-5 text-amber-100 shadow-[0_18px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex md:items-center md:gap-6"
    >
      <div className="min-w-0 flex-1">
        <h2 id="analytics-consent-title" className="font-orbitron text-sm font-bold tracking-wide">
          {isTr ? 'İSTEĞE BAĞLI ANALİTİK' : 'OPTIONAL ANALYTICS'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amber-100/70">
          {isTr
            ? 'Hangi sayfaların ve kampanyaların oyuncuları Steam’e yönlendirdiğini anlamak için Google Analytics kullanıyoruz. Kabul etmediğiniz sürece analitik çerezleri yüklenmez.'
            : 'We use Google Analytics to understand which pages and campaigns lead players to Steam. No analytics cookies load unless you accept.'}
          {' '}
          <a href="/privacy-policy.html" className="text-orange-400 underline underline-offset-2 hover:text-orange-300">
            {isTr ? 'Gizlilik politikası' : 'Privacy policy'}
          </a>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:mt-0 md:w-auto md:flex-shrink-0">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="min-h-11 rounded-lg border border-amber-500/40 px-4 py-2 font-rajdhani text-sm font-bold uppercase tracking-wider text-amber-100 transition-colors hover:bg-amber-100/10"
        >
          {isTr ? 'Reddet' : 'Reject'}
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="min-h-11 rounded-lg bg-orange-700 px-4 py-2 font-rajdhani text-sm font-bold uppercase tracking-wider text-amber-50 transition-colors hover:bg-orange-600"
        >
          {isTr ? 'Kabul et' : 'Accept'}
        </button>
      </div>
    </aside>
  );
};

export default AnalyticsConsentBanner;
