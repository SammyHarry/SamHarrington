import SectionHeader from '@/components/section-header';
import ContactForm, { FormState } from '@/components/contact-form';

async function sendMessage(prev: FormState, formData: FormData): Promise<FormState> {
  'use server';
  if (formData.get('website')) {
    return { message: 'Spam detected.' };
  }
  // placeholder server action
  return { message: 'Thanks! I will get back to you soon.' };
}

export default function ContactPage() {
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Contact" title="Let's Talk" />
      <ContactForm action={sendMessage} />
    </div>
  );
}
