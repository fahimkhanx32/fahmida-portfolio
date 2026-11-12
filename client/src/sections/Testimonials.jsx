import { Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import Section from '../components/SectionHeading'

export default function Testimonials() {
  if (!testimonials.length) return null
  return (
    <Section id="testimonials" title="Testimonials" intro="Words from supervisors, mentors and colleagues." tone="sage" wide>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.id} className="rounded-3xl border border-line bg-surface p-8 shadow-card">
            <Quote className="h-6 w-6 text-accent-soft" aria-hidden="true" />
            <blockquote className="mt-3 font-display text-xl">{t.quote}</blockquote>
            <figcaption className="mt-5 text-sm text-ink-soft">
              <span className="font-semibold text-ink">{t.name}</span>
              {t.role && `, ${t.role}`}
              {t.organization && ` · ${t.organization}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
