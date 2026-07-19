import { Flag, ListChecks, TrendUp } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { METHOD_VERSION } from "@/lib/method";

const POINTERS: {
  id?: string;
  icon: typeof Flag;
  title: string;
  body: ReactNode;
}[] = [
  {
    icon: Flag,
    title: "We flag what isn't confirmed",
    body: (
      <>
        If your OEM hasn&apos;t published an E20 stance for your{" "}
        <b className="font-semibold text-text-primary">exact model</b>, you get
        a <b className="font-semibold text-text-primary">low-confidence</b>{" "}
        flag — even when the number looks fine.
      </>
    ),
  },
  {
    icon: ListChecks,
    title: "You see every marker that mattered",
    body: (
      <>
        Not a black box. Each result shows the{" "}
        <b className="font-semibold text-text-primary">10 markers</b> and their
        weights — so you know{" "}
        <b className="font-semibold text-text-primary">why</b> the score landed
        where it did.
      </>
    ),
  },
  {
    id: "scores-improve",
    icon: TrendUp,
    title: "The method stays versioned",
    body: (
      <>
        Every score is stamped with a{" "}
        <b className="font-semibold text-text-primary">method version</b> (now{" "}
        {METHOD_VERSION}). When India data improves, we update openly — you&apos;ll
        see{" "}
        <b className="font-semibold text-text-primary">what changed</b>.
      </>
    ),
  },
];

export function ConfidenceSection() {
  return (
    <section id="confidence" className="flex flex-col gap-4 px-4 pb-11">
      <span className="text-xs font-bold tracking-[0.12em] text-[var(--landing-lilac)]">
        CONFIDENCE FIRST
      </span>
      <h2 className="landing-reveal m-0 text-[27px] leading-[1.2] font-bold tracking-tight text-balance">
        A score is useless without the{" "}
        <span className="text-[var(--landing-lilac)]">why</span>.
      </h2>
      <p className="landing-reveal m-0 text-[15px] leading-[1.55] text-[var(--landing-muted)]">
        Many Indian brands still haven&apos;t published a clear E20 position. We
        don&apos;t hide that — we show confidence, markers, and method so you can
        decide with eyes open.
      </p>
      <div className="flex flex-col gap-3">
        {POINTERS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              id={item.id}
              className="landing-reveal flex gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] p-[18px]"
              style={i > 0 ? { transitionDelay: `${i * 80}ms` } : undefined}
            >
              <span className="flex size-10 flex-none items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] text-[var(--landing-lilac)]">
                <Icon weight="fill" size={20} />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-base font-semibold text-text-primary">
                  {item.title}
                </span>
                <span className="text-sm leading-normal text-[var(--landing-muted)]">
                  {item.body}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
