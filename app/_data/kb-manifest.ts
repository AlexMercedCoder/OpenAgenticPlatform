import { articles } from '../knowledge-base/_content';

export type KbEntry = {
  slug: string;
  title: string;
  kind: string;
  layer: string | null;
  summary: string;
  keywords: string[];
  sections: string[];
  sources: { label: string; url: string }[];
  url: string;
};

/**
 * A plain-data view of the knowledge base, safe to hand to a client component.
 * Article Body functions are deliberately excluded so nothing JSX-shaped is serialized.
 */
export const kbManifest: KbEntry[] = articles.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  kind: entry.kind,
  layer: entry.layer,
  summary: entry.summary,
  keywords: entry.keywords,
  sections: entry.sections.map((section) => section.label),
  sources: entry.learnMore.map((link) => ({ label: link.label, url: link.href })),
  url: `https://openagenticplatform.com/knowledge-base/${entry.slug}`,
}));
