import { defineQuery } from "next-sanity";

/**
 * `image` is projected with its asset reference intact so the server-side URL
 * builder can apply hotspot/crop instead of serving the original upload.
 */
const IMAGE_FRAGMENT = /* groq */ `{
  asset,
  hotspot,
  crop,
  alt,
  "lqip": asset->metadata.lqip
}`;

const SECTION_HEADER_FRAGMENT = /* groq */ `{
  kicker,
  heading,
  subheading
}`;

/**
 * One projection for the whole page.
 *
 * The page is a single static document, so a single round trip is both the
 * fastest option and the simplest cache unit — one query, one tag, one
 * invalidation. Per-section queries would multiply latency and cache entries
 * for no editorial benefit.
 */
export const portfolioQuery = defineQuery(/* groq */ `{
  "site": *[_type == "siteSettings"][0]{
    fullName,
    shortName,
    initials,
    role,
    location,
    timezone,
    email,
    nav[]{ label, href },
    navCta{ label, href },
    resume{
      "url": asset->url,
      "originalFilename": asset->originalFilename,
      "mimeType": asset->mimeType,
      "size": asset->size,
      downloadName,
      label,
      updatedAt
    },
    seo{
      title,
      description,
      ogImage${IMAGE_FRAGMENT}
    }
  },

  "home": *[_type == "homePage"][0]{
    hero{
      availabilityBadge,
      secondaryBadges,
      roleLine,
      headlineBefore,
      headlineHighlight,
      headlineAfter,
      intro,
      resumeCtaLabel,
      assistantCtaLabel,
      stats[]{ label, value, detail, iconKey },
      portrait${IMAGE_FRAGMENT},
      focusLabel,
      focusTitle,
      focusDescription,
      stackLabel,
      stack
    },
    aiAssistant{
      kicker,
      heading,
      description,
      ctaLabel,
      samplePrompts,
      previewTitle,
      previewSubtitle,
      previewMessages[]{ role, text }
    },
    about{
      header${SECTION_HEADER_FRAGMENT},
      impactTitle,
      impactPoints,
      educationLabel
    },
    skills{
      header${SECTION_HEADER_FRAGMENT},
      coreKicker,
      coreHeading,
      coreDescription,
      toolkitKicker,
      toolkitDescription
    },
    experienceHeader${SECTION_HEADER_FRAGMENT},
    projects{
      header${SECTION_HEADER_FRAGMENT},
      featuredLabel
    },
    contact{
      header${SECTION_HEADER_FRAGMENT},
      availabilityLabel,
      preferredChannelLabel,
      profilesLabel,
      directChannels[]{ label, value, href, iconKey, external },
      profiles[]{ label, value, href, iconKey, external },
      meta[]{ iconKey, label },
      assistantLinkLabel,
      copyrightName
    }
  },

  "assistant": *[_type == "assistantSettings"][0]{
    title,
    greeting,
    quickQuestions,
    inputPlaceholder,
    fallbackAnswer
  },

  "experience": *[_type == "experience" && hidden != true] | order(sortOrder asc, startDate desc){
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    location,
    achievements,
    visualType,
    visualTitle,
    visualSubtitle,
    metrics[]{ label, before, after, unit, decimals },
    phases[]{ label, iconKey },
    footnoteTitle,
    footnoteDetail
  },

  "projects": *[_type == "project" && hidden != true] | order(featured desc, sortOrder asc){
    title,
    summary,
    technologies,
    featured,
    status,
    links{ github, frontend, backend, live }
  },

  "skillCategories": *[_type == "skillCategory" && hidden != true] | order(sortOrder asc){
    title,
    iconKey,
    compact,
    skills[]{ name, note, isCore, coreOrder }
  },

  "education": *[_type == "education"] | order(sortOrder asc){
    degree,
    institution,
    meta
  },

  "contributions": *[_type == "contribution"] | order(sortOrder asc){
    label,
    title,
    summary,
    linkLabel,
    url
  }
}`);
