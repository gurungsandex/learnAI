// Local/dev entrypoint only — Vercel's serverless entry is api/index.js,
// which imports the app without calling listen().
import { app } from './app.js'

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`LearnAI API listening on :${port}`))
