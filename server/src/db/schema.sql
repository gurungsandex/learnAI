-- LearnAI database schema (Postgres)
-- Parent/guardian holds the account & credentials; child profiles hold
-- game progress. This split keeps a child's identity decoupled from
-- login credentials, per COPPA guidance (see ROADMAP.md Phase 5).

CREATE TABLE parents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE password_reset_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id   UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  token_hash  TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ
);

CREATE TABLE child_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id     UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  display_name  TEXT NOT NULL,
  avatar_color  TEXT NOT NULL DEFAULT '#7C3AED',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE progress (
  child_id            UUID PRIMARY KEY REFERENCES child_profiles(id) ON DELETE CASCADE,
  xp                  INTEGER NOT NULL DEFAULT 0,
  completed_chapters  INTEGER[] NOT NULL DEFAULT '{}',
  completed_minigames INTEGER[] NOT NULL DEFAULT '{}',
  badges              TEXT[] NOT NULL DEFAULT '{}',
  chapter_stars       JSONB NOT NULL DEFAULT '{}',
  agent_name          TEXT NOT NULL DEFAULT 'Byte Jr',
  agent_blocks        JSONB NOT NULL DEFAULT '[]',
  streak_count        INTEGER NOT NULL DEFAULT 0,
  last_active_date    DATE,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id   UUID REFERENCES parents(id) ON DELETE SET NULL,
  event_type  TEXT NOT NULL, -- 'login', 'login_failed', 'password_reset_requested', 'password_reset_completed', 'data_export', 'account_deleted'
  ip_address  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_child_profiles_parent ON child_profiles(parent_id);
CREATE INDEX idx_password_reset_parent ON password_reset_tokens(parent_id);
CREATE INDEX idx_audit_log_parent ON audit_log(parent_id);
