import { education } from '../data/education'
import Section from '../components/SectionHeading'
import Timeline from '../components/Timeline'

export default function Education() {
  return (
    <Section
      id="education"
      title="Education & academic journey"
      intro="From school in Naogaon to veterinary studies at Sher-e-Bangla Agricultural University."
    >
      <Timeline items={education} />
    </Section>
  )
}
