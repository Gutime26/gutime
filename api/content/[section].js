import { put } from '@vercel/blob'
import { verifyAuth } from '../_lib/auth.js'
import { readBlob } from '../_lib/blob.js'

const ALLOWED = ['home', 'chi-siamo', 'prodotti', 'contatti', 'aziende', 'qualita', 'footer']

export default async function handler(req, res) {
  const { section } = req.query
  if (!ALLOWED.includes(section)) return res.status(404).end()
  const pathname = `content/${section}.json`

  if (req.method === 'GET') {
    const data = await readBlob(pathname)
    if (!data) return res.status(404).json(null)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    return res.json(data)
  }

  if (req.method === 'PUT') {
    try {
      await verifyAuth(req)
      let body = req.body
      if (typeof body === 'string') body = JSON.parse(body)
      await put(pathname, JSON.stringify(body), {
        access: 'public', contentType: 'application/json', addRandomSuffix: false,
      })
      return res.json({ ok: true })
    } catch (err) {
      return res.status(err.message === 'unauthorized' ? 401 : 500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
