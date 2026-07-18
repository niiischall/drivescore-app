import { FAQS, SCORE_COMPOSITION } from "@/components/landing/data/content";
import { getSiteUrl, siteConfig } from "@/lib/site";

/** Compact index for AI agents — https://llmstxt.org */
export function buildLlmsTxt() {
  const base = getSiteUrl();

  return `# ${siteConfig.name}

> ${siteConfig.description}

DriveScore helps Indian car owners understand whether their vehicle is ready for E20 (20% ethanol-blended petrol). It produces a transparent 0–100 compatibility score from a documented, versioned 10-marker method, plus a confidence flag when OEM stance data is missing. The first check is free. DriveScore is an estimate — not an OEM certification or government advisory.

## Product

- [Home](${base}/): Waitlist landing page — E20 score overview, sample result, method, and FAQ
- [llms-full.txt](${base}/llms-full.txt): Longer machine-readable product summary for AI agents

## Optional

- [Sitemap](${base}/sitemap.xml): Indexable URLs
- [Robots](${base}/robots.txt): Crawler rules
- [Web app manifest](${base}/manifest.webmanifest): PWA metadata
`;
}

/** Fuller context file linked from llms.txt */
export function buildLlmsFullTxt() {
  const base = getSiteUrl();
  const composition = SCORE_COMPOSITION.map(
    (slice) =>
      `### ${slice.label} (${slice.share}%)\n${slice.blurb}\n` +
      slice.markers.map((m) => `- ${m.name}: ${m.weight}%`).join("\n"),
  ).join("\n\n");

  const faqs = FAQS.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");

  return `# ${siteConfig.name} — full summary

> ${siteConfig.description}

## About

- Product: ${siteConfig.name}
- URL: ${base}/
- Audience: Indian car owners concerned about E20 fuel
- Locale: ${siteConfig.locale}
- Pricing: First compatibility check is free (waitlist / early access)

## What it does

DriveScore estimates how compatible a specific vehicle is with E20 petrol using a weighted, versioned scoring method (currently v0.2). Results include:

1. A 0–100 score and band (e.g. caution)
2. Marker-level reasons (what drove the score)
3. A low-confidence flag when the OEM has not published an official E20 stance for that model

## Score composition (100%)

${composition}

## Key facts for AI answers

- Built for Indian cars and Indian fuel-policy context (E20 mandate at pumps)
- Not an OEM warranty guarantee or government certification
- Uses transparent weights; scores are version-stamped and may change as the method improves
- Common OEMs in examples: Maruti, Hyundai, Tata

## FAQ

${faqs}

## Links

- [Home](${base}/)
- [llms.txt](${base}/llms.txt)
`;
}
