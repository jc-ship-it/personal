import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getSlugFromFilename(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

export type MdxPost = {
  source: "mdx";
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  body: string;
};

export type MdxWork = {
  source: "mdx";
  slug: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  body: string;
};

export function getMdxPostSlugs(): string[] {
  try {
    const dir = path.join(CONTENT_DIR, "blog");
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => getSlugFromFilename(f));
  } catch {
    return [];
  }
}

export function getMdxWorkSlugs(): string[] {
  try {
    const dir = path.join(CONTENT_DIR, "work");
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => getSlugFromFilename(f));
  } catch {
    return [];
  }
}

export function getMdxPosts(): MdxPost[] {
  const slugs = getMdxPostSlugs();
  return slugs
    .map((slug) => getMdxPostBySlug(slug))
    .filter((p): p is MdxPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMdxPostBySlug(slug: string): MdxPost | null {
  try {
    const base = path.join(CONTENT_DIR, "blog", slug);
    const file = [".mdx", ".md"].map((ext) => base + ext).find((p) => fs.existsSync(p));
    if (!file) return null;
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    return {
      source: "mdx",
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags,
      body: content.trim(),
    };
  } catch {
    return null;
  }
}

export function getMdxWorks(): MdxWork[] {
  const slugs = getMdxWorkSlugs();
  return slugs
    .map((slug) => getMdxWorkBySlug(slug))
    .filter((w): w is MdxWork => w !== null);
}

export function getMdxWorkBySlug(slug: string): MdxWork | null {
  try {
    const base = path.join(CONTENT_DIR, "work", slug);
    const file = [".mdx", ".md"].map((ext) => base + ext).find((p) => fs.existsSync(p));
    if (!file) return null;
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content } = matter(raw);
    return {
      source: "mdx",
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      image: data.image,
      featured: data.featured ?? false,
      tags: data.tags,
      body: content.trim(),
    };
  } catch {
    return null;
  }
}
