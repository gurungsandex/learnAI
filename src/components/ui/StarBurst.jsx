/**
 * StarBurst.jsx + XPBar.jsx
 * Small reusable UI components used across the app.
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useGame, xpToNextLevel, getLevel } from '../../context/GameContext'

// ── Star Burst (celebration overlay) ─────────────────────────
export function StarBurst({ show, xp, message, onDone }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="starburst"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={onDone}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* Background flash */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gold"
          />

          {/* Main reward card */}
          <motion.div
            initial={{ y: 40, scale: 0.5 }}
            animate={{ y: 0,  scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative bg-bg-deep border-4 border-gold rounded-comic px-8 py-6 text-center shadow-glow"
          >
            {/* Stars */}
            <div className="text-5xl mb-2 animate-bounce-in">⭐</div>
            <div className="font-comic text-gold text-3xl mb-1">+{xp} XP!</div>
            {message && (
              <div className="font-body font-800 text-white text-lg">{message}</div>
            )}
          </motion.div>

          {/* Confetti particles */}
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: (Math.cos((i / 16) * Math.PI * 2) * 160),
                y: (Math.sin((i / 16) * Math.PI * 2) * 160) - 60,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              className="absolute w-3 h-3 rounded-full"
              style={{ background: ['#FBBF24','#22D3EE','#EC4899','#4ADE80','#FB7185'][i % 5] }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── XP Bar (used in Header) ────────────────────────────────────
export function XPBar({ compact = false }) {
  const { state } = useGame()
  const level      = getLevel(state.xp)
  const { current, needed, pct } = xpToNextLevel(state.xp)

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="xp-badge">⭐ {state.xp}</span>
        <span className="font-comic text-purple-light text-sm">Lv.{level.level}</span>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-comic text-gold text-sm">Lv.{level.level} {level.title}</span>
        <span className="font-body text-xs text-purple-light font-700">{current}/{needed} XP</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ── Top Header Bar ─────────────────────────────────────────────
export function TopBar({ title, onBack, showXP = true }) {
  const { state } = useGame()

  return (
    <div className="w-full bg-bg-panel border-b-2 border-purple-dark px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-purple-dark border-2 border-purple-mid flex items-center justify-center text-white font-comic text-xl active:scale-90 transition-transform"
          >
            ←
          </button>
        )}
        {title && (
          <span className="font-comic text-white text-xl">{title}</span>
        )}
      </div>
      {showXP && <XPBar compact />}
    </div>
  )
}
