import { useCallback, useEffect, useState } from 'react'
import { Phone, Trash2 } from 'lucide-react'
import { api } from '../../lib/api'
import { btnDanger, card, field, fmtDate, fmtDateTime, Notice, Pager } from './ui'

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled']
const tone = {
  pending: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  confirmed: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
  completed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  cancelled: 'bg-red-500/15 text-red-700 dark:text-red-300',
}

export default function AppointmentsPanel() {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ page, limit: 10, ...(status && { status }) })
      setData((await api(`/appointments?${q}`)).data)
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }, [page, status])
  useEffect(() => {
    load()
  }, [load])

  const setItemStatus = async (id, next) => {
    try {
      await api(`/appointments/${id}`, { method: 'PATCH', body: { status: next } })
      load()
    } catch (e) {
      setError(e.message)
    }
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this appointment request?')) return
    try {
      await api(`/appointments/${id}`, { method: 'DELETE' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">Appointment requests {data && <span className="text-ink-soft">({data.total})</span>}</h2>
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className={`${field} w-auto`}
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <Notice>{error}</Notice>
      {!data ? (
        <p className="text-ink-soft">Loading…</p>
      ) : data.items.length === 0 ? (
        <p className={`${card} text-ink-soft`}>No appointment requests.</p>
      ) : (
        <ul className="space-y-3">
          {data.items.map((a) => (
            <li key={a._id} className={card}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-xl">{a.name}</p>
                  <a href={`tel:${a.phone.replace(/[^+\d]/g, '')}`} className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-accent">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {a.phone}
                  </a>
                  {a.email && <p className="text-sm text-ink-soft">{a.email}</p>}
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone[a.status]}`}>{a.status}</span>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <div><dt className="inline text-ink-soft">Preferred: </dt><dd className="inline">{fmtDate(a.preferredDate)}{a.preferredTime && ` at ${a.preferredTime}`}</dd></div>
                {(a.petName || a.petType) && <div><dt className="inline text-ink-soft">Pet: </dt><dd className="inline">{[a.petName, a.petType].filter(Boolean).join(' · ')}</dd></div>}
                {a.service && <div><dt className="inline text-ink-soft">Service: </dt><dd className="inline">{a.service}</dd></div>}
                <div><dt className="inline text-ink-soft">Received: </dt><dd className="inline">{fmtDateTime(a.createdAt)}</dd></div>
              </dl>
              {a.message && <p className="mt-3 whitespace-pre-wrap rounded-xl bg-bg p-3 text-sm">{a.message}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <select aria-label={`Status for ${a.name}`} value={a.status} onChange={(e) => setItemStatus(a._id, e.target.value)} className={`${field} w-auto py-2`}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => remove(a._id)} className={btnDanger}>
                  <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {data && <Pager page={data.page} pages={data.pages} onPage={setPage} />}
    </div>
  )
}
