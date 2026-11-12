import { profile } from './profile'
import { internship } from './internship'
import { services } from './services'

const d = profile.degree
const confirmedServices = services.filter((s) => s.confirmed)

/** Contact answer is built from channels that actually exist. */
function contactAnswer() {
  const channels = []
  if (profile.social.facebook) channels.push('Facebook')
  if (profile.contact.email) channels.push('email')
  if (profile.contact.phone) channels.push('phone')
  if (!channels.length) return 'Contact details have not been published yet.'
  return `Visitors can get in touch through the Contact section of this site (${channels.join(', ')}).`
}

/**
 * FAQ. Every answer comes from confirmed information only. The services
 * question appears only after at least one service is confirmed, and no
 * answer offers medical advice or claims consultation availability.
 */
export const faq = [
  {
    q: `Who is ${profile.name}?`,
    a: `${profile.name} is a registered Veterinary Doctor in ${profile.country}.`,
  },
  {
    q: 'Where did she study veterinary medicine?',
    a: `She studied ${d.subject} at ${d.institution}, ${d.country}, beginning in ${d.admitted.split(' ').slice(-1)[0]} and graduating in ${d.graduationYear}.`,
  },
  {
    q: 'Is she registered with the Bangladesh Veterinary Council?',
    a: `Yes. She is registered with the ${profile.registration.council}.`,
  },
  {
    q: 'What is her BVC registration number?',
    a: `Her BVC registration number is ${profile.registration.number}.`,
  },
  {
    q: 'Where is her international internship?',
    a: `At ${internship.institution}, ${internship.country}. The internship profile period is listed as ${internship.period} and is ongoing.`,
  },
  ...(confirmedServices.length
    ? [
        {
          q: 'What services does she offer?',
          a: confirmedServices.map((s) => s.title).join(', ') + '.',
        },
      ]
    : []),
  { q: 'How can someone contact her?', a: contactAnswer() },
]
