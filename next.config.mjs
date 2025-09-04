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

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable static export for GitHub Pages builds
  ...(isGitHubPages ? { output: 'export', trailingSlash: true } : {}),
  // Expose basePath to the client for manual URL building (for <a> tags)
  env: {
    ...(isGitHubPages ? { NEXT_PUBLIC_BASE_PATH: basePath || '' } : {}),
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
