import { Flag, ListChecks, TrendUp } from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle, RichInline } from "../ui/rich-inline";

const confidenceIcon = {
  flag: Flag,
  listChecks: ListChecks,
  trendUp: TrendUp,
};

export function ConfidenceSection({
  content,
}: {
  content: LandingPage["confidence"];
}) {
  return (
    <section id="confidence" className="landing-section">
      <span className="landing-section__eyebrow">{content.eyebrow}</span>
      <h2 className="landing-section__title">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede">{content.lede}</p>
      <div className="landing-confidence__grid">
        {content.pointers.map((item) => {
          const Icon = confidenceIcon[item.icon];
          return (
            <div
              key={item.title}
              id={item.id ?? undefined}
              className="landing-confidence__row flex gap-3.5"
            >
              <span className="flex size-10 flex-none items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] text-[var(--landing-lilac)]">
                <Icon weight="fill" size={20} />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="text-base font-semibold text-text-primary">
                  {item.title}
                </span>
                <span className="text-sm leading-normal text-[var(--landing-muted)]">
                  <RichInline text={item.body} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
