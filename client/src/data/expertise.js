/**
 * AREAS OF EXPERTISE
 * ---------------------------------------------------------------------------
 * Candidate categories are listed below but all are `confirmed: false`, so
 * none appear publicly. Set `confirmed: true` only for areas backed by real
 * experience, training or her own confirmation. The section hides itself
 * when nothing is confirmed.
 */
export const expertise = [
  { id: 'animal-health', title: 'Animal Health', confirmed: false },
  { id: 'clinical-practice', title: 'Veterinary Clinical Practice', confirmed: false },
  { id: 'preventive-care', title: 'Preventive Animal Healthcare', confirmed: false },
  { id: 'animal-welfare', title: 'Animal Welfare', confirmed: false },
  { id: 'diagnostics', title: 'Veterinary Diagnostics', confirmed: false },
  { id: 'animal-science', title: 'Animal Science', confirmed: false },
  { id: 'veterinary-medicine', title: 'Veterinary Medicine', confirmed: false },
  { id: 'livestock-health', title: 'Livestock Health', confirmed: false },
  { id: 'companion-animals', title: 'Companion Animal Care', confirmed: false },
  { id: 'research', title: 'Veterinary Research', confirmed: false },
].map((e) => ({ description: '', ...e }))
