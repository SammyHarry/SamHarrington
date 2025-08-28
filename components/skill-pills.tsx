interface Skill {
  name: string;
  from: string;
}

interface SkillPillsProps {
  title: string;
  skills: Skill[];
}

export default function SkillPills({ title, skills }: SkillPillsProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.name}
            className="rounded-2xl bg-neutral-800 px-3 py-1 text-sm"
            title={s.from}
          >
            {s.name}
            <span className="ml-1 text-xs text-neutral-400">({s.from})</span>
          </span>
        ))}
      </div>
    </div>
  );
}
