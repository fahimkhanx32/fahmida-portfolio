import { lazy, Suspense } from 'react'
import { useTheme } from './hooks/useTheme'
import { visibleSections } from './data/navigation'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Placeholder from './sections/Placeholder'

import HeroFahmida from './sections/HeroFahmida'
import About from './sections/About'
import Registration from './sections/Registration'
import Education from './sections/Education'
import Internship from './sections/Internship'
import Expertise from './sections/Expertise'
import Services from './sections/Services'
import Experience from './sections/Experience'
import ClinicalWork from './sections/ClinicalWork'
import Research from './sections/Research'
import Certifications from './sections/Certifications'
import Achievements from './sections/Achievements'
import AnimalWelfare from './sections/AnimalWelfare'
import Blog from './sections/Blog'
import Gallery from './sections/Gallery'
import Testimonials from './sections/Testimonials'
import Statistics from './sections/Statistics'
import ProfessionalApproach from './sections/ProfessionalApproach'
import Resume from './sections/Resume'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'

// Auth and dashboard pages are loaded on demand so the public site does not ship MUI.
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

// Maps registry ids (src/data/navigation.js) to their section components.
const components = {
  home: HeroFahmida,
  about: About,
  registration: Registration,
  education: Education,
  internship: Internship,
  expertise: Expertise,
  services: Services,
  experience: Experience,
  clinical: ClinicalWork,
  research: Research,
  certifications: Certifications,
  achievements: Achievements,
  welfare: AnimalWelfare,
  blog: Blog,
  gallery: Gallery,
  testimonials: Testimonials,
  snapshot: Statistics,
  approach: ProfessionalApproach,
  resume: Resume,
  faq: FAQ,
  contact: Contact,
}

export default function App() {
  const { theme, toggle } = useTheme()

  // Tiny path router: these pages replace the whole site. (Hosting needs an SPA fallback so they serve index.html.)
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const page =
    (path === '/login' && <LoginPage />) ||
    (path === '/forgot-password' && <ForgotPasswordPage />) ||
    (path === '/reset-password' && <ResetPasswordPage />) ||
    (path === '/dashboard' && <DashboardPage theme={theme} onToggleTheme={toggle} />)
  if (page) return <Suspense fallback={<p className="p-8 text-center">Loading…</p>}>{page}</Suspense>

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-b-lg bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-0"
      >
        Skip to main content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        {visibleSections.map(({ id, label, isPlaceholder }) => {
          if (isPlaceholder) return <Placeholder key={id} id={id} title={label} />
          const Component = components[id]
          return Component ? <Component key={id} /> : null
        })}
      </main>
      <Footer />
    </>
  )
}
