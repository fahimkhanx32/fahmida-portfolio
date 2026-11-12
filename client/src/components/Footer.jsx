import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'
import { navItems } from '../data/navigation'
import FacebookIcon from './FacebookIcon'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-sage/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <p className="font-display text-2xl">{profile.name}</p>
          <p className="mt-1 text-ink-soft">{profile.title}</p>
          <p className="mt-4 text-sm text-ink-soft">
            {profile.registration.council}
            <br />
            Registration No. <span className="font-semibold text-ink">{profile.registration.number}</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-ink-soft transition-colors hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {profile.social.facebook && (
            <a
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook (opens in a new tab)
            </a>
          )}
        </nav>

        <a
          href="#home"
          className="inline-flex h-11 items-center gap-2 justify-self-start rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent md:justify-self-end"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          Back to top
        </a>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-soft sm:px-8">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
