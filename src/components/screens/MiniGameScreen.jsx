/**
 * MiniGameScreen.jsx
 * Handles the mini-game for each chapter (currently: quiz type).
 * After completion, awards XP and navigates back to home.
 */
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { getChapter } from '../../data/chapters'
import { ByteCharacter } from '../ui/Character'
import { StarBurst } from '../ui/StarBurst'

const QUESTION_TIME = 15 // seconds per question

export default function MiniGameScreen() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const { state, addXP, completeChapter, completeMiniGame, earnBadge } = useGame()

  const chapter  = getChapter(id)
  const miniGame = chapter?.miniGame

  const [phase,       setPhase]       = useState('intro')   // intro | playing | result
  const [qIndex,      setQIndex]      = useState(0)
  const [chosen,      setChosen]      = useState(null)       // index of chosen option
  const [locked,      setLocked]      = useState(false)
  const [score,       setScore]       = useState(0)
  const [timeLeft,    setTimeLeft]    = useState(QUESTION_TIME)
  const [answers,     setAnswers]     = useState([])         // { correct: bool } per question
  const [showXP,      setShowXP]      = useState(false)
  const [xpEarned,    setXpEarned]    = useState(0)
  const timerRef = useRef(null)

  const questions = miniGame?.questions ?? []
  const currentQ  = questions[qIndex]

  if (!chapter || !miniGame) {
    navigate('/home')
    return null
  }

  // ── Timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || locked) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          // Use functional update to guard against double-firing
          setLocked(wasLocked => {
            if (!wasLocked) {
              setAnswers(a => [...a, { correct: false, timedOut: true }])
              setTimeout(goNext, 1600)
            }
            return true
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // goNext is a stable function declaration; exhaustive-deps wants it listed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qIndex, locked])

  // ── Answer selection ───────────────────────────────────────
  function selectAnswer(optionIdx) {
    if (locked) return
    clearInterval(timerRef.current)
    setChosen(optionIdx)
    setLocked(true)

    const correct = optionIdx === currentQ.correct
    if (correct) setScore(s => s + 1)
    setAnswers(a => [...a, { correct }])
    setTimeout(goNext, 1800)
  }

  // ── Advance to next question ───────────────────────────────
  function goNext() {
    if (qIndex < questions.length - 1) {
      setQIndex(q => q + 1)
      setChosen(null)
      setLocked(false)
      setTimeLeft(QUESTION_TIME)
    } else {
      finishGame()
    }
  }

  // ── Finish ─────────────────────────────────────────────────
  function finishGame() {
    const pct     = score / questions.length
    const stars   = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1
    const baseXP  = miniGame.xpReward
    const bonusXP = pct === 1 ? 25 : 0
    const total   = baseXP + bonusXP

    setXpEarned(total)
    addXP(total)
    completeChapter(Number(id), stars)
    completeMiniGame(Number(id))
    if (pct === 1) earnBadge('perfectionist')

    // Grant graduate badge if all 8 chapters done
    const newCompleted = [...state.completedChapters, Number(id)]
    if (new Set(newCompleted).size >= 8) earnBadge('graduate')

    setPhase('result')
    setTimeout(() => setShowXP(true), 500)
  }

  function handleXPDone() {
    setShowXP(false)
  }

  const pct   = phase === 'result' ? score / questions.length : 0
  const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : 1

  // ── Option button color ────────────────────────────────────
  function optionStyle(idx) {
    if (!locked && chosen === null) return { border: '#4B3B7C', bg: '#130D24' }
    if (!locked) return { border: '#4B3B7C', bg: '#130D24' }
    if (idx === currentQ.correct) return { border: '#4ADE80', bg: 'rgba(74,222,128,0.15)' }
    if (idx === chosen && idx !== currentQ.correct) return { border: '#FB7185', bg: 'rgba(251,113,133,0.15)' }
    return { border: '#4B3B7C', bg: '#130D24' }
  }

  return (
    <div className="min-h-dvh bg-bg-deep flex flex-col">

      <StarBurst
        show={showXP}
        xp={xpEarned}
        message={`${score}/${questions.length} correct! Chapter complete!`}
        onDone={handleXPDone}
      />

      {/* ── Top bar ── */}
      <div className="bg-bg-panel border-b-2 border-purple-dark px-4 py-2 flex items-center gap-3">
        <div
          className="px-3 py-1 rounded-full border-2 border-gold"
          style={{ background: chapter.color + '33' }}
        >
          <span className="font-comic text-gold text-sm">
            {chapter.icon} {chapter.title}
          </span>
        </div>
        <span className="font-comic text-white flex-1 text-right text-sm">
          {miniGame.title}
        </span>
      </div>

      <div className="flex-1 flex flex-col px-4 py-4">

        {/* ═══ INTRO ═══ */}
        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-6"
          >
            <div className="animate-float">
              <ByteCharacter emotion="excited" size={130} />
            </div>
            <div className="text-center">
              <h1 className="font-comic text-4xl text-gold mb-2">{miniGame.title}</h1>
              <p className="font-body font-700 text-purple-light text-base">
                {questions.length} questions · {QUESTION_TIME}s each
              </p>
              <p className="font-body text-white text-sm mt-2 px-4">
                Answer fast for bonus points! You got this! 💪
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setPhase('playing')}
              className="btn-gold text-3xl py-5 px-10"
            >
              START! 🎮
            </motion.button>
          </motion.div>
        )}

        {/* ═══ PLAYING ═══ */}
        {phase === 'playing' && currentQ && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Header: question count + timer */}
            <div className="flex items-center justify-between">
              <div className="font-comic text-purple-light text-sm">
                Q {qIndex + 1} of {questions.length}
              </div>
              {/* Timer ring */}
              <div className="relative w-12 h-12">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#1E0A3C" strokeWidth="4"/>
                  <circle
                    cx="20" cy="20" r="16"
                    fill="none"
                    stroke={timeLeft <= 5 ? '#FB7185' : '#FBBF24'}
                    strokeWidth="4"
                    strokeDasharray={`${(timeLeft / QUESTION_TIME) * 100} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center font-comic text-sm"
                  style={{ color: timeLeft <= 5 ? '#FB7185' : '#FBBF24' }}
                >
                  {timeLeft}
                </span>
              </div>
              {/* Score */}
              <div className="font-comic text-gold text-sm">⭐ {score}</div>
            </div>

            {/* Score progress dots */}
            <div className="flex gap-1.5 justify-center">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-black"
                  style={{ backgroundColor: a.correct ? '#4ADE80' : '#FB7185' }}
                />
              ))}
              {[...Array(questions.length - answers.length)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full border border-purple-mid bg-transparent" />
              ))}
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={qIndex}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0,  opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="card-comic text-center"
              >
                <div className="text-5xl mb-3">{currentQ.emoji}</div>
                <p className="font-body font-900 text-white text-lg leading-snug">
                  {currentQ.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Answer options */}
            <div className="grid grid-cols-1 gap-2">
              {currentQ.options.map((option, idx) => {
                const { border, bg } = optionStyle(idx)
                const isCorrect  = locked && idx === currentQ.correct
                const isWrong    = locked && idx === chosen && idx !== currentQ.correct

                return (
                  <motion.button
                    key={idx}
                    whileTap={!locked ? { scale: 0.97 } : {}}
                    onClick={() => selectAnswer(idx)}
                    className={`rounded-comic border-2 p-4 text-left font-body font-800 text-base transition-all
                      flex items-center gap-3`}
                    style={{
                      borderColor: border,
                      backgroundColor: bg,
                      boxShadow: '3px 3px 0 #111',
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-comic text-sm flex-shrink-0"
                      style={{ color: border }}
                    >
                      {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-white flex-1">{option}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation after answer */}
            {locked && currentQ.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-comic border-cyan text-center"
                style={{ borderColor: '#22D3EE' }}
              >
                <p className="font-body text-white text-sm">
                  💡 {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* ═══ RESULT ═══ */}
        {phase === 'result' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center gap-5"
          >
            {/* Result character */}
            <div className="animate-bounce-in">
              <ByteCharacter
                emotion={pct >= 0.75 ? 'excited' : pct >= 0.5 ? 'happy' : 'sad'}
                size={130}
              />
            </div>

            {/* Stars */}
            <div className="flex gap-2">
              {[1,2,3].map(s => (
                <motion.span
                  key={s}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: s * 0.2, type: 'spring' }}
                  className="text-5xl"
                  style={{ filter: s <= stars ? 'drop-shadow(0 0 8px #FBBF24)' : 'grayscale(1) opacity(0.3)' }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="font-comic text-gold text-5xl">{score}/{questions.length}</div>
              <div className="font-body font-800 text-white text-lg mt-1">
                {pct === 1 ? '🏆 PERFECT SCORE!' : pct >= 0.75 ? '🎉 Great job!' : pct >= 0.5 ? '👍 Good effort!' : '💪 Keep practicing!'}
              </div>
              <div className="font-comic text-cyan text-2xl mt-2">+{xpEarned} XP!</div>
              {xpEarned > miniGame.xpReward && (
                <div className="font-body text-gold text-sm mt-1">⚡ Bonus XP for perfect score!</div>
              )}
            </div>

            {/* Chapter badge earned */}
            <div className="card-comic text-center w-full">
              <div className="text-3xl mb-1">{chapter.badge.emoji}</div>
              <div className="font-comic text-white text-lg">"{chapter.badge.name}" badge earned!</div>
              <div className="font-body text-purple-light text-sm">{chapter.badge.description}</div>
            </div>

            {/* Continue button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
              className="btn-gold w-full text-2xl py-4"
            >
              BACK TO MAP! 🗺️
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
