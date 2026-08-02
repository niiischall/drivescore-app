"use client";

import { useEffect, useState, type RefObject } from "react";

/** True once `ref`'s element has scrolled out of the viewport (i.e. the user scrolled past it). */
export function useScrolledPast(ref: RefObject<HTMLElement | null>): boolean {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        ([entry]) => setScrolledPast(!entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(el);
    } catch {
      // ignore — the dependent CTA just stays in its default state
    }

    return () => observer?.disconnect();
  }, [ref]);

  return scrolledPast;
}
