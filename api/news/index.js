import { put } from '@vercel/blob'
import { verifyAuth } from '../_lib/auth.js'
import { readBlob } from '../_lib/blob.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await readBlob('news/index.json')
    res.setHeader('Cache-Control', 'no-store')
    return res.json(data || [])
  }

  if (req.method === 'POST') {
    try {
      await verifyAuth(req)
      let body = req.body
      if (typeof body === 'string') body = JSON.parse(body)
      const id = Date.now().toString()
      const article = { ...body, id, date: body.date || new Date().toISOString().slice(0, 10) }
      await put(`news/${id}.json`, JSON.stringify(article), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
      })
      const index = (await readBlob('news/index.json')) || []
      index.unshift({ id, title: article.title, slug: article.slug || id, date: article.date, excerpt: article.excerpt, image: article.image, published: article.published })
      await put('news/index.json', JSON.stringify(index), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true,
      })
      return res.json(article)
    } catch (err) {
      return res.status(err.message === 'unauthorized' ? 401 : 500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
