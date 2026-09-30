import Link from 'next/link';
import { communityLinks, connectLinks, newsletter } from '../_data/network';
import { getNetwork } from '../_lib/network';

export function NewsletterBand() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="wrap newsletter-grid">
        <div>
          <p className="section-label">TWO NEWSLETTERS / ONE LIST</p>
          <h2>Read the week<br />before you build.</h2>
          <p className="newsletter-copy">
            Alex Merced writes two free weekly newsletters on Substack. One subscription gets you both.
          </p>
          <a className="action primary" href={newsletter.href} rel="noopener">SUBSCRIBE ON SUBSTACK ↗</a>
        </div>
        <ul className="newsletter-list">
          {newsletter.editions.map((edition) => (
            <li key={edition.day}>
              <span>{edition.day.toUpperCase()}</span>
              <b>{edition.title}</b>
              <p>{edition.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NetworkCta() {
  const { cta } = getNetwork();
  if (!cta) return null;
  return (
    <section className="network-cta" aria-label={cta.heading}>
      <div className="wrap network-cta-inner">
        <p className="network-cta-title">{cta.heading}</p>
        <ul>
          {cta.links.map((link) => (
            <li key={link.url}><a href={link.url} rel="noopener" data-network-event={link.event}>{link.label} ↗</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { footer } = getNetwork();
  return (
    <>
    <NetworkCta />
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <Link href="/" className="logo"><span className="logo-grid"><i /><i /><i /><i /></span><b>OPEN AGENTIC<br />PLATFORM</b></Link>
          <p>A vendor-neutral educational reference for open agentic architecture, and one node in the Alex Merced network of sites.</p>
        </div>

        <nav className="footer-columns" aria-label="The Alex Merced network">
          {footer.groups.map((group) => (
            <div key={group.title}>
              <p className="footer-col-title">{group.title}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.url}><a href={link.url} rel="noopener">{link.title}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="footer-col-title">The network</p>
            <ul>
              <li><a href={footer.allSitesUrl} rel="noopener">{footer.allSitesLabel} ↗</a></li>
            </ul>
          </div>
        </nav>

        <nav className="footer-columns secondary" aria-label="Community, events, and social">
          <div>
            <p className="footer-col-title">Community and events</p>
            <ul>
              {communityLinks.map((link) => (
                <li key={link.href}><a href={link.href} rel="noopener">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Connect</p>
            <ul>
              {connectLinks.map((link) => (
                <li key={link.href}><a href={link.href} rel="me noopener">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">This site</p>
            <ul>
              <li><Link href="/knowledge-base">Knowledge base</Link></li>
              <li><Link href="/#stack">The stack</Link></li>
              <li><Link href="/#tests">Openness test</Link></li>
              <li><Link href="/#build">Build path</Link></li>
              <li><Link href="/#books">AI books</Link></li>
              <li><a href="/llms.txt">llms.txt</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Newsletter</p>
            <ul>
              <li><a href={newsletter.href} rel="noopener">AI newsletter, Thursdays</a></li>
              <li><a href={newsletter.href} rel="noopener">Apache lakehouse newsletter, Fridays</a></li>
            </ul>
          </div>
        </nav>

        <div className="footer-bottom">
          <span>© 2026 Alex Merced. Community concepts; trademarks belong to their owners.</span>
          <span>Apache project names describe subject matter only and imply no affiliation or endorsement.</span>
        </div>
      </div>
    </footer>
    </>
  );
}
