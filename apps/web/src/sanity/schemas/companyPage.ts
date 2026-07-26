/**
 * @module sanity/schemas/companyPage
 * @description Slug-based company/legal pages (privacy, contact, future terms).
 */

import { defineField, defineType } from "sanity";

export const companyPage = defineType({
  name: "companyPage",
  title: "Company page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 64,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Company",
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
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated label",
      type: "string",
      description: 'e.g. "July 2026"',
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled page",
        subtitle: slug ? `/${slug}` : "No slug",
      };
    },
  },
});
