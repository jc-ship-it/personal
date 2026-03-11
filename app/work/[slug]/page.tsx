import Link from "next/link";
import { getWorkSlugs } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${title} — Zhang Jiachang`,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = await getWorkSlugs();
  if (!slugs.includes(slug)) notFound();

  const Project = (await import(`@/content/work/${slug}.mdx`)).default;

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <Link
        href="/work"
        className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)]"
      >
        ← Back to Work
      </Link>
      <article className="prose prose-neutral mt-8 dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)]">
        <Project />
      </article>
    </div>
  );
}
