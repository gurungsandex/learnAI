# LearnAI API

Backend for Phase 1 of `ROADMAP.md`: parent/guardian auth + child progress sync.

## Setup

1. `cp .env.example .env` and fill in real secrets (generate with `openssl rand -hex 32`).
2. Create a Postgres database and run `src/db/schema.sql` against it.
3. `npm install && npm run dev`

## Design notes

- Parent accounts hold credentials; child profiles (linked 1-to-many under a
  parent) hold game progress. No child ever logs in directly — see
  `ROADMAP.md` Phase 5 for the COPPA rationale.
- Access tokens are short-lived JWTs (15 min) returned in the response body;
  refresh tokens are long-lived JWTs in an `httpOnly`, `secure`, `sameSite=strict`
  cookie. Never store either in `localStorage`.
- XP is always computed server-side from `CHAPTER_XP` — the client only ever
  reports *which* chapter it completed, never *how much* XP to award.
- All `/auth/*` routes are rate-limited; all other routes require a valid
  access token and are limited to 60 req/min per client.
- `account.js` implements GDPR/CCPA data export and account deletion;
  deleting a parent cascades to all child profiles and progress via the
  schema's `ON DELETE CASCADE`.

## Not yet wired up

- Sending the password-reset email (currently the token is generated and
  stored, but no email provider is connected — see the `TODO` in
  `routes/auth.js`).
- Deploying this anywhere. This is local, runnable code; provisioning a real
  database/host is a separate decision (see `ROADMAP.md`).
