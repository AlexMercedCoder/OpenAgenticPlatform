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
  /** Meta description (140 to 160 characters) when the summary is too short or long for search. */
  description?: string;
  /** A short standfirst shown under the title. */
  standfirst: string;
  keywords: string[];
  sections: ArticleSection[];
  learnMore: LearnMoreLink[];
  related: string[];
  /** ISO date of the last substantive edit, used as dateModified. Defaults to the original publish date. */
  updated?: string;
  Body: () => ReactNode;
};
