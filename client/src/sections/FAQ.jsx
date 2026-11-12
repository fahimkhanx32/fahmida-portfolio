import { ChevronDown } from 'lucide-react'
import { faq } from '../data/faq'
import Section from '../components/SectionHeading'

export default function FAQ() {
  return (
    <Section id="faq" title="Frequently asked questions" intro="Quick answers about Dr. Bristy's background and credentials.">
      <div className="divide-y divide-line border-y border-line">
        {faq.map((item) => (
          <details key={item.q} className="group py-1">
            <summary className="flex min-h-[3.5rem] cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-xl [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="pb-5 pr-9 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
