import { Router } from 'express'
import { pool } from '../db/pool.js'
import { requireAuth } from '../middleware/auth.js'
import { apiLimiter } from '../middleware/rateLimit.js'
import { CHAPTER_XP } from '../data/chapterRewards.js'

export const childrenRouter = Router()
childrenRouter.use(requireAuth, apiLimiter)

// Every query below filters by parent_id, scoping access to the
// authenticated parent's own children — never trust a child_id from the
// client without verifying ownership.
async function assertOwnsChild(parentId, childId) {
  const { rows } = await pool.query(
    'SELECT 1 FROM child_profiles WHERE id = $1 AND parent_id = $2',
    [childId, parentId]
  )
  return rows.length > 0
}

childrenRouter.post('/', async (req, res) => {
  const { displayName, avatarColor } = req.body || {}
  if (typeof displayName !== 'string' || !displayName.trim()) {
    return res.status(400).json({ error: 'displayName is required' })
  }

  const { rows } = await pool.query(
    'INSERT INTO child_profiles (parent_id, display_name, avatar_color) VALUES ($1, $2, $3) RETURNING id, display_name, avatar_color',
    [req.parentId, displayName.trim().slice(0, 40), avatarColor || '#7C3AED']
  )
  await pool.query('INSERT INTO progress (child_id) VALUES ($1)', [rows[0].id])
  res.status(201).json(rows[0])
})

childrenRouter.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, display_name, avatar_color FROM child_profiles WHERE parent_id = $1',
    [req.parentId]
  )
  res.json(rows)
})

childrenRouter.get('/:childId/progress', async (req, res) => {
  if (!await assertOwnsChild(req.parentId, req.params.childId)) {
    return res.status(404).json({ error: 'Not found' })
  }
  const { rows } = await pool.query('SELECT * FROM progress WHERE child_id = $1', [req.params.childId])
  res.json(rows[0])
})

childrenRouter.post('/:childId/complete-chapter', async (req, res) => {
  if (!await assertOwnsChild(req.parentId, req.params.childId)) {
    return res.status(404).json({ error: 'Not found' })
  }
  const chapterId = Number(req.body?.chapterId)
  const stars = Number(req.body?.stars ?? 3)
  const xpReward = CHAPTER_XP[chapterId]
  if (!xpReward) return res.status(400).json({ error: 'Unknown chapterId' })

  const { rows } = await pool.query(
    `UPDATE progress SET
       xp = xp + (CASE WHEN $1 = ANY(completed_chapters) THEN 0 ELSE $2 END),
       completed_chapters = CASE WHEN $1 = ANY(completed_chapters) THEN completed_chapters ELSE array_append(completed_chapters, $1) END,
       chapter_stars = jsonb_set(chapter_stars, ARRAY[$1::text], to_jsonb($3::int)),
       last_active_date = CURRENT_DATE,
       streak_count = CASE
         WHEN last_active_date = CURRENT_DATE THEN streak_count
         WHEN last_active_date = CURRENT_DATE - 1 THEN streak_count + 1
         ELSE 1
       END,
       updated_at = now()
     WHERE child_id = $4
     RETURNING *`,
    [chapterId, xpReward, Math.min(Math.max(stars, 1), 3), req.params.childId]
  )
  res.json(rows[0])
})
