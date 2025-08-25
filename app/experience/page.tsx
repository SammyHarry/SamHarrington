import SectionHeader from '@/components/section-header';
import Timeline from '@/components/timeline';

export default function ExperiencePage() {
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Experience" title="What I've Done" />
      <Timeline />
    </div>
  );
}
