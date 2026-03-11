import Link from "next/link";

// Phase 1: 静态数据，Phase 2 改为从 content 读取
const featuredWork = [
  {
    id: "1",
    title: "Project Alpha",
    description: "Interaction design for a mobile-first experience.",
    image: "/vercel.svg",
    slug: "project-alpha",
  },
  {
    id: "2",
    title: "Project Beta",
    description: "Design system and component library.",
    image: "/window.svg",
    slug: "project-beta",
  },
  {
    id: "3",
    title: "Project Gamma",
    description: "AI product design and prototyping.",
    image: "/file.svg",
    slug: "project-gamma",
  },
];

const latestPosts = [
  {
    id: "1",
    title: "Designing for inevitability",
    excerpt: "How to create interactions that feel natural and unavoidable.",
    date: "2025-03-01",
    slug: "designing-for-inevitability",
  },
  {
    id: "2",
    title: "Mobile OS design patterns",
    excerpt: "Lessons from designing system-level interactions.",
    date: "2025-02-15",
    slug: "mobile-os-patterns",
  },
  {
    id: "3",
    title: "Prototyping with AI",
    excerpt: "Using AI tools to accelerate design iteration.",
    date: "2025-02-01",
    slug: "prototyping-with-ai",
  },
];

export default function Home() {
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
            {featuredWork.map((project, i) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] transition-all duration-200 hover:scale-[1.02] hover:brightness-95 dark:hover:brightness-110"
              >
                <div className="aspect-video flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 p-8">
                  <img
                    src={project.image}
                    alt=""
                    className="h-12 w-12 dark:invert"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--fg-muted)]">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Latest Articles
          </h2>
          <ul className="mt-12 space-y-8">
            {latestPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block transition-colors hover:text-[var(--accent)]"
                >
                  <h3 className="font-medium text-[var(--fg)]">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--fg-muted)]">
                    {post.excerpt}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-2 block text-xs text-[var(--fg-muted)]"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bio */}
      <section className="border-t border-[var(--border)] px-6 py-24">
        <div className="mx-auto max-w-[720px]">
          <p className="text-lg leading-relaxed text-[var(--fg)]">
            I'm Zhang Jiachang, an interaction designer with a focus on mobile
            operating systems, AI-powered products, and design systems. I believe
            the best interfaces disappear — they feel so natural that using them
            becomes inevitable.
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
