import createMDX from '@next/mdx';

const withMDX = createMDX({});

export default withMDX({
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
});
