/**
 * HomeScreen.jsx
 * The main hub — a winding adventure map showing all 8 chapters.
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame, getLevel } from '../../context/GameContext'
import { chapters } from '../../data/chapters'
import { XPBar } from '../ui/StarBurst'
import { ByteCharacter } from '../ui/Character'

// Map positions for each chapter node (x/y as % of the map width)
// Creates a snake/zigzag path down the screen
const NODE_POSITIONS = [
  { x: 18,  y: 8  },   // Ch 1
  { x: 60,  y: 18 },   // Ch 2
  { x: 20,  y: 30 },   // Ch 3
  { x: 65,  y: 42 },   // Ch 4
  { x: 18,  y: 54 },   // Ch 5
  { x: 62,  y: 64 },   // Ch 6
  { x: 22,  y: 76 },   // Ch 7
  { x: 60,  y: 87 },   // Ch 8
]

export default function HomeScreen() {
  const navigate = useNavigate()
  const { state, isUnlocked } = useGame()
  const level = getLevel(state.xp)

  function openChapter(chapter) {
    if (!isUnlocked(chapter.id)) return
    if (state.completedChapters.includes(chapter.id)) {
      // Already done — let them replay
      navigate(`/chapter/${chapter.id}`)
    } else {
      navigate(`/chapter/${chapter.id}`)
    }
  }

  const totalStars = Object.values(state.chapterStars).reduce((s, v) => s + v, 0)

  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col">

      {/* ── TOP HEADER ── */}
      <div className="bg-bg-panel border-b-2 border-purple-dark px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between mb-2">
          {/* Player name + level */}
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full border-2 border-gold flex items-center justify-center font-comic text-black text-sm"
              style={{ backgroundColor: state.avatarColor }}
            >
              {state.playerName?.[0]?.toUpperCase() || '?'}
            </div>
            <div>
              <div className="font-comic text-white text-base leading-none">{state.playerName}</div>
              <div className="font-body text-purple-light text-xs font-700">
                Lv.{level.level} {level.title}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="font-comic text-gold text-base leading-none">{totalStars}⭐</div>
              <div className="font-body text-purple-light text-xs">Stars</div>
            </div>
            <div className="text-center">
              <div className="font-comic text-cyan text-base leading-none">{state.completedChapters.length}/8</div>
              <div className="font-body text-purple-light text-xs">Done</div>
            </div>
            {/* Profile button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/profile')}
              className="w-9 h-9 rounded-full bg-purple-mid border-2 border-gold flex items-center justify-center text-lg"
            >
              🏆
            </motion.button>
          </div>
        </div>

        {/* XP progress bar */}
        <XPBar />
      </div>

      {/* ── MOTIVATIONAL BANNER ── */}
      <div className="mx-4 mt-3 px-4 py-2 bg-purple-dark border-2 border-purple-mid rounded-comic flex items-center gap-3">
        <div className="text-2xl animate-float">🤖</div>
        <div className="flex-1">
          <p className="font-body font-800 text-purple-light text-sm">
            {state.completedChapters.length === 0
              ? "Start Chapter 1 to begin your AI adventure!"
              : state.completedChapters.length >= 8
              ? "🎉 You completed LearnAI! Check your certificate!"
              : `Keep going! ${8 - state.completedChapters.length} chapters left to build your AI agent!`
            }
          </p>
        </div>
      </div>

      {/* ── ADVENTURE MAP ── */}
      <div className="flex-1 relative mx-4 my-3">
        {/* Map background */}
        <div
          className="relative w-full rounded-comic border-2 border-purple-mid overflow-hidden"
          style={{
            minHeight: '620px',
            background: 'linear-gradient(180deg, #0D1B2A 0%, #1E0A3C 50%, #0A0714 100%)',
          }}
        >
          {/* Halftone overlay */}
          <div className="absolute inset-0 halftone-bg-light pointer-events-none" />

          {/* Map title */}
          <div className="absolute top-3 left-0 right-0 text-center">
            <span className="font-comic text-purple-light text-sm tracking-widest opacity-60">AI ADVENTURE MAP</span>
          </div>

          {/* ── PATH LINES (SVG) ── */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {NODE_POSITIONS.slice(0, -1).map((pos, i) => {
              const next = NODE_POSITIONS[i + 1]
              const done = state.completedChapters.includes(i + 1)
              return (
                <line
                  key={i}
                  x1={`${pos.x + 5}%`} y1={`${pos.y + 5}%`}
                  x2={`${next.x + 5}%`} y2={`${next.y + 5}%`}
                  stroke={done ? '#4ADE80' : '#2D1B4E'}
                  strokeWidth="0.8"
                  strokeDasharray={done ? '0' : '2 2'}
                />
              )
            })}
          </svg>

          {/* ── CHAPTER NODES ── */}
          {chapters.map((chapter, i) => {
            const pos       = NODE_POSITIONS[i]
            const unlocked  = isUnlocked(chapter.id)
            const completed = state.completedChapters.includes(chapter.id)
            const isCurrent = !completed && unlocked
            const stars     = state.chapterStars[chapter.id] ?? 0

            return (
              <motion.div
                key={chapter.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
                className="absolute"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {/* Pulse ring for current chapter */}
                {isCurrent && (
                  <div
                    className="absolute -inset-2 rounded-full border-2 border-gold animate-pulse opacity-60"
                  />
                )}

                {/* Node button */}
                <motion.button
                  whileTap={unlocked ? { scale: 0.9 } : {}}
                  onClick={() => openChapter(chapter)}
                  className={`relative flex flex-col items-center`}
                  style={{ cursor: unlocked ? 'pointer' : 'default' }}
                >
                  {/* Circle */}
                  <div
                    className={`
                      w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl
                      ${completed ? 'border-green bg-bg-card' : ''}
                      ${isCurrent  ? 'border-gold' : ''}
                      ${!unlocked  ? 'border-purple-dark bg-bg-deep opacity-50' : ''}
                    `}
                    style={{
                      backgroundColor: isCurrent ? chapter.color : undefined,
                      boxShadow: isCurrent
                        ? `4px 4px 0 #111, 0 0 16px ${chapter.color}80`
                        : '3px 3px 0 #111',
                    }}
                  >
                    {completed ? '✅' : !unlocked ? '🔒' : chapter.icon}
                  </div>

                  {/* Stars */}
                  {completed && (
                    <div className="flex gap-0.5 mt-0.5">
                      {[1,2,3].map(s => (
                        <span key={s} className={`text-xs ${s <= stars ? 'text-gold' : 'text-purple-dark'}`}>★</span>
                      ))}
                    </div>
                  )}

                  {/* Label */}
                  <div
                    className={`
                      mt-1 font-comic text-xs px-2 py-0.5 rounded-full border text-center whitespace-nowrap
                      ${isCurrent  ? 'bg-gold text-black border-black'           : ''}
                      ${completed  ? 'bg-bg-card text-green border-green'        : ''}
                      ${!unlocked  ? 'bg-transparent text-purple-dark border-purple-dark' : ''}
                    `}
                    style={{
                      boxShadow: isCurrent ? '2px 2px 0 #111' : undefined,
                      fontSize: '0.65rem',
                    }}
                  >
                    Ch.{chapter.id}
                  </div>
                </motion.button>
              </motion.div>
            )
          })}

          {/* ── Byte floats near current chapter ── */}
          {(() => {
            const currentIdx = Math.max(0, state.completedChapters.length)
            if (currentIdx >= NODE_POSITIONS.length) return null
            const pos = NODE_POSITIONS[currentIdx]
            return (
              <motion.div
                className="absolute animate-float pointer-events-none"
                style={{ left: `${pos.x + 12}%`, top: `${pos.y - 10}%` }}
                animate={{ x: [0, 4, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <ByteCharacter emotion="happy" size={44} />
              </motion.div>
            )
          })()}
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="bg-bg-panel border-t-2 border-purple-dark px-4 py-3 flex justify-around">
        <NavButton emoji="🗺️" label="Map"     active={true}     onClick={() => {}} />
        <NavButton emoji="🔨" label="Builder"  active={false}    onClick={() => navigate('/builder')} />
        <NavButton emoji="🏆" label="Profile"  active={false}    onClick={() => navigate('/profile')} />
        {state.hasCompletedGame && (
          <NavButton emoji="🎓" label="Certificate" active={false} onClick={() => navigate('/certificate')} />
        )}
      </div>
    </div>
  )
}

function NavButton({ emoji, label, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-1 rounded-comic transition-all
        ${active ? 'text-gold' : 'text-purple-light'}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className={`font-comic text-xs ${active ? 'text-gold' : ''}`}>{label}</span>
    </motion.button>
  )
}
