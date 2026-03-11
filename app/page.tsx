import Link from "next/link";
import { getFeaturedWork, getLatestPosts } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogPostCard } from "@/components/BlogPostCard";

export default async function Home() {
  const [featuredWork, latestPosts] = await Promise.all([
    getFeaturedWork(),
    getLatestPosts(3),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="mx-auto max-w-[720px] text-center">
          <h1
            className="text-4xl font-semibold leading-tight tracking-tight text-[var(--fg)] sm:text-5xl md:text-6xl"
            style={{
              animation: "heroFadeIn 0.6s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            I design interactions that feel inevitable.
          </h1>
          <p
            className="mt-6 text-lg text-[var(--fg-muted)]"
            style={{
              animation: "heroFadeIn 0.6s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            Interaction Designer focused on mobile OS, AI products, and design
            systems.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Featured Work
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWork.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                image={project.image}
                slug={project.slug}
                tags={project.tags}
              />
            ))}
          </div>
          {featuredWork.length === 0 && (
            <p className="mt-8 text-[var(--fg-muted)]">
              Add <code className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">featured: true</code> to work in{" "}
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-800">content/work/</code>.
            </p>
          )}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Latest Articles
          </h2>
          <ul className="mt-12 space-y-0">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <BlogPostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  slug={post.slug}
                  tags={post.tags}
                />
              </li>
            ))}
          </ul>
          {latestPosts.length > 0 && (
            <Link
              href="/blog"
              className="mt-8 inline-block font-medium text-[var(--accent)] hover:underline"
            >
              View all articles →
            </Link>
          )}
        </div>
      </section>

      {/* Bio */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-[720px]">
          <p className="text-lg leading-relaxed text-[var(--fg)]">
            I&apos;m Zhang Jiachang, an interaction designer with a focus on
            mobile operating systems, AI-powered products, and design systems. I
            believe the best interfaces disappear — they feel so natural that
            using them becomes inevitable.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 font-medium text-[var(--accent)] transition-colors hover:underline"
          >
            View Full Bio →
          </Link>
        </div>
      </section>
    </div>
  );
}
