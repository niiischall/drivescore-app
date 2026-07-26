"use client";

import Image from "next/image";
import { ArrowRight, Check, GasPump } from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

type HeroSectionProps = {
  content: LandingPage["hero"];
  joinedEmail: string | null;
  onJoinClick: () => void;
};

export function HeroSection({
  content,
  joinedEmail,
  onJoinClick,
}: HeroSectionProps) {
  const joined = Boolean(joinedEmail);

  return (
    <section className="landing-hero">
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

      <div className="landing-hero__media landing-hero-car">
        <div className="landing-hero-car__glow" aria-hidden />
        <Image
          src={content.heroImageLight}
          alt={content.heroImageAlt}
          width={640}
          height={360}
          priority
          unoptimized
          className="landing-hero-car__img landing-hero-car__img--light"
        />
        <Image
          src={content.heroImageDark}
          alt=""
          width={640}
          height={360}
          priority
          unoptimized
          aria-hidden
          className="landing-hero-car__img landing-hero-car__img--dark"
        />
      </div>

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

      <div className="landing-hero__stats">
        {content.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-1 flex-col gap-0.5 py-3.5 ${i > 0 ? "border-l border-[var(--landing-hairline)] pl-3.5" : ""}`}
          >
            <span className="text-xl font-bold">{stat.value}</span>
            <span className="text-[11.5px] text-text-secondary">
              {stat.label}
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

      {!joined ? (
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
      ) : (
        <div
          className="landing-hero__cta landing-joined"
          role="status"
          aria-live="polite"
        >
          <div className="landing-joined__card">
            <span className="landing-joined__icon" aria-hidden>
              <Check weight="bold" size={18} />
            </span>
            <div>
              <p className="landing-joined__title">{content.joinedTitle}</p>
              <p className="landing-joined__body">
                {content.joinedBodyBefore}{" "}
                <span className="font-medium text-text-primary">
                  {joinedEmail}
                </span>{" "}
                {content.joinedBodyAfter}
              </p>
            </div>
          </div>
          <p className="landing-joined__meta">{content.joinedMeta}</p>
        </div>
      )}
    </section>
  );
}
