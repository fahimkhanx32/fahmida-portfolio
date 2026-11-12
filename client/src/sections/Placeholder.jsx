import Section from '../components/SectionHeading'

/** Shown in place of a section that has no confirmed content yet, so navbar links never dead-end. */
export default function Placeholder({ id, title }) {
  return (
    <Section id={id} title={title} intro="This section is being prepared.">
      <p className="rounded-3xl border border-dashed border-line p-8 text-ink-soft">
        Details will be added here soon.
      </p>
    </Section>
  )
}
