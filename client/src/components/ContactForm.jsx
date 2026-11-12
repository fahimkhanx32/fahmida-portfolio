import { useState } from 'react'
import { Send } from 'lucide-react'
import { api } from '../lib/api'
import { profile } from '../data/profile'

const field =
  'mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/70 focus:border-accent'

/** Sends the message to the backend (POST /api/messages); the owner reads it in the dashboard. */
export default function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [state, setState] = useState({ busy: false, error: '', ok: false })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setState({ busy: true, error: '', ok: false })
    try {
      await api('/messages', { method: 'POST', body: { ...v, subject: v.subject || undefined }, token: null })
      setV({ name: '', email: '', subject: '', message: '', website: '' })
      setState({ busy: false, error: '', ok: true })
    } catch (err) {
      setState({ busy: false, error: err.message, ok: false })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium">Your name</label>
          <input id="cf-name" required minLength={2} autoComplete="name" value={v.name} onChange={set('name')} className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium">Your email</label>
          <input id="cf-email" type="email" required autoComplete="email" value={v.email} onChange={set('email')} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-subject" className="text-sm font-medium">Subject (optional)</label>
        <input id="cf-subject" value={v.subject} onChange={set('subject')} className={field} />
      </div>
      <div>
        <label htmlFor="cf-message" className="text-sm font-medium">Message</label>
        <textarea id="cf-message" required minLength={10} rows={5} value={v.message} onChange={set('message')} className={field} />
      </div>
      {/* Honeypot: hidden from people, bots tend to fill it. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={set('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <button
        type="submit"
        disabled={state.busy}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {state.busy ? 'Sending…' : 'Send message'}
      </button>
      {state.ok && <p role="status" className="text-sm text-accent">Thank you, your message has been sent.</p>}
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error} You can also email <a className="underline" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>.
        </p>
      )}
    </form>
  )
}
