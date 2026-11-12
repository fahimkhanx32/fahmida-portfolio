import { cases } from '../data/more'
import Section from '../components/SectionHeading'

const FIELDS = [
  ['background', 'Clinical background'],
  ['assessment', 'Assessment'],
  ['diagnostics', 'Diagnostic approach'],
  ['management', 'Management'],
  ['followUp', 'Follow-up'],
  ['outcome', 'Outcome'],
]

export default function ClinicalWork() {
  if (!cases.length) return null
  return (
    <Section id="clinical" title="Clinical work" intro="Case studies approved for publication." wide tone="surface">
      <div className="space-y-8">
        {cases.map((c) => (
          <article key={c.id} className="rounded-3xl border border-line bg-bg p-8 shadow-card">
            <h3 className="text-2xl sm:text-3xl">{c.title}</h3>
            {c.species && <p className="mt-1 text-sm text-ink-soft">Species: {c.species}</p>}
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              {FIELDS.filter(([k]) => c[k]).map(([k, label]) => (
                <div key={k}>
                  <dt className="text-sm font-semibold">{label}</dt>
                  <dd className="mt-1 text-ink-soft">{c[k]}</dd>
                </div>
              ))}
            </dl>
            {c.images?.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {c.images.map((img) => (
                  <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="rounded-xl border border-line" />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
