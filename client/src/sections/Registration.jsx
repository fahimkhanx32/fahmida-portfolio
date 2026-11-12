import { ShieldCheck } from 'lucide-react'
import { profile } from '../data/profile'
import Section from '../components/SectionHeading'

export default function Registration() {
  const r = profile.registration

  return (
    <Section
      id="registration"
      title="Professional registration"
      intro="Registered to practise as a Veterinary Doctor in Bangladesh."
      tone="sage"
    >
      <div className="rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
        <div className="flex items-center gap-3 text-accent">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          <p className="text-sm font-semibold">{profile.title}</p>
        </div>
        <p className="mt-6 text-ink-soft">{r.council}</p>
        <p className="mt-1 text-sm text-ink-soft">Registration number</p>
        <p
          className="mt-1 font-display text-6xl tabular-nums sm:text-7xl"
          aria-label={`Registration number ${r.number.split('').join(' ')}`}
        >
          {r.number}
        </p>
      </div>

      {r.certificateImage ? (
        <figure className="mt-8">
          <img
            src={r.certificateImage}
            alt="Bangladesh Veterinary Council registration certificate of Dr. Fahmida Bristy"
            loading="lazy"
            className="w-full rounded-2xl border border-line"
          />
          <figcaption className="mt-2 text-sm text-ink-soft">Registration certificate.</figcaption>
        </figure>
      ) : (
        // Visible only while developing, so the live site never shows an
        // unfinished placeholder. Set registration.certificateImage to publish.
        import.meta.env.DEV && (
          <div className="mt-8 rounded-2xl border border-dashed border-line p-6 text-sm text-ink-soft">
            Developer note: no certificate image set. Add one in <code>src/data/profile.js</code>{' '}
            (<code>registration.certificateImage</code>). This note does not appear on the built site.
          </div>
        )
      )}
    </Section>
  )
}
