import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { profile } from './data/profile'

/**
 * Runtime SEO that depends on real configuration. Nothing is added until the
 * values exist, so no placeholder URLs ever ship.
 */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function applySeo() {
  const origin = profile.siteUrl.replace(/\/$/, '')
  if (origin) {
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = `${origin}/`
    setMeta('property', 'og:url', `${origin}/`)
    if (profile.photo) setMeta('property', 'og:image', new URL(profile.photo, `${origin}/`).href)
  }

  // Structured data limited to verified facts.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Veterinary Doctor',
    nationality: profile.country,
    alumniOf: { '@type': 'CollegeOrUniversity', name: profile.degree.institution },
    sameAs: Object.values(profile.social).filter(Boolean),
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(ld)
  document.head.appendChild(script)
}

applySeo()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
