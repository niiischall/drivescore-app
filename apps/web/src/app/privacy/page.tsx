import type { Metadata } from "next";
import { ContentPage } from "@/components/site/content-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${siteConfig.name} collects and uses data for the waitlist and E20 scoring product.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <ContentPage eyebrow="Company" title="Privacy">
      <p>
        DriveScore is built for Indian car owners checking E20 compatibility. We
        collect as little as we need, and we do not sell personal data.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Waitlist:</strong> your email address, so we can confirm you
        joined and notify you at launch. Emails are stored with our email
        provider (Resend) and used only for DriveScore product updates you opted
        into.
      </p>
      <p>
        <strong>Analytics:</strong> anonymous product analytics (via PostHog)
        such as page views and button clicks. These help us improve the site. We
        do not attach your waitlist email to analytics events beyond an email
        domain when you join.
      </p>
      <p>
        <strong>Future scoring:</strong> when the check launches, we may process
        vehicle details you provide (make, model, variant, manufacture date, and
        optional registration lookup). That data is used to compute your score —
        not for advertising.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Waitlist contacts are kept until you unsubscribe or ask us to delete
        them. Analytics events follow our analytics provider&apos;s retention
        settings.
      </p>

      <h2>Your choices</h2>
      <p>
        You can unsubscribe from waitlist email at any time using the link in
        those messages, or email{" "}
        <a href="mailto:hello@drivescore.club">hello@drivescore.club</a> to
        request deletion of your waitlist contact.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy:{" "}
        <a href="mailto:hello@drivescore.club">hello@drivescore.club</a>.
      </p>

      <p>
        <strong>Last updated:</strong> July 2026.
      </p>
    </ContentPage>
  );
}
