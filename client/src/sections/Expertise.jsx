import { expertise } from '../data/expertise'
import Section from '../components/SectionHeading'

export default function Expertise() {
  const items = expertise.filter((e) => e.confirmed)
  if (!items.length) return null
  return (
    <Section id="expertise" title="Areas of expertise" intro="Areas supported by Dr. Bristy's training and experience." wide>
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => (
          <li key={e.id} className="bg-surface p-7">
            <h3 className="text-xl">{e.title}</h3>
            {e.description && <p className="mt-2 text-sm text-ink-soft">{e.description}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}
