import { useState } from 'react'
import { ArrowLeft, Send, UserRound } from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import AuthField from '../components/auth/AuthField'
import AuthAlert from '../components/auth/AuthAlert'
import { GlassButton, PrimaryButton } from '../components/auth/AuthButtons'
import { api } from '../lib/api'

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setDone('')
    if (!identifier.trim()) return setError('Enter your username or email.')
    setLoading(true)
    try {
      const res = await api('/auth/forgot-password', { method: 'POST', body: { identifier: identifier.trim() }, token: null })
      setDone(res.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Forgot password" subtitle="Enter your username or email and we will send you a reset link.">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <AuthAlert>{error}</AuthAlert>
        <AuthAlert severity="success">{done}</AuthAlert>
        <AuthField
          label="Username"
          placeholder="Username or email"
          icon={UserRound}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          autoFocus
        />
        <PrimaryButton loading={loading} icon={<Send size={18} />}>
          Send reset link
        </PrimaryButton>
        <GlassButton component="a" href="/login" icon={<ArrowLeft size={18} />}>
          Back to login
        </GlassButton>
      </form>
    </AuthShell>
  )
}
