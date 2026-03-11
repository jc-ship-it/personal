"use client";

import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { PortableTextBlock } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold text-[var(--fg)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-[var(--fg)]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-[var(--accent)] pl-4 italic text-[var(--fg-muted)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset?._ref
        ? urlFor(value).width(720).height(400).url()
        : null;
      if (!src) return null;
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt || ""}
            width={720}
            height={400}
            className="rounded-lg"
          />
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
        <code className="font-mono text-sm text-[var(--fg)]">
          {value?.code}
        </code>
      </pre>
    ),
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  if (!value?.length) return null;
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--accent)] prose-p:text-[var(--fg)] prose-li:text-[var(--fg)]">
      <BasePortableText value={value} components={components} />
    </div>
  );
}
