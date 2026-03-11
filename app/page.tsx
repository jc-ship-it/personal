import Link from "next/link";
import { getFeaturedWork, getLatestPosts } from "@/lib/content";

export const revalidate = 60;
import { ProjectCard } from "@/components/ProjectCard";
import { BlogPostCard } from "@/components/BlogPostCard";
import { FadeUpSection } from "@/components/FadeUpSection";
import { HomeDevNewPost } from "@/components/HomeDevNewPost";

export default async function Home() {
  const [featuredWork, latestPosts] = await Promise.all([
    getFeaturedWork(),
    getLatestPosts(3),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="flex min-h-screen items-center justify-center px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[720px] text-center">
          <h1
            className="font-bold leading-tight tracking-tight text-[var(--fg)]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              animation: "heroFadeIn 800ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s forwards",
              opacity: 0,
            }}
          >
            I design interactions that feel inevitable.
          </h1>
          <p
            className="mt-6 text-xl text-neutral-500 dark:text-neutral-400"
            style={{
              animation: "heroFadeIn 800ms cubic-bezier(0.25, 0.1, 0.25, 1) 100ms forwards",
              opacity: 0,
            }}
          >
            Interaction Designer focused on mobile OS, AI products, and design
            systems.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      <FadeUpSection className="bg-[var(--card-bg)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Featured Work
          </h2>
          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
              Add projects in <a href="/studio" className="text-[var(--fg-muted)] transition-colors duration-500 hover:text-[var(--accent)]">Sanity Studio</a> and mark them as featured.
            </p>
          )}
        </div>
      </FadeUpSection>

      {/* Latest Posts */}
      <FadeUpSection className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
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
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {latestPosts.length > 0 && (
              <Link
                href="/blog"
                className="inline-block text-[var(--fg-muted)] transition-colors duration-500 hover:text-[var(--accent)]"
              >
                View all articles →
              </Link>
            )}
            <HomeDevNewPost />
          </div>
        </div>
      </FadeUpSection>

      {/* Bio */}
      <FadeUpSection className="bg-[var(--card-bg)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <p className="text-base leading-relaxed text-[var(--fg)] md:text-lg">
            I&apos;m Zhang Jiachang, an interaction designer with a focus on
            mobile operating systems, AI-powered products, and design systems. I
            believe the best interfaces disappear — they feel so natural that
            using them becomes inevitable.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-[var(--fg-muted)] transition-colors duration-500 hover:text-[var(--accent)]"
          >
            View Full Bio →
          </Link>
        </div>
      </FadeUpSection>
    </div>
  );
}
