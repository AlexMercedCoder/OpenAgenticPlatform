import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import WebMCP from '../../WebMCP';
import { kbManifest } from '../../_data/kb-manifest';
import { SiteHeader } from '../../_components/SiteHeader';
import { NewsletterBand, SiteFooter } from '../../_components/SiteFooter';
import { articles, articlesBySlug } from '../_content';

const kindLabel: Record<string, string> = {
  layer: 'Layer',
  technology: 'Technology',
  concept: 'Openness test',
  glossary: 'Reference',
};

export function generateStaticParams() {
  return articles.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesBySlug.get(slug);
  if (!article) return {};
  const url = `https://openagenticplatform.com/knowledge-base/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    keywords: article.keywords,
    alternates: { canonical: `/knowledge-base/${article.slug}` },
    openGraph: {
      title: `${article.title} | Open Agentic Platform`,
      description: article.summary,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: article.title }],
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.summary, images: ['/og.png'] },
  };
}

export default async function KnowledgeBaseArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articlesBySlug.get(slug);
  if (!article) notFound();

  const parent = article.layer ? articlesBySlug.get(article.layer) : null;
  const related = article.related.map((entry) => articlesBySlug.get(entry)).filter((entry) => entry !== undefined);
  const url = `https://openagenticplatform.com/knowledge-base/${article.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.summary,
        url,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', '@id': 'https://openagenticplatform.com/#website' },
        author: { '@type': 'Person', name: 'Alex Merced', url: 'https://www.alexmerced.com' },
        publisher: { '@type': 'Organization', name: 'Open Agentic Platform', url: 'https://openagenticplatform.com/' },
        dateModified: '2026-08-28',
        keywords: article.keywords.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openagenticplatform.com/' },
          { '@type': 'ListItem', position: 2, name: 'Knowledge base', item: 'https://openagenticplatform.com/knowledge-base' },
          ...(parent ? [{ '@type': 'ListItem', position: 3, name: parent.title, item: `https://openagenticplatform.com/knowledge-base/${parent.slug}` }] : []),
          { '@type': 'ListItem', position: parent ? 4 : 3, name: article.title, item: url },
        ],
      },
    ],
  };

  const Body = article.Body;

  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <article className="kb-article">
        <div className="wrap kb-head">
          <nav className="kb-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/knowledge-base">Knowledge base</Link>
            {parent ? (<><span aria-hidden="true">/</span><Link href={`/knowledge-base/${parent.slug}`}>{parent.title}</Link></>) : null}
          </nav>
          <p className="section-label">{article.kicker}</p>
          <h1>{article.title}</h1>
          <p className="kb-standfirst">{article.standfirst}</p>
          <p className="kb-kind">{kindLabel[article.kind]}</p>
        </div>

        <div className="wrap kb-body-grid">
          <aside className="kb-toc" aria-label="On this page">
            <p className="footer-col-title">On this page</p>
            <ol>
              {article.sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>
              ))}
              <li><a href="#learn-more">Where to learn more</a></li>
            </ol>
          </aside>

          <div className="kb-prose">
            <Body />

            <section className="kb-learn-more" id="learn-more">
              <h2>Where to learn more</h2>
              <p>Primary sources first. Documentation and specifications move faster than any summary, so treat the links below as the authority and this page as orientation.</p>
              <ul>
                {article.learnMore.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} rel="noopener">{link.label} ↗</a>
                    <span>{link.note}</span>
                  </li>
                ))}
              </ul>
            </section>

            {related.length ? (
              <section className="kb-related" id="related">
                <h2>Related pages</h2>
                <ul>
                  {related.map((entry) => (
                    <li key={entry.slug}>
                      <Link href={`/knowledge-base/${entry.slug}`}>{entry.title}</Link>
                      <span>{entry.summary}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </article>

      <NewsletterBand />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
