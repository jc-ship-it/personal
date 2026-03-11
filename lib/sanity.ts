import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const hasConfig = Boolean(projectId);

export const client = createClient({
  projectId: projectId || "dummy",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage,
  publishedAt,
  tags,
  "pdfAttachment": pdfAttachment.asset->url
`;

const workFields = `
  _id,
  title,
  "slug": slug.current,
  description,
  "coverImage": coverImage,
  "gallery": gallery[],
  featured,
  tags
`;

export async function getPosts(): Promise<SanityPost[]> {
  if (!hasConfig) return [];
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!hasConfig) return null;
  const post = await client.fetch<SanityPost | null>(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields}, body }`,
    { slug }
  );
  return post ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (!hasConfig) return [];
  const slugs = await client.fetch<string[]>(
    `*[_type == "post"].slug.current`
  );
  return slugs || [];
}

export async function getLatestPosts(limit = 3): Promise<SanityPost[]> {
  if (!hasConfig) return [];
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...$limit] { ${postFields} }`,
    { limit }
  );
}

export async function getWorks(): Promise<SanityWork[]> {
  if (!hasConfig) return [];
  return client.fetch(
    `*[_type == "work"] { ${workFields} }`
  );
}

export async function getWorkBySlug(slug: string): Promise<SanityWork | null> {
  if (!hasConfig) return null;
  const work = await client.fetch<SanityWork | null>(
    `*[_type == "work" && slug.current == $slug][0] { ${workFields}, body, gallery }`,
    { slug }
  );
  return work ?? null;
}

export async function getWorkSlugs(): Promise<string[]> {
  if (!hasConfig) return [];
  const slugs = await client.fetch<string[]>(
    `*[_type == "work"].slug.current`
  );
  return slugs || [];
}

export async function getFeaturedWork(): Promise<SanityWork[]> {
  if (!hasConfig) return [];
  return client.fetch(
    `*[_type == "work" && featured == true] { ${workFields} }`
  );
}

export type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: { _ref: string; asset: { url: string } };
  publishedAt: string;
  tags?: string[];
  pdfAttachment?: string;
  body?: PortableTextBlock[];
};

export type SanityWork = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: { _ref: string; asset: { url: string } };
  gallery?: Array<{ _ref: string; asset: { url: string } }>;
  featured?: boolean;
  tags?: string[];
  body?: PortableTextBlock[];
};

export type PortableTextBlock = {
  _type: string;
  _key: string;
  children?: Array<{ _type: string; text: string }>;
  [key: string]: unknown;
};
