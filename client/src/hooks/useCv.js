import { useEffect, useState } from 'react'
import { api, apiUrl } from '../lib/api'
import { profile } from '../data/profile'

/** URL of the CV to download: the one uploaded from the dashboard, else profile.cvPath, else ''. */
export function useCv() {
  const [url, setUrl] = useState(profile.cvPath || '')
  useEffect(() => {
    let alive = true
    api('/cv', { token: null })
      .then((r) => alive && r.data.available && setUrl(apiUrl('/cv/download')))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])
  return url
}
