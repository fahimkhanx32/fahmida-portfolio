// The admin token lives in localStorage when "Remember me" is ticked (survives closing the browser),
// otherwise in sessionStorage (cleared when the tab closes).
const KEY = 'portfolio_token'
const ID_KEY = 'portfolio_remembered_id'

const safe = (fn, fallback = null) => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

export const getToken = () => safe(() => localStorage.getItem(KEY) || sessionStorage.getItem(KEY))
export const isRemembered = () => safe(() => !!localStorage.getItem(KEY), false)

export function clearToken() {
  safe(() => localStorage.removeItem(KEY))
  safe(() => sessionStorage.removeItem(KEY))
}

export function setToken(token, remember) {
  clearToken()
  safe(() => (remember ? localStorage : sessionStorage).setItem(KEY, token))
}

export const getRememberedId = () => safe(() => localStorage.getItem(ID_KEY) || '', '')
export const setRememberedId = (id) => safe(() => (id ? localStorage.setItem(ID_KEY, id) : localStorage.removeItem(ID_KEY)))
