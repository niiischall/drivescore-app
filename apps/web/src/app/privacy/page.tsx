import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/site/content-page";
import { getCompanyPage } from "@/sanity/lib/fetch";
import { PortableBody } from "@/sanity/lib/portable-text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage("privacy");
  if (!page) return { title: "Privacy" };
  return {
    title: page.seo?.title || page.title,
    description:
      page.seo?.description ||
      "How DriveScore collects and uses data for the waitlist and E20 scoring product.",
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const page = await getCompanyPage("privacy");
  if (!page) notFound();

  return (
    <ContentPage eyebrow={page.eyebrow} title={page.title}>
      <PortableBody value={page.body} />
    </ContentPage>
  );
}
