import { put } from '@vercel/blob'
import { verifyAuth } from './_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    await verifyAuth(req)
    let body = req.body
    if (typeof body === 'string') body = JSON.parse(body)
    const { name, type, data } = body
    const buffer = Buffer.from(data, 'base64')
    const safeName = name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const pathname = `images/${Date.now()}-${safeName}`
    const blob = await put(pathname, buffer, { access: 'public', contentType: type, addRandomSuffix: false })
    res.json({ url: blob.url, pathname: blob.pathname })
  } catch (err) {
    res.status(err.message === 'unauthorized' ? 401 : 500).json({ error: err.message })
  }
}
