import Image from "next/image";
import { ArrowRight, Flag } from "@phosphor-icons/react";
import type { LandingPage } from "@/sanity/types";
import { toneColor } from "../ui/brand";
import { AccentTitle, applyCaptionTemplate } from "../ui/rich-inline";

export function SampleScoreSection({
  content,
  onJoinClick,
}: {
  content: LandingPage["sampleScore"];
  onJoinClick: () => void;
}) {
  return (
    <section id="sample" className="landing-section">
      <span className="landing-section__eyebrow">{content.eyebrow}</span>
      <h2 className="landing-section__title">
        <AccentTitle
          before={content.titleBefore}
          accent={content.titleAccent}
          after={content.titleAfter}
        />
      </h2>
      <p className="landing-section__lede">{content.lede}</p>

      <article className="sample-card">
        <div className="sample-card__media">
          <Image
            src={content.imagePath}
            alt={content.imageAlt}
            width={1024}
            height={610}
            className="sample-card__img"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 720px, 560px"
          />
          <div
            className="sample-card__score"
            aria-label={`Score ${content.scoreValue}, ${content.scoreBand}`}
          >
            <span className="sample-card__score-value tabular-nums">
              {content.scoreValue}
            </span>
            <span className="sample-card__score-band">{content.scoreBand}</span>
          </div>
        </div>

        <div className="sample-card__body">
          <header className="sample-card__identity">
            <div className="min-w-0">
              <h3 className="m-0 text-lg font-semibold tracking-tight text-text-primary">
                {content.vehicleName}
              </h3>
              <p className="m-0 mt-1 text-sm text-text-secondary">
                {content.vehicleMeta}
              </p>
            </div>
          </header>

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

          <p className="sample-card__caption">
            {applyCaptionTemplate(content.captionTemplate)}
          </p>
        </div>
      </article>
    </section>
  );
}
