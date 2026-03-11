"use client";

import Link from "next/link";
import { useDeveloperMode } from "./DeveloperMode";

export function HomeDevNewPost() {
  const { isDevMode } = useDeveloperMode() ?? {};
  if (!isDevMode) return null;

  return (
    <Link
      href="/studio"
      className="mt-4 inline-block text-sm text-[var(--fg-muted)] transition-colors duration-500 hover:text-[var(--accent)]"
    >
      新建博客 →
    </Link>
  );
}
