import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CalendarDays, ChevronDown, Download, LogIn, Mail, Menu, Phone, X } from 'lucide-react'
import { profile } from '../data/profile'
import { moreNav, primaryNav, visibleSections } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'
import { useCv } from '../hooks/useCv'
import { getToken } from '../lib/auth'

const MORE_KEY = 'more'
const LOCK_MS = 1000
const sectionIds = visibleSections.map((s) => s.id)

// section id -> nav key. Sections without their own link inherit the previous
// one, so the spotlight never jumps back while scrolling through them.
const keyBySection = (() => {
  const direct = {}
  primaryNav.forEach((i) => (direct[i.target] = i.key))
  moreNav.forEach((i) => {
    if (!direct[i.target]) direct[i.target] = MORE_KEY
  })
  const map = {}
  let last = null
  sectionIds.forEach((id) => {
    if (direct[id]) last = direct[id]
    map[id] = last
  })
  return map
})()

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const activeSection = useActiveSection(sectionIds)
  const spyKey = keyBySection[activeSection] ?? null
  const [clickedKey, setClickedKey] = useState(null)
  const lock = useRef(null)
  const activeKey = clickedKey ?? spyKey
  const restKey = activeKey ?? primaryNav[0].key // beam rests on the first link at the top of the page

  const navRef = useRef(null)
  const itemRefs = useRef({})
  const moreWrapRef = useRef(null)
  const burgerRef = useRef(null)
  const [spot, setSpot] = useState({ x: 0, w: 0, ready: false, instant: true })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navigate on click; hold the spotlight on the clicked item until the smooth scroll settles.
  const go = useCallback((e, key, target) => {
    const el = document.getElementById(target)
    if (!el) return
    e.preventDefault()
    setClickedKey(key)
    clearTimeout(lock.current)
    lock.current = setTimeout(() => setClickedKey(null), LOCK_MS)
    el.scrollIntoView()
    history.replaceState(null, '', `#${target}`)
    setMoreOpen(false)
    setMobileOpen(false)
  }, [])
  useEffect(() => () => clearTimeout(lock.current), [])

  // Place the spotlight over the active item.
  const place = useCallback(() => {
    const nav = navRef.current
    const el = itemRefs.current[restKey]
    if (!nav || !el || nav.offsetWidth === 0) return
    const n = nav.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setSpot((s) => ({ x: r.left - n.left, w: r.width, ready: true, instant: !s.ready }))
  }, [restKey])

  useLayoutEffect(() => {
    place()
  }, [place])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return undefined
    const ro = new ResizeObserver(place)
    ro.observe(nav)
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [place])

  // More dropdown: close on outside click / Escape.
  useEffect(() => {
    if (!moreOpen) return undefined
    const onDown = (e) => !moreWrapRef.current?.contains(e.target) && setMoreOpen(false)
    const onKey = (e) => e.key === 'Escape' && setMoreOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        burgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const bookHref = profile.contact.appointmentUrl || '#contact'
  const bookIsHash = bookHref.startsWith('#')
  const onBook = (e) => bookIsHash && go(e, MORE_KEY, bookHref.slice(1))

  const cvUrl = useCv()
  const cv = { href: cvUrl, label: 'Download CV' }
  const loggedIn = !!getToken()
  const cvButton = (compact = false) => {
    const label = (
      <span className={compact ? 'sr-only min-[1180px]:not-sr-only' : undefined}>{cv.label}</span>
    )
    const cls = `nav-btn inline-flex items-center gap-2 rounded-full text-sm ${
      compact ? 'h-10 px-3 min-[1180px]:px-4' : 'px-4 py-2'
    }`
    return cv.href ? (
      <a href={cv.href} download className={cls} title={cv.label}>
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    ) : (
      <button type="button" disabled title="The CV is not available yet" className={cls}>
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
    )
  }

  const moreActive = activeKey === MORE_KEY

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div>
          {/* Top strip */}
          <div
            className={`pointer-events-auto grid transition-[grid-template-rows,opacity,margin] duration-300 ${
              scrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
            }`}
            aria-hidden={scrolled ? 'true' : undefined}
            inert={scrolled ? true : undefined}
          >
            <div className="overflow-hidden">
              <div className="nav-glass nav-bar border-b-0">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-sm sm:px-8">
                <div className="flex items-center gap-3 sm:gap-5">
                  {profile.contact.phone && (
                    <a href={`tel:${profile.contact.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2" aria-label={`Call ${profile.contact.phone}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{profile.contact.phone}</span>
                    </a>
                  )}
                  {profile.contact.phone && profile.contact.email && <span className="nav-strip-divider" aria-hidden="true" />}
                  {profile.contact.email && (
                    <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2" aria-label={`Email ${profile.contact.email}`}>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden md:inline">{profile.contact.email}</span>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden md:block">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                  </span>
                  <span className="md:hidden">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
                  </span>
                  <span className="nav-strip-divider hidden sm:block" aria-hidden="true" />
                  <a href={loggedIn ? '/dashboard' : profile.contact.loginUrl || '/login'} aria-label={loggedIn ? 'Dashboard' : 'Login'} className="nav-btn inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm sm:px-4">
                    <LogIn className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{loggedIn ? 'Dashboard' : 'Login'}</span>
                  </a>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main bar */}
          <div className="pointer-events-auto relative">
            <div className="nav-glass nav-bar">
            <div className="mx-auto flex h-16 max-w-6xl items-stretch gap-3 px-5 sm:px-8 lg:h-[68px] xl:gap-4">
              <a
                href="#home"
                onClick={(e) => go(e, null, 'home')}
                className="flex shrink-0 items-center gap-3"
                aria-label={`${profile.name} — back to top`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#b6d89a] font-display text-xl italic text-[#1c2f22]">
                  {profile.initials}
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-lg lg:text-xl">{profile.name}</span>
                  <span className="nav-ink-soft hidden text-sm sm:block lg:hidden">{profile.title}</span>
                </span>
              </a>

              <div className="hidden items-center lg:flex">
                {cvButton(true)}
              </div>

              {/* Desktop links + spotlight */}
              <nav ref={navRef} aria-label="Primary" className="relative hidden min-w-0 flex-1 lg:block">
                <span
                  aria-hidden="true"
                  className="nav-spot"
                  data-ready={spot.ready}
                  data-instant={spot.instant}
                  style={{ width: spot.w, transform: `translateX(${spot.x}px)` }}
                >
                  <span className="nav-spot-cone" />
                  <span className="nav-spot-bar" />
                  <span className="nav-spot-glow" />
                </span>
                <ul className="relative flex h-full items-stretch justify-center">
                  {primaryNav.map((item) => (
                    <li key={item.key} className="flex">
                      <a
                        ref={(el) => (itemRefs.current[item.key] = el)}
                        href={`#${item.target}`}
                        onClick={(e) => go(e, item.key, item.target)}
                        className="nav-link"
                        aria-current={activeKey === item.key ? 'true' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li ref={moreWrapRef} className="relative flex">
                    <button
                      ref={(el) => (itemRefs.current[MORE_KEY] = el)}
                      type="button"
                      className="nav-link gap-1"
                      data-active={moreActive ? 'true' : undefined}
                      aria-haspopup="true"
                      aria-expanded={moreOpen}
                      onClick={() => setMoreOpen((v) => !v)}
                    >
                      More
                      <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {moreOpen && (
                      <ul className="nav-menu absolute right-0 top-[calc(100%+0.9rem)] z-10 w-72 rounded-2xl p-2 text-[0.95rem]">
                        {moreNav.map((item) => (
                          <li key={item.label}>
                            <a
                              href={`#${item.target}`}
                              onClick={(e) => go(e, MORE_KEY, item.target)}
                              className="nav-menu-item nav-menu-item-icon"
                              aria-current={activeSection === item.target ? 'true' : undefined}
                            >
                              <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>

              <div className="hidden items-center lg:flex">
                <a href={bookHref} onClick={onBook} className="nav-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <span className="min-[1180px]:hidden">Book</span>
                  <span className="hidden min-[1180px]:inline">Book an Appointment</span>
                </a>
              </div>

              {/* Mobile hamburger */}
              <div className="ml-auto flex items-center lg:hidden">
                <button
                  ref={burgerRef}
                  type="button"
                  className="nav-ctrl inline-flex h-10 w-10 items-center justify-center rounded-full"
                  aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
            </div>
            </div>

            {mobileOpen && (
              <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:hidden">
              <nav
                id="mobile-menu"
                aria-label="Mobile"
                className="nav-menu mt-2 max-h-[calc(100dvh-8.5rem)] overflow-y-auto rounded-2xl p-3"
              >
                <ul>
                  {primaryNav.map((item) => (
                    <li key={item.key}>
                      <a
                        href={`#${item.target}`}
                        onClick={(e) => go(e, item.key, item.target)}
                        className="nav-menu-item nav-menu-item-icon font-display text-lg"
                        aria-current={activeKey === item.key ? 'true' : undefined}
                      >
                        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="nav-ink-soft mt-3 px-3.5 text-xs font-semibold uppercase tracking-wider">More</p>
                <ul className="mt-1">
                  {moreNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={`#${item.target}`}
                        onClick={(e) => go(e, MORE_KEY, item.target)}
                        className="nav-menu-item nav-menu-item-icon"
                        aria-current={activeSection === item.target ? 'true' : undefined}
                      >
                        <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2 px-1 pb-1">
                  {cvButton()}
                  <a href={bookHref} onClick={onBook} className="nav-btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Book an Appointment
                  </a>
                </div>
              </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
