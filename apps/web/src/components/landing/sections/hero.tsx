"use client";

import { ArrowRight, Check, GasPump } from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";
import { VehicleCheckForm } from "../ui/vehicle-check-form";

type HeroSectionProps = {
  content: LandingPage["hero"];
  onJoinClick: () => void;
};

export function HeroSection({ content, onJoinClick }: HeroSectionProps) {
  return (
    <section className="landing-hero">
      <div className="landing-hero__main">
        <div className="landing-hero__badge">
          <span className="size-2 rounded-full bg-score-compatible" />
          <span className="text-[13px] font-bold text-[color-mix(in_srgb,var(--color-text-primary)_85%,transparent)]">
            {content.badge}
          </span>
        </div>

        <h1 className="landing-hero__title">
          <AccentTitle
            before={content.titleBefore}
            accent={content.titleAccent}
            after={content.titleAfter}
          />
        </h1>

        <div className="landing-hero__points">
          {content.bullets.map((bullet, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-primary text-surface-paper">
                <Check weight="bold" size={13} />
              </span>
              <span className="text-[15px] text-[color-mix(in_srgb,var(--color-text-primary)_85%,transparent)]">
                {bullet.segments.map((seg, j) =>
                  seg.emphasis ? (
                    <b key={j} className="text-text-primary">
                      {seg.text}
                    </b>
                  ) : (
                    <span key={j}>{seg.text}</span>
                  ),
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="landing-hero__gauge">
          <div className="flex justify-between text-[11px] font-semibold text-text-secondary">
            <span className="flex items-center gap-1.5">
              <GasPump size={13} />
              {content.gaugeLabel}
            </span>
            <span className="text-score-compatible">{content.gaugeMandate}</span>
          </div>
          <div className="relative h-3.5 rounded-[7px] bg-[color-mix(in_srgb,var(--color-text-invert)_10%,transparent)]">
            <div
              className="landing-gauge-fill absolute top-0 left-0 h-3.5 rounded-[7px]"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-score-compatible), var(--color-score-caution) 70%, var(--color-score-risk) 110%)",
              }}
            />
            <div className="absolute top-[-5px] left-[80%] ml-[-2px] h-6 w-1 rounded-sm bg-surface-paper shadow-[0_0_10px_color-mix(in_srgb,var(--color-surface-paper)_60%,transparent)]" />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-[var(--landing-faint)]">
            {["E0", "E5", "E10", "E15", "E20", "E25"].map((label) => (
              <span
                key={label}
                className={
                  label === "E20" ? "font-bold text-surface-paper" : undefined
                }
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <aside className="landing-hero__aside">
        <div className="landing-hero__form-card">
          <h2 className="landing-hero__form-title">Check your car</h2>
          <p className="landing-hero__form-body">
            Select your make, model, and variant to see your E20 compatibility.
          </p>
          <VehicleCheckForm source="hero" variant="hero" />
        </div>
      </aside>

      <div className="landing-hero__cta">
        <button
          type="button"
          onClick={onJoinClick}
          className="landing-cta flex h-[54px] cursor-pointer items-center justify-center rounded-full border-none text-[17px] font-bold"
        >
          {content.ctaLabel}
          <ArrowRight weight="bold" size={18} className="ml-1.5" />
        </button>
        <p className="m-0 text-center text-[12.5px] text-[var(--landing-faint)]">
          {content.ctaMicrocopy}
        </p>
      </div>
    </section>
  );
}
