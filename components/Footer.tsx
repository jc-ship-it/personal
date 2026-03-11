"use client";

import { DeveloperModeToggle } from "./DeveloperMode";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <p className="text-sm text-[var(--fg-muted)]">
          © {year} Zhang Jiachang. All rights reserved.
        </p>
        <DeveloperModeToggle />
      </div>
    </footer>
  );
}
