"use client";

import { useLayoutEffect, type RefObject } from "react";
import {
  gsap,
  prefersReducedMotion,
  registerLandingGsap,
} from "../lib/gsap";

const SCROLL_SECTIONS = new Set([
  "problem",
  "journey",
  "sample_score",
  "method",
  "confidence",
  "faq",
]);

const EASE = "power2.out";
const Y = 20;
const Y_HERO_DESKTOP = 26;
const Y_HERO_MOBILE = 16;
const HEADER_DURATION = 0.6;
const CHILD_DURATION = 0.5;
const STAGGER = 0.08;
const MOBILE_MQ = "(max-width: 767px)";

function revealTargets(section: Element): {
  headers: Element[];
  staggerChildren: Element[];
  singles: Element[];
} {
  const headers = Array.from(
    section.querySelectorAll("[data-reveal='header']"),
  );
  const staggerChildren = Array.from(
    section.querySelectorAll("[data-reveal-stagger] > *"),
  );
  const singles = Array.from(
    section.querySelectorAll(
      "[data-reveal]:not([data-reveal='header']):not([data-reveal-stagger] *)",
    ),
  );

  return { headers, staggerChildren, singles };
}

function isDisplayed(el: Element): boolean {
  return window.getComputedStyle(el).display !== "none";
}

function markRevealed(targets: gsap.TweenTarget) {
  gsap.utils.toArray<Element>(targets).forEach((el) => {
    el.setAttribute("data-revealed", "");
  });
}

function revealTweenVars(
  duration: number,
  extra?: gsap.TweenVars,
): gsap.TweenVars {
  const { onComplete: extraOnComplete, ...rest } = extra ?? {};
  return {
    ...rest,
    opacity: 1,
    y: 0,
    duration,
    clearProps: "transform",
    onComplete() {
      markRevealed(this.targets());
      if (typeof extraOnComplete === "function") {
        extraOnComplete.call(this);
      }
    },
  };
}

/** Subtle fade/rise reveals for the landing page (hero on mount, sections on scroll). */
export function useLandingReveal(rootRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    registerLandingGsap();
    root.setAttribute("data-reveal-ready", "");

    const ctx = gsap.context(() => {
      const heroSection = root.querySelector('[data-section="hero"]');
      if (heroSection) {
        const isMobile = window.matchMedia(MOBILE_MQ).matches;
        const yHero = isMobile ? Y_HERO_MOBILE : Y_HERO_DESKTOP;

        const badge = heroSection.querySelector("[data-reveal='badge']");
        const title = heroSection.querySelector("[data-reveal='title']");
        const bullets = Array.from(
          heroSection.querySelectorAll(
            "[data-reveal-stagger='bullets'] > *",
          ),
        );
        const gauge = heroSection.querySelector("[data-reveal='gauge']");
        // Form is display:none on mobile — animating it inserts a dead gap before CTA
        const form = heroSection.querySelector("[data-reveal='form']");
        const cta = heroSection.querySelector("[data-reveal='cta']");

        const visibleForm =
          form && isDisplayed(form) ? form : null;
        const visibleCta = cta && isDisplayed(cta) ? cta : null;

        const heroItems = [
          badge,
          title,
          ...bullets,
          gauge,
          visibleForm,
          visibleCta,
        ].filter((el): el is Element => Boolean(el));

        if (heroItems.length) {
          gsap.set(heroItems, { opacity: 0, y: yHero });

          const tl = gsap.timeline({ defaults: { ease: EASE } });
          if (badge) {
            tl.to(badge, revealTweenVars(HEADER_DURATION), 0.05);
          }
          if (title) {
            tl.to(title, revealTweenVars(HEADER_DURATION), "-=0.4");
          }
          if (bullets.length) {
            tl.to(
              bullets,
              revealTweenVars(CHILD_DURATION, {
                stagger: isMobile ? 0.05 : STAGGER,
              }),
              "-=0.35",
            );
          }
          if (gauge) {
            tl.to(gauge, revealTweenVars(CHILD_DURATION), "-=0.3");
          }
          if (visibleForm) {
            tl.to(visibleForm, revealTweenVars(CHILD_DURATION), "-=0.35");
          }
          if (visibleCta) {
            // On mobile CTA follows gauge directly; overlap slightly so it doesn't feel late
            tl.to(
              visibleCta,
              revealTweenVars(CHILD_DURATION),
              visibleForm ? "-=0.4" : "-=0.35",
            );
          }

          // Desktop form stays inert on mobile so a later resize still shows it
          if (form && !visibleForm) {
            form.setAttribute("data-revealed", "");
            gsap.set(form, { clearProps: "all" });
          }
        }
      }

      const sections = root.querySelectorAll<HTMLElement>("[data-section]");
      sections.forEach((section) => {
        const name = section.dataset.section;
        if (!name || !SCROLL_SECTIONS.has(name)) return;

        const { headers, staggerChildren, singles } = revealTargets(section);
        const targets = [...headers, ...staggerChildren, ...singles];
        if (!targets.length) return;

        gsap.set(targets, { opacity: 0, y: Y });

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        if (headers.length) {
          tl.to(
            headers,
            revealTweenVars(HEADER_DURATION, { stagger: STAGGER }),
          );
        }
        if (singles.length) {
          tl.to(
            singles,
            revealTweenVars(CHILD_DURATION, { stagger: STAGGER }),
            headers.length ? "-=0.35" : 0,
          );
        }
        if (staggerChildren.length) {
          tl.to(
            staggerChildren,
            revealTweenVars(CHILD_DURATION, { stagger: STAGGER }),
            headers.length || singles.length ? "-=0.35" : 0,
          );
        }
      });
    }, root);

    return () => {
      ctx.revert();
      root.removeAttribute("data-reveal-ready");
      root
        .querySelectorAll("[data-revealed]")
        .forEach((el) => el.removeAttribute("data-revealed"));
    };
  }, [rootRef]);
}
