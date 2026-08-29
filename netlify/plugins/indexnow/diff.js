export const changedCanonicalUrls = (previous, current) => {
  if (!Array.isArray(previous) || previous.some(({ canonical, contentHash }) => !canonical || !contentHash)) {
    const previousCanonicals = Array.isArray(previous) ? previous.map(({ canonical }) => canonical).filter(Boolean) : [];
    return [...new Set([...current.map(({ canonical }) => canonical), ...previousCanonicals])];
  }

  const previousByCanonical = new Map(previous.map(({ canonical, contentHash }) => [canonical, contentHash]));
  const currentByCanonical = new Map(current.map(({ canonical, contentHash }) => [canonical, contentHash]));
  const changedOrNew = current
    .filter(({ canonical, contentHash }) => previousByCanonical.get(canonical) !== contentHash)
    .map(({ canonical }) => canonical);
  const removed = previous
    .filter(({ canonical }) => !currentByCanonical.has(canonical))
    .map(({ canonical }) => canonical);
  return [...new Set([...changedOrNew, ...removed])];
};
