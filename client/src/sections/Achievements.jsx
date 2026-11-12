import { Award } from 'lucide-react'
import { achievements } from '../data/more'
import Section from '../components/SectionHeading'

export default function Achievements() {
  if (!achievements.length) return null
  return (
    <Section id="achievements" title="Achievements & awards" intro="Verified recognition only." tone="sage">
      <ul className="divide-y divide-line border-y border-line">
        {achievements.map((a) => (
          <li key={a.id} className="flex gap-4 py-6">
            <Award className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <h3 className="text-2xl">{a.title}</h3>
              <p className="text-sm text-ink-soft">{[a.issuer, a.date].filter(Boolean).join(' · ')}</p>
              {a.description && <p className="mt-2 text-ink-soft">{a.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
