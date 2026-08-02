"use client";

import {
  DropHalfBottom,
  SealQuestion,
  TrendDown,
} from "@phosphor-icons/react";
import { useState } from "react";
import { track } from "@/lib/analytics";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

const problemIcon = {
  trendDown: <TrendDown weight="fill" size={24} />,
  drop: <DropHalfBottom weight="fill" size={24} />,
  seal: <SealQuestion weight="fill" size={24} />,
};

export function ProblemSection({
  content,
}: {
  content: LandingPage["problem"];
}) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="problem" className="landing-section landing-section--problem">
      <span className="landing-section__eyebrow" data-reveal="header">
        {content.eyebrow}
      </span>
      <h2 className="landing-section__title" data-reveal="header">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede mb-1" data-reveal="header">
        {content.lede}
      </p>
      <div
        className="landing-problem__grid"
        data-reveal-stagger
        data-active-card={activeCard ?? undefined}
        onMouseLeave={() => setActiveCard(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActiveCard(null);
          }
        }}
      >
        {content.cards.map((p, i) => {
          const isActive = activeCard === i;
          return (
            <article
              key={p.title}
              className="landing-problem__row"
              data-index={i}
              data-active={isActive ? "true" : "false"}
              tabIndex={0}
              onMouseEnter={() => setActiveCard(i)}
              onFocus={() => setActiveCard(i)}
              onClick={() => {
                setActiveCard(i);
                track("landing_problem_card_selected", {
                  index: i,
                  title: p.title,
                });
              }}
            >
              <span className="landing-problem__num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="landing-problem__heading">
                <span className="landing-problem__icon">
                  {problemIcon[p.icon]}
                </span>
                <span className="landing-problem__title">{p.title}</span>
              </div>
              <p className="landing-problem__body">{p.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
