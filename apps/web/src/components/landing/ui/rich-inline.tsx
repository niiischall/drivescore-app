/**
 * @module landing/ui/rich-inline
 * @description Renders **bold** markers and {{methodVersion}} in CMS strings.
 *
 * Note: placeholder substitution happens in `RichInline` only. `AccentTitle` and
 * any component rendering a CMS string directly will print `{{methodVersion}}`
 * literally. Today the only consumer is `confidence.pointers[].body`.
 */

import { METHOD_VERSION } from "@/lib/method";

function applyPlaceholders(text: string) {
  return text.replaceAll("{{methodVersion}}", METHOD_VERSION);
}

/** Inline text with optional **bold** segments. */
export function RichInline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const resolved = applyPlaceholders(text);
  const parts = resolved.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <b key={i} className="font-semibold text-text-primary">
              {part.slice(2, -2)}
            </b>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

/** Title with accent — include spaces in before/after fields as needed. */
export function AccentTitle({
  before,
  accent,
  after,
}: {
  before?: string;
  accent?: string;
  after?: string;
}) {
  return (
    <>
      {before}
      {accent ? (
        <span className="text-[var(--landing-lilac)]">{accent}</span>
      ) : null}
      {after}
    </>
  );
}
