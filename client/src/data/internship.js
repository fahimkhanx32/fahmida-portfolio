/**
 * International internship. Status is "Ongoing" — it must not be described as
 * completed. Campus, department, modules, duration and outcomes were not
 * supplied and are intentionally not stated.
 */
export const internship = {
  institution: 'Prince of Songkla University (PSU)',
  country: 'Thailand',
  status: 'Ongoing',
  period: '4 January 2026 – Present',
  link: {
    label: 'PSU on Facebook',
    url: 'https://www.facebook.com/psuconnext',
  },
  milestones: [
    {
      id: 'invitation',
      when: 'October 2025',
      title: 'Official invitation letter received',
      note: 'Reported by Dr. Bristy.',
    },
    {
      id: 'arrival',
      when: '28 December 2025',
      title: 'Arrived in Thailand to join the internship programme',
      note: 'Reported by Dr. Bristy.',
    },
    {
      id: 'start',
      when: '4 January 2026',
      title: 'Internship period begins',
      note: 'Listed internship profile period: 4 January 2026 – Present.',
    },
  ],
  // Real internship photographs or certificates. Add objects like:
  // { src: '/images/psu-1.jpg', alt: '...', caption: '...' }
  photos: [],
}
