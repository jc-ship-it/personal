import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        sizes="100vw"
        className="rounded-lg"
        width={720}
        height={400}
        alt={props.alt ?? ""}
      />
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-[var(--accent)] hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--accent)] pl-4 italic text-[var(--fg-muted)]">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
        {children}
      </code>
    ),
    ...components,
  };
}
