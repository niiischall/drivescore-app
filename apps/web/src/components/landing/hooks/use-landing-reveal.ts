import { useEffect, type RefObject } from "react";

/** Observes `.landing-reveal` and `.landing-bar` and adds `.is-in` when visible. */
export function useLandingReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll<HTMLElement>(
      ".landing-reveal, .landing-bar",
    );

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      els.forEach((el) => observer?.observe(el));
    } catch {
      els.forEach((el) => el.classList.add("is-in"));
    }

    return () => observer?.disconnect();
  }, [rootRef]);
}
