import Link from "next/link";
import { getBlogSlugs, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Zhang Jiachang`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = await getBlogSlugs();
  if (!slugs.includes(slug)) notFound();

  const Post = (await import(`@/content/blog/${slug}.mdx`)).default;

  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)]"
      >
        ← Back to Blog
      </Link>
      <article className="prose prose-neutral mt-8 dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)]">
        <Post />
      </article>
    </div>
  );
}
