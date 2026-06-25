/**
 * api/client.js
 * ─────────────────────────────────────────────────────────────
 * Thin fetch wrapper for the backend in server/. Disabled (no-op)
 * until VITE_API_URL is set, so the app keeps working exactly as
 * it does today (localStorage-only) with zero behavior change
 * until a live backend is actually deployed and configured.
 * ─────────────────────────────────────────────────────────────
 */

const BASE_URL = import.meta.env.VITE_API_URL || null

export const apiEnabled = Boolean(BASE_URL)

let accessToken = null

export function setAccessToken(token) {
  accessToken = token
}

async function request(path, { method = 'GET', body } = {}) {
  if (!apiEnabled) throw new Error('API client disabled: VITE_API_URL not set')

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: 'include', // refresh-token cookie
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`)
  }
  return res.status === 204 ? null : res.json()
}

// Mirrors the actual routes in server/src/routes/*.js — keep in sync with
// the backend's request/response shapes, not an idealized generic API.
export const api = {
  register:     (email, password) => request('/auth/register', { method: 'POST', body: { email, password } }),
  login:        (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  refresh:      () => request('/auth/refresh', { method: 'POST' }),
  logout:       () => request('/auth/logout', { method: 'POST' }),
  requestReset: (email) => request('/auth/password-reset/request', { method: 'POST', body: { email } }),
  completeReset:(token, newPassword) => request('/auth/password-reset/confirm', { method: 'POST', body: { token, newPassword } }),

  listChildren:    () => request('/children'),
  createChild:     (displayName, avatarColor) => request('/children', { method: 'POST', body: { displayName, avatarColor } }),
  getChildProgress:(childId) => request(`/children/${childId}/progress`),
  completeChapter: (childId, chapterId, stars) =>
    request(`/children/${childId}/complete-chapter`, { method: 'POST', body: { chapterId, stars } }),

  exportAccount: () => request('/account/export'),
  deleteAccount: () => request('/account', { method: 'DELETE' }),
}
