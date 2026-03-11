"use client";

import Link from "next/link";
import { useDeveloperMode } from "./DeveloperMode";

export function BlogDevActions() {
  const { isDevMode } = useDeveloperMode() ?? {};
  if (!isDevMode) return null;

  return (
    <Link
      href="/studio"
      className="mb-12 flex items-center gap-4 rounded-xl border-2 border-dashed border-[var(--accent)] bg-[var(--accent)]/5 p-6 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" x2="12" y1="5" y2="19" />
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-[var(--fg)]">Write New Post</p>
        <p className="text-sm text-[var(--fg-muted)]">
          Create a new blog post in Sanity Studio →
        </p>
      </div>
    </Link>
  );
}
