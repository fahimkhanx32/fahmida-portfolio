import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, Trash2, Upload } from 'lucide-react'
import { api, apiUrl } from '../../lib/api'
import { btnDanger, btnGhost, btnPrimary, card, Notice, fmtDateTime } from './ui'

const MAX = 5 * 1024 * 1024

export default function CvPanel() {
  const [info, setInfo] = useState(null)
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')
  const input = useRef(null)

  const load = useCallback(() => api('/cv').then((r) => setInfo(r.data)).catch((e) => setError(e.message)), [])
  useEffect(() => {
    load()
  }, [load])

  const pick = (e) => {
    setError('')
    setOk('')
    const f = e.target.files?.[0]
    if (!f) return setFile(null)
    if (f.type !== 'application/pdf') return setError('Only PDF files are allowed.')
    if (f.size > MAX) return setError('The file is larger than 5 MB.')
    setFile(f)
  }

  const upload = async () => {
    if (!file) return
    setBusy(true)
    setError('')
    setOk('')
    try {
      const form = new FormData()
      form.append('file', file)
      await api('/cv', { method: 'POST', form })
      setOk('CV uploaded. The Download CV button on the site now serves this file.')
      setFile(null)
      if (input.current) input.current.value = ''
      await load()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    if (!window.confirm('Delete the current CV? The Download CV button will stop working.')) return
    setBusy(true)
    setError('')
    setOk('')
    try {
      await api('/cv', { method: 'DELETE' })
      setOk('CV deleted.')
      await load()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className={card}>
        <h2 className="text-xl">Current CV</h2>
        {!info ? (
          <p className="mt-2 text-ink-soft">Loading…</p>
        ) : info.available ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-soft">
              {(info.size / 1024).toFixed(0)} KB · uploaded {fmtDateTime(info.updatedAt)}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={apiUrl('/cv/download')} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                <Download className="h-4 w-4" aria-hidden="true" /> Preview / download
              </a>
              <button type="button" onClick={remove} disabled={busy} className={btnDanger}>
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-ink-soft">No CV uploaded yet. The Download CV button on the site stays disabled until you upload one.</p>
        )}
      </div>

      <div className={card}>
        <h2 className="text-xl">{info?.available ? 'Replace CV' : 'Upload CV'}</h2>
        <p className="mt-1 text-sm text-ink-soft">PDF only, up to 5 MB.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            ref={input}
            type="file"
            accept="application/pdf"
            onChange={pick}
            className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink"
          />
          <button type="button" onClick={upload} disabled={!file || busy} className={`${btnPrimary} sm:shrink-0`}>
            <Upload className="h-4 w-4" aria-hidden="true" /> {busy ? 'Uploading…' : 'Upload'}
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <Notice>{error}</Notice>
          <Notice kind="ok">{ok}</Notice>
        </div>
      </div>
    </div>
  )
}
