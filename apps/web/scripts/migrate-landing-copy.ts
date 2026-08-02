/**
 * Sanity migration: rename "E20 Score" → "E20 report" and delete retired
 * company pages (privacy / faq / contact).
 *
 * Dry-run by default. Pass --apply to write.
 *
 * Usage (from apps/web):
 *   pnpm migrate:sanity-copy              # preview
 *   pnpm migrate:sanity-copy -- --apply   # mutate
 *
 * Auth (first match wins):
 *   1. SANITY_API_WRITE_TOKEN in env / .env.local (Editor+)
 *   2. sanity exec --with-user-token (logged-in CLI user)
 *
 * Note: landing FAQ accordion items (`faqItem`) are kept — only the
 * standalone `/faq` companyPage document is removed.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient, type SanityClient } from "next-sanity";

function loadEnvFile(filename: string) {
  const path = resolve(process.cwd(), filename);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const APPLY = process.argv.includes("--apply");
const REMOVED_COMPANY_SLUGS = ["privacy", "faq", "contact"] as const;
const REMOVED_PATHS = new Set(
  REMOVED_COMPANY_SLUGS.map((slug) => `/${slug}`),
);
const SCORE_PHRASE = /\bE20 [Ss]core\b/g;
const REPLACEMENT = "E20 report";

const SYSTEM_KEYS = new Set([
  "_id",
  "_type",
  "_rev",
  "_createdAt",
  "_updatedAt",
  "_originalId",
]);

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

type SanityDoc = Record<string, Json> & {
  _id: string;
  _type: string;
};

function replaceScorePhrase(value: string): string {
  return value.replace(SCORE_PHRASE, REPLACEMENT);
}

function transformValue(
  value: Json,
  path = "",
): { value: Json; changed: string[] } {
  const changed: string[] = [];

  if (typeof value === "string") {
    const next = replaceScorePhrase(value);
    if (next !== value) changed.push(path || "(root)");
    return { value: next, changed };
  }

  if (Array.isArray(value)) {
    const next = value.map((item, i) => transformValue(item, `${path}[${i}]`));
    return {
      value: next.map((n) => n.value),
      changed: next.flatMap((n) => n.changed),
    };
  }

  if (value && typeof value === "object") {
    const out: { [key: string]: Json } = {};
    for (const [key, child] of Object.entries(value)) {
      if (SYSTEM_KEYS.has(key)) {
        out[key] = child;
        continue;
      }
      // Keep portable-text / object markers
      if (key === "_type" || key === "_key" || key === "_ref" || key === "_weak") {
        out[key] = child;
        continue;
      }
      const childPath = path ? `${path}.${key}` : key;
      const result = transformValue(child, childPath);
      out[key] = result.value;
      changed.push(...result.changed);
    }
    return { value: out, changed };
  }

  return { value, changed };
}

function isRemovedHref(href: unknown): boolean {
  if (typeof href !== "string" || !href) return false;
  try {
    const pathname = href.startsWith("http")
      ? new URL(href).pathname
      : href.split("?")[0]?.split("#")[0] || href;
    return REMOVED_PATHS.has(pathname);
  } catch {
    return REMOVED_PATHS.has(href);
  }
}

/** Drop footer/nav links that pointed at retired company pages. */
function stripRemovedLinks(doc: Record<string, Json>): {
  doc: Record<string, Json>;
  removed: string[];
} {
  const removed: string[] = [];
  const next = { ...doc };

  const footer = next.footer;
  if (footer && typeof footer === "object" && !Array.isArray(footer)) {
    const methodLinks = footer.methodLinks;
    if (Array.isArray(methodLinks)) {
      const kept = methodLinks.filter((link) => {
        if (!link || typeof link !== "object" || Array.isArray(link)) {
          return true;
        }
        if (!isRemovedHref(link.href)) return true;
        removed.push(String(link.href));
        return false;
      });
      if (kept.length !== methodLinks.length) {
        next.footer = { ...footer, methodLinks: kept };
      }
    }
  }

  return { doc: next, removed };
}

