import { put, list, del } from '@vercel/blob'
import { verifyAuth } from '../_lib/auth.js'
import { readBlob } from '../_lib/blob.js'

export default async function handler(req, res) {
  const { id } = req.query
  const pathname = `news/${id}.json`

  if (req.method === 'GET') {
    try {
      const data = await readBlob(pathname)
      if (!data) return res.status(404).json(null)
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
      return res.json(data)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  if (req.method === 'PUT') {
    try {
      await verifyAuth(req)
      let body = req.body
      if (typeof body === 'string') body = JSON.parse(body)
      const article = { ...body, id }
      await put(pathname, JSON.stringify(article), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false,
      })
      const index = (await readBlob('news/index.json')) || []
      const summary = { id, title: article.title, slug: article.slug || id, date: article.date, excerpt: article.excerpt, image: article.image, published: article.published }
      const idx = index.findIndex(a => a.id === id)
      if (idx >= 0) index[idx] = summary
      else index.unshift(summary)
      await put('news/index.json', JSON.stringify(index), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false,
      })
      return res.json(article)
    } catch (err) {
      return res.status(err.message === 'unauthorized' ? 401 : 500).json({ error: err.message })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await verifyAuth(req)
      const { blobs } = await list({ prefix: pathname, limit: 1 })
      const found = blobs.find(b => b.pathname === pathname)
      if (found) await del(found.url)
      const index = (await readBlob('news/index.json')) || []
      await put('news/index.json', JSON.stringify(index.filter(a => a.id !== id)), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false,
      })
      return res.json({ ok: true })
    } catch (err) {
      return res.status(err.message === 'unauthorized' ? 401 : 500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
