import createMDX from "@next/mdx";

// Enable MDX support
const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);
