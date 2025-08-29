import SectionHeader from '@/components/section-header';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Contact" title="Let's Talk" />
      <ContactForm />
    </div>
  );
}
