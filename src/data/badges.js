/**
 * badges.js
 * All badges in LearnAI.
 * Each badge is tied to a chapter completion or special achievement.
 * To add a new badge: add it here AND reference it in chapters.js
 */

export const ALL_BADGES = [
  // ── Chapter badges ────────────────────────────────────────
  { id: 'ai_explorer',    name: 'AI Explorer',    emoji: '🚀', chapter: 1, description: 'Discovered what AI is!'           },
  { id: 'data_chef',      name: 'Data Chef',      emoji: '🍳', chapter: 2, description: 'Fed Byte training data!'          },
  { id: 'vision_master',  name: 'Vision Master',  emoji: '👁️', chapter: 3, description: 'Taught AI to see!'               },
  { id: 'word_wizard',    name: 'Word Wizard',    emoji: '💬', chapter: 4, description: 'Helped AI understand language!'   },
  { id: 'trend_spotter',  name: 'Trend Spotter',  emoji: '⭐', chapter: 5, description: 'Mastered recommendation AI!'     },
  { id: 'decision_maker', name: 'Decision Maker', emoji: '🌳', chapter: 6, description: 'Mastered AI decision trees!'     },
  { id: 'agent_recruit',  name: 'Agent Recruit',  emoji: '🕵️', chapter: 7, description: 'Understands AI agents!'          },
  { id: 'ai_creator',     name: 'AI Creator',     emoji: '⚡', chapter: 8, description: 'Built a first AI agent!'         },

  // ── Special achievement badges ────────────────────────────
  { id: 'speedrunner',    name: 'Speed Runner',   emoji: '⚡', chapter: null, description: 'Completed a chapter in under 3 minutes!' },
  { id: 'perfectionist',  name: 'Perfectionist',  emoji: '💯', chapter: null, description: 'Got 100% on a quiz!'             },
  { id: 'builder_pro',    name: 'Builder Pro',    emoji: '🔨', chapter: null, description: 'Created an AI agent with 5+ rules!' },
  { id: 'streak_3',       name: 'On Fire!',       emoji: '🔥', chapter: null, description: 'Completed 3 chapters in a row!'   },
  { id: 'graduate',       name: 'LearnAI Graduate', emoji: '🎓', chapter: null, description: 'Completed all 8 chapters!'    },
]

export function getBadge(id) {
  return ALL_BADGES.find(b => b.id === id)
}
