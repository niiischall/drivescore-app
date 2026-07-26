/**
 * @module sanity/structure
 * @description Desk structure with singleton list items for settings + landing.
 */

import type { StructureResolver } from "sanity/structure";

const HIDDEN_TYPES = new Set([
  "siteSettings",
  "landingPage",
  "faqItem",
  "companyPage",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings"),
        ),
      S.listItem()
        .title("Landing page")
        .id("landingPage")
        .child(
          S.document().schemaType("landingPage").documentId("landingPage"),
        ),
      S.divider(),
      S.documentTypeListItem("faqItem").title("FAQ items"),
      S.documentTypeListItem("companyPage").title("Company pages"),
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.has(item.getId() ?? ""),
      ),
    ]);
