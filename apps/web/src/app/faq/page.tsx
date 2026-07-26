import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/site/content-page";
import { getCompanyPage, getFaqItems } from "@/sanity/lib/fetch";
import { PortableBody } from "@/sanity/lib/portable-text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCompanyPage("faq");
  if (!page) return { title: "FAQ" };
  return {
    title: page.seo?.title || page.title,
    description:
      page.seo?.description ||
      "Common questions about DriveScore and E20 compatibility scoring.",
    alternates: { canonical: "/faq" },
  };
}

export default async function FaqPage() {
  const [page, faqs] = await Promise.all([
    getCompanyPage("faq"),
    getFaqItems(),
  ]);
  if (!page) notFound();

  return (
    <ContentPage eyebrow={page.eyebrow} title={page.title}>
      <PortableBody value={page.body} />
      {faqs.map((item) => (
        <div
          key={item._id}
          className="flex flex-col gap-2 border-t border-border-subtle pt-5"
        >
          <h2>{item.question}</h2>
          <PortableBody value={item.answer} />
        </div>
      ))}
      <p className="border-t border-border-subtle pt-5">
        Still stuck? Email{" "}
        <a href="mailto:hello@drivescore.club">hello@drivescore.club</a>.
      </p>
    </ContentPage>
  );
}
