import Image from "next/image";
import { ArrowRight, Flag } from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { toneColor } from "../ui/brand";
import { AccentTitle } from "../ui/rich-inline";

export function SampleScoreSection({
  content,
  onJoinClick,
}: {
  content: LandingPage["sampleScore"];
  onJoinClick: () => void;
}) {
  return (
    <section id="sample" className="landing-section landing-section--sample">
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

      <article className="sample-card" data-reveal="card">
        <header className="sample-card__header">
          <div className="sample-card__thumb">
            <Image
              src={content.imagePath}
              alt={content.imageAlt}
              width={1024}
              height={610}
              className="sample-card__thumb-img"
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 200px, 260px"
            />
          </div>

          <div className="sample-card__identity">
            <h3 className="m-0 text-lg font-semibold tracking-tight text-text-primary">
              {content.vehicleName}
            </h3>
            <p className="m-0 mt-1 text-sm text-text-secondary">
              {content.vehicleMeta}
            </p>
          </div>

          <div
            className="sample-card__score"
            aria-label={`Score ${content.scoreValue}, ${content.scoreBand}`}
          >
            <span className="sample-card__score-label">Score</span>
            <span className="sample-card__score-value tabular-nums">
              {content.scoreValue}
            </span>
            <span className="sample-card__score-band">{content.scoreBand}</span>
          </div>
        </header>

        <div className="sample-card__body">
          <div className="sample-card__why">
            <p className="sample-card__why-label">{content.markersLabel}</p>
            <ul className="sample-card__markers">
              {content.markers.map((m) => (
                <li key={m.label} className="sample-card__marker">
                  <div className="sample-card__marker-top">
                    <span className="sample-card__marker-name">{m.label}</span>
                    <span
                      className="sample-card__marker-verdict"
                      style={{ color: toneColor[m.tone] }}
                    >
                      {m.verdict}
                    </span>
                  </div>
                  <div className="sample-card__track">
                    <div
                      className="sample-card__fill"
                      style={{
                        width: m.width,
                        background: toneColor[m.tone],
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="sample-card__confidence">
            <Flag weight="fill" size={14} className="sample-card__flag" />
            <span>{content.confidenceNote}</span>
          </p>

          <button
            type="button"
            onClick={onJoinClick}
            className="landing-cta sample-card__cta"
          >
            {content.ctaLabel}
            <ArrowRight weight="bold" size={18} className="ml-1.5" />
          </button>
        </div>
      </article>
    </section>
  );
}
