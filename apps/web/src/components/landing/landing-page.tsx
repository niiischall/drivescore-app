"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { useLandingAnalytics } from "./hooks/use-landing-analytics";
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
import {
  WaitlistModal,
  type WaitlistSource,
} from "./ui/waitlist-modal";
import "./styles/landing.css";

export function LandingPage({ visitorCount }: { visitorCount: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingReveal(rootRef);
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
        <VisitorMarquee visitorCount={visitorCount} />
      </div>
      <div data-section="header">
        <LandingHeader />
      </div>
      <div data-section="hero">
        <HeroSection
          joinedEmail={joinedEmail}
          onJoinClick={() => openWaitlist("hero")}
        />
      </div>
      <div data-section="quick_actions">
        <QuickActions />
      </div>
      <div data-section="problem">
        <ProblemSection />
      </div>
      <div data-section="sample_score">
        <SampleScoreSection onJoinClick={() => openWaitlist("sample")} />
      </div>
      <div data-section="method">
        <MethodSection />
      </div>
      <div data-section="confidence">
        <ConfidenceSection />
      </div>
      <div data-section="faq">
        <FaqSection />
      </div>
      <div data-section="footer">
        <LandingFooter />
      </div>
      <StickyCta onJoinClick={() => openWaitlist("sticky")} />
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
