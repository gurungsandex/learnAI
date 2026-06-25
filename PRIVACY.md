# Privacy Policy (Draft — pre-launch)

**Status: draft.** This describes the app as it exists today (client-only, no backend) and
the commitments that take effect the moment a backend ships. Do not publish this as a live
policy until Phase 1 (backend/auth) is deployed and every claim below is literally true —
publishing it earlier would itself be a misrepresentation.

## Who this covers
LearnAI is designed for children roughly 8–12 years old. Because the audience includes
children under 13, this policy is written to satisfy COPPA (US) and to be compatible with
GDPR-K / age-appropriate design rules (EU/UK), not generic adult-targeted GDPR/CCPA language.

## What we collect today (client-only build)
As shipped right now, the app has **no server and makes no network calls**. Everything —
player name, avatar color, XP, badges, completed chapters, AI-builder rules — is stored only
in `localStorage` on the device the app is running on. Nothing is transmitted to us or to any
third party. Clearing browser storage deletes it permanently; we have no copy.

## What we will collect once an account system ships (Phase 1)
- A **parent/guardian email + password** (hashed, never stored in plain text) — the account
  is the parent's, not the child's. Children never log in directly.
- A **child display name** and **avatar color** only — no last name, no photo, no contact
  info, no precise location.
- **Progress data**: completed chapters, quiz scores, XP, badges, streak count.
- **Operational metadata**: IP address and timestamp on auth events (login, password reset),
  retained only in the audit log for abuse/security investigation.
- We will not collect a child's email, phone number, or any persistent identifier usable to
  contact them directly.

## What we will never do
- No behavioral advertising, no ad-tech SDKs, no third-party trackers in a product aimed at
  children — COPPA prohibits most of this category outright for child-directed services.
- No selling or sharing of any personal data with third parties.
- No public leaderboards or any feature that exposes a child's name/data to other users.

## Parental consent (once accounts exist)
Verifiable parental consent will be obtained before any child profile is created under a
parent account, per COPPA's VPC requirement. The parent account holder can review, export, or
delete their child's data at any time (see Data export / Account deletion below).

## Data retention
Progress data is retained for as long as the account is active. An account inactive for an
extended period will be flagged for deletion notice before removal (exact window to be set
when retention tooling ships in Phase 6).

## Account deletion
Deleting the parent account cascades to delete all linked child profiles and progress data
(implemented server-side via `ON DELETE CASCADE`, see `server/src/db/schema.sql` and
`DELETE /account` in `server/src/routes/account.js`).

## Data export
A parent can request a full JSON export of everything tied to their account and their
children's progress at any time (`GET /account/export`), satisfying GDPR Art. 20 / CCPA
access requests.

## Contact
A real contact address/process will be added here before this policy is published live.
