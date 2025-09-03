"use client";

import { useEffect } from 'react';
import { withBase } from '@/lib/url';

export default function AIPage() {
  useEffect(() => {
    // Client-side redirect to consolidated page
    window.location.replace(withBase('/genai'));
  }, []);

  return (
    <div className="py-16 text-center">
      <p className="text-neutral-400">This page moved. Redirecting to 16 AI Things…</p>
      <a className="underline text-accent" href={withBase('/genai')}>Go to 16 AI Things</a>
    </div>
  );
}
