import { useEffect, useState } from 'react'

/**
 * Scroll-spy. Returns the id of the last section whose top has passed ~40% of
 * the viewport height; the final section wins when the page is scrolled to the end.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
      if (!els.length) return
      let current = els[0].id
      const line = window.innerHeight * 0.4
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) current = els[els.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}
