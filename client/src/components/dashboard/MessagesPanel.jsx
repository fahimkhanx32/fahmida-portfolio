import { useCallback, useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { api } from '../../lib/api'
import { btnDanger, btnGhost, card, field, fmtDateTime, Notice, Pager } from './ui'

export default function MessagesPanel() {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const q = new URLSearchParams({ page, limit: 10, ...(filter && { isRead: filter }) })
      setData((await api(`/messages?${q}`)).data)
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }, [page, filter])
  useEffect(() => {
    load()
  }, [load])

  const toggle = async (m) => {
    try {
      await api(`/messages/${m._id}`, { method: 'PATCH', body: { isRead: !m.isRead } })
      load()
    } catch (e) {
      setError(e.message)
    }
  }
  const remove = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      await api(`/messages/${id}`, { method: 'DELETE' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl">Messages {data && <span className="text-ink-soft">({data.total})</span>}</h2>
        <select
          aria-label="Filter messages"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setPage(1)
          }}
          className={`${field} w-auto`}
        >
          <option value="">All</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>
      <Notice>{error}</Notice>
      {!data ? (
        <p className="text-ink-soft">Loading…</p>
      ) : data.items.length === 0 ? (
        <p className={`${card} text-ink-soft`}>No messages.</p>
      ) : (
        <ul className="space-y-3">
          {data.items.map((m) => (
            <li key={m._id} className={`${card} ${m.isRead ? '' : 'border-accent'}`}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-xl">
                    {m.name} {!m.isRead && <span className="ml-1 rounded-full bg-accent px-2 py-0.5 align-middle font-sans text-xs text-on-accent">New</span>}
                  </p>
                  <a href={`mailto:${m.email}`} className="break-all text-sm text-ink-soft hover:text-accent">{m.email}</a>
                </div>
                <p className="text-xs text-ink-soft">{fmtDateTime(m.createdAt)}</p>
              </div>
              {m.subject && <p className="mt-3 font-semibold">{m.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => toggle(m)} className={btnGhost}>
                  {m.isRead ? <Mail className="h-4 w-4" aria-hidden="true" /> : <MailOpen className="h-4 w-4" aria-hidden="true" />}
                  {m.isRead ? 'Mark unread' : 'Mark read'}
                </button>
                <button type="button" onClick={() => remove(m._id)} className={btnDanger}>
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
