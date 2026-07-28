/**
 * @module sanity/schemas/landingPage
 * @description Singleton marketing landing page content model.
 */

import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "marqueeSuffix",
      title: "Marquee suffix",
      type: "string",
      description: 'Text after the visitor count, e.g. "car owners have visited so far"',
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
          name: "heroImageLight",
          title: "Hero image (light) path",
          type: "string",
          description: "Public path, e.g. /illustrations/...",
        }),
        defineField({
          name: "heroImageDark",
          title: "Hero image (dark) path",
          type: "string",
        }),
        defineField({
          name: "heroImageAlt",
          title: "Hero image alt",
          type: "string",
        }),
        defineField({
          name: "bullets",
          title: "Benefit bullets",
          type: "array",
          of: [defineArrayMember({ type: "richBullet" })],
        }),
        defineField({
          name: "stats",
          title: "Stats",
          type: "array",
          of: [defineArrayMember({ type: "heroStat" })],
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
        defineField({
          name: "joinedTitle",
          title: "Joined title",
          type: "string",
        }),
        defineField({
          name: "joinedBodyBefore",
          title: "Joined body (before email)",
          type: "string",
        }),
        defineField({
          name: "joinedBodyAfter",
          title: "Joined body (after email)",
          type: "string",
        }),
        defineField({
          name: "joinedMeta",
          title: "Joined meta",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "quickActions",
      title: "Quick actions",
      type: "array",
      group: "sections",
      of: [defineArrayMember({ type: "quickAction" })],
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
          name: "ctaLabel",
          title: "CTA label",
          type: "string",
        }),
        defineField({
          name: "gaugeStartLabel",
          title: "Progress gauge start label",
          type: "string",
        }),
        defineField({
          name: "gaugeEndLabel",
          title: "Progress gauge end label",
          type: "string",
        }),
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
        defineField({
          name: "captionTemplate",
          title: "Caption template",
          type: "string",
          description: "Use {{methodVersion}} for the code-owned version stamp.",
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
          name: "methodVersionLabel",
          title: "Method version label (display)",
          type: "string",
          description:
            "Editorial label shown in marketing; scoring engine still owns METHOD_VERSION in code.",
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
        defineField({
          name: "companyLinks",
          title: "Company links",
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
