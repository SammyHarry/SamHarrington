import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Sam Harrington',
  description: 'Personal website of Sam Harrington',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-900 text-neutral-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Nav />
          <main className="container mx-auto px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
