import { ExternalLink } from 'lucide-react'
import { internship } from '../data/internship'
import Section from '../components/SectionHeading'
import Timeline from '../components/Timeline'
import ProjectGallery from '../components/ProjectGallery'

export default function Internship() {
  const i = internship
  const photos = i.photos.map((p, n) => ({ id: `psu-${n}`, ...p }))

  return (
    <Section
      id="internship"
      title="International internship & training"
      intro="Professional development abroad, currently in progress."
      tone="sage"
    >
      <div className="rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">{i.status}</span>
          <span className="text-sm text-ink-soft">{i.period}</span>
        </div>
        <h3 className="mt-5 text-3xl sm:text-4xl">{i.institution}</h3>
        <p className="mt-1 text-lg text-ink-soft">{i.country}</p>
        {i.link?.url && (
          <a
            href={i.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            {i.link.label} (opens in a new tab)
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <h3 className="mb-6 mt-14 text-2xl">Timeline</h3>
      <Timeline items={i.milestones} />

      {photos.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-6 text-2xl">Photographs</h3>
          <ProjectGallery images={photos} />
        </div>
      )}
    </Section>
  )
}
