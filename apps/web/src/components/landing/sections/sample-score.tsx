import Image from "next/image";
import { ArrowRight, Flag } from "@phosphor-icons/react";
import { SAMPLE_MARKERS } from "../data/content";
import { scrollToTop, toneColor } from "../ui/brand";

export function SampleScoreSection() {
  return (
    <section id="sample" className="flex flex-col gap-4 px-4 pb-11">
      <span className="text-xs font-bold tracking-[0.12em] text-[var(--landing-lilac)]">
        WHAT YOU GET
      </span>
      <h2 className="landing-reveal m-0 text-[27px] leading-[1.2] font-bold tracking-tight text-balance">
        A score. <span className="text-[var(--landing-lilac)]">And the why</span>{" "}
        behind it.
      </h2>
      <p className="landing-reveal m-0 text-[15px] leading-[1.55] text-[var(--landing-muted)]">
        Here&apos;s what a real result looks like for a common Indian car — number,
        band, and the markers that drove it.
      </p>

      <article className="landing-reveal sample-card">
        <div className="sample-card__media">
          <Image
            src="/images/tata-nexon.jpg"
            alt="Tata Nexon, a popular Indian compact SUV"
            width={1024}
            height={610}
            className="sample-card__img"
            sizes="(max-width: 480px) 100vw, 480px"
          />
          <div className="sample-card__score" aria-label="Score 68, caution">
            <span className="sample-card__score-value tabular-nums">68</span>
            <span className="sample-card__score-band">Caution</span>
          </div>
        </div>

        <div className="sample-card__body">
          <header className="sample-card__identity">
            <div className="min-w-0">
              <h3 className="m-0 text-lg font-semibold tracking-tight text-text-primary">
                Tata Nexon XZ+
              </h3>
              <p className="m-0 mt-1 text-sm text-text-secondary">
                2021 · Petrol · MPFI · BS6
              </p>
            </div>
          </header>

          <div className="sample-card__why">
            <p className="sample-card__why-label">What drove this score</p>
            <ul className="sample-card__markers">
              {SAMPLE_MARKERS.map((m) => (
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
                      className="landing-bar sample-card__fill"
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
            <span>
              Low confidence — Tata hasn&apos;t published an official E20 stance
              for this variant.
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="landing-cta sample-card__cta"
          >
            Check my car
            <ArrowRight weight="bold" size={18} className="ml-1.5" />
          </button>

          <p className="sample-card__caption">
            Illustrative sample · Scoring method v0.2
          </p>
        </div>
      </article>
    </section>
  );
}
