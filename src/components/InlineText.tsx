import { splitInlineLinks } from '@/content/inlineLinks';
import { knowledgePages } from '@/content/knowledgePages';

const siteRoutes = new Set(['/', '/tr/', ...knowledgePages.map(({ route }) => route)]);

const InlineText = ({ text }: { text: string }) => (
  <>
    {splitInlineLinks(text).map(({ text: label, href }, index) => {
      if (!href) return label;

      // A link to a route the site does not build must stop the prerender, not ship as a 404.
      if (!siteRoutes.has(href.split('#')[0])) {
        throw new Error(`Body link points to a route this site does not build: ${href}`);
      }

      return (
        <a
          key={`${href}-${index}`}
          href={href}
          className="font-medium text-orange-400 underline decoration-orange-400/40 underline-offset-4 hover:text-orange-300"
        >
          {label}
        </a>
      );
    })}
  </>
);

export default InlineText;
