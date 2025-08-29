interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  blurb?: string;
}

export default function SectionHeader({ eyebrow, title, blurb }: SectionHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <p className="text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 mb-4 text-3xl font-bold gradient-text">{title}</h2>
      {blurb && <p className="text-neutral-400 max-w-2xl mx-auto">{blurb}</p>}
    </div>
  );
}
