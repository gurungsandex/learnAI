import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { pool } from '../db/pool.js'
import { logEvent } from '../db/audit.js'
import { authLimiter } from '../middleware/rateLimit.js'

export const authRouter = Router()
authRouter.use(authLimiter)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ACCESS_TTL = '15m'
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

function issueAccessToken(parentId) {
  return jwt.sign({ sub: parentId }, process.env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL })
}

function setRefreshCookie(res, parentId) {
  const token = jwt.sign({ sub: parentId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: REFRESH_TTL_MS,
  })
}

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  if (typeof password !== 'string' || password.length < 10) {
    return res.status(400).json({ error: 'Password must be at least 10 characters' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  try {
    const { rows } = await pool.query(
      'INSERT INTO parents (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email.toLowerCase(), passwordHash]
    )
    const parentId = rows[0].id
    await logEvent('account_created', { parentId, ip: req.ip })
    setRefreshCookie(res, parentId)
    res.status(201).json({ accessToken: issueAccessToken(parentId) })
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already registered' })
    throw err
  }
})

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const { rows } = await pool.query('SELECT id, password_hash FROM parents WHERE email = $1', [email.toLowerCase()])
  const parent = rows[0]
  // Constant-shape comparison even when no account exists, to avoid leaking which emails are registered via timing.
  const hash = parent?.password_hash ?? '$2a$12$' + 'a'.repeat(53)
  const valid = await bcrypt.compare(password, hash)

  if (!parent || !valid) {
    await logEvent('login_failed', { ip: req.ip })
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  await logEvent('login', { parentId: parent.id, ip: req.ip })
  setRefreshCookie(res, parent.id)
  res.json({ accessToken: issueAccessToken(parent.id) })
})

authRouter.post('/refresh', (req, res) => {
  const token = req.cookies?.refresh_token
  if (!token) return res.status(401).json({ error: 'Missing refresh token' })
  try {
    const { sub } = jwt.verify(token, process.env.JWT_REFRESH_SECRET, { algorithms: ['HS256'] })
    res.json({ accessToken: issueAccessToken(sub) })
  } catch {
    res.status(401).json({ error: 'Invalid or expired refresh token' })
  }
})

authRouter.post('/logout', (req, res) => {
  res.clearCookie('refresh_token')
  res.status(204).end()
})

authRouter.post('/password-reset/request', async (req, res) => {
  const { email } = req.body || {}
  if (typeof email !== 'string') return res.status(400).json({ error: 'Invalid email' })

  const { rows } = await pool.query('SELECT id FROM parents WHERE email = $1', [email.toLowerCase()])
  // Always respond 202 regardless of whether the account exists, so this
  // endpoint can't be used to enumerate registered emails.
  if (rows[0]) {
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    await pool.query(
      `INSERT INTO password_reset_tokens (parent_id, token_hash, expires_at)
       VALUES ($1, $2, now() + interval '1 hour')`,
      [rows[0].id, tokenHash]
    )
    await logEvent('password_reset_requested', { parentId: rows[0].id, ip: req.ip })
    // TODO(Phase 1 wiring): send rawToken via email provider instead of logging.
  }
  res.status(202).json({ message: 'If that email is registered, a reset link has been sent.' })
})

authRouter.post('/password-reset/confirm', async (req, res) => {
  const { token, newPassword } = req.body || {}
  if (typeof token !== 'string' || typeof newPassword !== 'string' || newPassword.length < 10) {
    return res.status(400).json({ error: 'Invalid request' })
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const { rows } = await pool.query(
    `SELECT id, parent_id FROM password_reset_tokens
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()`,
    [tokenHash]
  )
  const record = rows[0]
  if (!record) return res.status(400).json({ error: 'Invalid or expired reset token' })

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await pool.query('UPDATE parents SET password_hash = $1 WHERE id = $2', [passwordHash, record.parent_id])
  await pool.query('UPDATE password_reset_tokens SET used_at = now() WHERE id = $1', [record.id])
  await logEvent('password_reset_completed', { parentId: record.parent_id, ip: req.ip })
  res.status(204).end()
})
