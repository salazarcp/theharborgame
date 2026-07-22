export const GA_MEASUREMENT_ID = 'G-XMBR4ENVMK';
export const ANALYTICS_CONSENT_KEY = 'harbor_analytics_consent';
export const ANALYTICS_SETTINGS_EVENT = 'harbor:open-analytics-settings';

export type AnalyticsConsent = 'granted' | 'denied';
export type AnalyticsParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsStarted = false;

const getGtag = () => {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => {
    window.dataLayer?.push(args);
  });
  return window.gtag;
};

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const prepareAnalyticsConsent = () => {
  const gtag = getGtag();
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
};

const sendPageView = () => {
  getGtag()('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_language: document.documentElement.lang || 'en',
  });
};

export const startAnalytics = () => {
  const gtag = getGtag();
  gtag('consent', 'update', { analytics_storage: 'granted' });

  if (analyticsStarted) return;
  analyticsStarted = true;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (!document.getElementById('harbor-ga4-script')) {
    const script = document.createElement('script');
    script.id = 'harbor-ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  sendPageView();
};

const clearAnalyticsCookies = () => {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter((name): name is string => Boolean(name && name.startsWith('_ga')));
  const domains = [window.location.hostname, `.${window.location.hostname}`];

  names.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
  });
};

export const saveAnalyticsConsent = (consent: AnalyticsConsent) => {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch {
    // The current page can still honor the choice when storage is unavailable.
  }

  if (consent === 'granted') {
    startAnalytics();
    return;
  }

  getGtag()('consent', 'update', { analytics_storage: 'denied' });
  clearAnalyticsCookies();
};

export const trackAnalyticsEvent = (name: string, parameters: AnalyticsParameters = {}) => {
  if (getAnalyticsConsent() !== 'granted' || !analyticsStarted) return;
  getGtag()('event', name, parameters);
};

export const openAnalyticsSettings = () => {
  window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT));
};
