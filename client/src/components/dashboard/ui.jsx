export const card = 'rounded-2xl border border-line bg-surface p-4 sm:p-5'
export const field =
  'w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-ink placeholder:text-ink-soft/70 focus:border-accent'
export const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity disabled:cursor-not-allowed disabled:opacity-50'
export const btnPrimary = `${btn} bg-accent text-on-accent hover:opacity-90`
export const btnGhost = `${btn} border border-line text-ink hover:border-accent`
export const btnDanger = `${btn} border border-red-500/50 text-red-600 hover:bg-red-500/10 dark:text-red-400`

export function Notice({ kind = 'error', children }) {
  if (!children) return null
  const tone =
    kind === 'error'
      ? 'border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300'
      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
  return (
    <p role={kind === 'error' ? 'alert' : 'status'} className={`rounded-xl border px-4 py-2.5 text-sm ${tone}`}>
      {children}
    </p>
  )
}

export function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null
  return (
    <div className="flex items-center justify-between gap-3 pt-2 text-sm">
      <button type="button" className={btnGhost} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      <span className="text-ink-soft">
        Page {page} of {pages}
      </span>
      <button type="button" className={btnGhost} disabled={page >= pages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  )
}

export const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
export const fmtDateTime = (d) =>
  new Date(d).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
