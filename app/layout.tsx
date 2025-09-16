import './globals.css';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Background from '@/components/background';
import Script from 'next/script';

// Canonical site URL for metadata and JSON-LD (may include base path)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
// Use origin for metadataBase to avoid losing correctness when a base path exists
const SITE_ORIGIN = (() => {
  try { return new URL(SITE_URL).origin; } catch { return 'http://localhost:3000'; }
})();

export const metadata: Metadata = {
  title: 'Sam Harrington',
  description: 'Personal website of Sam Harrington',
  metadataBase: new URL(SITE_ORIGIN),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Sam Harrington',
    description: 'Data Science • Applied Math • Finance + AI',
    type: 'website',
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
  twitter: {
    card: 'summary_large_image',
    title: 'Sam Harrington',
    description: 'Data Science • Applied Math • Finance + AI',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-900 text-neutral-100">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded bg-accent px-3 py-2 text-neutral-900"
        >
          Skip to content
        </a>
        <Script id="ld-person" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Sam Harrington',
            url: SITE_URL,
            sameAs: [
              'https://www.linkedin.com/in/s-harrington011',
              'https://github.com/SammyHarry'
            ],
            alumniOf: 'College of William & Mary',
            jobTitle: 'Student',
            description: 'Data Science • Applied Math • Finance + AI'
          })}
        </Script>
        <Background />
        <Nav />
        <main id="content" className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
