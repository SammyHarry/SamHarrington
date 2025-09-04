import SectionHeader from '@/components/section-header';
import Timeline from '@/components/timeline';
import QuickLinks from '@/components/quick-links';

export default function ExperiencePage() {
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Experience" title="What I've Done" />
      <div className="mb-6">
        <QuickLinks
          items={[
            { href: '/sam-harrington-resume.pdf', label: 'Résumé', title: 'Download PDF', external: true },
            { href: '/projects', label: 'Projects', title: 'Explore Case Studies' },
            { href: '/contact', label: 'Contact', title: 'Let’s Talk' },
            { href: '/academics', label: 'Academics', title: 'See Coursework' },
          ]}
        />
      </div>
      <Timeline />
    </div>
  );
}
