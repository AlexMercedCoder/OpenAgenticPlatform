import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="topbar wrap">
      <Link href="/" className="logo"><span className="logo-grid"><i /><i /><i /><i /></span><b>OPEN AGENTIC<br />PLATFORM</b></Link>
      <nav aria-label="Primary navigation">
        <Link href="/#stack">The stack</Link>
        <Link href="/#tests">Openness test</Link>
        <Link href="/#books">Books</Link>
        <Link className="spec-link" href="/knowledge-base">Knowledge base →</Link>
      </nav>
    </header>
  );
}
