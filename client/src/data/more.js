/**
 * Content collections that are empty until real material is supplied.
 * Each hides its section while empty. Item shapes are described below.
 */

// CLINICAL WORK / CASE STUDIES — genuine, approved cases only. Never publish
// owner personal data or patient images without permission.
//   { id, title, species, background, assessment, diagnostics, management,
//     followUp, outcome, images: [{src, alt}] }
export const cases = []

// CERTIFICATIONS & PROFESSIONAL DEVELOPMENT
// "CT (PSU, Thailand)" was supplied without a full title or status, so it is
// kept as an unpublished draft. Set `published: true` only after the full
// title and status are confirmed.
//   { id, title, issuer, date, credentialId, image, verifyUrl, published }
export const certifications = [
  {
    id: 'ct-psu-draft',
    title: 'CT (PSU, Thailand)',
    issuer: 'Prince of Songkla University, Thailand',
    date: '',
    credentialId: '',
    image: '',
    verifyUrl: '',
    published: false,
  },
]

// ACHIEVEMENTS & AWARDS — verified items only.
//   { id, title, issuer, date, description }
export const achievements = []

// ANIMAL WELFARE & COMMUNITY INVOLVEMENT — real activities only.
//   { id, title, date, description }
export const welfare = []

// BLOG / VETERINARY KNOWLEDGE — approved articles only.
//   { id, title, category, summary, date, readingTime, cover, body }
export const articles = []
