"use client";

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
  const [clientMessage, setClientMessage] = useState('');
  const noop = async () => ({ message: '' });
  const [state, formAction] = useFormState<FormState, FormData>((action as any) ?? (noop as any), { message: '' });

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  // If a server action is provided (SSR/email gateway), use it
  if (action) {
    return (
      <form action={formAction} onSubmit={() => setLoading(true)} className="space-y-4">
        <label htmlFor="name" className="block text-sm text-neutral-300">Name</label>
        <input id="name" type="text" name="name" placeholder="Your name" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <label htmlFor="email" className="block text-sm text-neutral-300">Email</label>
        <input id="email" type="email" name="email" placeholder="you@example.com" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <label htmlFor="message" className="block text-sm text-neutral-300">Message</label>
        <textarea id="message" name="message" placeholder="How can I help?" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" aria-describedby="contact-hint" />
        <p id="contact-hint" className="text-xs text-neutral-400">I usually respond within 24–48 hours.</p>
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <button type="submit" disabled={loading} className="rounded-md bg-accent px-4 py-2 text-neutral-900">
          {loading ? 'Sending...' : 'Send'}
        </button>
        {(state.message || clientMessage) && <p className="text-sm text-neutral-300">{state.message || clientMessage}</p>}
      </form>
    );
  }

  // Client-only: Prefer Formspree if configured; otherwise fall back to mailto
  if (formspreeId) {
    return (
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setClientMessage('');
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          if (fd.get('website')) return; // honeypot
          try {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
              method: 'POST',
              headers: { 'Accept': 'application/json' },
              body: fd,
            });
            if (res.ok) {
              (e.currentTarget as HTMLFormElement).reset();
              setClientMessage("Thanks — your message was sent. I'll reply soon.");
            } else {
              setClientMessage('Something went wrong. Please email me directly.');
            }
          } catch {
            setClientMessage('Network error. Please email me directly.');
          } finally {
            setLoading(false);
          }
        }}
      >
        <label htmlFor="name2" className="block text-sm text-neutral-300">Name</label>
        <input id="name2" type="text" name="name" placeholder="Your name" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <label htmlFor="email2" className="block text-sm text-neutral-300">Email</label>
        <input id="email2" type="email" name="email" placeholder="you@example.com" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
        <label htmlFor="message2" className="block text-sm text-neutral-300">Message</label>
        <textarea id="message2" name="message" placeholder="How can I help?" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" aria-describedby="contact-hint2" />
        <p id="contact-hint2" className="text-xs text-neutral-400">I usually respond within 24–48 hours.</p>
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <button type="submit" disabled={loading} className="rounded-md bg-accent px-4 py-2 text-neutral-900">
          {loading ? 'Sending...' : 'Send'}
        </button>
        {clientMessage && <p className="text-sm text-neutral-300">{clientMessage}</p>}
      </form>
    );
  }

  // Fallback: opens email client with prefilled content
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
      <label htmlFor="name3" className="block text-sm text-neutral-300">Name</label>
      <input id="name3" type="text" name="name" placeholder="Your name" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
      <label htmlFor="email3" className="block text-sm text-neutral-300">Email</label>
      <input id="email3" type="email" name="email" placeholder="you@example.com" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" />
      <label htmlFor="message3" className="block text-sm text-neutral-300">Message</label>
      <textarea id="message3" name="message" placeholder="How can I help?" required className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2" aria-describedby="contact-hint3" />
      <p id="contact-hint3" className="text-xs text-neutral-400">I usually respond within 24–48 hours.</p>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <button type="submit" className="rounded-md bg-accent px-4 py-2 text-neutral-900">Email Me</button>
    </form>
  );
}
