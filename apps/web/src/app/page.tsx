import type { Metadata } from "next";
import { LandingPage } from "@/components/landing";
import { FAQS } from "@/components/landing/data/content";
import { getUniqueVisitorCount } from "@/lib/posthog-visitors";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
  },
};

function buildJsonLd() {
  const base = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteConfig.name,
      url: base,
      description: siteConfig.description,
      applicationCategory: "AutomotiveApplication",
      operatingSystem: "Web",
      inLanguage: "en-IN",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      about: {
        "@type": "Thing",
        name: "E20 fuel compatibility",
        description:
          "Compatibility of petrol vehicles with 20% ethanol-blended fuel in India",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: base,
      description: siteConfig.description,
      inLanguage: "en-IN",
    },
  ];
}

export default async function Home() {
  const visitorCount = await getUniqueVisitorCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <LandingPage visitorCount={visitorCount} />
    </>
  );
}
