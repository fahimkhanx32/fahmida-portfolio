import { services } from '../data/services'
import Section from '../components/SectionHeading'

export default function Services() {
  const items = services.filter((s) => s.confirmed).slice(0, 6)
  if (!items.length) return null
  return (
    <Section id="services" title="Veterinary services" intro="Services confirmed by Dr. Bristy." tone="sage">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((s) => (
          <li key={s.id} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
            <h3 className="text-2xl">{s.title}</h3>
            <div>
              <p className="text-ink-soft">{s.description}</p>
              <a href="#contact" className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline">
                Get in touch about this
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
