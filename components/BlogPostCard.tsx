import Link from "next/link";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
}

export function BlogPostCard({ title, excerpt, date, slug, tags }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block border-b border-[var(--border)] py-8 transition-colors first:pt-0 last:border-b-0 hover:text-[var(--accent)]"
    >
      <h3 className="font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{excerpt}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <time
          dateTime={date}
          className="text-xs text-[var(--fg-muted)]"
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {tags && tags.length > 0 && (
          <span className="text-xs text-[var(--fg-muted)]">·</span>
        )}
        {tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