function contentFields(doc: SanityDoc): Record<string, Json> {
  const out: Record<string, Json> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (SYSTEM_KEYS.has(key)) continue;
    out[key] = value;
  }
  return out;
}

function planDoc(doc: SanityDoc): {
  next: Record<string, Json>;
  stringPaths: string[];
  removedLinks: string[];
} | null {
  const fields = contentFields(doc);
  const transformed = transformValue(fields);
  const stripped = stripRemovedLinks(
    transformed.value as Record<string, Json>,
  );
  if (transformed.changed.length === 0 && stripped.removed.length === 0) {
    return null;
  }
  return {
    next: stripped.doc,
    stringPaths: transformed.changed,
    removedLinks: stripped.removed,
  };
}

async function getClient(): Promise<SanityClient> {
  const token =
    process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

  if (token && projectId) {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.warn(
        "SANITY_API_WRITE_TOKEN unset — using SANITY_API_READ_TOKEN. --apply will fail if the token cannot write.",
      );
    }
    return createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
      perspective: "raw",
    });
  }

  try {
    const { getCliClient } = await import("sanity/cli");
    const cliClient = getCliClient({ apiVersion });
    return cliClient.withConfig({ perspective: "raw" }) as SanityClient;
  } catch {
    throw new Error(
      "Set SANITY_API_WRITE_TOKEN (+ NEXT_PUBLIC_SANITY_PROJECT_ID) in .env.local, or run via `sanity exec --with-user-token` on Node >= 22.",
    );
  }
}

async function main() {
  const client = await getClient();
  console.log(
    APPLY
      ? "Applying mutations…"
      : "Dry-run (pass --apply to write). Scanning…",
  );

  const copyDocs = await client.fetch<SanityDoc[]>(
    `*[_type in ["landingPage", "siteSettings", "faqItem"]]`,
  );

  const companyPages = await client.fetch<
    Array<{ _id: string; title?: string; slug?: string }>
  >(
    `*[_type == "companyPage" && slug.current in $slugs]{
      _id,
      title,
      "slug": slug.current
    }`,
    { slugs: REMOVED_COMPANY_SLUGS },
  );

  let tx = client.transaction();
  let patchCount = 0;
  let deleteCount = 0;
  const plannedPatches: Array<{ id: string; type: string }> = [];

  for (const doc of copyDocs) {
    const plan = planDoc(doc);
    if (!plan) continue;

    plannedPatches.push({ id: doc._id, type: doc._type });
    console.log(`\n${doc._type} (${doc._id})`);
    for (const path of plan.stringPaths) {
      console.log(`  ~ string: ${path}`);
    }
    for (const href of plan.removedLinks) {
      console.log(`  - link: ${href}`);
    }

    if (APPLY) {
      tx = tx.createOrReplace({
        _id: doc._id,
        _type: doc._type,
        ...plan.next,
      });
      patchCount += 1;
    }
  }

  for (const page of companyPages) {
    const label = page.slug ? `${page.slug} (${page._id})` : page._id;
    console.log(
      `\nDELETE companyPage ${label} — "${page.title ?? "untitled"}"`,
    );
    if (APPLY) {
      tx = tx.delete(page._id);
      deleteCount += 1;
    }
  }

  if (!APPLY) {
    console.log(
      `\nDry-run complete. Would patch ${plannedPatches.length} doc(s) and delete ${companyPages.length} company page(s).`,
    );
    console.log("Re-run with --apply to mutate.");
    return;
  }

  if (patchCount === 0 && deleteCount === 0) {
    console.log("\nNothing to change.");
    return;
  }

  await tx.commit({ visibility: "async" });
  console.log(
    `\nDone. Patched ${patchCount} document(s), deleted ${deleteCount} company page(s).`,
  );
  console.log(
    "If you use drafts in Studio, open each patched doc and Publish.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
