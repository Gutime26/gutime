import { list } from '@vercel/blob'

export async function readBlob(pathname) {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 1 })
    const found = blobs.find(b => b.pathname === pathname)
    if (!found) return null
    const r = await fetch(found.url, { cache: 'no-store' })
    if (!r.ok) return null
    return r.json()
  } catch {
    return null
  }
}
