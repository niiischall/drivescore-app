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
  const [activeSlice, setActiveSlice] = useState<string | null>(null);
  const slices = content.slices;

  return (
    <section id="how" className="landing-section landing-section--method">
      <span className="landing-section__eyebrow">{content.eyebrow}</span>
      <h2 className="landing-section__title">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede">{content.lede}</p>

      <div
        className="landing-method__panel"
        data-active-slice={activeSlice ?? undefined}
        onMouseLeave={() => setActiveSlice(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActiveSlice(null);
          }
        }}
      >
        <div className="landing-method__compose">
          <div className="landing-method__compose-head">
            <span className="landing-method__compose-label">
              {content.compositionLabel}
            </span>
            <span className="landing-method__compose-total tabular-nums">
              100%
            </span>
          </div>
          <div
            className="landing-compose landing-compose--method"
            role="group"
            aria-label={slices
              .map((slice) => `${slice.label}: ${slice.share}%`)
              .join(", ")}
          >
            {slices.map((slice) => (
              <button
                key={slice.id}
                type="button"
                data-slice={slice.id}
                className="landing-compose__slice landing-compose__slice--interactive"
                style={{ flex: `${slice.share} 1 0` }}
                aria-label={`${slice.label}: ${slice.share}%`}
                aria-pressed={activeSlice === slice.id}
                onMouseEnter={() => setActiveSlice(slice.id)}
                onFocus={() => setActiveSlice(slice.id)}
                onClick={() => setActiveSlice(slice.id)}
              />
            ))}
          </div>
        </div>

        <ol className="landing-method__slices">
          {slices.map((slice) => (
            <li
              key={slice.id}
              className="landing-method__slice"
              data-slice={slice.id}
              onMouseEnter={() => setActiveSlice(slice.id)}
            >
              <div className="landing-method__slice-head">
                <span
                  data-slice={slice.id}
                  className="landing-method__swatch"
                  aria-hidden
                />
                <span
                  data-slice={slice.id}
                  className="landing-method__slice-pct landing-compose-pct tabular-nums"
                >
                  {slice.share}%
                </span>
              </div>
              <h3 className="landing-method__slice-title">{slice.label}</h3>
              <p className="landing-method__slice-body">{slice.blurb}</p>
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
          className="landing-method__toggle landing-glass"
        >
          <span>
            {showMarkers
              ? content.hideMarkersLabel
              : content.showMarkersLabel}
          </span>
          {showMarkers ? (
            <X weight="bold" size={18} className="landing-method__toggle-icon" />
          ) : (
            <Plus
              weight="bold"
              size={18}
              className="landing-method__toggle-icon"
            />
          )}
        </button>

        {showMarkers ? (
          <ol className="landing-method__markers">
            {slices.flatMap((slice) =>
              slice.markers.map((m) => (
                <li key={m.name} className="landing-method__marker">
                  <span className="landing-method__marker-name">{m.name}</span>
                  <span className="landing-method__marker-weight tabular-nums">
                    {m.weight}%
                  </span>
                </li>
              )),
            )}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
