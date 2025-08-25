interface StatProps {
  label: string;
  value: string;
}

export default function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-2xl bg-neutral-800 p-4 text-center">
      <p className="text-2xl font-bold text-accent">{value}</p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );
}
