import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth.js'
import { childrenRouter } from './routes/children.js'
import { accountRouter } from './routes/account.js'

for (const v of ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET', 'DATABASE_URL']) {
  if (!process.env[v]) throw new Error(`Missing required env var ${v}`)
}

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '100kb' }))

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/auth', authRouter)
app.use('/children', childrenRouter)
app.use('/account', accountRouter)

// Centralized error handler: never leak stack traces or internals to clients.
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`LearnAI API listening on :${port}`))
