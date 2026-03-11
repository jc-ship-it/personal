import Link from "next/link";
import { getPostBySlug, getBlogSlugs } from "@/lib/content";
import { PortableText } from "@/components/PortableText";
import type { PortableTextBlock } from "@/lib/sanity";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

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
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  const title = post.title;
  const description = "source" in post ? post.excerpt : post.excerpt;
  return {
    title: `${title} — Zhang Jiachang`,
    description,
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

  const isMdx = "source" in post && post.source === "mdx";
  const date = isMdx ? post.date : (post as { publishedAt?: string }).publishedAt;

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
        {date && (
          <time
            dateTime={date}
            className="mt-2 block text-sm text-[var(--fg-muted)]"
          >
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {!isMdx && "pdfAttachment" in post && post.pdfAttachment && (
          <a
            href={post.pdfAttachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-medium text-[var(--accent)] hover:underline"
          >
            Download PDF →
          </a>
        )}
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)] prose-p:text-[var(--fg)] prose-li:text-[var(--fg)]">
          {isMdx ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          ) : (
            <PortableText value={((post as { body?: PortableTextBlock[] }).body || []) as PortableTextBlock[]} />
          )}
        </div>
      </article>
    </div>
  );
}
