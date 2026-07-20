import App from './App';
import TurkishLanding from './pages/TurkishLanding';

interface SiteRootProps {
  pathname: string;
}

const isTurkishPath = (pathname: string) => /^\/tr(?:\/|$)/.test(pathname);

const SiteRoot = ({ pathname }: SiteRootProps) => (
  isTurkishPath(pathname) ? <TurkishLanding /> : <App />
);

export default SiteRoot;
