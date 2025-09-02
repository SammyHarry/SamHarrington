'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';

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

  return (
    <header className="sticky top-0 z-50 dark:bg-neutral-900/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:dark:bg-neutral-900/60 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold">Sam Harrington</Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
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
          <li className="relative"
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
            >
              More <ChevronDown size={16} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border dark:border-neutral-800 border-neutral-200 dark:bg-neutral-900/95 bg-white p-2 shadow-xl">
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      path === l.href ? 'dark:bg-neutral-800 bg-neutral-100 text-accent' : 'dark:hover:bg-neutral-800 hover:bg-neutral-100'
                    }`}
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
          <li>
            <ThemeToggle />
          </li>
        </ul>
      )}
    </header>
  );
}
