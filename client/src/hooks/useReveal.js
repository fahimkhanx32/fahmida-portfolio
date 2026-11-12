import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` to the referenced element (or, with `selector`, to matching
 * children) once it scrolls into view. Pairs with .reveal / .tl-item in CSS.
 */
export function useReveal(selector) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const targets = selector ? Array.from(root.querySelectorAll(selector)) : [root]
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [selector])

  return ref
}
