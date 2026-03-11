import Link from "next/link";
import Image from "next/image";
import { getWorkBySlug, getWorkSlugs, urlFor } from "@/lib/content";
import { PortableText } from "@/components/PortableText";
import type { PortableTextBlock } from "@/lib/sanity";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

export const revalidate = 60;
export const dynamicParams = true;

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
  const work = await getWorkBySlug(slug);
  if (!work) return { title: "Not Found" };
  return {
    title: `${work.title} — Zhang Jiachang`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const isMdx = "source" in work && work.source === "mdx";

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <Link
        href="/work"
        className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)]"
      >
        ← Back to Work
      </Link>
      <article className="mt-8">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
          {work.title}
        </h1>
        {work.description && (
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            {work.description}
          </p>
        )}
        {!isMdx && "gallery" in work && work.gallery && work.gallery.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {work.gallery.map((img: { _ref?: string }, i: number) => (
              <div key={i} className="overflow-hidden rounded-xl">
                <Image
                  src={urlFor(img).width(800).height(500).url()}
                  alt=""
                  width={800}
                  height={500}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        {isMdx && "image" in work && work.image && (
          <div className="mt-8">
            <Image
              src={work.image}
              alt={work.title}
              width={800}
              height={500}
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        )}
        {isMdx && (work.body as string).trim() ? (
          <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)] prose-p:text-[var(--fg)] prose-li:text-[var(--fg)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{work.body as string}</ReactMarkdown>
          </div>
        ) : !isMdx && (work.body as unknown[])?.length ? (
          <div className="mt-10">
            <PortableText value={(work.body || []) as PortableTextBlock[]} />
          </div>
        ) : null}
      </article>
    </div>
  );
}
