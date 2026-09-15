import { useEffect } from 'react';
import { INSIGHTS_HREF } from './i18n.js';

// Preserve old hash bookmarks without downloading the complete article corpus.
export function BlogPage() {
  useEffect(() => {
    const slug = location.hash.match(/^#blog\/([a-z0-9-]+)(?:$|#)/)?.[1];
    location.replace(slug ? `/insights/${slug}/` : INSIGHTS_HREF);
  }, []);
  return <p style={{padding:'48px'}}><a href={INSIGHTS_HREF}>Insights →</a></p>;
}
