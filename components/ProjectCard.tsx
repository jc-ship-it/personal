import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  slug: string;
  tags?: string[];
}

export function ProjectCard({
  title,
  description,
  image,
  slug,
  tags,
}: ProjectCardProps) {
  return (
    <Link
      href={`/work/${slug}`}
      className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-all duration-200 hover:scale-[1.02] hover:brightness-95 dark:hover:brightness-110"
    >
      <div className="aspect-video flex items-center justify-center bg-neutral-100 p-8 dark:bg-neutral-800">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className="h-16 w-auto object-contain dark:invert"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-[var(--border)]" />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--fg-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
