/**
 * OnboardingScreen.jsx
 * 3-step onboarding: name → avatar color → meet characters
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import Character, { ZaraCharacter, ByteCharacter } from '../ui/Character'

const AVATAR_COLORS = [
  { label: 'Caramel',  value: '#F5A873' },
  { label: 'Honey',    value: '#D4895E' },
  { label: 'Cocoa',    value: '#9B6040' },
  { label: 'Ebony',    value: '#5C3A28' },
  { label: 'Rose',     value: '#F7C5A0' },
  { label: 'Warm',     value: '#E8956D' },
]

const STEPS = ['name', 'avatar', 'meet']

export default function OnboardingScreen() {
  const navigate  = useNavigate()
  const { setPlayer } = useGame()

  const [step,        setStep]        = useState(0)
  const [playerName,  setPlayerName]  = useState('')
  const [avatarColor, setAvatarColor] = useState('#F5A873')
  const [nameError,   setNameError]   = useState('')

  // ── Step handlers ──────────────────────────────────────────
  function handleNameNext() {
    const trimmed = playerName.trim()
    if (!trimmed || trimmed.length < 2) {
      setNameError('Enter at least 2 characters!')
      return
    }
    setNameError('')
    setStep(1)
  }

  function handleAvatarNext() {
    setStep(2)
  }

  function handleFinish() {
    setPlayer(playerName.trim(), avatarColor)
    navigate('/home', { replace: true })
  }

  // ── Slide variants ─────────────────────────────────────────
  const slide = {
    initial:  { x: 80,  opacity: 0 },
    animate:  { x: 0,   opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 22 } },
    exit:     { x: -80, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <div
      className="min-h-dvh flex flex-col items-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at top, #1E0A3C 0%, #0A0714 70%)' }}
    >
      <div className="absolute inset-0 halftone-bg pointer-events-none" />

      {/* ── Progress dots ── */}
      <div className="flex gap-3 pt-10 pb-6 z-10">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-gold transition-all duration-300
              ${i <= step ? 'bg-gold' : 'bg-transparent'}`}
          />
        ))}
      </div>

      <div className="w-full max-w-sm px-6 z-10 flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">

          {/* ═══ STEP 0: Name ═══ */}
          {step === 0 && (
            <motion.div key="step-name" {...slide} className="w-full text-center">
              <div className="text-6xl mb-4">👋</div>
              <h1 className="font-comic text-4xl text-gold mb-2">HEY EXPLORER!</h1>
              <p className="font-body font-700 text-purple-light mb-8">
                What's your name, adventurer?
              </p>

              {/* Name input */}
              <input
                type="text"
                value={playerName}
                onChange={e => { setPlayerName(e.target.value); setNameError('') }}
                onKeyDown={e => e.key === 'Enter' && handleNameNext()}
                placeholder="Your name here..."
                maxLength={20}
                className="w-full bg-bg-panel border-4 border-purple-mid rounded-comic px-5 py-4
                           font-body font-800 text-white text-xl text-center outline-none
                           focus:border-gold transition-colors placeholder:text-purple-light placeholder:opacity-50"
                autoFocus
                autoComplete="off"
              />

              {nameError && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-coral font-body font-800 text-sm mt-2"
                >
                  ⚠️ {nameError}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleNameNext}
                className="btn-gold w-full mt-6 text-2xl py-4"
              >
                LET'S GO! →
              </motion.button>
            </motion.div>
          )}

          {/* ═══ STEP 1: Avatar Color ═══ */}
          {step === 1 && (
            <motion.div key="step-avatar" {...slide} className="w-full text-center">
              <div className="mb-4">
                <ZaraCharacter emotion="happy" size={130} skinColor={avatarColor} />
              </div>
              <h1 className="font-comic text-3xl text-gold mb-2">PICK YOUR LOOK!</h1>
              <p className="font-body font-700 text-purple-light mb-6">
                Choose Zara's skin color 🎨
              </p>

              {/* Color swatches */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {AVATAR_COLORS.map(c => (
                  <motion.button
                    key={c.value}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAvatarColor(c.value)}
                    className="relative rounded-comic border-4 py-4 font-body font-800 text-sm transition-all"
                    style={{
                      backgroundColor: c.value,
                      borderColor: avatarColor === c.value ? '#FBBF24' : '#333',
                      boxShadow: avatarColor === c.value ? '0 0 16px rgba(251,191,36,0.7)' : '3px 3px 0 #111',
                      color: '#111',
                    }}
                  >
                    {c.label}
                    {avatarColor === c.value && (
                      <span className="absolute top-1 right-1 text-xs">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleAvatarNext}
                className="btn-gold w-full text-2xl py-4"
              >
                LOOKS GREAT! →
              </motion.button>
            </motion.div>
          )}

          {/* ═══ STEP 2: Meet Characters ═══ */}
          {step === 2 && (
            <motion.div key="step-meet" {...slide} className="w-full text-center">
              <h1 className="font-comic text-4xl text-gold mb-6">
                YOUR TEAM! 🤝
              </h1>

              {/* Characters side by side */}
              <div className="flex justify-center items-end gap-4 mb-6">
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <ZaraCharacter emotion="excited" size={110} skinColor={avatarColor} />
                  <div className="font-comic text-coral text-xl mt-2">{playerName}</div>
                  <div className="font-body text-purple-light text-xs">The Explorer</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="font-comic text-gold text-3xl pb-10"
                >
                  +
                </motion.div>

                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0,  opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center animate-float"
                >
                  <ByteCharacter emotion="excited" size={100} />
                  <div className="font-comic text-cyan text-xl mt-2">Byte</div>
                  <div className="font-body text-purple-light text-xs">The AI Companion</div>
                </motion.div>
              </div>

              {/* Speech bubble from Byte */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="speech-bubble mx-4 mb-6 text-base"
              >
                <span className="text-cyan font-900">Byte: </span>
                "Hi {playerName}! Ready to learn how AI works — and BUILD one?! This is going to be EPIC! 🚀"
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 1.1 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleFinish}
                className="btn-gold w-full text-2xl py-4"
              >
                START ADVENTURE! 🚀
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
