import { Moon, Sun } from 'lucide-react'

/** Segmented Light / Dark switch. `compact` shows a single icon button (mobile). */
export default function ThemeToggle({ theme, onToggle, compact = false }) {
  const isDark = theme === 'dark'

  if (compact) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        className="nav-ctrl inline-flex h-9 w-9 items-center justify-center rounded-full"
      >
        {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
      </button>
    )
  }

  const seg = (active) =>
    `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
      active ? 'nav-seg-on' : 'nav-seg-off'
    }`

  return (
    <div role="group" aria-label="Colour theme" className="nav-toggle inline-flex items-center rounded-full p-0.5">
      <button type="button" aria-pressed={!isDark} onClick={() => isDark && onToggle()} className={seg(!isDark)}>
        <Sun className="h-3.5 w-3.5" aria-hidden="true" />
        Light
      </button>
      <button type="button" aria-pressed={isDark} onClick={() => !isDark && onToggle()} className={seg(isDark)}>
        <Moon className="h-3.5 w-3.5" aria-hidden="true" />
        Dark
      </button>
    </div>
  )
}
