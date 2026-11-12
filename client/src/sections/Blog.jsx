import { articles } from '../data/more'
import Section from '../components/SectionHeading'

export default function Blog() {
  if (!articles.length) return null
  return (
    <Section id="blog" title="Veterinary knowledge" intro="Articles written or approved by Dr. Bristy." wide tone="surface">
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((a) => (
          <article key={a.id} className="overflow-hidden rounded-3xl border border-line bg-bg shadow-card">
            {a.cover && <img src={a.cover} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />}
            <div className="p-7">
              <p className="text-sm text-accent-soft">
                {[a.category, a.date, a.readingTime].filter(Boolean).join(' · ')}
              </p>
              <h3 className="mt-1 text-2xl">{a.title}</h3>
              <p className="mt-3 text-ink-soft">{a.summary}</p>
              {a.body && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-accent">Read the article</summary>
                  <div className="mt-3 space-y-3 text-ink-soft">
                    {String(a.body).split('\n\n').map((p) => <p key={p}>{p}</p>)}
                  </div>
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
