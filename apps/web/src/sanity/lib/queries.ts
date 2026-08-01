/**
 * @module sanity/lib/queries
 * @description GROQ queries for marketing content.
 */

import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name,
    title,
    description,
    locale,
    contactEmail,
    footerDisclaimer
  }
`);

export const landingPageQuery = defineQuery(`
  *[_type == "landingPage" && _id == "landingPage"][0]{
    headerBadge,
    marqueeSuffix,
    hero{
      badge,
      titleBefore,
      titleAccent,
      titleAfter,
      heroImageLight,
      heroImageDark,
      heroImageAlt,
      bullets[]{ segments[]{ text, emphasis } },
      stats[]{ value, label },
      gaugeLabel,
      gaugeMandate,
      ctaLabel,
      ctaMicrocopy,
      joinedTitle,
      joinedBodyBefore,
      joinedBodyAfter,
      joinedMeta
    },
    problem{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter,
      lede,
      cards[]{ icon, title, body }
    },
    journey{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter,
      lede,
      ctaLabel,
      gaugeStartLabel,
      gaugeEndLabel,
      steps[]{ _key, title, body }
    },
    sampleScore{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter,
      lede,
      imagePath,
      imageAlt,
      scoreValue,
      scoreBand,
      vehicleName,
      vehicleMeta,
      markersLabel,
      markers[]{ label, verdict, tone, width },
      confidenceNote,
      ctaLabel,
      captionTemplate
    },
    method{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter,
      lede,
      compositionLabel,
      methodVersionLabel,
      showMarkersLabel,
      hideMarkersLabel,
      slices[]{
        id,
        share,
        label,
        blurb,
        markers[]{ name, weight }
      }
    },
    confidence{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter,
      lede,
      pointers[]{ id, icon, title, body }
    },
    faq{
      eyebrow,
      titleBefore,
      titleAccent,
      titleAfter
    },
    stickyCta{ title, subtitle, buttonLabel },
    footer{
      builtForLabel,
      blurb,
      methodLinks[]{ label, href }
    }
  }
`);

export const faqItemsQuery = defineQuery(`
  *[_type == "faqItem" && published != false] | order(order asc) {
    _id,
    question,
    answer,
    "answerPlain": pt::text(answer),
    order
  }
`);

export const companyPageQuery = defineQuery(`
  *[_type == "companyPage" && slug.current == $slug][0]{
    "slug": slug.current,
    eyebrow,
    title,
    body,
    seo,
    lastUpdated
  }
`);
