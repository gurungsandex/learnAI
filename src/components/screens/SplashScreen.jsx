/**
 * SplashScreen.jsx
 * First screen the user sees. Animated logo, then auto-navigates.
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { ByteCharacter } from '../ui/Character'

export default function SplashScreen() {
  const navigate = useNavigate()
  const { state } = useGame()

  // After 2.8s auto-navigate to onboarding OR home (if returning player)
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(state.onboardingDone ? '/home' : '/onboarding', { replace: true })
    }, 2800)
    return () => clearTimeout(timer)
  }, [navigate, state.onboardingDone])

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1E0A3C 0%, #0A0714 70%)' }}
      onClick={() => navigate(state.onboardingDone ? '/home' : '/onboarding', { replace: true })}
    >
      {/* ── Halftone background ── */}
      <div className="absolute inset-0 halftone-bg pointer-events-none" />

      {/* ── Stars decoration ── */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold"
          style={{
            left:  `${5 + (i * 23) % 90}%`,
            top:   `${5 + (i * 17) % 88}%`,
            fontSize: `${8 + (i % 4) * 4}px`,
            opacity: 0.6,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5 + (i % 3), repeat: Infinity, delay: i * 0.15 }}
        >
          ★
        </motion.div>
      ))}

      {/* ── Byte character floats in ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.3 }}
        className="animate-float mb-4 z-10"
      >
        <ByteCharacter emotion="excited" size={120} />
      </motion.div>

      {/* ── Logo ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.6 }}
        className="z-10 text-center"
      >
        {/* Main title */}
        <div
          className="font-comic text-7xl text-gold"
          style={{ textShadow: '4px 4px 0px #111, 0 0 30px rgba(251,191,36,0.6)' }}
        >
          BYTE
        </div>
        <div
          className="font-comic text-7xl text-cyan"
          style={{ textShadow: '4px 4px 0px #111, 0 0 30px rgba(34,211,238,0.6)', marginTop: '-18px' }}
        >
          QUEST
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="font-body font-800 text-purple-light text-base mt-2 tracking-wide"
        >
          Learn AI. Build Agents. Save the World! 🌍
        </motion.p>
      </motion.div>

      {/* ── "Tap to start" hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.6, duration: 1.2, repeat: Infinity }}
        className="absolute bottom-12 font-body font-700 text-purple-light text-sm"
      >
        tap anywhere to start ✨
      </motion.p>

      {/* ── Version stamp ── */}
      <p className="absolute bottom-4 text-xs text-purple-dark font-body">
        ByteQuest v1.0 • Made with ❤️
      </p>
    </div>
  )
}
