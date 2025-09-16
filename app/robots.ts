import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // Ensure sitemap respects GitHub Pages base path by not using a leading slash
  const sitemap = new URL('sitemap.xml', base).toString();
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap,
    // host optional; omit to avoid mismatches when a base path is present
  };
}
