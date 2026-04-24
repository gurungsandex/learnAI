/**
 * ProfileScreen.jsx
 * Shows player avatar, XP level, badges earned, and chapter stats.
 */
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame, getLevel, xpToNextLevel, XP_LEVELS } from '../../context/GameContext'
import { chapters } from '../../data/chapters'
import { ALL_BADGES } from '../../data/badges'
import { ZaraCharacter } from '../ui/Character'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { state, reset } = useGame()
  const level   = getLevel(state.xp)
  const xpInfo  = xpToNextLevel(state.xp)

  const totalStars     = Object.values(state.chapterStars).reduce((s, v) => s + v, 0)
  const maxStars       = chapters.length * 3
  const completedCount = state.completedChapters.length

  function confirmReset() {
    if (window.confirm('Reset ALL progress? This cannot be undone!')) {
      reset()
      navigate('/', { replace: true })
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
        <div className="flex-1">
          <div className="font-comic text-gold text-xl leading-none">PROFILE 🏆</div>
          <div className="font-body text-purple-light text-xs font-700">Your adventure stats</div>
        </div>
        {state.hasCompletedGame && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/certificate')}
            className="btn-gold px-3 py-1 text-sm"
          >
            🎓 Cert
          </motion.button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">

        {/* ── Hero card: avatar + name + level ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-comic flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #1E0A3C 0%, #130D24 100%)' }}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <ZaraCharacter emotion="proud" size={100} skinColor={state.avatarColor} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="font-comic text-white text-2xl leading-none truncate">
              {state.playerName}
            </div>
            <div
              className="inline-block font-comic text-black text-sm px-3 py-0.5 rounded-full mt-1 border-2 border-black"
              style={{ backgroundColor: '#FBBF24' }}
            >
              Lv.{level.level} {level.title}
            </div>

            {/* XP bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs font-body text-purple-light mb-1">
                <span>{state.xp} XP</span>
                <span>{level.level < 5 ? `${xpInfo.current}/${xpInfo.needed} to Lv.${level.level + 1}` : 'MAX LEVEL!'}</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${xpInfo.pct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Chapters', value: `${completedCount}/8`,     emoji: '📖', color: '#22D3EE' },
            { label: 'Stars',    value: `${totalStars}/${maxStars}`,emoji: '⭐', color: '#FBBF24' },
            { label: 'Badges',   value: `${state.badges.length}`,  emoji: '🏅', color: '#EC4899' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="card-comic text-center py-3"
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="font-comic text-xl" style={{ color: stat.color }}>{stat.value}</div>
              <div className="font-body text-purple-light text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Level road ── */}
        <div className="card-comic">
          <h3 className="font-comic text-gold text-base mb-3">LEVEL ROAD 🗺️</h3>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {XP_LEVELS.map((lv, i) => {
              const reached = state.xp >= lv.minXP
              const isCurrent = level.level === lv.level
              return (
                <div key={lv.level} className="flex items-center gap-1 flex-shrink-0">
                  <div
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-comic text-sm transition-all
                        ${isCurrent ? 'border-gold animate-pulse' : reached ? 'border-green' : 'border-purple-dark opacity-50'}`}
                      style={{
                        backgroundColor: isCurrent ? '#6B21A8' : reached ? '#1C1338' : 'transparent',
                        boxShadow: isCurrent ? '0 0 12px rgba(251,191,36,0.7)' : undefined,
                      }}
                    >
                      {reached ? (isCurrent ? '🌟' : '✓') : lv.level}
                    </div>
                    <div className={`font-comic text-xs mt-0.5 text-center ${isCurrent ? 'text-gold' : reached ? 'text-green' : 'text-purple-dark'}`}>
                      {lv.title}
                    </div>
                  </div>
                  {i < XP_LEVELS.length - 1 && (
                    <div
                      className="w-6 h-1 rounded-full mb-5"
                      style={{ backgroundColor: state.xp >= XP_LEVELS[i + 1]?.minXP ? '#4ADE80' : '#2D1B4E' }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Chapter progress ── */}
        <div className="card-comic">
          <h3 className="font-comic text-gold text-base mb-3">CHAPTERS 📖</h3>
          <div className="flex flex-col gap-2">
            {chapters.map(ch => {
              const done  = state.completedChapters.includes(ch.id)
              const stars = state.chapterStars[ch.id] ?? 0
              const unlocked = ch.id === 1 || state.completedChapters.includes(ch.id - 1)
              return (
                <motion.div
                  key={ch.id}
                  whileTap={unlocked ? { scale: 0.98 } : {}}
                  onClick={() => unlocked && navigate(`/chapter/${ch.id}`)}
                  className={`flex items-center gap-3 rounded-comic border p-2 transition-all
                    ${done ? 'border-green' : unlocked ? 'border-purple-mid' : 'border-purple-dark opacity-40'}`}
                  style={{ backgroundColor: done ? 'rgba(74,222,128,0.05)' : '#130D24', cursor: unlocked ? 'pointer' : 'default' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 flex-shrink-0"
                    style={{
                      borderColor: done ? '#4ADE80' : unlocked ? ch.color : '#2D1B4E',
                      backgroundColor: done ? 'rgba(74,222,128,0.1)' : 'transparent',
                    }}
                  >
                    {done ? '✅' : !unlocked ? '🔒' : ch.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-comic text-white text-sm leading-none truncate">
                      Ch.{ch.id} {ch.title}
                    </div>
                    <div className="font-body text-purple-light text-xs">{ch.subtitle}</div>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[1,2,3].map(s => (
                      <span key={s} className={`text-sm ${s <= stars ? 'text-gold' : 'text-purple-dark'}`}>★</span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Badges ── */}
        <div className="card-comic">
          <h3 className="font-comic text-gold text-base mb-3">
            BADGES 🏅 ({state.badges.length}/{ALL_BADGES.length})
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {ALL_BADGES.map(badge => {
              const earned = state.badges.includes(badge.id)
              return (
                <motion.div
                  key={badge.id}
                  whileTap={earned ? { scale: 1.1 } : {}}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl transition-all
                      ${earned ? 'border-gold' : 'border-purple-dark opacity-30'}`}
                    style={{
                      backgroundColor: earned ? 'rgba(251,191,36,0.15)' : '#130D24',
                      boxShadow: earned ? '0 0 12px rgba(251,191,36,0.4)' : undefined,
                      filter: earned ? undefined : 'grayscale(1)',
                    }}
                  >
                    {badge.emoji}
                  </div>
                  <div
                    className={`font-comic text-center leading-tight`}
                    style={{ fontSize: '0.6rem', color: earned ? '#FBBF24' : '#4B3B7C' }}
                  >
                    {badge.name}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Agent card ── */}
        {state.agentBlocks?.length > 0 && (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/builder')}
            className="card-comic border-cyan cursor-pointer"
            style={{ borderColor: '#22D3EE' }}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">🤖</div>
              <div>
                <div className="font-comic text-cyan text-lg">{state.agentName}</div>
                <div className="font-body text-purple-light text-sm">
                  {state.agentBlocks.filter(b => b.response).length} rules active · tap to edit
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Reset button ── */}
        <div className="mt-2 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={confirmReset}
            className="w-full py-3 rounded-comic border-2 border-coral font-comic text-coral text-base"
            style={{ background: 'rgba(251,113,133,0.05)' }}
          >
            🗑️ Reset All Progress
          </motion.button>
          <p className="text-center font-body text-xs text-purple-dark mt-1">
            This will erase everything and cannot be undone.
          </p>
        </div>
      </div>
    </div>
  )
}
