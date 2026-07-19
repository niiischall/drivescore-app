import type { Metadata } from "next";
import { ContentPage } from "@/components/site/content-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <ContentPage eyebrow="Company" title="Contact">
      <p>
        Building DriveScore for Indian petrol-car owners navigating E20. We read
        every note — product feedback, press, partnerships, and waitlist help.
      </p>

      <h2>Email</h2>
      <p>
        <a href="mailto:hello@drivescore.club">hello@drivescore.club</a>
      </p>

      <h2>What to include</h2>
      <p>
        A short subject helps: <strong>Waitlist</strong>,{" "}
        <strong>Feedback</strong>, <strong>Press</strong>, or{" "}
        <strong>Partnership</strong>. We typically reply within a few business
        days.
      </p>

      <h2>Website</h2>
      <p>
        <a href="https://drivescore.club">drivescore.club</a>
      </p>
    </ContentPage>
  );
}
