import {
  DropHalfBottom,
  SealQuestion,
  TrendDown,
} from "@phosphor-icons/react";
import { PROBLEMS } from "../data/content";
import { IconChip } from "../ui/brand";

const problemIcon = {
  trendDown: <TrendDown weight="fill" size={22} />,
  drop: <DropHalfBottom weight="fill" size={22} />,
  seal: <SealQuestion weight="fill" size={22} />,
};

export function ProblemSection() {
  return (
    <section id="problem" className="landing-section">
      <span className="landing-section__eyebrow">
        ● AT EVERY PUMP · SINCE 2025
      </span>
      <h2 className="landing-section__title">
        E20 is here.{" "}
        <span className="text-[var(--landing-lilac)]">Your car</span> may not be
        ready.
      </h2>
      <p className="landing-section__lede mb-1">
        Three real risks — and none of them show up on day one.
      </p>
      <div className="landing-problem__grid">
        {PROBLEMS.map((p) => (
          <div
            key={p.title}
            className="landing-lift flex items-start gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] p-4"
          >
            <IconChip>{problemIcon[p.icon]}</IconChip>
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold">{p.title}</span>
              <span className="text-sm leading-normal text-[var(--landing-muted)]">
                {p.body}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
