import {
  getPosts,
  getPostBySlug,
  getPostSlugs,
  getWorks,
  getWorkBySlug,
  getWorkSlugs as sanityGetWorkSlugs,
  getFeaturedWork as sanityGetFeaturedWork,
  getLatestPosts as sanityGetLatestPosts,
  urlFor,
} from "./sanity";

export type { SanityPost as BlogMeta, SanityWork as WorkMeta } from "./sanity";

export { urlFor };

export async function getBlogSlugs(): Promise<string[]> {
  try {
    return await getPostSlugs();
  } catch {
    return [];
  }
}

export async function getBlogPosts(): Promise<
  Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    coverImage?: string;
    pdfAttachment?: string;
  }>
> {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.publishedAt || "",
      excerpt: p.excerpt || "",
      tags: p.tags,
      coverImage: p.coverImage ? urlFor(p.coverImage).width(400).height(225).url() : undefined,
      pdfAttachment: p.pdfAttachment,
    }));
  } catch {
    return [];
  }
}

export async function getWorkSlugs(): Promise<string[]> {
  try {
    return await sanityGetWorkSlugs();
  } catch {
    return [];
  }
}

export async function getWorkProjects(): Promise<
  Array<{
    slug: string;
    title: string;
    description: string;
    image?: string;
    featured?: boolean;
    tags?: string[];
  }>
> {
  try {
    const works = await getWorks();
    return works.map((w) => ({
      slug: w.slug,
      title: w.title,
      description: w.description || "",
      image: w.coverImage ? urlFor(w.coverImage).width(400).height(225).url() : undefined,
      featured: w.featured,
      tags: w.tags,
    }));
  } catch {
    return [];
  }
}

export async function getFeaturedWork() {
  try {
    const works = await sanityGetFeaturedWork();
    return works.map((w) => ({
      slug: w.slug,
      title: w.title,
      description: w.description || "",
      image: w.coverImage ? urlFor(w.coverImage).width(400).height(225).url() : undefined,
      tags: w.tags,
    }));
  } catch {
    return [];
  }
}

export async function getLatestPosts(limit = 3) {
  try {
    const posts = await sanityGetLatestPosts(limit);
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.publishedAt || "",
      excerpt: p.excerpt || "",
      tags: p.tags,
    }));
  } catch {
    return [];
  }
}

export { getPostBySlug, getWorkBySlug };
