import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/site/content-page";
import { getCompanyPage } from "@/sanity/lib/fetch";
import { PortableBody } from "@/sanity/lib/portable-text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage("contact");
  if (!page) return { title: "Contact" };
  return {
    title: page.seo?.title || page.title,
    description:
      page.seo?.description || "Get in touch with the DriveScore team.",
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const page = await getCompanyPage("contact");
  if (!page) notFound();

  return (
    <ContentPage eyebrow={page.eyebrow} title={page.title}>
      <PortableBody value={page.body} />
    </ContentPage>
  );
}
