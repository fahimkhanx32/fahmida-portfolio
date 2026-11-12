import { getToken, clearToken } from './auth'

// Empty VITE_API_URL -> same-origin "/api" (Vite proxies it to the backend in development).
const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
export const apiUrl = (path) => `${BASE}${path}`

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

/**
 * Small fetch wrapper. Sends the admin token when there is one (pass token: null to send none),
 * accepts a JSON `body` or a FormData `form`, and throws ApiError with a readable message.
 */
export async function api(path, { method = 'GET', body, form, token = getToken() } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(apiUrl(path), { method, headers, body: form ?? (body !== undefined ? JSON.stringify(body) : undefined) })
  } catch {
    throw new ApiError(0, 'Cannot reach the server. Please check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON response */
  }

  if (!res.ok) {
    if (res.status === 401 && token) clearToken() // expired or revoked session
    const detail = data?.errors?.[0]?.message
    throw new ApiError(res.status, detail ? `${data.message}: ${detail}` : data?.message || `Request failed (${res.status})`, data?.errors)
  }
  return data
}
