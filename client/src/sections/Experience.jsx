import { experience } from '../data/experience'
import Section from '../components/SectionHeading'
import Timeline from '../components/Timeline'

export default function Experience() {
  if (!experience.length) return null
  const items = experience.map((e) => ({
    id: e.id,
    when: e.period,
    title: e.role,
    place: e.organization,
    children: e.points?.length ? (
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
        {e.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
    ) : null,
  }))
  return (
    <Section id="experience" title="Professional experience" intro="Roles and responsibilities.">
      <Timeline items={items} />
    </Section>
  )
}
