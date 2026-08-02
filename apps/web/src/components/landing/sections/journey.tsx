"use client";

import Image from "next/image";
import { useState } from "react";
import { track } from "@/lib/analytics";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";
import { getJourneyLabelSlot, getJourneyPinSlot } from "./journey-trail";

const JOURNEY_TRAIL_IMAGE = "/illustrations/journey-trail.png";
const JOURNEY_TRAIL_WIDTH = 1024;
const JOURNEY_TRAIL_HEIGHT = 682;

export function JourneySection({
  content,
}: {
  content: LandingPage["journey"];
}) {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section
      id="journey"
      className="landing-section landing-section--journey landing-journey"
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

      <div className="landing-journey__trail">
        <div className="landing-journey__map" data-reveal="map">
          <Image
            src={JOURNEY_TRAIL_IMAGE}
            alt="Path from start to your E20 report"
            width={JOURNEY_TRAIL_WIDTH}
            height={JOURNEY_TRAIL_HEIGHT}
            className="landing-journey__art"
            sizes="(max-width: 767px) 100vw, 960px"
            unoptimized
          />

          <ol className="landing-journey__pins" aria-label="Steps on the path">
            {content.steps.map((step, index) => {
              const pin = getJourneyPinSlot(index);
              const slot = getJourneyLabelSlot(index);
              const isActive = activeStep === index;
              return (
                <li key={step._key ?? `journey-pin-${index}`}>
                  <button
                    type="button"
                    className="landing-journey__pin"
                    data-active={isActive ? "true" : "false"}
                    aria-label={`Step ${index + 1}: ${step.title}`}
                    aria-pressed={isActive}
                    style={{
                      ["--journey-x" as string]: pin.x,
                      ["--journey-y" as string]: pin.y,
                      ["--journey-accent" as string]: slot.accent,
                    }}
                    onClick={() => {
                      setActiveStep((prev) => (prev === index ? null : index));
                      track("landing_journey_step_selected", {
                        index,
                        title: step.title,
                        active: !isActive,
                        source: "pin",
                      });
                    }}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <ol className="landing-journey__steps" data-reveal="steps">
          {content.steps.map((step, index) => {
            const slot = getJourneyLabelSlot(index);
            const pin = getJourneyPinSlot(index);
            const isActive = activeStep === index;
            return (
              <li key={step._key ?? `journey-step-${index}`}>
                <button
                  type="button"
                  className="landing-journey__step"
                  data-side={slot.side}
                  data-step={index}
                  data-active={isActive ? "true" : "false"}
                  aria-pressed={isActive}
                  style={{
                    /* Desktop: anchor at pin, then offset left/right via CSS */
                    ["--journey-x" as string]: pin.x,
                    ["--journey-y" as string]: pin.y,
                    ["--journey-accent" as string]: slot.accent,
                  }}
                  onClick={() => {
                    setActiveStep((prev) => (prev === index ? null : index));
                    track("landing_journey_step_selected", {
                      index,
                      title: step.title,
                      active: !isActive,
                      source: "card",
                    });
                  }}
                >
                  <span className="landing-journey__step-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="landing-journey__copy">
                    <span className="landing-journey__step-title">
                      <span className="landing-journey__step-index" aria-hidden>
                        {index + 1}.{" "}
                      </span>
                      {step.title}
                    </span>
                    <span className="landing-journey__step-body">{step.body}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
