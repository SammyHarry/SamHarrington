'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

export interface FormState {
  message: string;
}

export default function ContactForm({ action }: { action: (state: FormState, formData: FormData) => Promise<FormState> }) {
  const [state, formAction] = useFormState<FormState, FormData>(action, { message: '' });
  const [loading, setLoading] = useState(false);

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
