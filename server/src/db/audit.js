import { pool } from './pool.js'

export async function logEvent(eventType, { parentId = null, ip = null } = {}) {
  await pool.query(
    'INSERT INTO audit_log (parent_id, event_type, ip_address) VALUES ($1, $2, $3)',
    [parentId, eventType, ip]
  )
}
