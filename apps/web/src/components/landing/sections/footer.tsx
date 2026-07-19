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
    <footer className="flex flex-col gap-[18px] border-t border-[color-mix(in_srgb,var(--color-text-invert)_8%,transparent)] px-4 pt-9 pb-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BrandMark size={28} />
          <BrandWordmark size="sm" />
        </div>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-text-secondary">
          <IndiaFlag size={16} />
          Built for India
        </span>
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-text-secondary">
        DriveScore checks your exact Indian vehicle against a documented,
        versioned 10-point check to estimate E20 (20% ethanol petrol)
        compatibility. Get a 0–100 score, a confidence rating, and the reasons
        behind both — free, in under a minute.
      </p>
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--landing-faint)]">
          METHOD
        </span>
        <div className="flex flex-col gap-2 text-[13.5px]">
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
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold tracking-[0.1em] text-[var(--landing-faint)]">
          COMPANY
        </span>
        <div className="flex flex-col gap-2 text-[13.5px]">
          {COMPANY_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => trackFooterLink("company", link.label, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="m-0 text-[11.5px] leading-[1.55] text-[var(--landing-faint)]">
        DriveScore is an estimate based on a documented, versioned scoring
        method — not an OEM certification or government advisory.
      </p>
    </footer>
  );
}
