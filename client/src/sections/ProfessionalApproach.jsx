import Section from '../components/SectionHeading'
import Timeline from '../components/Timeline'

/**
 * A GENERAL framework for veterinary practice, not a claim about Dr. Bristy's
 * established clinical process. The section is hidden by default
 * (see `approach` in src/data/navigation.js). Edit the steps to match her own
 * words, then set visible: true.
 */
const steps = [
  { id: 's1', when: 'Step 1', title: "Understand the animal's health concern" },
  { id: 's2', when: 'Step 2', title: 'Gather relevant history' },
  { id: 's3', when: 'Step 3', title: 'Conduct an appropriate assessment' },
  { id: 's4', when: 'Step 4', title: 'Consider diagnostic requirements' },
  { id: 's5', when: 'Step 5', title: 'Discuss appropriate care options' },
  { id: 's6', when: 'Step 6', title: 'Support follow-up and preventive health' },
]

export default function ProfessionalApproach() {
  return (
    <Section
      id="approach"
      title="How I work"
      intro="A general framework for veterinary practice."
    >
      <Timeline items={steps} />
    </Section>
  )
}
