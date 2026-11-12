import { useEffect, useState } from 'react'
import { KeyRound, LogIn, UserRound } from 'lucide-react'
import AuthShell from '../components/auth/AuthShell'
import AuthField from '../components/auth/AuthField'
import PasswordField from '../components/auth/PasswordField'
import RememberButton from '../components/auth/RememberButton'
import AuthAlert from '../components/auth/AuthAlert'
import { DangerButton, PrimaryButton } from '../components/auth/AuthButtons'
import { api } from '../lib/api'
import { getRememberedId, getToken, setRememberedId, setToken } from '../lib/auth'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(getRememberedId)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(() => !!getRememberedId())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (getToken()) window.location.replace('/dashboard') // the dashboard re-checks the token
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!identifier.trim() || !password) return setError('Enter your username and password.')
    setLoading(true)
    try {
      const { data } = await api('/auth/login', { method: 'POST', body: { identifier: identifier.trim(), password, remember }, token: null })
      setToken(data.token, remember)
      setRememberedId(remember ? identifier.trim() : '')
      window.location.assign('/dashboard')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <AuthShell title="Login">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <AuthAlert>{error}</AuthAlert>
        <AuthField
          label="Username"
          placeholder="Username or email"
          icon={UserRound}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          autoFocus
        />
        <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          <RememberButton checked={remember} onChange={setRemember} />
          <DangerButton component="a" href="/forgot-password" icon={<KeyRound size={18} />}>
            Forgot password ?
          </DangerButton>
        </div>

        <PrimaryButton loading={loading} icon={<LogIn size={20} />}>
          Login
        </PrimaryButton>
      </form>
    </AuthShell>
  )
}
