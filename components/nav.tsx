'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const primaryLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/academics', label: 'Academics' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

const moreLinks = [
  { href: '/coursework', label: 'Coursework' },
  { href: '/writing', label: 'Writing' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/awards', label: 'Awards' },
  { href: '/genai', label: 'GenAI' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const path = usePathname();
  function onMoreKeyDown(e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) {
    if (e.key === 'Escape') setMoreOpen(false);
    if ((e.currentTarget as HTMLElement).tagName === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      setMoreOpen((v) => !v);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold">Sam Harrington</Link>
        <div className="flex items-center gap-3">
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
          </button>
        </div>
        <ul className="hidden md:flex items-center gap-4">
          {primaryLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={path === l.href ? 'text-accent' : 'hover:text-accent transition-colors'}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              className={`flex items-center gap-1 rounded-md px-2 py-1 transition-colors ${
                moreLinks.some((l) => l.href === path) ? 'text-accent' : 'hover:text-accent'
              }`}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
              onKeyDown={onMoreKeyDown}
            >
              More <ChevronDown size={16} />
            </button>
            {moreOpen && (
              <div
                role="menu"
                aria-label="More pages"
                tabIndex={-1}
                onKeyDown={onMoreKeyDown}
                className="absolute right-0 mt-2 w-44 rounded-xl border border-neutral-800 bg-neutral-900/95 p-2 shadow-xl"
              >
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      path === l.href ? 'bg-neutral-800 text-accent' : 'hover:bg-neutral-800'
                    }`}
                    onClick={() => setMoreOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </nav>
      {open && (
        <ul className="md:hidden flex flex-col gap-4 p-4">
          {[...primaryLinks, ...moreLinks].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="block">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
