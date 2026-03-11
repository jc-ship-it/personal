"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex aspect-square w-full max-w-[280px] shrink-0 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <span className="text-4xl font-medium text-[var(--fg-muted)]">ZJ</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800">
      <Image
        src="/images/avatar.jpg"
        alt="Zhang Jiachang"
        width={280}
        height={280}
        className="h-full w-full object-cover"
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}
