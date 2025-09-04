import { withBase } from '@/lib/url';

type QuickLink = {
  href: string;
  label: string;
  title: string;
  external?: boolean;
};

export default function QuickLinks({ items }: { items: QuickLink[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <a
          key={it.href + it.title}
          href={withBase(it.href)}
          target={it.external ? '_blank' : undefined}
          rel={it.external ? 'noreferrer' : undefined}
          className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 transition hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent"
        >
          <p className="text-sm uppercase tracking-wider text-neutral-400">{it.label}</p>
          <p className="mt-1 font-semibold">{it.title} →</p>
        </a>
      ))}
    </div>
  );
}

