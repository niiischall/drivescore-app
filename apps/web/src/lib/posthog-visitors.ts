import { VISITOR_COUNT } from "@/components/landing/data/content";

type HogQLQueryResponse = {
  results?: unknown[][];
};

/**
 * Unique persons who triggered `$pageview` (PostHog HogQL).
 * Requires server env: POSTHOG_PERSONAL_API_KEY, POSTHOG_PROJECT_ID.
 * Falls back to VISITOR_COUNT when unset or the request fails.
 */
export async function getUniqueVisitorCount(): Promise<number> {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = (
    process.env.POSTHOG_HOST ?? "https://us.posthog.com"
  ).replace(/\/$/, "");

  if (!apiKey || !projectId) {
    return VISITOR_COUNT;
  }

  try {
    const res = await fetch(`${host}/api/projects/${projectId}/query/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query:
            "SELECT count(DISTINCT person_id) FROM events WHERE event = '$pageview'",
        },
        name: "landing_unique_visitors",
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(
        "[posthog-visitors] query failed",
        res.status,
        await res.text().catch(() => ""),
      );
      return VISITOR_COUNT;
    }

    const data = (await res.json()) as HogQLQueryResponse;
    const raw = data.results?.[0]?.[0];
    const count = typeof raw === "number" ? raw : Number(raw);

    if (!Number.isFinite(count) || count < 0) {
      return VISITOR_COUNT;
    }

    return Math.floor(count);
  } catch (err) {
    console.error("[posthog-visitors] query error", err);
    return VISITOR_COUNT;
  }
}
