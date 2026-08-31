import type { Metadata, Viewport } from 'next';
import './globals.css';
import { articles } from './knowledge-base/_content';

const BASE = 'https://openagenticplatform.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: 'Open Agentic Platform | A Composable AI Reference Architecture', template: '%s | Open Agentic Platform' },
  description: 'A vendor-neutral guide to building agentic AI with open data foundations, model choice, interchangeable harnesses, and portable standards. Includes a knowledge base covering every layer, technology, and openness property.',
  applicationName: 'Open Agentic Platform',
  authors: [{ name: 'Alex Merced', url: 'https://www.alexmerced.com' }],
  creator: 'Alex Merced',
  publisher: 'Open Agentic Platform',
  category: 'technology',
  keywords: [
    'open agentic platform', 'agentic AI architecture', 'open source AI', 'AI agents',
    'Model Context Protocol', 'MCP', 'Agent Skills', 'Open Agent Profile', 'OAP',
    'Agentic Graph Specification', 'AGS', 'Agent Approval Interchange Specification', 'AAIS', 'agent harness', 'agent broker',
    'Apache Iceberg', 'Apache Polaris', 'Apache Arrow', 'Apache Parquet', 'Apache Ossie',
    'open weight models', 'model routing', 'semantic layer', 'agent governance',
  ],
  alternates: { canonical: '/', types: { 'text/plain': '/llms.txt' } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  referrer: 'origin-when-cross-origin',
  openGraph: { title: 'Open Agentic Platform', description: 'An open agentic platform is a stack, not a suite.', url: BASE, siteName: 'Open Agentic Platform', type: 'website', locale: 'en_US', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Agentic Platform: a stack, not a suite' }] },
  twitter: { card: 'summary_large_image', title: 'Open Agentic Platform', description: 'Open components. Explicit contracts. Operational freedom.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0c0f10', colorScheme: 'light dark' };

const layerNames = ['Data and semantics', 'Models and routing', 'Harnesses and brokers', 'Open standards'];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      name: 'Open Agentic Platform',
      url: `${BASE}/`,
      description: 'A vendor-neutral reference architecture for composable agentic AI.',
      inLanguage: 'en-US',
      publisher: { '@id': `${BASE}/#alex-merced` },
      hasPart: { '@id': `${BASE}/knowledge-base#collection` },
    },
    {
      '@type': 'Person',
      '@id': `${BASE}/#alex-merced`,
      name: 'Alex Merced',
      url: 'https://www.alexmerced.com',
      sameAs: [
        'https://www.alexmercedai.com',
        'https://www.alexmerceddata.com',
        'https://alexmercedcoder.dev',
        'https://github.com/AlexMercedCoder',
        'https://www.linkedin.com/in/alexmerced',
        'https://amdatalakehouse.substack.com',
      ],
      knowsAbout: ['Agentic AI', 'Open standards', 'Data infrastructure', 'Apache Iceberg', 'Developer education'],
    },
    {
      '@type': 'TechArticle',
      '@id': `${BASE}/#reference-architecture`,
      headline: 'Open Agentic Platform Reference Architecture',
      description: 'A four-layer architecture spanning data and semantics, models and routing, harnesses and brokers, and open standards.',
      mainEntityOfPage: { '@id': `${BASE}/#website` },
      author: { '@id': `${BASE}/#alex-merced` },
      dateModified: '2026-08-31',
      inLanguage: 'en-US',
    },
    {
      '@type': 'ItemList',
      '@id': `${BASE}/#layers`,
      name: 'Open agentic platform layers',
      numberOfItems: layerNames.length,
      itemListElement: layerNames.map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })),
    },
    {
      '@type': 'CollectionPage',
      '@id': `${BASE}/knowledge-base#collection`,
      name: 'Open Agentic Platform knowledge base',
      url: `${BASE}/knowledge-base`,
      description: `Reference pages covering every layer, technology, and openness property in the open agentic platform architecture. ${articles.length} articles.`,
      isPartOf: { '@id': `${BASE}/#website` },
      inLanguage: 'en-US',
      author: { '@id': `${BASE}/#alex-merced` },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Knowledge base articles',
        numberOfItems: articles.length,
        itemListElement: articles.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.title,
          url: `${BASE}/knowledge-base/${entry.slug}`,
        })),
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
