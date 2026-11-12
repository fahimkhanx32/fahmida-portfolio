import { certifications } from '../data/more'
import Section from '../components/SectionHeading'

export default function Certifications() {
  const items = certifications.filter((c) => c.published)
  if (!items.length) return null
  return (
    <Section id="certifications" title="Certifications & professional development" intro="Verified credentials and training." tone="surface">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((c) => (
          <li key={c.id} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-2xl">{c.title}</h3>
              <p className="text-ink-soft">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>
              {c.credentialId && <p className="mt-1 text-sm text-ink-soft">Credential ID: {c.credentialId}</p>}
              {c.verifyUrl && (
                <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
                  Verify this credential (opens in a new tab)
                </a>
              )}
            </div>
            {c.image && (
              <img src={c.image} alt={`Certificate: ${c.title}`} loading="lazy" className="h-24 rounded-lg border border-line" />
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}
