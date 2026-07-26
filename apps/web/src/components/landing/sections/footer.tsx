"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { LandingPage, SiteSettings } from "@/sanity/types";
import { BrandMark, BrandWordmark } from "../ui/brand";
import { IndiaFlag } from "../ui/india-flag";

function trackFooterLink(
  group: "method" | "company",
  label: string,
  href: string,
) {
  track("landing_footer_link_clicked", { group, label, href });
}

export function LandingFooter({
  content,
  disclaimer,
}: {
  content: LandingPage["footer"];
  disclaimer: SiteSettings["footerDisclaimer"];
}) {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__brand-row">
        <div className="flex items-center gap-2.5">
          <BrandMark size={28} />
          <BrandWordmark size="sm" />
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-text-secondary">
          <IndiaFlag size={16} />
          {content.builtForLabel}
        </span>
      </div>

      <div className="landing-footer__grid">
        <p className="m-0 text-[13px] leading-[1.6] text-text-secondary">
          {content.blurb}
        </p>
        <div className="landing-footer__col">
          <span className="landing-footer__col-label">METHOD</span>
          <div className="landing-footer__links">
            {content.methodLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => trackFooterLink("method", link.label, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="landing-footer__col">
          <span className="landing-footer__col-label">COMPANY</span>
          <div className="landing-footer__links">
            {content.companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() =>
                  trackFooterLink("company", link.label, link.href)
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <p className="m-0 text-[11.5px] leading-[1.55] text-[var(--landing-faint)]">
        {disclaimer}
      </p>
    </footer>
  );
}
