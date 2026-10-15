import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getNetwork, getNetworkHeadScripts } from './_lib/network';

const network = getNetwork();
const headScripts = getNetworkHeadScripts();
const ALEX = { '@id': 'https://alexmerced.com/#alexmerced' };

const BASE = 'https://openagenticplatform.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { default: 'Open Agentic Platform | Composable AI Reference Architecture', template: '%s | Open Agentic Platform' },
  description: 'A vendor-neutral guide to agentic AI built on open data foundations, model choice, interchangeable harnesses, and portable standards, with a knowledge base.',
  applicationName: 'Open Agentic Platform',
  authors: [{ name: 'Alex Merced', url: 'https://alexmerced.com' }],
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
  twitter: { card: 'summary_large_image', site: network.twitterSite, title: 'Open Agentic Platform', description: 'Open components. Explicit contracts. Operational freedom.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0c0f10', colorScheme: 'light dark' };

// Site-wide node only. Page-specific nodes (the homepage reference architecture,
// layers, and video; the knowledge base collection) live on their own pages.
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
      publisher: ALEX,
      hasPart: { '@id': `${BASE}/knowledge-base#page` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {headScripts.map((script, index) =>
          script.src ? (
            <script key={index} async={script.async} src={script.src} />
          ) : (
            <script key={index} type={script.type} dangerouslySetInnerHTML={{ __html: script.content }} />
          ),
        )}
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
