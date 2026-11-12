import { profile } from './profile'

const d = profile.degree

/**
 * Academic timeline. All entries come from the supplied brief.
 * No CGPA, rank, awards, thesis title or ceremony details are claimed.
 */
export const education = [
  {
    id: 'ssc',
    when: '2016',
    title: 'Secondary School Certificate (SSC)',
    place: 'Naogaon Government Girls High School',
  },
  {
    id: 'hsc',
    when: '2018',
    title: 'Higher Secondary Certificate (HSC)',
    place: 'Naogaon Government College, Naogaon',
  },
  {
    id: 'admission',
    when: d.admitted,
    title: 'Undergraduate admission',
    place: d.institution,
    detail: `Subject: ${d.subject}.`,
  },
  {
    id: 'graduation',
    when: d.graduationYear,
    title: 'Graduation',
    place: d.institution,
    // The official degree title appears only after it is verified.
    detail:
      d.verified && d.officialTitle
        ? d.officialTitle
        : `Subject: ${d.subject}.`,
  },
]
