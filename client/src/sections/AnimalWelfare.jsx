import { welfare } from '../data/more'
import Section from '../components/SectionHeading'

export default function AnimalWelfare() {
  if (!welfare.length) return null
  return (
    <Section id="welfare" title="Animal welfare & community involvement" intro="Real activities and initiatives.">
      <ul className="divide-y divide-line border-y border-line">
        {welfare.map((w) => (
          <li key={w.id} className="py-6">
            {w.date && <p className="text-sm text-accent-soft">{w.date}</p>}
            <h3 className="text-2xl">{w.title}</h3>
            {w.description && <p className="mt-2 max-w-prose text-ink-soft">{w.description}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
