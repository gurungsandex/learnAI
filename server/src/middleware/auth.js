import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing access token' })

  try {
    req.parentId = jwt.verify(token, process.env.JWT_ACCESS_SECRET).sub
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired access token' })
  }
}
