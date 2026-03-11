import siteConfig from "@/content/site.json";

export const contact = siteConfig.contact as {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
};

export const timeline = siteConfig.timeline as Array<{
  year: string;
  role: string;
  company: string;
}>;

export const GITHUB_REPO = "jc-ship-it/personal";

export function getGitHubEditUrl(path: string) {
  return `https://github.com/${GITHUB_REPO}/edit/main/${path}`;
}

export function getGitHubNewBlogUrl(filename = "new-post.mdx") {
  return `https://github.com/${GITHUB_REPO}/new/main/content/blog/${filename}`;
}
