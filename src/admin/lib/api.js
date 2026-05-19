const BASE = ''

function getToken() {
  return localStorage.getItem('adm_token') || ''
}

export function isAuthenticated() {
  const token = getToken()
  if (!token) return false
  try {
    const [, payload] = token.split('.')
    const { exp } = JSON.parse(atob(payload))
    return Date.now() / 1000 < exp
  } catch {
    return false
  }
}

export async function login(password) {
  // Dev mode: crea un token fake senza API
  if (import.meta.env.DEV && password === (import.meta.env.VITE_DEV_PASSWORD || 'gutime2026')) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(JSON.stringify({ role: 'admin', exp: Math.floor(Date.now() / 1000) + 28800 }))
    const token = `${header}.${payload}.dev`
    localStorage.setItem('adm_token', token)
    return token
  }
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!r.ok) throw new Error('Credenziali non valide')
  const { token } = await r.json()
  localStorage.setItem('adm_token', token)
  return token
}

export function logout() {
  localStorage.removeItem('adm_token')
}

async function authFetch(url, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...opts.headers, Authorization: `Bearer ${getToken()}` }
  const r = await fetch(url, { ...opts, headers })
  if (r.status === 401) { logout(); window.location.href = '/admin/login'; throw new Error('Sessione scaduta') }
  return r
}

export async function getContent(section) {
  const r = await fetch(`/api/content/${section}`)
  if (r.status === 404) return null
  if (!r.ok) throw new Error('Errore caricamento')
  return r.json()
}

export async function saveContent(section, data) {
  const r = await authFetch(`/api/content/${section}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Errore salvataggio')
  return r.json()
}

export async function getNewsList() {
  const r = await fetch('/api/news')
  if (!r.ok) return []
  return r.json()
}

export async function getNewsArticle(id) {
  const r = await fetch(`/api/news/${id}`)
  if (r.status === 404) return null
  return r.json()
}

export async function saveNewsArticle(id, data) {
  const url = id ? `/api/news/${id}` : '/api/news'
  const method = id ? 'PUT' : 'POST'
  const r = await authFetch(url, { method, body: JSON.stringify(data) })
  if (!r.ok) throw new Error('Errore salvataggio')
  return r.json()
}

export async function deleteNewsArticle(id) {
  const r = await authFetch(`/api/news/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Errore eliminazione')
  return r.json()
}

export async function getMedia() {
  const r = await authFetch('/api/media')
  if (!r.ok) return []
  return r.json()
}

export async function deleteMedia(url) {
  const r = await authFetch('/api/media', { method: 'DELETE', body: JSON.stringify({ url }) })
  if (!r.ok) throw new Error('Errore eliminazione')
  return r.json()
}

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = e.target.result.split(',')[1]
        const r = await authFetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ name: file.name, type: file.type, data }),
        })
        if (!r.ok) throw new Error('Upload fallito')
        resolve(await r.json())
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
