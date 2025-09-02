export function withBase(href: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!base) return href;
  // If href already includes the base, avoid duplicating
  if (href.startsWith(base + '/')) return href;
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return `${base}${href}`;
}

