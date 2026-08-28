import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://openagenticplatform.com'),
  title: { default: 'Open Agentic Platform | A Composable AI Reference Architecture', template: '%s | Open Agentic Platform' },
  description: 'A vendor-neutral guide to building agentic AI with open data foundations, model choice, interchangeable harnesses, and portable standards.',
  applicationName: 'Open Agentic Platform',
  authors: [{ name: 'Alex Merced', url: 'https://www.alexmerced.com' }],
  creator: 'Alex Merced',
  publisher: 'Open Agentic Platform',
  category: 'technology',
  keywords: ['open agentic platform', 'agentic AI architecture', 'open source AI', 'AI agents', 'MCP', 'Agent Skills', 'OAP', 'AGS', 'Apache Iceberg'],
  alternates: { canonical: '/', types: { 'text/plain': '/llms.txt' } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  referrer: 'origin-when-cross-origin',
  openGraph: { title: 'Open Agentic Platform', description: 'An open agentic platform is a stack, not a suite.', url: 'https://openagenticplatform.com', siteName: 'Open Agentic Platform', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Agentic Platform — a stack, not a suite' }] },
  twitter: { card: 'summary_large_image', title: 'Open Agentic Platform', description: 'Open components. Explicit contracts. Operational freedom.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0c0f10', colorScheme: 'light dark' };

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': 'https://openagenticplatform.com/#website', name: 'Open Agentic Platform', url: 'https://openagenticplatform.com/', description: 'A vendor-neutral reference architecture for composable agentic AI.', inLanguage: 'en-US' },
    { '@type': 'TechArticle', '@id': 'https://openagenticplatform.com/#reference-architecture', headline: 'Open Agentic Platform Reference Architecture', description: 'A four-layer architecture spanning data and semantics, models and routing, harnesses and brokers, and open standards.', mainEntityOfPage: { '@id': 'https://openagenticplatform.com/#website' }, author: { '@type': 'Person', name: 'Alex Merced', url: 'https://www.alexmerced.com' }, dateModified: '2026-08-28', inLanguage: 'en-US' },
    { '@type': 'ItemList', '@id': 'https://openagenticplatform.com/#layers', name: 'Open agentic platform layers', numberOfItems: 4, itemListElement: ['Data and semantics', 'Models and routing', 'Harnesses and brokers', 'Open standards'].map((name, index) => ({ '@type': 'ListItem', position: index + 1, name })) },
  ],
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></body></html>}
