import {
  BookOpen,
  CalendarDays,
  CircleHelp,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Hospital,
  MessageSquareQuote,
  Phone,
  Stethoscope,
  Syringe,
  User,
} from 'lucide-react'
import { profile } from './profile'
import { education } from './education'
import { internship } from './internship'
import { expertise } from './expertise'
import { services } from './services'
import { experience } from './experience'
import { research } from './research'
import { gallery } from './gallery'
import { testimonials } from './testimonials'
import {
  cases,
  certifications,
  achievements,
  welfare,
  articles,
} from './more'

/**
 * SECTION REGISTRY
 * One place that decides which sections exist, their order, and whether each
 * is shown. A section is visible only when it has real, confirmed content, so
 * the page, the navbar and the footer always agree.
 *
 * `nav: true` marks the (max 6) primary navbar links.
 */
export const sections = [
  { id: 'home', label: 'Home', visible: true },
  { id: 'about', label: 'About', visible: true },
  { id: 'registration', label: 'Registration', visible: !!profile.registration.number },
  { id: 'education', label: 'Education', visible: education.length > 0 },
  { id: 'internship', label: 'International Training', visible: !!internship.institution },
  { id: 'expertise', label: 'Expertise', placeholder: true, visible: expertise.some((e) => e.confirmed) },
  { id: 'services', label: 'Services', placeholder: true, visible: services.some((s) => s.confirmed) },
  { id: 'experience', label: 'Experience', placeholder: true, visible: experience.length > 0 },
  { id: 'clinical', label: 'Clinical Work', placeholder: true, visible: cases.length > 0 },
  { id: 'research', label: 'Research', placeholder: true, visible: research.length > 0 },
  { id: 'certifications', label: 'Certifications', visible: certifications.some((c) => c.published) },
  { id: 'achievements', label: 'Achievements', visible: achievements.length > 0 },
  { id: 'welfare', label: 'Community', visible: welfare.length > 0 },
  { id: 'blog', label: 'Knowledge', placeholder: true, visible: articles.length > 0 },
  { id: 'gallery', label: 'Gallery', visible: gallery.length > 0 },
  { id: 'testimonials', label: 'Testimonials', placeholder: true, visible: testimonials.length > 0 },
  { id: 'snapshot', label: 'Career Snapshot', visible: true },
  // Hidden by default: a "how I work" framework would read as a claim about her
  // clinical process. Set to true once she confirms or edits the steps.
  { id: 'approach', label: 'Approach', visible: false },
  { id: 'resume', label: 'Curriculum Vitae', visible: !!profile.cvPath },
  { id: 'faq', label: 'FAQ', visible: true },
  { id: 'contact', label: 'Contact', visible: true },
]

/**
 * NAVBAR LINKS
 * The navbar always shows these links. `target` is the section id each one
 * scrolls to. If a target section has no confirmed content yet, a small
 * "being prepared" placeholder is rendered in its place (so no link is dead).
 * Set SHOW_PLACEHOLDERS to false to hide empty sections again.
 */
export const SHOW_PLACEHOLDERS = true

// `icon` is shown beside each link in the mobile / tablet hamburger menu.
export const primaryNav = [
  { key: 'expertise', label: 'Expertise', target: 'expertise', icon: Stethoscope },
  { key: 'specialties', label: 'Specialties', target: 'clinical', icon: Syringe },
  { key: 'services', label: 'Services', target: 'services', icon: HeartPulse },
  { key: 'resources', label: 'Resources', target: 'faq', icon: CircleHelp },
]

export const moreNav = [
  { label: 'About', target: 'about', icon: User },
  { label: 'Education', target: 'education', icon: GraduationCap },
  { label: 'Contact', target: 'contact', icon: Phone },
  { label: 'Professional practice / clinic', target: 'experience', icon: Hospital },
  { label: 'Patient testimonials', target: 'testimonials', icon: MessageSquareQuote },
  { label: 'Book appointment', target: 'contact', icon: CalendarDays },
  { label: 'Blog', target: 'blog', icon: BookOpen },
  { label: 'Research', target: 'research', icon: FlaskConical },
]

export const visibleSections = sections
  .filter((s) => s.visible || (SHOW_PLACEHOLDERS && s.placeholder))
  .map((s) => ({ ...s, isPlaceholder: !s.visible }))

export const isSectionVisible = (id) => visibleSections.some((s) => s.id === id)

// Flat, de-duplicated list used by the footer.
export const navItems = [...primaryNav, ...moreNav]
  .map((i) => ({ id: i.target, label: i.label }))
  .filter((i, idx, arr) => arr.findIndex((x) => x.id === i.id) === idx)
