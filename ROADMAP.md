# LearnAI — Production Roadmap

## Phase 0: Current State Audit

**What exists today** (verified against `src/`):
- Vite + React 18 + Tailwind + react-router-dom + framer-motion SPA, no backend.
- Single `GameContext` (`src/context/GameContext.jsx`) holds all state: player name/avatar,
  XP, completed chapters/minigames, badges, AI-builder blocks. Persisted only via
  `localStorage.setItem('learnai_save', ...)`.
- Content is static data: 8 chapters (`src/data/chapters.js`), badge defs (`src/data/badges.js`).
  As of this audit, `chapters.js` (story panels, sorting interactions, quiz questions,
  badges for all 8 chapters) was fully written but **not wired to any screen** —
  `ChapterScreen`/`MiniGameScreen`/`HomeScreen` were hardcoded to a single fixed demo
  chapter regardless of the `:id` route param, and never read `chapters.js` or
  `GameContext` state (XP/streak/badges shown were static placeholder numbers). This has
  now been fixed: `HomeScreen` renders one node per chapter from `chapters.js` with real
  lock/done state from `GameContext`; `ChapterScreen` renders that chapter's actual story
  panels; `MiniGameScreen` renders that chapter's actual quiz and awards real XP/badges
  via `GameContext` on completion.
- 7 screens: Onboarding, Home, Chapter, MiniGame, AIBuilder, Profile, Certificate.
- No auth, no accounts, no server, no database, no network calls at all.
- No tests, no CI, no error boundary, no analytics, no monitoring.
- Target audience is children 8–12 — this has direct implications for COPPA (US) and
  GDPR-K / age-of-consent rules (EU), which is stricter than generic GDPR/CCPA.

