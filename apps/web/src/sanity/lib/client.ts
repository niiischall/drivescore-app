/**
 * @module sanity/lib/client
 * @description Published-content Sanity client for App Router fetches.
 *
 * useCdn is off so freshly published Studio content is visible immediately;
 * Next.js `revalidate` is the app-level cache.
 */

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: false,
  },
});
