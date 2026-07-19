import type { Metadata } from "next";
import { FAQS } from "@/components/landing/data/content";
import { ContentPage } from "@/components/site/content-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about ${siteConfig.name} and E20 compatibility scoring.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <ContentPage eyebrow="Company" title="FAQ">
      <p>
        Straight answers about how DriveScore works, what the score means, and
        what we do with your data.
      </p>

      {FAQS.map((item) => (
        <div key={item.q} className="flex flex-col gap-2 border-t border-border-subtle pt-5">
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}

      <p className="border-t border-border-subtle pt-5">
        Still stuck? Email{" "}
        <a href="mailto:hello@drivescore.club">hello@drivescore.club</a>.
      </p>
    </ContentPage>
  );
}
