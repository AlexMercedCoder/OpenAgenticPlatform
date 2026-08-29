import Link from 'next/link';
import { MobileNav, type NavItem } from './MobileNav';

const navItems: NavItem[] = [
  { label: 'The stack', href: '/#stack' },
  { label: 'Knowledge base', href: '/knowledge-base' },
  { label: 'Openness test', href: '/#tests' },
  { label: 'Build path', href: '/#build' },
  { label: 'Books', href: '/#books' },
  { label: 'Newsletter', href: '/#newsletter' },
  { label: 'View source on GitHub', href: 'https://github.com/AlexMercedCoder/OpenAgenticPlatform', external: true },
];

export function SiteHeader() {
  return (
    <header className="topbar wrap">
      <Link href="/" className="logo"><span className="logo-grid"><i /><i /><i /><i /></span><b>OPEN AGENTIC<br />PLATFORM</b></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#stack">The stack</Link>
        <Link href="/knowledge-base">Knowledge base</Link>
        <Link href="/#tests">Openness test</Link>
        <Link href="/#books">Books</Link>
        <a className="spec-link" href="https://github.com/AlexMercedCoder/OpenAgenticPlatform" rel="noopener">View source ↗</a>
      </nav>
      <MobileNav items={navItems} />
    </header>
  );
}
