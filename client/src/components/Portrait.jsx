import { profile } from '../data/profile'

/**
 * Professional portrait. Shows the real photo when `profile.photo` is set,
 * otherwise an elegant monogram placeholder (no stock photo is ever used).
 */
export default function Portrait({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-t-[999px] rounded-b-3xl border border-line bg-sage shadow-card ${className}`}
    >
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={profile.photoAlt}
          width="640"
          height="800"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label="Portrait placeholder — a photograph can be added in src/data/profile.js"
          className="flex h-full w-full flex-col items-center justify-center gap-3"
        >
          <svg viewBox="0 0 120 120" className="h-20 w-20 text-accent-soft/50" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M60 104V54M60 54C60 36 46 24 28 22c0 18 12 32 32 32zM60 72c0-16 12-28 30-30 0 16-12 28-30 30z" />
          </svg>
          <span className="font-display text-5xl italic text-accent">{profile.initials}</span>
        </div>
      )}
    </div>
  )
}
