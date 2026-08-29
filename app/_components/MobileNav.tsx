'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type NavItem = { label: string; href: string; external?: boolean };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`menu-bars${open ? ' is-open' : ''}`} aria-hidden="true"><i /><i /><i /></span>
        <span className="menu-word">{open ? 'CLOSE' : 'MENU'}</span>
      </button>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile navigation">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} rel="noopener" onClick={() => setOpen(false)}>{item.label}</a>
                ) : (
                  <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <p className="mobile-menu-foot">Open components. Explicit contracts. Operational freedom.</p>
      </div>
    </>
  );
}
