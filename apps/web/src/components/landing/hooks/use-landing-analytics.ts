"use client";

import { useEffect, type RefObject } from "react";
import { track } from "@/lib/analytics";

/** Fires `landing_section_viewed` once per section when it enters the viewport. */
export function useLandingAnalytics(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const seen = new Set<string>();
    const sections = root.querySelectorAll<HTMLElement>("[data-section]");

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const section = entry.target.getAttribute("data-section");
            if (!section || seen.has(section)) continue;
            seen.add(section);
            track("landing_section_viewed", { section });
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
      );
      sections.forEach((el) => observer?.observe(el));
    } catch {
      // ignore — analytics is best-effort
    }

    track("landing_page_viewed");

    return () => observer?.disconnect();
  }, [rootRef]);
}
