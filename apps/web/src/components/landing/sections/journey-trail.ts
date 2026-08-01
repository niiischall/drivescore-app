/** Overlay slots for text-free journey-trail.png (road + pins only). */

export type JourneyLabelSide = "left" | "right";

export type JourneyLabelSlot = {
  /**
   * Legacy label-center coords (unused for desktop placement).
   * Desktop anchors to JOURNEY_PIN_SLOTS and offsets by `side`.
   */
  x: string;
  y: string;
  /** Accent bar faces the path: left = bar on right edge, right = bar on left edge. */
  side: JourneyLabelSide;
  accent: string;
};

/** Pin-head centers for mobile step numbers (matches label accents). */
export type JourneyPinSlot = {
  x: string;
  y: string;
};

/**
 * Pin order (START → FINISH): purple → orange → green → purple (finish)
 *
 * Steps 2 and 3 swap places vs earlier layout:
 * - Step 2 (Add your car) sits right of the green pin
 * - Step 3 (compatibility) sits left of the orange pin
 */
export const JOURNEY_LABEL_SLOTS: JourneyLabelSlot[] = [
  // 1 — left of purple pin
  {
    x: "16%",
    y: "66%",
    side: "left",
    accent: "var(--color-primary)",
  },
  // 2 — right of green pin (swapped with former step 3); inset so wider label fits
  {
    x: "82%",
    y: "54%",
    side: "right",
    accent: "var(--color-score-compatible)",
  },
  // 3 — left of orange pin (swapped with former step 2)
  {
    x: "18%",
    y: "34%",
    side: "left",
    accent: "var(--color-score-caution)",
  },
  // 4 — left of FINISH
  {
    x: "56%",
    y: "8%",
    side: "left",
    accent: "var(--color-text-brand)",
  },
];

/** Same step order as JOURNEY_LABEL_SLOTS — number sits in each pin head. */
export const JOURNEY_PIN_SLOTS: JourneyPinSlot[] = [
  { x: "35%", y: "68%" },
  { x: "67.5%", y: "54%" },
  { x: "38.5%", y: "32%" },
  { x: "78%", y: "12%" },
];

export function getJourneyLabelSlot(index: number): JourneyLabelSlot {
  return (
    JOURNEY_LABEL_SLOTS[index] ?? {
      x: "50%",
      y: `${20 + index * 18}%`,
      side: index % 2 === 0 ? "left" : "right",
      accent: "var(--color-primary)",
    }
  );
}

export function getJourneyPinSlot(index: number): JourneyPinSlot {
  return (
    JOURNEY_PIN_SLOTS[index] ?? {
      x: "50%",
      y: `${20 + index * 18}%`,
    }
  );
}
