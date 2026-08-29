import type { MetadataRoute } from 'next';
import { articles } from './knowledge-base/_content';

const base = 'https://openagenticplatform.com';
const lastModified = new Date('2026-08-29');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/knowledge-base`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...articles.map((entry) => ({
      url: `${base}/knowledge-base/${entry.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: entry.kind === 'layer' ? 0.8 : 0.7,
    })),
  ];
}
