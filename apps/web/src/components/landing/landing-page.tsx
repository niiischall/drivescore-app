"use client";

import { useRef, useState } from "react";
import {
  trackVehicleCheckCtaClicked,
  trackVehicleCheckModalClosed,
} from "@/lib/vehicle-check-analytics";
import type { FaqItem, LandingPage as LandingContent, SiteSettings } from "@/sanity/types";
import { useLandingAnalytics } from "./hooks/use-landing-analytics";
import {
  ConfidenceSection,
  FaqSection,
  HeroSection,
  JourneySection,
  LandingFooter,
  LandingHeader,
  MethodSection,
  ProblemSection,
  SampleScoreSection,
  StickyCta,
  StickyHeader,
} from "./sections";
import {
  VehicleCheckModal,
  type VehicleCheckSource,
} from "./ui/vehicle-check-modal";
import "./styles/landing.css";

export function LandingPage({
  content,
  faqs,
  siteSettings,
}: {
  content: LandingContent;
  faqs: FaqItem[];
  siteSettings: SiteSettings;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  useLandingAnalytics(rootRef);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<VehicleCheckSource>("hero");

  function openVehicleCheck(source: VehicleCheckSource) {
    setModalSource(source);
    trackVehicleCheckCtaClicked(source);
    setModalOpen(true);
  }

  function closeVehicleCheck() {
    trackVehicleCheckModalClosed(modalSource);
    setModalOpen(false);
  }

  return (
    <div ref={rootRef} className="landing font-sans">
      <div data-section="header">
        <LandingHeader badge={content.headerBadge} />
      </div>
      <div data-section="hero" ref={heroRef}>
        <HeroSection
          content={content.hero}
          onJoinClick={() => openVehicleCheck("hero")}
        />
      </div>
      <div data-section="problem">
        <ProblemSection content={content.problem} />
      </div>
      <div data-section="journey">
        <JourneySection content={content.journey} />
      </div>
      <div data-section="sample_score">
        <SampleScoreSection
          content={content.sampleScore}
          onJoinClick={() => openVehicleCheck("sample")}
        />
      </div>
      <div data-section="method">
        <MethodSection content={content.method} />
      </div>
      <div data-section="confidence">
        <ConfidenceSection content={content.confidence} />
      </div>
      <div data-section="faq">
        <FaqSection content={content.faq} items={faqs} />
      </div>
      <div data-section="footer">
        <LandingFooter
          content={content.footer}
          disclaimer={siteSettings.footerDisclaimer}
        />
      </div>
      <StickyCta
        content={content.stickyCta}
        heroRef={heroRef}
        onJoinClick={() => openVehicleCheck("sticky")}
      />
      <StickyHeader
        heroRef={heroRef}
        onCheckClick={() => openVehicleCheck("header")}
      />
      <VehicleCheckModal
        open={modalOpen}
        source={modalSource}
        onClose={closeVehicleCheck}
      />
    </div>
  );
}
