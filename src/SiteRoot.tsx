import App from './App';
import { getKnowledgePage } from './content/knowledgePages';
import KnowledgePage from './pages/KnowledgePage';
import TurkishLanding from './pages/TurkishLanding';

interface SiteRootProps {
  pathname: string;
}

const isTurkishPath = (pathname: string) => /^\/tr(?:\/|$)/.test(pathname);

const SiteRoot = ({ pathname }: SiteRootProps) => {
  const knowledgePage = getKnowledgePage(pathname);

  if (knowledgePage) {
    return <KnowledgePage page={knowledgePage} />;
  }

  return isTurkishPath(pathname) ? <TurkishLanding /> : <App />;
};

export default SiteRoot;
