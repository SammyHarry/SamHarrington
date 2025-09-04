// Minimal MDX provider shim for Next.js app router builds.
// Avoids importing @mdx-js/react on the server/export path.
export function useMDXComponents(components: Record<string, any> = {}) {
  return components;
}

