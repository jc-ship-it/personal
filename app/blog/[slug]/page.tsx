import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/sanity";
import { PortableText } from "@/components/PortableText";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)]"
      >
        ← Back to Blog
      </Link>
      <article className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
          {post.title}
        </h1>
        {post.publishedAt && (
          <time
            dateTime={post.publishedAt}
            className="mt-2 block text-sm text-[var(--fg-muted)]"
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {post.pdfAttachment && (
          <a
            href={post.pdfAttachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-medium text-[var(--accent)] hover:underline"
          >
            Download PDF →
          </a>
        )}
        <div className="mt-8">
          <PortableText value={post.body || []} />
        </div>
      </article>
    </div>
  );
}
