import createMDX from "@next/mdx";

// Enable MDX support with a lightweight provider shim to avoid
// importing @mdx-js/react during static export (GH Pages build).
const withMDX = createMDX({
  options: {
    // Point provider import to a local shim that simply passes through components
    // to prevent bundling issues with createContext during build.
    providerImportSource: "@/mdx-components",
  },
});

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? (process.env.BASE_PATH || '') : '';
// Derive a canonical site URL for metadata, sitemap, and robots during
// GitHub Pages builds. Defaults to the project URL under the user's Pages.
// For local/dev or custom deployments, NEXT_PUBLIC_SITE_URL can override.
const siteOrigin = isGitHubPages
  ? 'https://sammyharry.github.io'
  : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
const siteUrl = `${siteOrigin}${basePath || ''}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for GitHub Pages builds
  ...(isGitHubPages ? { output: 'export', trailingSlash: true } : {}),
  // Expose basePath to the client for manual URL building (for <a> tags)
  env: {
    ...(isGitHubPages ? { NEXT_PUBLIC_BASE_PATH: basePath || '' } : {}),
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  images: {
    domains: [],
    // Avoid remote loader on static export
    ...(isGitHubPages ? { unoptimized: true } : {}),
  },
  // Support GitHub Pages project subpath without affecting local/prod builds
  ...(isGitHubPages && basePath
    ? { basePath, assetPrefix: basePath.endsWith('/') ? basePath : `${basePath}/` }
    : {}),
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
