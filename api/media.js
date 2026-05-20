import { list, del } from '@vercel/blob'
import { verifyAuth } from './_lib/auth.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: 'images/', limit: 100 })
      return res.json(blobs.map(b => ({ url: b.url, pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt })))
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await verifyAuth(req)
      let body = req.body
      if (typeof body === 'string') body = JSON.parse(body)
      await del(body.url)
      return res.json({ ok: true })
    } catch (err) {
      return res.status(401).json({ error: err.message })
    }
  }

  res.status(405).end()
}
