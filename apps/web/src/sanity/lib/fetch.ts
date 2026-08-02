/**
 * @module sanity/lib/fetch
 * @description Server helpers that load marketing content from Sanity.
 */

import { isSanityConfigured } from "../env";
import type { FaqItem, LandingPage, SiteSettings } from "../types";
import { client } from "./client";
import {
  faqItemsQuery,
  landingPageQuery,
  siteSettingsQuery,
} from "./queries";

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!isSanityConfigured()) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID.",
    );
  }
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    throw error;
  }
}

/**
 * Fields the landing components dereference without a guard. A document missing
 * any of these would crash the page at render, so fail here with a message that
 * names the culprit instead.
 */
function missingLandingFields(data: LandingPage | null): string[] {
  if (!data) return ["<document>"];

  const required: [string, unknown][] = [
    ["hero.titleAccent", data.hero?.titleAccent],
    ["hero.bullets", data.hero?.bullets?.length],
    ["problem.cards", data.problem?.cards?.length],
    ["journey.titleAccent", data.journey?.titleAccent],
    ["journey.steps", data.journey?.steps?.length],
    // Fed straight into next/image src — an empty value throws at render.
    ["sampleScore.imagePath", data.sampleScore?.imagePath],
    ["sampleScore.markers", data.sampleScore?.markers?.length],
    ["method.slices", data.method?.slices?.length],
    ["confidence.pointers", data.confidence?.pointers?.length],
    ["footer.methodLinks", data.footer?.methodLinks?.length],
  ];

  const missing = required.filter(([, value]) => !value).map(([key]) => key);

  // Each method slice renders its own marker list.
  const slicesWithoutMarkers = (data.method?.slices ?? [])
    .filter((slice) => !slice.markers?.length)
    .map((slice) => `method.slices["${slice.id ?? "?"}"].markers`);

  return [...missing, ...slicesWithoutMarkers];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SiteSettings>(siteSettingsQuery);
  if (!data?.name) {
    throw new Error('Missing Sanity document "siteSettings".');
  }
  return data;
}

export async function getLandingPage(): Promise<LandingPage> {
  const data = await sanityFetch<LandingPage>(landingPageQuery);
  const missing = missingLandingFields(data);
  if (missing.length || !data) {
    throw new Error(
      `Incomplete Sanity document "landingPage" — missing: ${missing.join(", ")}.`,
    );
  }
  return data;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const data = await sanityFetch<FaqItem[]>(faqItemsQuery);
  if (!data?.length) {
    throw new Error("No published Sanity faqItem documents found.");
  }
  return data.map((item, i) => ({
    ...item,
    answerPlain: item.answerPlain || "",
    order: item.order ?? i,
  }));
}
