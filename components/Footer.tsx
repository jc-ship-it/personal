"use client";

import { DeveloperModeToggle } from "./DeveloperMode";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <p className="text-xs text-neutral-500">
          © {year} Zhang Jiachang. All rights reserved.
        </p>
        <DeveloperModeToggle />
      </div>
    </footer>
  );
}
