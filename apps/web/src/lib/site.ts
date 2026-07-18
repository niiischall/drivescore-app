/** Canonical site URL for metadata, sitemap, and OG tags. */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}

export const siteConfig = {
  name: 'DriveScore',
  title: 'DriveScore - E20 compatibility score for Indian cars',
  description:
    "Check your car's E20 (20% ethanol petrol) compatibility. Get a transparent 0–100 score, confidence rating, and the reasons behind both — free, in under a minute.",
  locale: 'en_IN',
} as const;
