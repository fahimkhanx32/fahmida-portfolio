import { useState } from 'react'
import { CalendarCheck } from 'lucide-react'
import { api } from '../lib/api'
import { profile } from '../data/profile'

const field =
  'mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/70 focus:border-accent'
const empty = { name: '', phone: '', email: '', petName: '', petType: '', service: '', preferredDate: '', preferredTime: '', message: '', website: '' }
const today = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

/** Sends an appointment request to the backend (POST /api/appointments). */
export default function AppointmentForm() {
  const [v, setV] = useState(empty)
  const [state, setState] = useState({ busy: false, error: '', ok: false })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setState({ busy: true, error: '', ok: false })
    const body = Object.fromEntries(Object.entries(v).filter(([, val]) => val !== ''))
    try {
      await api('/appointments', { method: 'POST', body, token: null })
      setV(empty)
      setState({ busy: false, error: '', ok: true })
    } catch (err) {
      setState({ busy: false, error: err.message, ok: false })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ap-name" className="text-sm font-medium">Your name</label>
          <input id="ap-name" required minLength={2} autoComplete="name" value={v.name} onChange={set('name')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-phone" className="text-sm font-medium">Phone</label>
          <input id="ap-phone" type="tel" required autoComplete="tel" placeholder="+880 1XXX-XXXXXX" value={v.phone} onChange={set('phone')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-email" className="text-sm font-medium">Email (optional)</label>
          <input id="ap-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-service" className="text-sm font-medium">Reason / service (optional)</label>
          <input id="ap-service" placeholder="e.g. vaccination, check-up" value={v.service} onChange={set('service')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-pet" className="text-sm font-medium">Pet name (optional)</label>
          <input id="ap-pet" value={v.petName} onChange={set('petName')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-type" className="text-sm font-medium">Pet type (optional)</label>
          <select id="ap-type" value={v.petType} onChange={set('petType')} className={field}>
            <option value="">Select…</option>
            {['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ap-date" className="text-sm font-medium">Preferred date</label>
          <input id="ap-date" type="date" required min={today()} value={v.preferredDate} onChange={set('preferredDate')} className={field} />
        </div>
        <div>
          <label htmlFor="ap-time" className="text-sm font-medium">Preferred time (optional)</label>
          <input id="ap-time" type="time" value={v.preferredTime} onChange={set('preferredTime')} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="ap-msg" className="text-sm font-medium">Notes (optional)</label>
        <textarea id="ap-msg" rows={3} maxLength={1000} value={v.message} onChange={set('message')} className={field} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.website} onChange={set('website')} className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <button
        type="submit"
        disabled={state.busy}
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        {state.busy ? 'Sending…' : 'Request appointment'}
      </button>
      <p className="text-xs text-ink-soft">This is a request, not a confirmed booking. You will be contacted to confirm the time.</p>
      {state.ok && <p role="status" className="text-sm text-accent">Thank you, your request has been received.</p>}
      {state.error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
          {profile.contact.phone && <> You can also call {profile.contact.phone}.</>}
        </p>
      )}
    </form>
  )
}
