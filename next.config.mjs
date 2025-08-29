import createMDX from "@next/mdx";

// Enable MDX support
const withMDX = createMDX();

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? (process.env.BASE_PATH || '') : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for GitHub Pages builds
  ...(isGitHubPages ? { output: 'export', trailingSlash: true } : {}),
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
