'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

export interface FormState {
  message: string;
}

type Props = {
  action?: (state: FormState, formData: FormData) => Promise<FormState>;
};

export default function ContactForm({ action }: Props) {
  const [loading, setLoading] = useState(false);
  const noop = async () => ({ message: '' });
  const [state, formAction] = useFormState<FormState, FormData>((action as any) ?? (noop as any), { message: '' });

  if (action) {
    return (
      <form action={formAction} onSubmit={() => setLoading(true)} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <input type="email" name="email" placeholder="Email" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <textarea name="message" placeholder="Message" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <button type="submit" disabled={loading} className="rounded-md bg-accent px-4 py-2 text-neutral-900">
          {loading ? 'Sending...' : 'Send'}
        </button>
        {state.message && <p>{state.message}</p>}
      </form>
    );
  }

  // Client-only fallback: opens email client with prefilled content
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const fd = new FormData(form);
        if (fd.get('website')) return; // honeypot
        const name = encodeURIComponent(String(fd.get('name') || ''));
        const email = encodeURIComponent(String(fd.get('email') || ''));
        const message = encodeURIComponent(String(fd.get('message') || ''));
        const subject = `Website contact from ${name}`;
        const body = `From: ${name}%0AEmail: ${email}%0A%0A${message}`;
        window.location.href = `mailto:sharrington329@gmail.com?subject=${subject}&body=${body}`;
      }}
      className="space-y-4"
    >
      <input type="text" name="name" placeholder="Name" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
      <input type="email" name="email" placeholder="Email" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
      <textarea name="message" placeholder="Message" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button type="submit" className="rounded-md bg-accent px-4 py-2 text-neutral-900">Email Me</button>
    </form>
  );
}
