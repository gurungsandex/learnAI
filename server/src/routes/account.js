import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'
import { apiLimiter } from '../middleware/rateLimit.js'
import { logEvent } from '../db/audit.js'

export const accountRouter = Router()
accountRouter.use(requireAuth, apiLimiter)

// Full export of everything tied to this parent account and its children,
// to satisfy GDPR Art. 20 / CCPA right-to-access requests.
accountRouter.get('/export', async (req, res) => {
  const parent = await pool.query('SELECT id, email, created_at FROM parents WHERE id = $1', [req.parentId])
  const children = await pool.query('SELECT * FROM child_profiles WHERE parent_id = $1', [req.parentId])
  const progress = await pool.query(
    'SELECT progress.* FROM progress JOIN child_profiles ON child_profiles.id = progress.child_id WHERE child_profiles.parent_id = $1',
    [req.parentId]
  )

  await logEvent('data_export', { parentId: req.parentId, ip: req.ip })
  res.json({ parent: parent.rows[0], children: children.rows, progress: progress.rows })
})

// Deletes the parent account and cascades to all linked child profiles and
// progress (see ON DELETE CASCADE in schema.sql), to satisfy GDPR Art. 17 /
// CCPA right-to-delete requests.
accountRouter.delete('/', async (req, res) => {
  await logEvent('account_deleted', { parentId: req.parentId, ip: req.ip })
  await pool.query('DELETE FROM parents WHERE id = $1', [req.parentId])
  res.clearCookie('refresh_token')
  res.status(204).end()
})
