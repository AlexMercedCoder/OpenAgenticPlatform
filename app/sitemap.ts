import type { MetadataRoute } from 'next';
import { articles } from './knowledge-base/_content';
import { contentDates, latest } from './_lib/content-dates';

const base = 'https://openagenticplatform.com';

// lastmod is the content date from git (or an article's explicit `updated`), never the build time.
function lastModified(...files: string[]): Date | undefined {
  const { modified } = contentDates(...files);
  return modified ? new Date(`${modified}T00:00:00Z`) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified: lastModified('app/page.tsx', 'app/_data/stack.ts'), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/knowledge-base`, lastModified: lastModified('app/knowledge-base/page.tsx'), changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${base}/openness-scorecard`,
      lastModified: lastModified('app/openness-scorecard/page.tsx', 'app/openness-scorecard/Scorecard.tsx', 'app/_data/openness.ts'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...articles.map((entry) => {
      const modified = latest(contentDates(`app/knowledge-base/_content/${entry.slug}.tsx`).modified, entry.updated);
      return {
        url: `${base}/knowledge-base/${entry.slug}`,
        lastModified: modified ? new Date(`${modified}T00:00:00Z`) : undefined,
        changeFrequency: 'monthly' as const,
        priority: entry.kind === 'layer' ? 0.8 : 0.7,
      };
    }),
  ];
}
