"use client";

import React from 'react';

// Subtle animated background with radial gradient + grid lines
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* radial glow */}
      <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.15),transparent_60%)] blur-2xl" />
      {/* animated grid */}
      <div className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="grid-bg h-full w-full" />
      </div>
    </div>
  );
}

