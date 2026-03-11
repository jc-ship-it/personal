import { getBlogPosts } from "@/lib/content";
import { BlogPostCard } from "@/components/BlogPostCard";
import { BlogDevActions } from "@/components/BlogDevActions";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
        Blog
      </h1>
      <p className="mt-2 text-[var(--fg-muted)]">
        Thoughts on interaction design, mobile, and AI products.
      </p>

      <BlogDevActions />

      <ul className="mt-12">
        {posts.map((post) => (
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
    </div>
  );
}
