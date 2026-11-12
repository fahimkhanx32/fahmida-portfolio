import { ArrowDown } from 'lucide-react'
import { profile } from '../data/profile'
import { internship } from '../data/internship'
import Portrait from '../components/Portrait'
import FacebookIcon from '../components/FacebookIcon'

// Faint botanical line-work: decoration only, kept very quiet.
function Botanical() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 600"
      className="pointer-events-none absolute -right-24 top-10 hidden h-[34rem] text-accent-soft opacity-[0.13] lg:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M200 590C200 420 210 250 260 40" />
      {[80, 150, 220, 290, 360, 430].map((y, i) => (
        <g key={y}>
          <path d={`M${215 - i * 1.5} ${y + 40}c-60-10-100-50-110-100 55 5 100 40 110 100z`} />
          <path d={`M${213 - i * 1.5} ${y}c60-10 100-50 110-100-55 5-100 40-110 100z`} />
        </g>
      ))}
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 sm:pt-36 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://res.cloudinary.com/fhsrf5ps/image/upload/v1794340882/drfahmidawithpets.webp')", }} >
      <Botanical />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center lg:gap-16 lg:pb-28">
        <div>
          <p className="text-sm font-medium text-accent-soft">{profile.title} · {profile.country}</p>
          <h1 id="hero-title" className="mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{profile.tagline}</p>

          <dl className="mt-9 grid max-w-xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            <div className="bg-surface p-5">
              <dt className="text-xs font-medium text-ink-soft">Bangladesh Veterinary Council</dt>
              <dd className="mt-1 font-display text-2xl">Reg. No. {profile.registration.number}</dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-xs font-medium text-ink-soft">International internship</dt>
              <dd className="mt-1 font-display text-2xl leading-tight">
                {internship.institution.replace(' (PSU)', '')}, {internship.country}
              </dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90"
            >
              Explore My Profile
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-accent px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-sage"
            >
              Contact Me
            </a>
            {profile.social.facebook && (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Fahmida Bristy on Facebook (opens in a new tab)"
                className="hidden h-12 w-12 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent sm:inline-flex"
              >
                <FacebookIcon />
              </a>
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-none">
          <Portrait className="aspect-[4/5] w-full" />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink-soft sm:block"
      >
        <ArrowDown className="scroll-cue h-5 w-5" aria-hidden="true" />
      </a>
    </section>
  )
}
