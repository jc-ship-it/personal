"use client";

import Image from "next/image";
import { useState } from "react";

export function Avatar() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex aspect-[3/4] w-full max-w-[200px] shrink-0 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800">
        <span className="text-4xl font-medium text-[var(--fg-muted)]">ZJ</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800">
      <Image
        src="/images/avatar.png"
        alt="Zhang Jiachang"
        width={200}
        height={267}
        className="h-full w-full object-cover"
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}
