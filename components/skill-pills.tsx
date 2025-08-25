interface SkillPillsProps {
  title: string;
  skills: string[];
}

export default function SkillPills({ title, skills }: SkillPillsProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="rounded-2xl bg-neutral-800 px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
