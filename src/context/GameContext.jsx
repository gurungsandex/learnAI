/**
 * GameContext.jsx
 * ─────────────────────────────────────────────────────────────
 * Central state for LearnAI. All game progress is stored here
 * AND saved to localStorage so it persists between sessions.
 *
 * To add a new feature, add it to initialState + relevant action.
 * ─────────────────────────────────────────────────────────────
 */
import { createContext, useContext, useReducer, useEffect, useRef } from 'react'
import { api, apiEnabled } from '../api/client'

// ── XP levels ────────────────────────────────────────────────
export const XP_LEVELS = [
  { level: 1, title: 'Explorer',   minXP: 0   },
  { level: 2, title: 'Hacker',     minXP: 150 },
  { level: 3, title: 'Builder',    minXP: 350 },
  { level: 4, title: 'Scientist',  minXP: 600 },
  { level: 5, title: 'AI Master',  minXP: 900 },
]

export function getLevel(xp) {
  const l = [...XP_LEVELS].reverse().find(l => xp >= l.minXP)
  return l || XP_LEVELS[0]
}

export function xpToNextLevel(xp) {
  const current = getLevel(xp)
  const next = XP_LEVELS.find(l => l.level === current.level + 1)
  if (!next) return { current: xp, needed: xp, pct: 100 } // max level
  const needed = next.minXP - current.minXP
  const progress = xp - current.minXP
  return { current: progress, needed, pct: Math.round((progress / needed) * 100) }
}

// ── Friendly re-engagement copy ─────────────────────────────────
// In-app only (no push/email — there's no account/notification backend yet).
// Tone is friendly → light teasing, never guilt-based, per the app's voice.
export function getWelcomeMessage(state) {
  if (!state.lastActiveDate || state.completedChapters.length === 0) return null
  const gap = Math.round((new Date(todayStr()) - new Date(state.lastActiveDate)) / 86400000)
  const name = state.playerName || 'Explorer'
  if (gap <= 0) return null
  if (gap === 1) return `Welcome back, ${name}! Keep that ${state.streakCount}-day streak going 🔥`
  if (gap === 2) return `Byte missed you yesterday! Hop back in to protect your streak 🤖`
  if (gap <= 6) return `It's been ${gap} days... Sparky's getting a little dusty without you ✨`
  return `${name}! Sparky thought you got eaten by a bug (the software kind). Ready for another chapter? 🐛`
}

