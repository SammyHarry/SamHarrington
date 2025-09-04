import SectionHeader from '@/components/section-header';
import { withBase } from '@/lib/url';

export const metadata = {
  title: 'Transcript – Sam Harrington',
  description: 'Embedded transcript viewer with a direct download link.',
};

export default function TranscriptPage() {
  const pdfHref = withBase('/transcript.pdf');
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Academics" title="Official Transcript" blurb="View the embedded PDF below or download a copy." />
      <div className="rounded-2xl border border-white/5 bg-neutral-800/70 p-3">
        {/* Fallback download link visible above the embed for reliability */}
        <div className="mb-3">
          <a href={pdfHref} download className="btn">Download PDF</a>
          <a href={pdfHref} target="_blank" rel="noreferrer" className="btn ml-2">Open in new tab</a>
        </div>
        <object data={pdfHref} type="application/pdf" className="h-[80vh] w-full rounded-lg border border-neutral-800">
          <p className="p-4 text-neutral-300">
            Your browser can’t display the PDF. You can <a className="underline" href={pdfHref} download>download it</a> or
            {' '}<a className="underline" href={pdfHref} target="_blank" rel="noreferrer">open it in a new tab</a>.
          </p>
        </object>
      </div>
    </div>
  );
}

