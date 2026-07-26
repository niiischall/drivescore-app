/**
 * @module sanity/schemas/objects
 * @description Reusable object types for landing + company content.
 */

import { defineArrayMember, defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
});

export const textSegment = defineType({
  name: "textSegment",
  title: "Text segment",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emphasis",
      title: "Emphasis (bold)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "text", emphasis: "emphasis" },
    prepare({ title, emphasis }) {
      return { title: emphasis ? `**${title}**` : title };
    },
  },
});

export const richBullet = defineType({
  name: "richBullet",
  title: "Rich bullet",
  type: "object",
  fields: [
    defineField({
      name: "segments",
      title: "Segments",
      type: "array",
      of: [defineArrayMember({ type: "textSegment" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { segments: "segments" },
    prepare({ segments }) {
      const title = (segments as { text?: string }[] | undefined)
        ?.map((s) => s.text ?? "")
        .join("");
      return { title: title || "Bullet" };
    },
  },
});

export const navLink = defineType({
  name: "navLink",
  title: "Nav link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const problemCard = defineType({
  name: "problemCard",
  title: "Problem card",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon key",
      type: "string",
      options: {
        list: [
          { title: "Trend down", value: "trendDown" },
          { title: "Drop", value: "drop" },
          { title: "Seal", value: "seal" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const sampleMarker = defineType({
  name: "sampleMarker",
  title: "Sample marker",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verdict",
      title: "Verdict",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Caution", value: "caution" },
          { title: "Compatible", value: "compatible" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "width",
      title: "Bar width (CSS %)",
      type: "string",
      description: 'e.g. "55%"',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const methodMarker = defineType({
  name: "methodMarker",
  title: "Method marker",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weight",
      title: "Weight (%)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
  ],
});

export const methodSlice = defineType({
  name: "methodSlice",
  title: "Method slice",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Slice id",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "share",
      title: "Share (%)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "markers",
      title: "Markers",
      type: "array",
      of: [defineArrayMember({ type: "methodMarker" })],
    }),
  ],
});

export const confidencePointer = defineType({
  name: "confidencePointer",
  title: "Confidence pointer",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Anchor id (optional)",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon key",
      type: "string",
      options: {
        list: [
          { title: "Flag", value: "flag" },
          { title: "List checks", value: "listChecks" },
          { title: "Trend up", value: "trendUp" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 4,
      description:
        "Use **bold** for emphasis. Use {{methodVersion}} for the code-owned method version stamp.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const quickAction = defineType({
  name: "quickAction",
  title: "Quick action",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon key",
      type: "string",
      options: {
        list: [
          { title: "List checks", value: "listChecks" },
          { title: "Gauge", value: "gauge" },
          { title: "Gas pump", value: "gasPump" },
          { title: "Question", value: "question" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "target",
      title: "Analytics target",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const heroStat = defineType({
  name: "heroStat",
  title: "Hero stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const blockContent = defineType({
  name: "blockContent",
  title: "Block content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          },
        ],
      },
    }),
  ],
});
