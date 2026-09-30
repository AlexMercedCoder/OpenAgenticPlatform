import type { Metadata } from 'next';
import Link from 'next/link';
import WebMCP from '../WebMCP';
import { kbManifest } from '../_data/kb-manifest';
import { SiteHeader } from '../_components/SiteHeader';
import { NewsletterBand, SiteFooter } from '../_components/SiteFooter';
import { MAX_SCORE, SCORECARD_URL, bands, opennessTests } from '../_data/openness';
import Scorecard from './Scorecard';

const TITLE = 'Openness scorecard: score your agentic AI stack';
const DESCRIPTION = 'Score any agentic AI stack on six openness tests (replaceable, inspectable, portable, bounded, grounded, auditable), 0 to 2 each, with evidence. Runs in your browser; download JSON or print.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/openness-scorecard' },
  openGraph: {
    title: 'Openness scorecard | Open Agentic Platform',
    description: DESCRIPTION,
    url: SCORECARD_URL,
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Agentic Platform openness scorecard' }],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${SCORECARD_URL}#app`,
      name: 'Openness scorecard for agentic AI stacks',
      url: SCORECARD_URL,
      description: DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (runs in the browser)',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': 'https://alexmerced.com/#alexmerced' },
      isPartOf: { '@id': 'https://openagenticplatform.com/#website' },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://openagenticplatform.com/' },
        { '@type': 'ListItem', position: 2, name: 'Openness scorecard', item: SCORECARD_URL },
      ],
    },
  ],
};

export default function OpennessScorecardPage() {
  return (
    <main>
      <WebMCP knowledgeBase={kbManifest} />
      <SiteHeader />

      <section className="kb-hero wrap scorecard-hero">
        <p className="section-label">THE OPENNESS TEST / SCORECARD</p>
        <h1>Score your stack.</h1>
        <p className="kb-hero-copy">
          Six tests decide whether an agentic architecture is open in practice, whatever its licenses say. Give each
          one 0 (absent), 1 (partial), or 2 (demonstrated), and write down the evidence. The total is out of {MAX_SCORE}.
          Score the system you run, not the one on the roadmap.
        </p>
        <p className="scorecard-links no-print">
          <a href="/openness-scorecard.json" download>Blank scorecard as JSON</a>
          <span aria-hidden="true"> · </span>
          <Link href="/#tests">The six tests on the homepage</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/#scorecards">Two worked examples</Link>
        </p>
      </section>

      <section className="wrap scorecard-wrap">
        <Scorecard />
      </section>

      <section className="wrap scorecard-notes no-print">
        <h2>How to read the score</h2>
        <ul>
          {bands.map((b, i) => (
            <li key={b.label}>
              <b>{b.min}{i < bands.length - 1 ? ` to ${bands[i + 1].min - 1}` : ''}: {b.label}.</b> {b.advice}
            </li>
          ))}
        </ul>
        <h2>Using it well</h2>
        <ul>
          <li><b>Evidence beats opinion.</b> A 2 means someone exercised the property: swapped the component, exported and reloaded the profile, replayed the decision. Claimed support is a 1.</li>
          <li><b>Score the relationships.</b> A stack of open-source parts can still score low if every part assumes the others.</li>
          <li><b>Repeat it.</b> Score again when a major component changes, and keep the JSON next to the architecture decision it informed.</li>
        </ul>
        <p>
          Each test has a full explainer in the knowledge base:{' '}
          {opennessTests.map((t, i) => (
            <span key={t.id}><Link href={`/knowledge-base/${t.id}`}>{t.title}</Link>{i < opennessTests.length - 1 ? ', ' : '.'}</span>
          ))}
        </p>
        <p className="scorecard-license">The scorecard questions and rubric are licensed <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener">CC BY 4.0</a>. Reuse and adapt them with credit to Alex Merced, openagenticplatform.com.</p>
      </section>

      <NewsletterBand />
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
