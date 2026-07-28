import {
  DropHalfBottom,
  SealQuestion,
  TrendDown,
} from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

const problemIcon = {
  trendDown: <TrendDown weight="fill" size={16} />,
  drop: <DropHalfBottom weight="fill" size={16} />,
  seal: <SealQuestion weight="fill" size={16} />,
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
        {content.cards.map((p, i) => (
          <div key={p.title} className="landing-problem__row">
            <span className="landing-problem__num" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="landing-problem__heading">
              <span className="landing-problem__icon">
                {problemIcon[p.icon]}
              </span>
              <span className="text-base font-bold">{p.title}</span>
            </div>
            <span className="text-sm leading-normal text-[var(--landing-muted)]">
              {p.body}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
