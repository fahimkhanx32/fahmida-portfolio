import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

const systemPrefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

const readInitial = () => {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    /* storage unavailable */
  }
  return systemPrefersDark() ? 'dark' : 'light'
}

function apply(theme, animate) {
  const root = document.documentElement
  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 400)
  }
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitial)

  // Follow the operating system until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      let saved = null
      try {
        saved = localStorage.getItem(KEY)
      } catch {
        /* ignore */
      }
      if (!saved) {
        const next = e.matches ? 'dark' : 'light'
        apply(next, true)
        setTheme(next)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      apply(next, true)
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
