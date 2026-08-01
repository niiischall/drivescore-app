/**
 * @module sanity/types
 * @description Typed shapes returned by GROQ queries.
 */

import type { PortableTextBlock } from "@portabletext/types";

export type TextSegment = {
  text: string;
  emphasis?: boolean | null;
};

export type RichBullet = {
  segments: TextSegment[];
};

export type NavLink = {
  label: string;
  href: string;
};

export type ProblemCard = {
  icon: "trendDown" | "drop" | "seal";
  title: string;
  body: string;
};

export type SampleMarker = {
  label: string;
  verdict: string;
  tone: "caution" | "compatible";
  width: string;
};

export type MethodMarker = {
  name: string;
  weight: number;
};

export type MethodSlice = {
  id: string;
  share: number;
  label: string;
  blurb: string;
  markers: MethodMarker[];
};

export type ConfidencePointer = {
  id?: string | null;
  icon: "flag" | "listChecks" | "trendUp";
  title: string;
  body: string;
};

export type HeroStat = {
  value: string;
  label: string;
};

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
  locale: string;
  contactEmail: string;
  footerDisclaimer: string;
};

export type LandingPage = {
  headerBadge: string;
  marqueeSuffix: string;
  hero: {
    badge: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    heroImageLight: string;
    heroImageDark: string;
    heroImageAlt: string;
    bullets: RichBullet[];
    stats: HeroStat[];
    gaugeLabel: string;
    gaugeMandate: string;
    ctaLabel: string;
    ctaMicrocopy: string;
    joinedTitle: string;
    joinedBodyBefore: string;
    joinedBodyAfter: string;
    joinedMeta: string;
  };
  problem: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    cards: ProblemCard[];
  };
  journey: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    ctaLabel: string;
    gaugeStartLabel: string;
    gaugeEndLabel: string;
    steps: { _key?: string; title: string; body: string }[];
  };
  sampleScore: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    imagePath: string;
    imageAlt: string;
    scoreValue: string;
    scoreBand: string;
    vehicleName: string;
    vehicleMeta: string;
    markersLabel: string;
    markers: SampleMarker[];
    confidenceNote: string;
    ctaLabel: string;
    captionTemplate: string;
  };
  method: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    compositionLabel: string;
    methodVersionLabel: string;
    showMarkersLabel: string;
    hideMarkersLabel: string;
    slices: MethodSlice[];
  };
  confidence: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
    lede: string;
    pointers: ConfidencePointer[];
  };
  faq: {
    eyebrow: string;
    titleBefore: string;
    titleAccent: string;
    titleAfter: string;
  };
  stickyCta: {
    title: string;
    subtitle: string;
    buttonLabel: string;
  };
  footer: {
    builtForLabel: string;
    blurb: string;
    methodLinks: NavLink[];
  };
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  answerPlain: string;
  order: number;
};

export type CompanyPage = {
  slug: string;
  eyebrow: string;
  title: string;
  body: PortableTextBlock[];
  seo: {
    title?: string | null;
    description?: string | null;
  } | null;
  lastUpdated?: string | null;
};
