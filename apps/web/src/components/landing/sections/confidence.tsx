"use client";

import { Flag, ListChecks, TrendUp } from "@phosphor-icons/react";
import { useState } from "react";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle, RichInline } from "../ui/rich-inline";

const confidenceIcon = {
  flag: Flag,
  listChecks: ListChecks,
  trendUp: TrendUp,
};

const pointerAccents = ["ground", "materials", "usage"] as const;

export function ConfidenceSection({
  content,
}: {
  content: LandingPage["confidence"];
}) {
  const [activePointer, setActivePointer] = useState<number | null>(null);

  return (
    <section
      id="confidence"
      className="landing-section landing-section--confidence"
    >
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
      <p className="landing-section__lede" data-reveal="header">
        {content.lede}
      </p>

      <div
        className="landing-confidence__grid"
        data-reveal-stagger
        data-active-pointer={activePointer ?? undefined}
        onMouseLeave={() => setActivePointer(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActivePointer(null);
          }
        }}
      >
        {content.pointers.map((item, index) => {
          const Icon = confidenceIcon[item.icon];
          const accent = pointerAccents[index] ?? pointerAccents[0];
          const featured = index === 1;

          return (
            <article
              key={item.title}
              id={item.id ?? undefined}
              className={
                featured
                  ? "landing-confidence__card landing-confidence__card--featured"
                  : "landing-confidence__card"
              }
              data-index={index}
              data-accent={accent}
              tabIndex={0}
              onMouseEnter={() => setActivePointer(index)}
              onFocus={() => setActivePointer(index)}
            >
              <span
                className="landing-confidence__index tabular-nums"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="landing-confidence__icon" aria-hidden>
                <Icon weight="fill" className="landing-confidence__icon-svg" />
              </span>
              <div className="landing-confidence__copy">
                <h3 className="landing-confidence__title">{item.title}</h3>
                <p className="landing-confidence__body">
                  <RichInline text={item.body} />
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
