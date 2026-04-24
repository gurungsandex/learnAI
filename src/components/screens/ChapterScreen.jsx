/**
 * ChapterScreen.jsx
 * Renders the comic panels, dialogue, and interaction for a chapter.
 * After completing the story + interaction, launches the mini-game.
 */
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { getChapter } from '../../data/chapters'
import Character from '../ui/Character'
import { StarBurst } from '../ui/StarBurst'

// ── Panel background styles ────────────────────────────────────
const BG_STYLES = {
  school: { background: 'linear-gradient(135deg, #1a4a6b 0%, #0d2d42 100%)' },
  street: { background: 'linear-gradient(135deg, #2d1f0d 0%, #1a0f00 100%)' },
  city:   { background: 'linear-gradient(135deg, #0d1b2a 0%, #1a2e40 100%)' },
  lab:    { background: 'linear-gradient(135deg, #1a0a2e 0%, #0a0514 100%)' },
  space:  { background: 'linear-gradient(135deg, #000414 0%, #0a0028 100%)' },
  sky:    { background: 'linear-gradient(135deg, #1a4060 0%, #0d2040 100%)' },
  home:   { background: 'linear-gradient(135deg, #2d1f0d 0%, #1a120a 100%)' },
}

export default function ChapterScreen() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { state, addXP, completeChapter, earnBadge } = useGame()

  const chapter = getChapter(id)

  const [phase,         setPhase]         = useState('story')      // story | interaction | reward
  const [panelIdx,      setPanelIdx]      = useState(0)
  const [dialogueIdx,   setDialogueIdx]   = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [interChecked,  setInterChecked]  = useState(false)
  const [interResult,   setInterResult]   = useState(null)         // 'correct' | 'wrong'
  const [showXP,        setShowXP]        = useState(false)

  if (!chapter) {
    navigate('/home')
    return null
  }

  const currentPanel    = chapter.panels[panelIdx]
  const allDialogue     = currentPanel?.dialogue ?? []
  const currentDialogue = allDialogue[dialogueIdx]
  const hasMoreDialogue = dialogueIdx < allDialogue.length - 1
  const hasMorePanels   = panelIdx   < chapter.panels.length - 1
  const bgStyle         = BG_STYLES[currentPanel?.bg] || BG_STYLES.space

  // ── Tap to advance story ───────────────────────────────────
  function advanceStory() {
    if (hasMoreDialogue) {
      setDialogueIdx(d => d + 1)
    } else if (hasMorePanels) {
      setPanelIdx(p => p + 1)
      setDialogueIdx(0)
    } else {
      // Story done → go to interaction
      setPhase('interaction')
    }
  }

  // ── Toggle item in interaction ─────────────────────────────
  function toggleItem(itemId) {
    if (interChecked) return
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(x => x !== itemId) : [...prev, itemId]
    )
  }

  // ── Check interaction answers ──────────────────────────────
  function checkInteraction() {
    const correctIds = chapter.interaction.items.filter(i => i.isCorrect).map(i => i.id)
    const isCorrect  =
      correctIds.every(id => selectedItems.includes(id)) &&
      selectedItems.every(id => correctIds.includes(id))

    setInterChecked(true)
    setInterResult(isCorrect ? 'correct' : 'partial')
  }

  // ── Finish chapter story → earn XP → launch mini-game ─────
  function handleFinishInteraction() {
    // Award story XP
    addXP(Math.round(chapter.xpReward * 0.5))
    earnBadge(chapter.badge.id)
    setShowXP(true)
  }

  function handleXPDone() {
    setShowXP(false)
    navigate(`/minigame/${chapter.id}`)
  }

  // ── Progress indicator ──────────────────────────────────────
  const totalSteps  = chapter.panels.length + 1   // panels + interaction
  const currentStep = phase === 'story' ? panelIdx + 1 : chapter.panels.length + 1
  const progress    = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col">

      {/* ── XP reward burst ── */}
      <StarBurst
        show={showXP}
        xp={Math.round(chapter.xpReward * 0.5)}
        message={`${chapter.badge.emoji} ${chapter.badge.name} badge earned!`}
        onDone={handleXPDone}
      />

      {/* ── Top bar ── */}
      <div className="bg-bg-panel border-b-2 border-purple-dark px-4 py-2 flex items-center gap-3 sticky top-0 z-40">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className="w-9 h-9 rounded-full bg-purple-dark border-2 border-purple-mid flex items-center justify-center text-white font-comic text-lg"
        >
          ←
        </motion.button>

        {/* Chapter title */}
        <div className="flex-1">
          <div className="font-comic text-base text-white leading-none">{chapter.title}</div>
          <div className="font-body text-xs text-purple-light font-700">{chapter.subtitle}</div>
        </div>

        {/* Chapter icon */}
        <div className="text-2xl">{chapter.icon}</div>
      </div>

      {/* ── Progress bar ── */}
      <div className="progress-track mx-4 mt-2">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col px-4 py-3 gap-3">

        {/* ═══════════════════════════════════════════
            STORY PHASE
          ═══════════════════════════════════════════ */}
        {phase === 'story' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${panelIdx}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              {/* Comic panel */}
              <motion.div
                className="comic-panel-lg flex-1 flex flex-col relative cursor-pointer select-none"
                style={bgStyle}
                onClick={advanceStory}
              >
                {/* Halftone overlay */}
                <div className="absolute inset-0 halftone-bg pointer-events-none" />

                {/* Caption box (story narration) */}
                {currentPanel?.caption && (
                  <div className="absolute top-3 left-3 right-3 bg-gold border-2 border-black rounded-lg px-3 py-1.5 z-10">
                    <p className="font-comic text-black text-sm text-center">
                      {currentPanel.caption}
                    </p>
                  </div>
                )}

                {/* Panel number */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="font-comic text-xs text-gold opacity-70">
                    {panelIdx + 1}/{chapter.panels.length}
                  </span>
                </div>

                {/* Characters area */}
                <div className="flex-1 flex items-end justify-between px-4 pb-4 pt-12 relative z-10">

                  {/* Left character */}
                  <div className="flex flex-col items-center">
                    {currentPanel?.characters?.left ? (
                      <>
                        <Character
                          name={currentPanel.characters.left.name}
                          emotion={currentPanel.characters.left.emotion}
                          size={110}
                          flip={false}
                          avatarColor={state.avatarColor}
                        />
                        <span className="font-comic text-xs text-gold mt-1 capitalize">
                          {currentPanel.characters.left.name === 'zara'
                            ? state.playerName
                            : 'Byte'}
                        </span>
                      </>
                    ) : <div className="w-24" />}
                  </div>

                  {/* Right character */}
                  <div className="flex flex-col items-center">
                    {currentPanel?.characters?.right ? (
                      <>
                        <Character
                          name={currentPanel.characters.right.name}
                          emotion={currentPanel.characters.right.emotion}
                          size={110}
                          flip={true}
                          avatarColor={state.avatarColor}
                        />
                        <span className="font-comic text-xs text-gold mt-1 capitalize">
                          {currentPanel.characters.right.name === 'zara'
                            ? state.playerName
                            : 'Byte'}
                        </span>
                      </>
                    ) : <div className="w-24" />}
                  </div>
                </div>
              </motion.div>

              {/* Dialogue bubbles */}
              {currentDialogue && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`d-${panelIdx}-${dialogueIdx}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0  }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`speech-bubble mt-3 ${
                      currentDialogue.speaker === 'zara' ? 'bubble-tail-left' : 'bubble-tail-right ml-8'
                    }`}
                  >
                    <span
                      className="font-body font-900 mr-1"
                      style={{ color: currentDialogue.speaker === 'byte' ? '#0891B2' : '#9333EA' }}
                    >
                      {currentDialogue.speaker === 'zara' ? `${state.playerName}:` : 'Byte:'}
                    </span>
                    {currentDialogue.text}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Tap hint */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center mt-2"
              >
                <span className="font-body text-purple-light text-xs font-700">
                  {hasMoreDialogue || hasMorePanels ? 'TAP TO CONTINUE →' : 'TAP TO DO CHALLENGE →'}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ═══════════════════════════════════════════
            INTERACTION PHASE
          ═══════════════════════════════════════════ */}
        {phase === 'interaction' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col"
          >
            {/* Prompt */}
            <div className="card-comic mb-3">
              <div className="flex items-start gap-3">
                <Character name="byte" emotion="excited" size={64} />
                <div className="flex-1">
                  <p className="font-body font-900 text-white text-base leading-snug">
                    {chapter.interaction.prompt}
                  </p>
                  <p className="font-body text-purple-light text-xs mt-1">
                    💡 {chapter.interaction.helpText}
                  </p>
                </div>
              </div>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {chapter.interaction.items.map(item => {
                const isSelected = selectedItems.includes(item.id)
                const showResult = interChecked

                let borderColor = isSelected ? '#FBBF24' : '#4B3B7C'
                let bgColor     = isSelected ? 'rgba(107,33,168,0.6)' : 'rgba(19,13,36,0.8)'
                let overlay     = null

                if (showResult) {
                  if (item.isCorrect && isSelected) {
                    borderColor = '#4ADE80'; bgColor = 'rgba(74,222,128,0.15)'; overlay = '✅'
                  } else if (item.isCorrect && !isSelected) {
                    borderColor = '#4ADE80'; bgColor = 'rgba(74,222,128,0.08)'; overlay = '💡'
                  } else if (!item.isCorrect && isSelected) {
                    borderColor = '#FB7185'; bgColor = 'rgba(251,113,133,0.15)'; overlay = '❌'
                  }
                }

                return (
                  <motion.button
                    key={item.id}
                    whileTap={!interChecked ? { scale: 0.93 } : {}}
                    onClick={() => toggleItem(item.id)}
                    className="rounded-comic border-2 p-3 flex items-center gap-2 transition-colors"
                    style={{
                      borderColor,
                      backgroundColor: bgColor,
                      boxShadow: isSelected ? `3px 3px 0 #111, 0 0 12px ${borderColor}60` : '3px 3px 0 #111',
                    }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-body font-800 text-white text-sm flex-1 text-left">{item.label}</span>
                    {overlay && <span className="text-lg">{overlay}</span>}
                  </motion.button>
                )
              })}
            </div>

            {/* Result feedback */}
            {interChecked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`card-comic mb-3 text-center border-2
                  ${interResult === 'correct' ? 'border-green' : 'border-gold'}`}
              >
                <div className="text-3xl mb-1">{interResult === 'correct' ? '🎉' : '👍'}</div>
                <p className="font-comic text-white text-xl">
                  {interResult === 'correct' ? 'PERFECT! Amazing!' : 'Good effort! Keep going!'}
                </p>
                <p className="font-body text-purple-light text-sm mt-1">
                  The green ones are AI-powered examples!
                </p>
              </motion.div>
            )}

            {/* Check / Continue button */}
            {!interChecked ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={checkInteraction}
                disabled={selectedItems.length === 0}
                className={`btn-gold text-xl py-4 w-full ${selectedItems.length === 0 ? 'opacity-40' : ''}`}
              >
                CHECK MY ANSWERS! ✓
              </motion.button>
            ) : (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0  }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinishInteraction}
                className="btn-gold text-xl py-4 w-full"
              >
                MINI GAME TIME! 🎮 →
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
