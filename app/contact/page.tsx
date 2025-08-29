import SectionHeader from '@/components/section-header';
import ContactForm, { FormState } from '@/components/contact-form';

const IS_PAGES = process.env.GITHUB_PAGES === 'true';

type FormAction = (prev: FormState, formData: FormData) => Promise<FormState>;
let sendMessage: FormAction | undefined;

if (!IS_PAGES) {
  sendMessage = async (prev: FormState, formData: FormData): Promise<FormState> => {
    'use server';
    if (formData.get('website')) {
      return { message: 'Spam detected.' };
    }
    // placeholder server action
    return { message: 'Thanks! I will get back to you soon.' };
  };
}

export default function ContactPage() {
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Contact" title="Let's Talk" />
      {IS_PAGES ? (
        <div className="space-y-3 rounded-2xl border border-white/5 bg-neutral-800/70 p-4">
          <p className="text-neutral-300">For the test site, please reach me via email.</p>
          <a className="underline hover:text-accent" href="mailto:sharrington329@gmail.com">sharrington329@gmail.com</a>
        </div>
      ) : (
        <ContactForm action={sendMessage!} />
      )}
    </div>
  );
}
