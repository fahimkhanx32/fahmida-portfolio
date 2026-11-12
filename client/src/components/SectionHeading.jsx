import { useReveal } from '../hooks/useReveal'

/**
 * Shared section shell: an editorial two-column layout with the heading held
 * in a sticky left column on large screens, and content on the right.
 * Pass `wide` for sections that need the full width (galleries, cards).
 */
export default function Section({ id, title, intro, tone = 'plain', wide = false, children }) {
  const ref = useReveal()
  const bg = tone === 'sage' ? 'bg-sage/60' : tone === 'surface' ? 'bg-surface' : ''

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`border-t border-line py-20 sm:py-28 ${bg}`}
    >
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl px-5 sm:px-8 ${
          wide ? '' : 'grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-16'
        }`}
      >
        <header className={wide ? 'mb-12 max-w-2xl' : 'lg:sticky lg:top-28 lg:self-start'}>
          <h2 id={`${id}-title`} className="text-3xl sm:text-4xl lg:text-[2.6rem]">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-md text-ink-soft">{intro}</p>}
        </header>
        <div>{children}</div>
      </div>
    </section>
  )
}
