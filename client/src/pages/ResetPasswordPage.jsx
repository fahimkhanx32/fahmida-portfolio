import { useState } from 'react'
import { ArrowLeft, KeyRound, LogIn } from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import PasswordField from '../components/auth/PasswordField'
import AuthAlert from '../components/auth/AuthAlert'
import { GlassButton, PrimaryButton } from '../components/auth/AuthButtons'
import { api } from '../lib/api'

export default function ResetPasswordPage() {
  const token = new URLSearchParams(window.location.search).get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(token ? '' : 'This reset link is incomplete. Request a new one.')
  const [done, setDone] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    setLoading(true)
    try {
      const res = await api('/auth/reset-password', { method: 'POST', body: { token, password }, token: null })
      setDone(res.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Reset password" subtitle="Choose a new password (at least 8 characters).">
      {done ? (
        <div className="flex flex-col gap-5">
          <AuthAlert severity="success">{done}</AuthAlert>
          <PrimaryButton component="a" href="/login" type="button" icon={<LogIn size={20} />}>
            Go to login
          </PrimaryButton>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <AuthAlert>{error}</AuthAlert>
          <PasswordField label="New password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" autoFocus />
          <PasswordField label="Confirm password" placeholder="Repeat the password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
          <PrimaryButton loading={loading} icon={<KeyRound size={18} />} disabled={!token}>
            Reset password
          </PrimaryButton>
          <GlassButton component="a" href="/forgot-password" icon={<ArrowLeft size={18} />}>
            Request a new link
          </GlassButton>
        </form>
      )}
    </AuthShell>
  )
}
