import { profile } from '../data/profile'
import { education } from '../data/education'
import { cases, certifications, achievements } from '../data/more'
import { research } from '../data/research'
import Section from '../components/SectionHeading'

/**
 * Career snapshot. Every figure is a count of confirmed records — no animals
 * treated, success rates, client numbers or "years of experience".
 * Counts for publications, awards, cases and certifications appear only
 * once real records exist.
 */
export default function Statistics() {
  const schoolMilestones = education.filter((e) => ['ssc', 'hsc'].includes(e.id)).length

  const items = [
    { value: profile.registration.number, label: 'BVC registration number' },
    { value: '1', label: 'Undergraduate institution', note: profile.degree.institution },
    { value: '1', label: 'Listed international internship', note: 'Prince of Songkla University, Thailand' },
    { value: String(schoolMilestones), label: 'School-level milestones', note: 'SSC (2016) and HSC (2018)' },
  ]
  const optional = [
    [research.length, 'Publications'],
    [achievements.length, 'Verified achievements'],
    [cases.length, 'Published case studies'],
    [certifications.filter((c) => c.published).length, 'Certifications'],
  ]
  optional.forEach(([n, label]) => n > 0 && items.push({ value: String(n), label }))

  return (
    <Section id="snapshot" title="Career snapshot" intro="Figures drawn only from confirmed records." wide tone="surface">
      <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.label} className="bg-bg p-7">
            <dd className="font-display text-5xl tabular-nums">{it.value}</dd>
            <dt className="mt-3 text-sm font-medium">{it.label}</dt>
            {it.note && <p className="mt-1 text-sm text-ink-soft">{it.note}</p>}
          </div>
        ))}
      </dl>
    </Section>
  )
}
