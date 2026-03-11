import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface BlogMeta {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

export interface WorkMeta {
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

export async function getBlogSlugs(): Promise<string[]> {
  const blogDir = path.join(contentDir, "blog");
  const files = await fs.readdir(blogDir);
  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export async function getBlogPosts(): Promise<Array<BlogMeta & { slug: string }>> {
  const slugs = await getBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(contentDir, "blog", `${slug}.mdx`);
      const fallbackPath = path.join(contentDir, "blog", `${slug}.md`);
      let content: string;
      try {
        content = await fs.readFile(filePath, "utf-8");
      } catch {
        content = await fs.readFile(fallbackPath, "utf-8");
      }
      const { data } = matter(content);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        tags: data.tags ?? [],
      };
    })
  );
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export async function getWorkSlugs(): Promise<string[]> {
  const workDir = path.join(contentDir, "work");
  try {
    const files = await fs.readdir(workDir);
    return files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => f.replace(/\.(mdx|md)$/, ""));
  } catch {
    return [];
  }
}

export async function getWorkProjects(): Promise<
  Array<WorkMeta & { slug: string }>
> {
  const slugs = await getWorkSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(contentDir, "work", `${slug}.mdx`);
      const fallbackPath = path.join(contentDir, "work", `${slug}.md`);
      let content: string;
      try {
        content = await fs.readFile(filePath, "utf-8");
      } catch {
        content = await fs.readFile(fallbackPath, "utf-8");
      }
      const { data } = matter(content);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        image: data.image,
        featured: data.featured ?? false,
        tags: data.tags ?? [],
      };
    })
  );
  return projects;
}

export async function getFeaturedWork() {
  const projects = await getWorkProjects();
  return projects.filter((p) => p.featured);
}

export async function getLatestPosts(limit = 3) {
  const posts = await getBlogPosts();
  return posts.slice(0, limit);
}
