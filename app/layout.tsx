import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://openagenticplatform.com'),
  title: 'Open Agentic Platform | A Composable AI Reference Architecture',
  description: 'A vendor-neutral guide to building agentic AI with open data foundations, model choice, interchangeable harnesses, and portable standards.',
  openGraph: { title: 'Open Agentic Platform', description: 'An open agentic platform is a stack, not a suite.', url: 'https://openagenticplatform.com', siteName: 'Open Agentic Platform', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Open Agentic Platform — a stack, not a suite' }] },
  twitter: { card: 'summary_large_image', title: 'Open Agentic Platform', description: 'Open components. Explicit contracts. Operational freedom.', images: ['/og.png'] },
};

const structuredData = { '@context':'https://schema.org', '@type':'WebSite', name:'Open Agentic Platform', url:'https://openagenticplatform.com', description:'A vendor-neutral reference architecture for composable agentic AI.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></body></html>}
