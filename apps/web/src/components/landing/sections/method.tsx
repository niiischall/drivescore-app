"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import { track } from "@/lib/analytics";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

export function MethodSection({
  content,
}: {
  content: LandingPage["method"];
}) {
  const [showMarkers, setShowMarkers] = useState(false);
  const slices = content.slices;

  return (
    <section id="how" className="landing-section">
      <span className="landing-section__eyebrow">{content.eyebrow}</span>
      <h2 className="landing-section__title">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede">{content.lede}</p>

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between text-[12px] text-text-secondary">
          <span>{content.compositionLabel}</span>
          <span className="tabular-nums font-medium text-text-primary">100%</span>
        </div>
        <div className="landing-compose" aria-hidden="true">
          {slices.map((slice) => (
            <div
              key={slice.id}
              data-slice={slice.id}
              className="landing-compose__slice"
              style={{ width: `${slice.share}%` }}
              title={`${slice.label}: ${slice.share}%`}
            />
          ))}
        </div>
      </div>

      <ol className="landing-method__slices">
        {slices.map((slice) => (
          <li key={slice.id}>
            <span
              data-slice={slice.id}
              className="landing-swatch mt-1.5 size-2.5 flex-none rounded-full"
              aria-hidden
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-base font-semibold">{slice.label}</span>
                <span
                  data-slice={slice.id}
                  className="landing-compose-pct flex-none tabular-nums text-lg font-bold"
                >
                  {slice.share}%
                </span>
              </div>
              <span className="text-sm leading-normal text-[var(--landing-muted)]">
                {slice.blurb}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <button
        type="button"
        aria-expanded={showMarkers}
        onClick={() => {
          setShowMarkers((v) => {
            const next = !v;
            track("landing_markers_toggled", { open: next });
            return next;
          });
        }}
        className="landing-method__toggle flex w-full cursor-pointer items-center justify-between rounded-full border border-[var(--landing-card-border)] bg-[var(--landing-card)] px-5 py-3.5 text-left text-[15px] font-semibold text-text-primary"
      >
        <span>
          {showMarkers
            ? content.hideMarkersLabel
            : content.showMarkersLabel}
        </span>
        {showMarkers ? (
          <X weight="bold" size={16} className="text-[var(--landing-lilac)]" />
        ) : (
          <Plus weight="bold" size={16} className="text-[var(--landing-lilac)]" />
        )}
      </button>

      {showMarkers ? (
        <ol className="landing-method__markers m-0 flex list-none flex-col gap-0 border-t border-[var(--landing-hairline)] p-0 pt-1">
          {slices.flatMap((slice) =>
            slice.markers.map((m) => (
              <li
                key={m.name}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--landing-hairline)] py-3.5"
              >
                <span className="text-sm leading-snug text-text-primary">
                  {m.name}
                </span>
                <span className="flex-none tabular-nums text-sm font-semibold text-text-secondary">
                  {m.weight}%
                </span>
              </li>
            )),
          )}
        </ol>
      ) : null}
    </section>
  );
}
