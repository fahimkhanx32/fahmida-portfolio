import { useReveal } from '../hooks/useReveal'

/**
 * Vertical timeline. Entries are a real sequence, so the line and markers
 * carry meaning; each marker fills in as the entry scrolls into view.
 * items: [{ id, when, title, place?, detail?, note?, badge?, children? }]
 */
export default function Timeline({ items }) {
  const ref = useReveal('.tl-item')

  return (
    <ol ref={ref} className="relative">
      {items.map((item, i) => (
        <li key={item.id} className="tl-item relative pb-10 pl-9 last:pb-0">
          {i < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-4 h-full w-px bg-line"
            >
              <span className="tl-seg absolute inset-0 bg-accent" />
            </span>
          )}
          <span
            aria-hidden="true"
            className="tl-dot absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2"
          />
          <p className="text-sm font-semibold text-accent-soft">
            {item.when}
            {item.badge && (
              <span className="ml-3 rounded-full bg-sage px-2.5 py-0.5 text-xs font-semibold text-accent">
                {item.badge}
              </span>
            )}
          </p>
          <h3 className="mt-1 text-xl sm:text-2xl">{item.title}</h3>
          {item.place && <p className="mt-1 text-ink-soft">{item.place}</p>}
          {item.detail && <p className="mt-2 max-w-prose text-sm text-ink-soft">{item.detail}</p>}
          {item.note && <p className="mt-2 text-sm italic text-ink-soft">{item.note}</p>}
          {item.children}
        </li>
      ))}
    </ol>
  )
}
