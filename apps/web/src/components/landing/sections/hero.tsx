"use client";

import Image from "next/image";
import { ArrowRight, Check, GasPump } from "@phosphor-icons/react";

type HeroSectionProps = {
  joinedEmail: string | null;
  onJoinClick: () => void;
};

export function HeroSection({ joinedEmail, onJoinClick }: HeroSectionProps) {
  const joined = Boolean(joinedEmail);

  return (
    <section className="flex flex-col gap-[18px] px-4 pb-9 pt-5">
      <div className="landing-hero-in flex items-center gap-2 self-start rounded-full border border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-3.5 py-2">
        <span className="landing-pulse size-2 rounded-full bg-score-compatible" />
        <span className="text-[13px] font-bold text-[color-mix(in_srgb,var(--color-text-primary)_85%,transparent)]">
          E20 is now standard at pumps across India
        </span>
      </div>

      <h1 className="landing-hero-in landing-hero-in--1 m-0 text-[34px] leading-[1.15] font-bold tracking-tight text-pretty">
        India&apos;s most{" "}
        <span className="text-[var(--landing-lilac)]">transparent</span> E20
        compatibility score
      </h1>

      <div className="landing-hero-in landing-hero-in--2 landing-hero-car">
        <div className="landing-hero-car__glow" aria-hidden />
        <Image
          src="/illustrations/car-suv-india-hero-light.png"
          alt="Illustrated Indian compact SUV"
          width={640}
          height={360}
          priority
          unoptimized
          className="landing-hero-car__img landing-hero-car__img--light"
        />
        <Image
          src="/illustrations/car-suv-india-hero.png"
          alt=""
          width={640}
          height={360}
          priority
          unoptimized
          aria-hidden
          className="landing-hero-car__img landing-hero-car__img--dark"
        />
      </div>

      <div className="landing-hero-in landing-hero-in--3 flex flex-col gap-2.5">
        {[
          <>
            Score for your exact{" "}
            <b className="text-text-primary">make, model, and year</b>
          </>,
          <>
            Result in under <b className="text-text-primary">60</b> seconds
          </>,
          <>
            Clear <b className="text-text-primary">reasons</b> and{" "}
            <b className="text-text-primary">confidence</b> — not just a number
          </>,
        ].map((line, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-primary text-surface-paper">
              <Check weight="bold" size={13} />
            </span>
            <span className="text-[15px] text-[color-mix(in_srgb,var(--color-text-primary)_85%,transparent)]">
              {line}
            </span>
          </div>
        ))}
      </div>

      <div className="landing-hero-in landing-hero-in--4 flex border-y border-[var(--landing-hairline)]">
        {[
          { value: "10", label: "Markers checked" },
          { value: "3", label: "Confidence bands" },
          { value: "₹0", label: "First check" },
        ].map((stat, i) => (
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

      <div className="landing-hero-in landing-hero-in--5 flex flex-col gap-2.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] px-4 pt-[18px] pb-3.5">
        <div className="flex justify-between text-[11px] font-semibold text-text-secondary">
          <span className="flex items-center gap-1.5">
            <GasPump size={13} />
            PETROL BLEND AT YOUR PUMP
          </span>
          <span className="text-score-compatible">MANDATE: E20</span>
        </div>
        <div className="relative h-3.5 rounded-[7px] bg-[color-mix(in_srgb,var(--color-text-invert)_10%,transparent)]">
          <div
            className="landing-gauge-fill absolute top-0 left-0 h-3.5 rounded-[7px]"
            style={{
              background:
                "linear-gradient(90deg, var(--color-score-compatible), var(--color-score-caution) 70%, var(--color-score-risk) 110%)",
            }}
          />
          <div className="landing-gauge-needle absolute top-[-5px] left-[80%] ml-[-2px] h-6 w-1 rounded-sm bg-surface-paper shadow-[0_0_10px_color-mix(in_srgb,var(--color-surface-paper)_60%,transparent)]" />
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
        <div className="landing-hero-in flex flex-col gap-2.5 [animation-delay:0.48s]">
          <button
            type="button"
            onClick={onJoinClick}
            className="landing-cta landing-cta--pulse flex h-[54px] cursor-pointer items-center justify-center rounded-full border-none text-[17px] font-bold"
          >
            Join the waitlist
            <ArrowRight weight="bold" size={18} className="ml-1.5" />
          </button>
          <p className="m-0 text-center text-[12.5px] text-[var(--landing-faint)]">
            Launching soon · Free first check · No spam
          </p>
        </div>
      ) : (
        <div className="landing-joined" role="status" aria-live="polite">
          <div className="landing-joined__card">
            <span className="landing-joined__icon" aria-hidden>
              <Check weight="bold" size={18} />
            </span>
            <div>
              <p className="landing-joined__title">You&apos;re on the waitlist</p>
              <p className="landing-joined__body">
                We&apos;ll email{" "}
                <span className="font-medium text-text-primary">
                  {joinedEmail}
                </span>{" "}
                when DriveScore launches. Your first check stays free.
              </p>
            </div>
          </div>
          <p className="landing-joined__meta">
            No spam · Unsubscribe anytime · Built for Indian cars
          </p>
        </div>
      )}
    </section>
  );
}