**Limitations of client-only approach:**
- Progress is lost on cache clear, device change, or browser switch — no cross-device sync.
- No way to verify achievements/certificates (a parent or school can't confirm completion).
- No mechanism for streaks/reminders/notifications since there's no server to schedule them
  and no account to notify.
- Can't safely collect or process any personal data because there's no backend to enforce
  access control, retention, or deletion — right now "compliance" is moot because no
  personal data is transmitted or stored outside the user's own browser.

**Implication:** any feature requiring persistence across devices, notifications, parental
controls, or leaderboards requires a backend + datastore + auth. That work is the
prerequisite for nearly every other phase, so it is sequenced first.

## Phase 1: Core Platform (backend foundation)
- Add a minimal backend (Node/Express or a managed BaaS such as Supabase) with:
  - `users` (id, display_name, created_at) — for a kids' product, prefer **parent/guardian
    account + child profile** model rather than direct child accounts, to stay COPPA-aligned.
  - `progress` (user_id, completed_chapters, completed_minigames, xp, badges, chapter_stars)
  - `sessions` for auth tokens.
- Auth: email+password for the parent account (hashed with bcrypt/argon2), short-lived JWT
  access token + refresh token, no direct login for the child profile itself.
- Password reset via signed, expiring email link.
- REST or simple JSON API: `GET/PUT /progress`, `POST /auth/*`.
- Migrate `GameContext` to sync with the API (optimistic local update + background sync),
  keeping localStorage as an offline cache, not the source of truth.

## Phase 2: Learning Experience
- No backend dependency — can proceed in parallel with Phase 1 on the frontend.
- Add a visible step-by-step path UI per chapter (the data already supports panels/minigames,
  just needs a progress map).
- Add a short knowledge-check quiz at the end of each chapter (data-driven, same pattern as
  `chapters.js`).
- Accessibility pass: keyboard navigation through comic panels, ARIA labels on icon-only
  buttons (`lucide-react` icons), color-contrast check against WCAG AA, reduced-motion
  fallback for `framer-motion` animations.
- ✅ Mobile responsiveness verified: `#root` is already capped at `max-width: 480px` and
  centered (`index.css`), so the app renders as a fixed-width mobile card rather than
  stretching on desktop — confirmed via Playwright screenshots at 320×568 (smallest common
  phone width, no horizontal overflow on Home/Profile) and 1440×900 (desktop, correctly
  centered, not stretched).
- ✅ Fixed: `IconButton`'s default tap target was 36px, under the 44px minimum recommended by
  WCAG 2.5.5 / Apple HIG for touch targets — bumped the default to 44px (`ComicPrimitives.jsx`).
  Used for every back/close/settings icon button across all 7 screens.

## Phase 3: Gamification & Retention
- ✅ Daily streak counter — client-side (`GameContext`), using the device clock; will move to
  server-side date tracking once Phase 1 deploys (a device clock can be changed by the user).
- ✅ Streak-protection grace period — missing exactly one day no longer resets the streak,
  capped at one freebie per 7 days (`canUseStreakFreebie` in `GameContext.jsx`).
- ✅ Re-engagement messaging — in-app only banner on `HomeScreen` (`getWelcomeMessage`),
  friendly → light-teasing tone scaling with days away, never guilt-based. No push/email yet
  since there's no account/notification backend — push/email to the **parent's** address
  (never directly to a child) remains a Phase 1-dependent follow-up.
- ✅ `streak_3` and `graduate` achievement badges are now actually awarded (were defined in
  `badges.js` but never wired to any code path); `perfectionist` now awarded on a 100% quiz.
- ✅ Fixed a real disconnect: `AIBuilderScreen` built its IF/THEN program in local
  `useState` only and never called `setAgentBlocks` — so `ProfileScreen`'s "Bots built" stat
  and the `builder_pro` badge (defined in `badges.js` as "5+ rules") were both permanently
  unreachable, and the rule cap was hardcoded to 4, one below the badge's own threshold.
  Running the agent now persists the program to `GameContext.agentBlocks` and the rule cap
  is 5, so `builder_pro` is actually obtainable.
- Still open: weekly summary screen, milestone celebrations beyond the existing
  end-of-chapter/certificate screens, and the `speedrunner` badge (needs a per-chapter timer,
  which doesn't exist yet).

## Phase 4: Security (after Phase 1 ships)
- OWASP Top 10 pass on the new API: auth (A07), injection (A03), broken access control (A01).
- Rate limit auth endpoints (login, password reset) to block credential stuffing.
- Store secrets (DB creds, JWT signing key) in environment/secret manager, never in repo.
- Input validation on every API boundary (chapter id, minigame id, xp deltas — never trust
  client-submitted XP amounts; compute server-side from completed chapter rewards).
- Audit log for account-level events (login, password reset, data export, deletion).

**Static code review of `server/` (no live infra required — code is written but not yet
deployed, so this is a desk review, not a penetration test):**
- ✅ Passwords hashed with bcrypt cost 12; login comparison is constant-shape (compares
  against a dummy hash when the account doesn't exist) to resist timing-based user
  enumeration.
- ✅ Password reset tokens are single-use, SHA-256-hashed at rest, time-limited, and the
  request endpoint always returns a generic 202 to avoid leaking which emails are registered.
- ✅ Access tokens are short-lived (15m); refresh tokens are httpOnly + secure +
  sameSite=strict cookies, not readable from JS.
- ✅ All DB access uses parameterized queries (`pg` placeholders) — no string-built SQL found.
- ✅ Child-data endpoints verify `parent_id` ownership on every query (`assertOwnsChild`)
  before reading/writing — no broken-object-level-authorization path found.
- ✅ XP rewards are computed server-side from a `CHAPTER_XP` whitelist keyed by chapter id,
  never trusted from the client request body.
- ✅ Audit log covers register/login/login_failed/password_reset_requested/
  password_reset_completed/data_export/account_deleted.
- 🔧 Fixed: `jwt.verify()` calls didn't pin an algorithm, leaving a (currently theoretical,
  HS256-only) opening for algorithm-confusion if the library's defaults ever changed —
  added `{ algorithms: ['HS256'] }` to both the access- and refresh-token verification.
- 🔧 Fixed: no security headers middleware — added `helmet()` to `index.js` for baseline
  protections (`X-Content-Type-Options`, `X-Frame-Options`, HSTS, etc.).
- 🔧 Fixed: `accountRouter` (export/delete) had no rate limiting — added `apiLimiter` so the
  data-export and account-deletion endpoints can't be hammered.
- Still open, deferred until real infra exists: secrets currently only validated as
  "present" at boot (`index.js`); a secret manager / rotation policy is a deployment-time
  concern, not a code-review one.

## Phase 5: Privacy & Compliance (after Phase 1 ships)
- ✅ `PRIVACY.md` and `TERMS.md` drafted — written against what the app actually does today
  (client-only, zero network calls) plus the exact commitments the existing-but-undeployed
  `server/` code already implements (parent/child account model, COPPA-aligned consent,
  cascading account deletion, JSON data export). Both are explicitly marked **draft / not in
  effect** — they must not be published live until Phase 1 deploys and a real legal review
  happens, since publishing privacy/compliance claims about systems that don't exist yet
  would itself be misleading.
- Still open: actual verifiable-parental-consent flow (needs the account system to exist),
  a real contact address/process, and legal sign-off before either document goes live.
- No third-party trackers/cookies for a children's product — flag this explicitly during
  Phase 6 analytics planning (COPPA forbids most third-party ad/analytics SDKs for child-
  directed apps; prefer first-party, non-fingerprinting usage stats).

## Phase 6: Production Readiness
- ✅ Frontend error boundary added (`src/components/ui/ErrorBoundary.jsx`, wrapping the whole
  tree in `main.jsx`) — a render crash in one screen no longer blanks the whole app; shows a
  friendly recovery screen and a way back to `/home`. `GameProvider`'s `localStorage` read/write
  was already wrapped in try/catch (corrupt save data degrades to `initialState`, never crashes).
- Still open: backend structured logging beyond `console.error` (needs a deployed target to
  ship logs to), monitoring/alerting on API error rate and auth failures, database backup
  schedule + restore drill, containerized backend + managed Postgres + CDN deployment, and a
  final launch checklist — all gated on Phase 1 actually deploying.

## Sequencing rationale
Phases 4–5 are explicitly gated on Phase 1 because there is currently no account, no
database, and no transmitted personal data — reviewing security/compliance for systems
that don't exist would produce a report with nothing real to assess. Phase 2–3 frontend
work can proceed in parallel with Phase 1 backend work.
