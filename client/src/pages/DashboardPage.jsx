import { useEffect, useState } from 'react'
import { CalendarDays, ExternalLink, FileText, KeyRound, LogOut, MessageSquare } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import CvPanel from '../components/dashboard/CvPanel'
import AppointmentsPanel from '../components/dashboard/AppointmentsPanel'
import MessagesPanel from '../components/dashboard/MessagesPanel'
import AccountPanel from '../components/dashboard/AccountPanel'
import { btnGhost } from '../components/dashboard/ui'
import { api } from '../lib/api'
import { clearToken, getToken } from '../lib/auth'

const TABS = [
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'account', label: 'Account', icon: KeyRound },
]

export default function DashboardPage({ theme, onToggleTheme }) {
  const [user, setUser] = useState(null)
  const [tab, setTab] = useState(() => (TABS.some((t) => t.id === window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'cv'))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getToken()) return void window.location.replace('/login')
    api('/auth/me')
      .then((r) => setUser(r.data.user))
      .catch((e) => (e.status === 401 ? window.location.replace('/login') : setError(e.message)))
  }, [])

  const choose = (id) => {
    setTab(id)
    history.replaceState(null, '', `#${id}`)
  }
  const logout = () => {
    clearToken()
    window.location.assign('/login')
  }

  if (error) return <p role="alert" className="p-8 text-center">{error}</p>
  if (!user) return <p className="p-8 text-center text-ink-soft">Loading…</p>

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight">Dashboard</p>
            <p className="truncate text-xs text-ink-soft">{user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />
            <a href="/" className={btnGhost}>
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">View site</span>
            </a>
            <button type="button" onClick={logout} className={btnGhost}>
              <LogOut className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
        <nav aria-label="Dashboard sections" className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6">
          <div role="tablist" className="flex gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => choose(id)}
                className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab === id ? 'border-accent text-accent' : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </nav>
      </header>
      {user.passwordIsInitial && (
        <div role="status" className="border-b border-amber-500/40 bg-amber-500/10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6">
            <p className="text-amber-900 dark:text-amber-200">You are using the initial password. Please set your own.</p>
            <button type="button" onClick={() => choose('account')} className={btnGhost}>
              <KeyRound className="h-4 w-4" aria-hidden="true" /> Change password
            </button>
          </div>
        </div>
      )}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {tab === 'cv' && <CvPanel />}
        {tab === 'appointments' && <AppointmentsPanel />}
        {tab === 'messages' && <MessagesPanel />}
        {tab === 'account' && <AccountPanel user={user} onChanged={() => setUser((u) => ({ ...u, passwordIsInitial: false }))} />}
      </main>
    </div>
  )
}
