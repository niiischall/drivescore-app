"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { LandingPage } from "@/sanity/types";
import { AccentTitle } from "../ui/rich-inline";

export function JourneySection({
  content,
  onCtaClick,
}: {
  content: LandingPage["journey"];
  onCtaClick?: () => void;
}) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || content.steps.length < 2) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setActive(content.steps.length - 1);
      return;
    }

    let step = 0;
    const id = window.setInterval(() => {
      step += 1;
      if (step >= content.steps.length) {
        window.clearInterval(id);
        return;
      }
      setActive(step);
    }, 900);
    return () => window.clearInterval(id);
  }, [visible, content.steps.length]);

  const progress =
    content.steps.length <= 1
      ? 100
      : (active / (content.steps.length - 1)) * 100;

  return (
    <section id="journey" className="landing-section landing-journey">
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
        className="landing-journey__gauge"
        aria-hidden="true"
        data-visible={visible ? "true" : "false"}
      >
        <div className="landing-journey__gauge-track">
          <div
            className="landing-journey__gauge-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="landing-journey__gauge-labels">
          <span>{content.gaugeStartLabel}</span>
          <span>{content.gaugeEndLabel}</span>
        </div>
      </div>

      <ol
        ref={trackRef}
        className="landing-journey__steps"
        data-visible={visible ? "true" : "false"}
      >
        {content.steps.map((step, index) => {
          const state =
            index < active ? "done" : index === active ? "active" : "pending";
          return (
            <li
              key={step._key ?? `journey-step-${index}`}
              className="landing-journey__step"
              data-state={state}
              style={{ ["--journey-i" as string]: String(index) }}
            >
              <div className="landing-journey__index" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="landing-journey__copy">
                <h3 className="landing-journey__step-title">{step.title}</h3>
                <p className="landing-journey__step-body">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {onCtaClick ? (
        <button
          type="button"
          className="landing-journey__cta"
          onClick={() => {
            track("landing_journey_cta_clicked");
            onCtaClick();
          }}
        >
          {content.ctaLabel}
          <ArrowRight weight="bold" size={18} aria-hidden />
        </button>
      ) : null}
    </section>
  );
}
