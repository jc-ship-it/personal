import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)]"
      >
        ← Back to Blog
      </Link>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-[var(--fg)]">
        {title}
      </h1>
      <p className="mt-4 text-[var(--fg-muted)]">
        Article content coming in Phase 2.
      </p>
    </div>
  );
}
