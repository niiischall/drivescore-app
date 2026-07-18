"use client";

import { useRef } from "react";
import { useLandingReveal } from "./hooks/use-landing-reveal";
import {
  ConfidenceSection,
  FaqSection,
  HeroSection,
  LandingFooter,
  LandingHeader,
  MethodSection,
  ProblemSection,
  QuickActions,
  SampleScoreSection,
  StickyCta,
  VisitorMarquee,
} from "./sections";
import "./styles/landing.css";

export function LandingPage({ visitorCount }: { visitorCount: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingReveal(rootRef);

  return (
    <div ref={rootRef} data-theme="dark" className="landing font-sans">
      <VisitorMarquee visitorCount={visitorCount} />
      <LandingHeader />
      <HeroSection />
      <QuickActions />
      <ProblemSection />
      <SampleScoreSection />
      <MethodSection />
      <ConfidenceSection />
      <FaqSection />
      <LandingFooter />
      <StickyCta />
    </div>
  );
}
