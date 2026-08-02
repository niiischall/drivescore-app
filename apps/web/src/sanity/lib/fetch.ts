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

function isCompleteLanding(data: LandingPage | null): data is LandingPage {
  const journeyOk =
    Boolean(data?.journey?.titleAccent) &&
    (data?.journey?.steps?.length ?? 0) >= 1;

  return Boolean(
    data?.hero?.titleAccent &&
      data?.problem?.cards?.length &&
      journeyOk,
  );
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
  if (!isCompleteLanding(data)) {
    throw new Error('Missing or incomplete Sanity document "landingPage".');
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
