import posthog from "posthog-js";

/** Safe PostHog capture — no-ops when analytics isn't initialized. */
export function track(
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>,
) {
  if (typeof window === "undefined") return;
  if (typeof posthog?.capture !== "function") return;

  const cleaned: Record<string, string | number | boolean | null> = {};
  if (properties) {
    for (const [key, value] of Object.entries(properties)) {
      if (value !== undefined) cleaned[key] = value;
    }
  }

  posthog.capture(event, cleaned);
}
