/**
 * @module sanity/env
 * @description Public Sanity project env helpers used by client + Studio.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True when a project id is configured (Studio + live fetches can run). */
export function isSanityConfigured() {
  return Boolean(projectId);
}
