import { METHOD_VERSION } from "@/lib/method";

export const VISITOR_COUNT = 12_438;

export const PROBLEMS = [
  {
    icon: 'trendDown' as const,
    title: 'Mileage drop',
    body: 'Ethanol carries less energy per litre. Uncalibrated engines can lose 6–7% efficiency on E20.',
  },
  {
    icon: 'drop' as const,
    title: 'Corrosion & seal risk',
    body: 'Older fuel systems use rubber seals and metals that ethanol slowly degrades — leaks, not just inefficiency.',
  },
  {
    icon: 'seal' as const,
    title: 'Warranty ambiguity',
    body: "Several OEMs still haven't published an official E20 stance for older models. You're left guessing.",
  },
];

export const SAMPLE_MARKERS = [
  {
    label: 'Seals & elastomers',
    verdict: 'Moderate',
    tone: 'caution' as const,
    width: '55%',
  },
  {
    label: 'Metal corrosion',
    verdict: 'Low risk',
    tone: 'compatible' as const,
    width: '82%',
  },
  {
    label: 'ECU fuel trim',
    verdict: 'Good',
    tone: 'compatible' as const,
    width: '74%',
  },
  {
    label: 'Usage & age',
    verdict: 'Watch',
    tone: 'caution' as const,
    width: '48%',
  },
];

export const SCORE_COMPOSITION = [
  {
    id: 'ground',
    share: 40,
    label: 'Ground truth',
    blurb: 'Official OEM stance and when your car was built.',
    markers: [
      { name: 'OEM explicit E20 declaration', weight: 25 },
      { name: 'Manufacture date vs regulatory cutoffs', weight: 15 },
    ],
  },
  {
    id: 'materials',
    share: 35,
    label: 'Materials',
    blurb: 'Whether seals, tank, and pump can handle ethanol.',
    markers: [
      { name: 'Fuel-system elastomer / seal material', weight: 15 },
      { name: 'Tank & fuel-line corrosion resistance', weight: 12 },
      { name: 'Fuel pump compatibility & flow', weight: 8 },
    ],
  },
  {
    id: 'calibration',
    share: 20,
    label: 'Calibration',
    blurb: 'How the engine manages blend changes on the road.',
    markers: [
      { name: 'Fuel injection architecture', weight: 7 },
      { name: 'ECU closed-loop fuel-trim authority', weight: 6 },
      { name: 'O2 / lambda sensor type', weight: 4 },
      { name: 'Knock sensor & adaptive timing', weight: 3 },
    ],
  },
  {
    id: 'usage',
    share: 5,
    label: 'Usage',
    blurb: 'Age, mileage, and how the car is stored.',
    markers: [{ name: 'Vehicle age, mileage & storage pattern', weight: 5 }],
  },
] as const;

export const FAQS = [
  {
    q: 'Does using E20 void my warranty?',
    a: "It depends on your OEM's published stance. Where a stance exists we surface it directly; where it doesn't, your score carries a low-confidence flag so you know it's inferred.",
  },
  {
    q: 'Is this official government or OEM data?',
    a: 'No. DriveScore combines OEM declarations (where published) with a documented rules engine based on manufacture era and variant. It is an informed estimate, not a certification.',
  },
  {
    q: 'Why might my score change?',
    a: `Our scoring method is versioned (currently ${METHOD_VERSION}). When weights or markers improve, scores are re-evaluated under the new version — always labelled, never silent.`,
  },
  {
    q: "What if my exact model isn't listed?",
    a: "We fall back to manufacture date and variant-family inference, and mark the result low-confidence. You'll see exactly which markers were inferred.",
  },
  {
    q: 'How accurate is the score?',
    a: 'As accurate as public data allows. India has no per-variant fuel-system database, so Tier 3 markers are era-based inference — which is why confidence is shown alongside every score.',
  },
  {
    q: 'Is my vehicle / personal data safe?',
    a: 'We only need your model, variant and manufacture date. Registration lookups are optional, and nothing is sold or shared.',
  },
  {
    q: 'What if my car scores "Not Recommended"?',
    a: 'The report explains which markers drove the score and what your practical options are — from fuel choice to component checks — rather than just a red number.',
  },
];
