import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { api } from '../../lib/api'
import { isRemembered, setToken } from '../../lib/auth'
import { btnPrimary, card, field, Notice } from './ui'

export default function AccountPanel({ user, onChanged }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    if (next.length < 8) return setError('New password must be at least 8 characters.')
    if (next !== confirm) return setError('Passwords do not match.')
    setBusy(true)
    try {
      const { data } = await api('/auth/change-password', { method: 'POST', body: { currentPassword: current, newPassword: next } })
      setToken(data.token, isRemembered()) // old tokens stop working, keep this session alive
      setOk('Password changed.')
      onChanged?.()
      setCurrent('')
      setNext('')
      setConfirm('')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className={card}>
        <h2 className="text-xl">Account</h2>
        <dl className="mt-3 space-y-1 text-sm">
          <div><dt className="inline text-ink-soft">Name: </dt><dd className="inline">{user.name}</dd></div>
          {user.username && <div><dt className="inline text-ink-soft">Username: </dt><dd className="inline">{user.username}</dd></div>}
          <div><dt className="inline text-ink-soft">Email: </dt><dd className="inline">{user.email}</dd></div>
        </dl>
      </div>
      <form onSubmit={submit} className={`${card} max-w-md space-y-4`}>
        <h2 className="text-xl">Change password</h2>
        <label className="block text-sm font-medium">
          Current password
          <input type="password" required autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="block text-sm font-medium">
          New password
          <input type="password" required autoComplete="new-password" value={next} onChange={(e) => setNext(e.target.value)} className={`${field} mt-1`} />
        </label>
        <label className="block text-sm font-medium">
          Confirm new password
          <input type="password" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`${field} mt-1`} />
        </label>
        <Notice>{error}</Notice>
        <Notice kind="ok">{ok}</Notice>
        <button type="submit" disabled={busy} className={btnPrimary}>
          <KeyRound className="h-4 w-4" aria-hidden="true" /> {busy ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </div>
  )
}
