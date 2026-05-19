import { SignJWT } from 'jose'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).end() }
  }
  const { password } = body || {}
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Credenziali non valide' })
  }
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret)
  res.json({ token })
}
