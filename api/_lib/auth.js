import { jwtVerify } from 'jose'

export async function verifyAuth(req) {
  const auth = req.headers.authorization || ''
  if (!auth.startsWith('Bearer ')) throw new Error('unauthorized')
  const token = auth.slice(7)
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    await jwtVerify(token, secret)
  } catch {
    throw new Error('unauthorized')
  }
}
