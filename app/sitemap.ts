import type { MetadataRoute } from 'next';
import { articles } from './knowledge-base/_content';

const base = 'https://openagenticplatform.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/knowledge-base`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/openness-scorecard`, changeFrequency: 'monthly', priority: 0.9 },
    ...articles.map((entry) => ({
      url: `${base}/knowledge-base/${entry.slug}`,
      changeFrequency: 'monthly' as const,
      priority: entry.kind === 'layer' ? 0.8 : 0.7,
    })),
  ];
}
