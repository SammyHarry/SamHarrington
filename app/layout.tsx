import './globals.css';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { Providers } from '@/components/theme-provider';
import Background from '@/components/background';

export const metadata: Metadata = {
  title: 'Sam Harrington',
  description: 'Personal website of Sam Harrington',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Sam Harrington',
    description: 'Data Science • Applied Math • Finance + AI',
    type: 'website',
    url: 'https://samharrington.dev',
  },
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
        <Providers>
          <Background />
          <Nav />
          <main className="container mx-auto px-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
