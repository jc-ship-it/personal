"use client";

import dynamic from "next/dynamic";

const StudioClient = dynamic(
  () => import("./StudioClient"),
  { ssr: false, loading: () => <div className="flex h-screen items-center justify-center text-[var(--fg-muted)]">Loading Studio…</div> }
);

export default function StudioPage() {
  return <StudioClient />;
}
