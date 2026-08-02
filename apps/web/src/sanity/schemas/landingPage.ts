/**
 * @module sanity/schemas/landingPage
 * @description Singleton marketing landing page content model.
 */

import { defineArrayMember, defineField, defineType } from "sanity";

/** Shape of a method slice as seen by validation rules. */
type MethodSliceValue = {
  id?: string;
  label?: string;
  share?: number;
  markers?: { name?: string; weight?: number }[];
};

const round2 = (n: number) => Math.round(n * 100) / 100;

const sliceLabel = (slice: MethodSliceValue) =>
  slice.label ?? slice.id ?? "untitled slice";

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  groups: [
    { name: "chrome", title: "Chrome" },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
    { name: "journey", title: "Journey" },
    { name: "sample", title: "Sample score" },
    { name: "method", title: "Method" },
    { name: "cta", title: "CTAs & footer" },
  ],
  fields: [
    defineField({
      name: "headerBadge",
      title: "Header badge",
      type: "string",
      group: "chrome",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({
          name: "bullets",
          title: "Benefit bullets",
          type: "array",
          of: [defineArrayMember({ type: "richBullet" })],
        }),
        defineField({
          name: "gaugeLabel",
          title: "Gauge label",
          type: "string",
        }),
        defineField({
          name: "gaugeMandate",
          title: "Gauge mandate",
          type: "string",
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA label",
          type: "string",
        }),
        defineField({
          name: "ctaMicrocopy",
          title: "CTA microcopy",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "problem",
      title: "Problem section",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({ name: "lede", title: "Lede", type: "text", rows: 2 }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [defineArrayMember({ type: "problemCard" })],
        }),
      ],
    }),
    defineField({
      name: "journey",
      title: "Onboarding journey section",
      type: "object",
      group: "journey",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({ name: "lede", title: "Lede", type: "text", rows: 2 }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "journeyStep",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({
                  name: "body",
                  title: "Body",
                  type: "text",
                  rows: 2,
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "body" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "sampleScore",
      title: "Sample score section",
      type: "object",
      group: "sample",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({ name: "lede", title: "Lede", type: "text", rows: 2 }),
        defineField({
          name: "imagePath",
          title: "Vehicle image path",
          type: "string",
          description: "Public path, e.g. /illustrations/...",
          // Passed straight to next/image src.
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imageAlt",
          title: "Vehicle image alt",
          type: "string",
        }),
        defineField({
          name: "scoreValue",
          title: "Score value",
          type: "string",
        }),
        defineField({
          name: "scoreBand",
          title: "Score band",
          type: "string",
        }),
        defineField({
          name: "vehicleName",
          title: "Vehicle name",
          type: "string",
        }),
        defineField({
          name: "vehicleMeta",
          title: "Vehicle meta",
          type: "string",
        }),
        defineField({
          name: "markersLabel",
          title: "Markers label",
          type: "string",
        }),
        defineField({
          name: "markers",
          title: "Markers",
          type: "array",
          of: [defineArrayMember({ type: "sampleMarker" })],
        }),
        defineField({
          name: "confidenceNote",
          title: "Confidence note",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "method",
      title: "Method section",
      type: "object",
      group: "method",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({ name: "lede", title: "Lede", type: "text", rows: 3 }),
        defineField({
          name: "compositionLabel",
          title: "Composition label",
          type: "string",
        }),
        defineField({
          name: "showMarkersLabel",
          title: "Show markers label",
          type: "string",
        }),
        defineField({
          name: "hideMarkersLabel",
          title: "Hide markers label",
          type: "string",
        }),
        defineField({
          name: "slices",
          title: "Slices",
          type: "array",
          of: [defineArrayMember({ type: "methodSlice" })],
          description:
            "Tier breakdown shown in the method section. The section renders a hardcoded “100%” composition label, so shares must total 100.",
          validation: (Rule) => [
            // method.tsx dereferences this array unconditionally.
            Rule.required().min(1),
            // Hard invariant: the UI claims the slices add up to the whole score.
            Rule.custom((slices?: MethodSliceValue[]) => {
              if (!slices?.length) return true;
              const total = round2(
                slices.reduce((sum, slice) => sum + (slice.share ?? 0), 0),
              );
              return total === 100
                ? true
                : `Slice shares must add up to 100% (currently ${total}%).`;
            }),
            // Soft check: marker weights should reconcile with their tier share.
            Rule.custom((slices?: MethodSliceValue[]) => {
              if (!slices?.length) return true;
              const mismatched = slices.filter((slice) => {
                const markers = slice.markers ?? [];
                if (!markers.length) return false;
                const total = round2(
                  markers.reduce((sum, m) => sum + (m.weight ?? 0), 0),
                );
                return total !== (slice.share ?? 0);
              });
              return mismatched.length === 0
                ? true
                : `Marker weights should add up to their slice share: ${mismatched
                    .map(sliceLabel)
                    .join(", ")}.`;
            }).warning(),
          ],
        }),
      ],
    }),
    defineField({
      name: "confidence",
      title: "Confidence section",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
        defineField({ name: "lede", title: "Lede", type: "text", rows: 3 }),
        defineField({
          name: "pointers",
          title: "Pointers",
          type: "array",
          of: [defineArrayMember({ type: "confidencePointer" })],
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ section chrome",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({
          name: "titleBefore",
          title: "Title before accent",
          type: "string",
        }),
        defineField({
          name: "titleAccent",
          title: "Title accent",
          type: "string",
        }),
        defineField({
          name: "titleAfter",
          title: "Title after accent",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "stickyCta",
      title: "Sticky CTA",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button label",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "builtForLabel",
          title: "Built-for label",
          type: "string",
        }),
        defineField({ name: "blurb", title: "Blurb", type: "text", rows: 4 }),
        defineField({
          name: "methodLinks",
          title: "Method links",
          type: "array",
          of: [defineArrayMember({ type: "navLink" })],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Landing page" };
    },
  },
});
