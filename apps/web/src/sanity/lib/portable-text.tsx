/**
 * @module sanity/lib/portable-text
 * @description Shared Portable Text renderer for company pages + FAQ answers.
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}

/** Flatten PT to plain text for JSON-LD / llms.txt. */
export function portableTextToPlain(blocks: PortableTextBlock[] | undefined) {
  if (!blocks?.length) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !("children" in block)) return "";
      const children = block.children as { text?: string }[] | undefined;
      return children?.map((c) => c.text ?? "").join("") ?? "";
    })
    .filter(Boolean)
    .join("\n\n");
}
