import type { Metadata } from 'next';
import Link from 'next/link';
import WebMCP from '../WebMCP';
import { kbManifest } from '../_data/kb-manifest';
import { SiteHeader } from '../_components/SiteHeader';
import { NewsletterBand, SiteFooter } from '../_components/SiteFooter';
import { articles, conceptArticles, glossaryArticles, layerArticles, technologiesFor } from './_content';

export const metadata: Metadata = {
  title: 'Knowledge base',
  description: 'Plain-language reference pages for every layer, technology, and openness property in the open agentic platform architecture.',
  keywords: ['agentic AI knowledge base', 'open agentic platform reference', 'MCP explained', 'Apache Iceberg for agents', 'agent harness', 'agent broker'],
  alternates: { canonical: '/knowledge-base' },
  openGraph: {
    title: 'Open Agentic Platform knowledge base',
    description: 'Reference pages for every layer, technology, and openness property in the architecture.',
    url: 'https://openagenticplatform.com/knowledge-base',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Agentic Platform knowledge base' }],
  },
};

const layerColor: Record<string, string> = {
  'data-and-semantics': 'lime',
  'models-and-routing': 'cyan',
  'harnesses-and-brokers': 'amber',
  'open-standards': 'pink',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://openagenticplatform.com/knowledge-base#page',
      name: 'Open Agentic Platform knowledge base',
      description: 'Reference pages for every layer, technology, and openness property in the open agentic platform architecture.',
      url: 'https://openagenticplatform.com/knowledge-base',
      isPartOf: { '@type': 'WebSite', '@id': 'https://openagenticplatform.com/#website' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://openagenticplatform.com/knowledge-base#index',
      name: 'Knowledge base articles',
      numberOfItems: articles.length,
      itemListElement: articles.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: entry.title,
        url: `https://openagenticplatform.com/knowledge-base/${entry.slug}`,
      })),
    },
  ],
};

export default function KnowledgeBaseIndex() {
  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <section className="kb-hero wrap">
        <p className="section-label">KNOWLEDGE BASE / REFERENCE</p>
        <h1>Every part of the stack,<br />explained in plain language.</h1>
        <p className="kb-hero-copy">
          The homepage names the components. These pages explain them. Each entry covers what a technology
          actually is, the problem it was built to solve, how it behaves inside an agentic system, where it
          stops, and which primary sources to read next. Nothing here is a ranking or an endorsement.
        </p>
      </section>

      {layerArticles.map((layer) => {
        const technologies = technologiesFor(layer.slug);
        return (
          <section className={`kb-group wrap ${layerColor[layer.slug] ?? ''}`} key={layer.slug} id={layer.slug}>
            <div className="kb-group-head">
              <div>
                <p className="section-label">{layer.kicker}</p>
                <h2><Link href={`/knowledge-base/${layer.slug}`}>{layer.title}</Link></h2>
              </div>
              <p>{layer.summary}</p>
            </div>
            <div className="kb-card-grid">
              <Link className="kb-card feature" href={`/knowledge-base/${layer.slug}`}>
                <span>LAYER OVERVIEW</span>
                <b>{layer.title}</b>
                <p>{layer.standfirst}</p>
              </Link>
              {technologies.map((entry) => (
                <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                  <span>{entry.kicker}</span>
                  <b>{entry.title}</b>
                  <p>{entry.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {conceptArticles.length ? (
        <section className="kb-group wrap" id="openness-test">
          <div className="kb-group-head">
            <div>
              <p className="section-label">THE OPENNESS TEST</p>
              <h2>Six properties to check</h2>
            </div>
            <p>Open licenses do not guarantee an open architecture. These six pages describe what to look for and how each property fails in practice.</p>
          </div>
          <div className="kb-card-grid">
            {conceptArticles.map((entry) => (
              <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                <span>{entry.kicker}</span>
                <b>{entry.title}</b>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {glossaryArticles.length ? (
        <section className="kb-group wrap" id="reference">
          <div className="kb-group-head">
            <div>
              <p className="section-label">SHARED VOCABULARY</p>
              <h2>Reference</h2>
            </div>
            <p>Terms used consistently across this site, defined once so the rest of the pages can stay short.</p>
          </div>
          <div className="kb-card-grid">
            {glossaryArticles.map((entry) => (
              <Link className="kb-card" href={`/knowledge-base/${entry.slug}`} key={entry.slug}>
                <span>{entry.kicker}</span>
                <b>{entry.title}</b>
                <p>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <NewsletterBand />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
