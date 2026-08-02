/**
 * @module sanity/schemas
 * @description Schema type registry for Sanity Studio.
 */

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
  richBullet,
  sampleMarker,
  textSegment,
} from "./objects";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Documents
  siteSettings,
  landingPage,
  faqItem,
  // Objects
  textSegment,
  richBullet,
  navLink,
  problemCard,
  sampleMarker,
  methodMarker,
  methodSlice,
  confidencePointer,
  heroStat,
  blockContent,
];
