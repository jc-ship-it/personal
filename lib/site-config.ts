import siteConfig from "@/content/site.json";

export const contact = siteConfig.contact as {
  email: string;
  linkedin: string;
  github: string;
};

export const bio = siteConfig.bio as {
  tagline: string;
  paragraph1: string;
  paragraph2: string;
};

export const timeline = siteConfig.timeline as Array<{
  period: string;
  role: string;
  org: string;
  location: string;
  highlight: string;
  current: boolean;
}>;

export const education = siteConfig.education as Array<{
  period: string;
  degree: string;
  field: string;
  school: string;
  department?: string;
  gpa?: string;
  note?: string;
}>;

export const volunteer = siteConfig.volunteer as Array<{
  period: string;
  role: string;
  org: string;
  school: string;
  duration: string;
}>;

export const certifications = siteConfig.certifications as Array<{
  name: string;
  issuer: string;
  issued: string;
  validUntil: string;
  certNo: string;
}>;

export const GITHUB_REPO = "jc-ship-it/personal";

export function getGitHubEditUrl(path: string) {
  return `https://github.com/${GITHUB_REPO}/edit/main/${path}`;
}

export function getGitHubNewBlogUrl(filename = "new-post.mdx") {
  return `https://github.com/${GITHUB_REPO}/new/main/content/blog/${filename}`;
}
