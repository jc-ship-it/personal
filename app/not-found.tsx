import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-semibold text-[var(--fg)]">404</h1>
      <p className="mt-2 text-[var(--fg-muted)]">页面不存在</p>
      <Link
        href="/"
        className="mt-6 text-[var(--accent)] hover:underline"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
