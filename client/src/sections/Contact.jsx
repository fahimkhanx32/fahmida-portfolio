import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import Section from '../components/SectionHeading'
import ContactForm from '../components/ContactForm'
import AppointmentForm from '../components/AppointmentForm'
import FacebookIcon from '../components/FacebookIcon'

export default function Contact() {
  const c = profile.contact
  const rows = [
    c.email && { icon: Mail, label: 'Email', text: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: Phone, label: 'Phone', text: c.phone, href: `tel:${c.phone.replace(/\s/g, '')}` },
    c.address && { icon: MapPin, label: 'Address', text: c.address },
  ].filter(Boolean)

  return (
    <Section
      id="contact"
      title="Contact"
      intro="Get in touch with Dr. Fahmida Bristy."
      tone="sage"
    >
      <ul className="divide-y divide-line border-y border-line">
        {profile.social.facebook && (
          <li>
            <a
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5"
            >
              <span className="flex items-center gap-4">
                <FacebookIcon className="h-6 w-6 text-accent" />
                <span>
                  <span className="block text-sm text-ink-soft">Facebook</span>
                  <span className="font-display text-2xl">Fahmida Bristy</span>
                </span>
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                <span className="hidden sm:inline">Open profile (new tab)</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </li>
        )}
        {rows.map(({ icon: Icon, label, text, href }) => (
          <li key={label} className="flex items-center gap-4 py-5">
            <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-sm text-ink-soft">{label}</span>
              {href ? (
                <a href={href} className="font-display text-2xl underline-offset-4 hover:underline">{text}</a>
              ) : (
                <span className="font-display text-2xl">{text}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {c.note && <p className="mt-6 max-w-prose text-ink-soft">{c.note}</p>}

      <div id="appointment" className="mt-12">
        <h3 className="mb-6 text-2xl">Book an appointment</h3>
        <AppointmentForm />
      </div>

      <div className="mt-12">
        <h3 className="mb-6 text-2xl">Send a message</h3>
        <ContactForm />
      </div>
    </Section>
  )
}
