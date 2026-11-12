import { Download } from 'lucide-react'
import { profile } from '../data/profile'
import Section from '../components/SectionHeading'

export default function Resume() {
  if (!profile.cvPath) return null
  return (
    <Section id="resume" title="Curriculum vitae" intro="A complete summary of qualifications and training." tone="surface">
      <a
        href={profile.cvPath}
        download
        className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-opacity hover:opacity-90"
      >
        <Download className="h-5 w-5" aria-hidden="true" />
        Download CV
      </a>
    </Section>
  )
}
