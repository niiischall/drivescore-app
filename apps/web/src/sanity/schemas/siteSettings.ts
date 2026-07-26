/**
 * @module sanity/schemas/siteSettings
 * @description Singleton site-wide marketing/SEO settings.
 */

import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Default SEO title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Default SEO description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      initialValue: "en_IN",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "footerDisclaimer",
      title: "Footer disclaimer",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
