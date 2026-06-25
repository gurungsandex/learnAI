/**
 * GameContext.jsx
 * ─────────────────────────────────────────────────────────────
 * Central state for LearnAI. All game progress is stored here
 * AND saved to localStorage so it persists between sessions.
 *
 * To add a new feature, add it to initialState + relevant action.
 * ─────────────────────────────────────────────────────────────
 */
import { createContext, useContext, useReducer, useEffect } from 'react'

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
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function isYesterday(dateStr, today) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10) === today
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
      if (state.lastActiveDate !== today) {
        streakCount = isYesterday(state.lastActiveDate, today) ? state.streakCount + 1 : 1
      }

      return {
        ...state,
        completedChapters: newCompleted,
        chapterStars: newStars,
        hasCompletedGame: isFinished,
        lastActiveDate: today,
        streakCount,
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
