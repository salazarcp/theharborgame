import App from './App';
import AnalyticsConsentBanner from './components/AnalyticsConsent';
import { getKnowledgePage } from './content/knowledgePages';
import KnowledgePage from './pages/KnowledgePage';
import TurkishLanding from './pages/TurkishLanding';

interface SiteRootProps {
  pathname: string;
}

const isTurkishPath = (pathname: string) => /^\/tr(?:\/|$)/.test(pathname);

const SiteRoot = ({ pathname }: SiteRootProps) => {
  const knowledgePage = getKnowledgePage(pathname);

  return (
    <>
      {knowledgePage
        ? <KnowledgePage page={knowledgePage} />
        : isTurkishPath(pathname) ? <TurkishLanding /> : <App />}
      <AnalyticsConsentBanner pathname={pathname} />
    </>
  );
};

export default SiteRoot;
