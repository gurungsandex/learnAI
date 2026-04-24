/**
 * CertificateScreen.jsx
 * Shown when the player completes all 8 chapters.
 * Renders a "printable" certificate and has a share/screenshot prompt.
 */
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame, getLevel } from '../../context/GameContext'
import { ZaraCharacter, ByteCharacter } from '../ui/Character'

// Today's date formatted nicely
function todayFormatted() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function CertificateScreen() {
  const navigate    = useNavigate()
  const { state }   = useGame()
  const certRef     = useRef(null)
  const level       = getLevel(state.xp)

  const totalStars  = Object.values(state.chapterStars).reduce((s, v) => s + v, 0)

  // Not completed? Redirect
  if (!state.hasCompletedGame && state.completedChapters.length < 8) {
    return (
      <div className="min-h-dvh bg-bg-deep flex flex-col items-center justify-center px-6">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="font-comic text-gold text-3xl text-center mb-3">
          NOT YET!
        </h2>
        <p className="font-body text-purple-light text-center mb-6">
          Complete all 8 chapters to unlock your certificate!
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/home')}
          className="btn-gold text-xl py-4 px-8"
        >
          BACK TO MAP 🗺️
        </motion.button>
      </div>
    )
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'LearnAI Certificate!',
        text: `🎓 I just earned my LearnAI AI Explorer certificate! I learned about AI, machine learning, and built my own AI agent! #LearnAI #KidsCode`,
      }).catch(() => {})
    } else {
      alert('Take a screenshot to share your certificate! 📸')
    }
  }

  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col">

      {/* ── Top bar ── */}
      <div className="bg-bg-panel border-b-2 border-purple-dark px-4 py-3 flex items-center gap-3 sticky top-0 z-40">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className="w-9 h-9 rounded-full bg-purple-dark border-2 border-purple-mid flex items-center justify-center text-white font-comic text-lg"
        >
          ←
        </motion.button>
        <div className="font-comic text-gold text-xl">🎓 YOUR CERTIFICATE</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">

        {/* ── Celebration header ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center py-4"
        >
          {/* Confetti stars */}
          <div className="flex justify-center gap-2 mb-2">
            {['🎉','⭐','🏆','⭐','🎉'].map((e, i) => (
              <motion.span
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="text-3xl"
              >
                {e}
              </motion.span>
            ))}
          </div>
          <h1 className="font-comic text-4xl text-gold" style={{ textShadow: '3px 3px 0 #111' }}>
            YOU DID IT!
          </h1>
          <p className="font-body font-800 text-purple-light mt-1">
            You've completed the LearnAI AI adventure!
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════
            THE CERTIFICATE
          ═══════════════════════════════════════ */}
        <motion.div
          ref={certRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-comic overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a0a2e 0%, #0f1a2e 50%, #0a0a1a 100%)',
            border: '4px solid #FBBF24',
            boxShadow: '6px 6px 0 #111, 0 0 30px rgba(251,191,36,0.4)',
          }}
        >
          {/* Corner decorations */}
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} text-gold text-xl opacity-60`}>★</div>
          ))}

          {/* Halftone bg */}
          <div className="absolute inset-0 halftone-bg opacity-30 pointer-events-none" />

          {/* Certificate content */}
          <div className="relative z-10 p-6 text-center">

            {/* Header */}
            <div
              className="font-comic text-2xl text-gold mb-1"
              style={{ textShadow: '2px 2px 0 #111' }}
            >
              CERTIFICATE OF COMPLETION
            </div>
            <div className="font-body text-purple-light text-sm mb-4">LearnAI AI Adventure Program</div>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gold opacity-40" />
              <span className="text-gold text-sm">✦</span>
              <div className="flex-1 h-px bg-gold opacity-40" />
            </div>

            {/* "This certifies" text */}
            <p className="font-body text-purple-light text-sm mb-2">This certifies that</p>

            {/* Player name */}
            <div
              className="font-comic text-4xl mb-2"
              style={{
                color: '#22D3EE',
                textShadow: '3px 3px 0 #111, 0 0 20px rgba(34,211,238,0.5)',
              }}
            >
              {state.playerName}
            </div>

            <p className="font-body text-purple-light text-sm mb-4">has successfully completed</p>

            {/* Achievement */}
            <div
              className="font-comic text-xl text-white mb-1"
              style={{ textShadow: '2px 2px 0 #111' }}
            >
              ALL 8 CHAPTERS OF LEARNAI
            </div>
            <p className="font-body text-purple-light text-xs mb-4">
              and demonstrated knowledge of Artificial Intelligence, Machine Learning,<br/>
              Computer Vision, Natural Language Processing, and AI Agent Design
            </p>

            {/* Characters flanking a medal */}
            <div className="flex items-end justify-center gap-6 mb-4">
              <ZaraCharacter emotion="proud"   size={80} skinColor={state.avatarColor} />
              <div className="flex flex-col items-center mb-4">
                <div className="text-5xl mb-1">🏆</div>
                <div className="font-comic text-gold text-sm">GOLD</div>
                <div className="font-comic text-gold text-sm">GRADUATE</div>
              </div>
              <ByteCharacter emotion="proud" size={72} />
            </div>

            {/* Stats strip */}
            <div className="flex justify-center gap-4 mb-4">
              {[
                { label: 'XP Earned',  value: `${state.xp}`,     emoji: '⚡' },
                { label: 'Stars',      value: `${totalStars}⭐`,  emoji: '' },
                { label: 'Badges',     value: `${state.badges.length}`,emoji: '🏅' },
                { label: 'Level',      value: level.title,        emoji: '🌟' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-comic text-gold text-lg leading-none">{s.emoji}{s.value}</div>
                  <div className="font-body text-purple-light" style={{ fontSize: '0.6rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-gold opacity-40" />
              <span className="text-gold text-sm">✦</span>
              <div className="flex-1 h-px bg-gold opacity-40" />
            </div>

            {/* Date + issuer */}
            <p className="font-body text-purple-light text-xs">
              Awarded on {todayFormatted()}
            </p>
            <p className="font-comic text-cyan text-sm mt-1">LearnAI · AI for Kids</p>

            {/* Byte signature */}
            <div className="mt-3 flex justify-center items-center gap-2">
              <div className="text-lg">🤖</div>
              <div>
                <div className="font-comic text-white text-sm">Byte</div>
                <div className="font-body text-purple-light" style={{ fontSize: '0.6rem' }}>Chief AI Officer, LearnAI</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Action buttons ── */}
        <div className="flex flex-col gap-3 pb-6">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="btn-gold w-full text-xl py-4"
          >
            📤 SHARE MY CERTIFICATE!
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/builder')}
            className="btn-cyan w-full text-xl py-4"
          >
            🔨 KEEP BUILDING MY AGENT
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/home')}
            className="btn-purple w-full text-xl py-4"
          >
            🗺️ BACK TO MAP
          </motion.button>
        </div>
      </div>
    </div>
  )
}
