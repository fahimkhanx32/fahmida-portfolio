import { profile } from '../data/profile'
import { internship } from '../data/internship'
import Section from '../components/SectionHeading'

export default function About() {
  const d = profile.degree
  const snapshot = [
    ['Profession', `${profile.title}, ${profile.country}`],
    ['Registration', `${profile.registration.council}, No. ${profile.registration.number}`],
    ['University', `${d.institution} — graduated ${d.graduationYear}`],
    ['Subject', d.subject],
    ['International training', `${internship.institution}, ${internship.country} (${internship.status.toLowerCase()})`],
  ]

  return (
    <Section id="about" title="About" intro="A short professional introduction.">
      <div className="space-y-5 font-display text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
        {profile.biography.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <dl className="mt-12 divide-y divide-line border-y border-line">
        {snapshot.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-ink-soft">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
