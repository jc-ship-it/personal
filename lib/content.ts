import {
  getPosts,
  getPostBySlug as sanityGetPostBySlug,
  getPostSlugs as sanityGetPostSlugs,
  getWorks,
  getWorkBySlug as sanityGetWorkBySlug,
  getWorkSlugs as sanityGetWorkSlugs,
  getFeaturedWork as sanityGetFeaturedWork,
  getLatestPosts as sanityGetLatestPosts,
  urlFor,
} from "./sanity";
import {
  getMdxPosts,
  getMdxPostBySlug,
  getMdxPostSlugs,
  getMdxWorks,
  getMdxWorkBySlug,
  getMdxWorkSlugs,
  type MdxPost,
  type MdxWork,
} from "./mdx-fallback";

export type { SanityPost as BlogMeta, SanityWork as WorkMeta } from "./sanity";
export type { MdxPost, MdxWork };
export { urlFor };

export type PostForList = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
  pdfAttachment?: string;
};

export type WorkForList = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
};

export type PostDetail = Awaited<ReturnType<typeof sanityGetPostBySlug>> | MdxPost | null;
export type WorkDetail = Awaited<ReturnType<typeof sanityGetWorkBySlug>> | MdxWork | null;

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityGetPostSlugs();
    if (slugs.length > 0) return slugs;
    return getMdxPostSlugs();
  } catch {
    return getMdxPostSlugs();
  }
}

export async function getBlogPosts(): Promise<PostForList[]> {
  try {
    const posts = await getPosts();
    if (posts.length > 0) {
      return posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.publishedAt || "",
        excerpt: p.excerpt || "",
        tags: p.tags,
        coverImage: p.coverImage ? urlFor(p.coverImage).width(400).height(225).url() : undefined,
        pdfAttachment: p.pdfAttachment,
      }));
    }
  } catch {
    /* fall through */
  }
  const mdx = getMdxPosts();
  return mdx.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    tags: p.tags,
    coverImage: undefined,
    pdfAttachment: undefined,
  }));
}

export async function getWorkSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityGetWorkSlugs();
    if (slugs.length > 0) return slugs;
    return getMdxWorkSlugs();
  } catch {
    return getMdxWorkSlugs();
  }
}

export async function getWorkProjects(): Promise<WorkForList[]> {
  try {
    const works = await getWorks();
    if (works.length > 0) {
      return works.map((w) => ({
        slug: w.slug,
        title: w.title,
        description: w.description || "",
        image: w.coverImage ? urlFor(w.coverImage).width(400).height(225).url() : undefined,
        featured: w.featured,
        tags: w.tags,
      }));
    }
  } catch {
    /* fall through */
  }
  const mdx = getMdxWorks();
  return mdx.map((w) => ({
    slug: w.slug,
    title: w.title,
    description: w.description,
    image: w.image,
    featured: w.featured,
    tags: w.tags,
  }));
}

export async function getFeaturedWork(): Promise<WorkForList[]> {
  try {
    const works = await sanityGetFeaturedWork();
    if (works.length > 0) {
      return works.map((w) => ({
        slug: w.slug,
        title: w.title,
        description: w.description || "",
        image: w.coverImage ? urlFor(w.coverImage).width(400).height(225).url() : undefined,
        tags: w.tags,
      }));
    }
  } catch {
    /* fall through */
  }
  const mdx = getMdxWorks().filter((w) => w.featured);
  return mdx.map((w) => ({
    slug: w.slug,
    title: w.title,
    description: w.description,
    image: w.image,
    tags: w.tags,
  }));
}

export async function getLatestPosts(limit = 3): Promise<PostForList[]> {
  try {
    const posts = await sanityGetLatestPosts(limit);
    if (posts.length > 0) {
      return posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.publishedAt || "",
        excerpt: p.excerpt || "",
        tags: p.tags,
      }));
    }
  } catch {
    /* fall through */
  }
  return getMdxPosts()
    .slice(0, limit)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      tags: p.tags,
    }));
}

export async function getPostBySlug(slug: string): Promise<PostDetail> {
  try {
    const post = await sanityGetPostBySlug(slug);
    if (post) return post;
  } catch {
    /* fall through */
  }
  return getMdxPostBySlug(slug);
}

export async function getWorkBySlug(slug: string): Promise<WorkDetail> {
  try {
    const work = await sanityGetWorkBySlug(slug);
    if (work) return work;
  } catch {
    /* fall through */
  }
  return getMdxWorkBySlug(slug);
}
