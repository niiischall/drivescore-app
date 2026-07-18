import { Flag, TrendUp } from "@phosphor-icons/react";

export function ConfidenceSection() {
  return (
    <section className="flex flex-col gap-4 px-4 pb-11">
      <span className="text-xs font-bold tracking-[0.12em] text-[var(--landing-lilac)]">
        NO GUESSWORK HIDING
      </span>
      <h2 className="landing-reveal m-0 text-[27px] leading-[1.2] font-bold tracking-tight text-balance">
        A score is useless if you can&apos;t{" "}
        <span className="text-[var(--landing-lilac)]">trust</span> it.
      </h2>
      <p className="landing-reveal m-0 text-[15px] leading-[1.55] text-[var(--landing-muted)]">
        Many Indian car brands still haven&apos;t published a clear E20
        position. We don&apos;t paper over that — we show you the gap.
      </p>
      <div className="flex flex-col gap-3">
        <div className="landing-reveal flex gap-3.5 rounded-[18px] border border-[color-mix(in_srgb,var(--color-score-caution)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-score-caution)_8%,transparent)] p-[18px]">
          <span className="flex size-10 flex-none items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-score-caution)_22%,transparent)] text-score-caution">
            <Flag weight="fill" size={20} />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-base font-semibold text-text-primary">
              We flag what isn&apos;t confirmed
            </span>
            <span className="text-sm leading-normal text-[var(--landing-muted)]">
              If Maruti, Hyundai, Tata, or your OEM hasn&apos;t said E20 is okay
              for your exact model, your result shows a low-confidence flag —
              even if the number looks fine.
            </span>
          </div>
        </div>
        <div className="landing-reveal flex gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] p-[18px] [transition-delay:100ms]">
          <span className="flex size-10 flex-none items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] text-[var(--landing-lilac)]">
            <TrendUp weight="fill" size={20} />
          </span>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-base font-semibold text-text-primary">
              Scores get clearer over time
            </span>
            <span className="text-sm leading-normal text-[var(--landing-muted)]">
              Every result is stamped with a method version (now v0.2). When
              better India data arrives, we update openly — you&apos;ll see what
              changed and why.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