// ── Initial State ─────────────────────────────────────────────
const initialState = {
  playerName:         '',          // set during onboarding
  avatarColor:        '#7C3AED',   // chosen during onboarding
  onboardingDone:     false,       // skip onboarding after first time

  xp:                 0,
  completedChapters:  [],          // e.g. [1, 2, 3]
  completedMinigames: [],          // e.g. [1, 2]
  badges:             [],          // badge IDs e.g. ['ai_explorer']
  chapterStars:       {},          // { 1: 3, 2: 2 }  star rating per chapter

  agentName:          'Byte Jr',
  agentBlocks:        [],          // AI builder rules

  hasCompletedGame:   false,

  lastActiveDate:     null,        // 'YYYY-MM-DD', last day a chapter was completed
  streakCount:        0,           // consecutive days with a completed chapter
  streakFreebieUsedOn: null,       // 'YYYY-MM-DD' the last streak-protection freebie was spent

  childId:            null,        // backend child_profiles.id, set once Phase 1 auth/profile flow exists
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(fromStr, toStr) {
  const from = new Date(fromStr)
  const to = new Date(toStr)
  return Math.round((to - from) / 86400000)
}

function isYesterday(dateStr, today) {
  return dateStr != null && daysBetween(dateStr, today) === 1
}

// Streak-protection: missing exactly one day still counts as a kept streak,
// but only once every 7 days, so a single bad day doesn't punish a kid while
// still requiring real consistency to keep the freebie topped up.
function canUseStreakFreebie(state, today) {
  if (state.streakFreebieUsedOn === null) return true
  return daysBetween(state.streakFreebieUsedOn, today) >= 7
}

// ── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'SET_PLAYER':
      return { ...state, playerName: action.name, avatarColor: action.color, onboardingDone: true }

    case 'ADD_XP':
      return { ...state, xp: state.xp + action.amount }

    case 'COMPLETE_CHAPTER': {
      const already = state.completedChapters.includes(action.id)
      const newCompleted = already ? state.completedChapters : [...state.completedChapters, action.id]
      const newStars = { ...state.chapterStars, [action.id]: action.stars ?? 3 }
      const isFinished = newCompleted.length >= 8

      const today = todayStr()
      let streakCount = state.streakCount
      let streakFreebieUsedOn = state.streakFreebieUsedOn
      if (state.lastActiveDate !== today) {
        if (isYesterday(state.lastActiveDate, today)) {
          streakCount = state.streakCount + 1
        } else if (daysBetween(state.lastActiveDate, today) === 2 && canUseStreakFreebie(state, today)) {
          streakCount = state.streakCount + 1
          streakFreebieUsedOn = today
        } else {
          streakCount = 1
        }
      }

      const newBadges = [...state.badges]
      if (streakCount >= 3 && !newBadges.includes('streak_3')) newBadges.push('streak_3')
      if (isFinished && !newBadges.includes('graduate')) newBadges.push('graduate')

      return {
        ...state,
        completedChapters: newCompleted,
        chapterStars: newStars,
        hasCompletedGame: isFinished,
        lastActiveDate: today,
        streakCount,
        streakFreebieUsedOn,
        badges: newBadges,
      }
    }

    case 'COMPLETE_MINIGAME': {
      const already = state.completedMinigames.includes(action.id)
      return {
        ...state,
        completedMinigames: already ? state.completedMinigames : [...state.completedMinigames, action.id],
      }
    }

    case 'EARN_BADGE': {
      const already = state.badges.includes(action.id)
      return {
        ...state,
        badges: already ? state.badges : [...state.badges, action.id],
      }
    }

    case 'SET_AGENT_NAME':
      return { ...state, agentName: action.name }

    case 'SET_AGENT_BLOCKS':
      return { ...state, agentBlocks: action.blocks }

    case 'HYDRATE':
      return { ...state, ...action.progress }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────
const GameContext = createContext(null)

export function GameProvider({ children }) {
  // Load from localStorage on first render
  const saved = (() => {
    try {
      const raw = localStorage.getItem('learnai_save')
      return raw ? { ...initialState, ...JSON.parse(raw) } : initialState
    } catch {
      return initialState
    }
  })()

  const [state, dispatch] = useReducer(reducer, saved)

  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('learnai_save', JSON.stringify(state))
    } catch {
      // Storage full or unavailable – silently ignore
    }
  }, [state])

  // Background sync to the backend, once one is configured (VITE_API_URL set)
  // and a child profile has been created server-side (state.childId set by the
  // Phase 1 auth/profile flow, which doesn't exist in the UI yet). Until both
  // are true this is a complete no-op and localStorage remains authoritative.
  useEffect(() => {
    if (!apiEnabled || !state.childId) return
    api.getChildProgress(state.childId)
      .then(remote => remote && dispatch({
        type: 'HYDRATE',
        progress: {
          xp: remote.xp,
          completedChapters: remote.completed_chapters || [],
          chapterStars: remote.chapter_stars || {},
          lastActiveDate: remote.last_active_date,
          streakCount: remote.streak_count,
        },
      }))
      .catch(() => {}) // backend unreachable – keep local state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.childId])

  // Mirror chapter completions server-side. The server (not the client) is
  // the source of truth for XP amounts — see CHAPTER_XP in server/src/data.
  const lastSyncedChapter = useRef(null)
  useEffect(() => {
    if (!apiEnabled || !state.childId) return
    const newest = state.completedChapters[state.completedChapters.length - 1]
    if (newest == null || newest === lastSyncedChapter.current) return
    lastSyncedChapter.current = newest
    api.completeChapter(state.childId, newest, state.chapterStars[newest] ?? 3).catch(() => {})
  }, [state.childId, state.completedChapters, state.chapterStars])

  // ── Convenience action helpers ─────────────────────────────
  const actions = {
    setPlayer:       (name, color)          => dispatch({ type: 'SET_PLAYER', name, color }),
    addXP:           (amount)               => dispatch({ type: 'ADD_XP', amount }),
    completeChapter: (id, stars = 3)        => dispatch({ type: 'COMPLETE_CHAPTER', id, stars }),
    completeMiniGame:(id)                   => dispatch({ type: 'COMPLETE_MINIGAME', id }),
    earnBadge:       (id)                   => dispatch({ type: 'EARN_BADGE', id }),
    setAgentName:    (name)                 => dispatch({ type: 'SET_AGENT_NAME', name }),
    setAgentBlocks:  (blocks)               => dispatch({ type: 'SET_AGENT_BLOCKS', blocks }),
    reset:           ()                     => dispatch({ type: 'RESET' }),

    // Is chapter N unlocked? (chapter 1 always, others need previous done)
    isUnlocked: (id) => {
      if (id === 1) return true
      return state.completedChapters.includes(id - 1)
    },
  }

  return (
    <GameContext.Provider value={{ state, ...actions }}>
      {children}
    </GameContext.Provider>
  )
}

// Hook
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}
