"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { BrandMark, BrandWordmark } from "../ui/brand";
import { IndiaFlag } from "../ui/india-flag";

const METHOD_LINKS = [
  { href: "#how", label: "How we score" },
  { href: "#confidence", label: "Confidence bands" },
  { href: "#scores-improve", label: "How scores improve" },
] as const;

const COMPANY_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

function trackFooterLink(
  group: "method" | "company",
  label: string,
  href: string,
) {
  track("landing_footer_link_clicked", { group, label, href });
}

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__brand-row">
        <div className="flex items-center gap-2.5">
          <BrandMark size={28} />
          <BrandWordmark size="sm" />
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-text-secondary">
          <IndiaFlag size={16} />
          Built for India
        </span>
      </div>

      <div className="landing-footer__grid">
        <p className="m-0 text-[13px] leading-[1.6] text-text-secondary">
          DriveScore checks your exact Indian vehicle against a documented,
          versioned 10-point check to estimate E20 (20% ethanol petrol)
          compatibility. Get a 0–100 score, a confidence rating, and the reasons
          behind both — free, in under a minute.
        </p>
        <div className="landing-footer__col">
          <span className="landing-footer__col-label">METHOD</span>
          <div className="landing-footer__links">
            {METHOD_LINKS.map((link) => (
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
            {COMPANY_LINKS.map((link) => (
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
        DriveScore is an estimate based on a documented, versioned scoring
        method — not an OEM certification or government advisory.
      </p>
    </footer>
  );
}
