import type { ReactNode } from 'react';

export type ArticleKind = 'layer' | 'technology' | 'concept' | 'glossary';

export type LearnMoreLink = {
  label: string;
  href: string;
  note: string;
};

export type ArticleSection = {
  id: string;
  label: string;
};

export type Article = {
  slug: string;
  title: string;
  kind: ArticleKind;
  /** Slug of the layer article this belongs to, or null for layer and glossary pages. */
  layer: string | null;
  kicker: string;
  /** One sentence used as the meta description and the card blurb. */
  summary: string;
  /** A short standfirst shown under the title. */
  standfirst: string;
  keywords: string[];
  sections: ArticleSection[];
  learnMore: LearnMoreLink[];
  related: string[];
  Body: () => ReactNode;
};
