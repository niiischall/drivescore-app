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
    <section id="problem" className="flex flex-col gap-3.5 px-4 pb-11">
      <span className="text-xs font-bold tracking-[0.12em] text-[var(--landing-lilac)]">
        ● AT EVERY PUMP · SINCE 2025
      </span>
      <h2 className="landing-reveal m-0 text-[27px] leading-[1.2] font-bold tracking-tight text-balance">
        E20 is here.{" "}
        <span className="text-[var(--landing-lilac)]">Your car</span> may not be
        ready.
      </h2>
      <p className="mb-1 text-[15px] leading-[1.55] text-[var(--landing-muted)]">
        Three real risks — and none of them show up on day one.
      </p>
      {PROBLEMS.map((p) => (
        <div
          key={p.title}
          className="landing-reveal flex items-start gap-3.5 rounded-[18px] border border-[var(--landing-card-border)] bg-[var(--landing-card)] p-4"
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
    </section>
  );
}
