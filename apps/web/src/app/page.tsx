import type { Metadata } from "next";
import { LandingPage } from "@/components/landing";
import { getSiteUrl } from "@/lib/site";
import {
  getFaqItems,
  getLandingPage,
  getSiteSettings,
} from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      absolute: settings.title,
    },
    description: settings.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: "/",
    },
  };
}

function buildJsonLd(
  settings: Awaited<ReturnType<typeof getSiteSettings>>,
  faqs: Awaited<ReturnType<typeof getFaqItems>>,
) {
  const base = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: settings.name,
      url: base,
      description: settings.description,
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
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answerPlain,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.name,
      url: base,
      description: settings.description,
      inLanguage: "en-IN",
    },
  ];
}

export default async function Home() {
  const [content, faqs, siteSettings] = await Promise.all([
    getLandingPage(),
    getFaqItems(),
    getSiteSettings(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildJsonLd(siteSettings, faqs)),
        }}
      />
      <LandingPage
        content={content}
        faqs={faqs}
        siteSettings={siteSettings}
      />
    </>
  );
}
