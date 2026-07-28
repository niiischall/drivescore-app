"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
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
  QuickActions,
  SampleScoreSection,
  StickyCta,
  VisitorMarquee,
} from "./sections";
import {
  WaitlistModal,
  type WaitlistSource,
} from "./ui/waitlist-modal";
import "./styles/landing.css";

export function LandingPage({
  visitorCount,
  content,
  faqs,
  siteSettings,
}: {
  visitorCount: number;
  content: LandingContent;
  faqs: FaqItem[];
  siteSettings: SiteSettings;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingAnalytics(rootRef);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [joinedEmail, setJoinedEmail] = useState<string | null>(null);
  const [waitlistSource, setWaitlistSource] = useState<WaitlistSource>("hero");

  function openWaitlist(source: WaitlistSource) {
    setWaitlistSource(source);
    track("waitlist_cta_clicked", { source });
    setWaitlistOpen(true);
  }

  function closeWaitlist() {
    track("waitlist_modal_closed", {
      source: waitlistSource,
      joined: Boolean(joinedEmail),
    });
    setWaitlistOpen(false);
  }

  return (
    <div ref={rootRef} className="landing font-sans">
      <div data-section="marquee">
        <VisitorMarquee
          visitorCount={visitorCount}
          suffix={content.marqueeSuffix}
        />
      </div>
      <div data-section="header">
        <LandingHeader badge={content.headerBadge} />
      </div>
      <div data-section="hero">
        <HeroSection
          content={content.hero}
          joinedEmail={joinedEmail}
          onJoinClick={() => openWaitlist("hero")}
        />
      </div>
      <div data-section="quick_actions">
        <QuickActions actions={content.quickActions} />
      </div>
      <div data-section="problem">
        <ProblemSection content={content.problem} />
      </div>
      <div data-section="journey">
        <JourneySection
          content={content.journey}
          onCtaClick={() => openWaitlist("journey")}
        />
      </div>
      <div data-section="sample_score">
        <SampleScoreSection
          content={content.sampleScore}
          onJoinClick={() => openWaitlist("sample")}
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
        onJoinClick={() => openWaitlist("sticky")}
      />
      <WaitlistModal
        open={waitlistOpen}
        joinedEmail={joinedEmail}
        source={waitlistSource}
        onClose={closeWaitlist}
        onJoined={setJoinedEmail}
      />
    </div>
  );
}
