// Body text in knowledgePages.ts can link to another page of this site: [label](/route/).
// Only site-relative routes are recognised. Readers and llms-full.txt see the label alone.
const INLINE_LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export interface InlineSegment {
  text: string;
  href?: string;
}

export const splitInlineLinks = (text: string): InlineSegment[] => {
  const segments: InlineSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    if (match.index > cursor) segments.push({ text: text.slice(cursor, match.index) });
    segments.push({ text: match[1], href: match[2] });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor) });
  return segments;
};

export const stripInlineLinks = (text: string) => text.replace(INLINE_LINK, '$1');
