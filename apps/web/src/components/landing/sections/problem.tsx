import {
  DropHalfBottom,
  SealQuestion,
  TrendDown,
} from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { IconChip } from "../ui/brand";
import { AccentTitle } from "../ui/rich-inline";

const problemIcon = {
  trendDown: <TrendDown weight="fill" size={22} />,
  drop: <DropHalfBottom weight="fill" size={22} />,
  seal: <SealQuestion weight="fill" size={22} />,
};

export function ProblemSection({
  content,
}: {
  content: LandingPage["problem"];
}) {
  return (
    <section id="problem" className="landing-section">
      <span className="landing-section__eyebrow">{content.eyebrow}</span>
      <h2 className="landing-section__title">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede mb-1">{content.lede}</p>
      <div className="landing-problem__grid">
        {content.cards.map((p) => (
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
