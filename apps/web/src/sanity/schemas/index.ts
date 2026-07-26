/**
 * @module sanity/schemas
 * @description Schema type registry for Sanity Studio.
 */

import { companyPage } from "./companyPage";
import { faqItem } from "./faqItem";
import { landingPage } from "./landingPage";
import {
  blockContent,
  confidencePointer,
  heroStat,
  methodMarker,
  methodSlice,
  navLink,
  problemCard,
  quickAction,
  richBullet,
  sampleMarker,
  seoFields,
  textSegment,
} from "./objects";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Documents
  siteSettings,
  landingPage,
  faqItem,
  companyPage,
  // Objects
  seoFields,
  textSegment,
  richBullet,
  navLink,
  problemCard,
  sampleMarker,
  methodMarker,
  methodSlice,
  confidencePointer,
  quickAction,
  heroStat,
  blockContent,
];
