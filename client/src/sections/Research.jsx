import { FileText, ExternalLink } from 'lucide-react'
import { research } from '../data/research'
import Section from '../components/SectionHeading'

export default function Research() {
  if (!research.length) return null
  return (
    <Section id="research" title="Research & publications" intro="Published and presented work.">
      <ol className="divide-y divide-line border-y border-line">
        {research.map((r) => (
          <li key={r.id} className="py-6">
            <p className="text-sm text-accent-soft">{[r.category, r.date].filter(Boolean).join(' · ')}</p>
            <h3 className="mt-1 text-2xl">{r.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{[r.institution, r.venue].filter(Boolean).join(' — ')}</p>
            {r.summary && <p className="mt-3 max-w-prose text-ink-soft">{r.summary}</p>}
            <div className="mt-3 flex flex-wrap gap-5 text-sm font-semibold text-accent">
              {r.link && (
                <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                  Read the publication <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {r.pdf && (
                <a href={r.pdf} download className="inline-flex items-center gap-1.5 hover:underline">
                  Download PDF <FileText className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
