// MiniGameScreen.jsx – knowledge-check quiz for the chapter at :id
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame } from '../../context/GameContext'
import { getChapter } from '../../data/chapters'
import { Sparky } from '../ui/Characters'
import { ComicButton, ComicCard, Icon, IconButton } from '../ui/ComicPrimitives'

export default function MiniGameScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isUnlocked, completeChapter, completeMiniGame, addXP, earnBadge } = useGame()
  const chapter = useMemo(() => getChapter(id), [id])
  const questions = chapter?.miniGame?.questions ?? []

  const [qIdx, setQIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!chapter || !isUnlocked(Number(id))) navigate('/home', { replace: true })
  }, [chapter, id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!chapter || !isUnlocked(Number(id))) return null

  const q = questions[qIdx]
  const isCorrect = picked !== null && picked === q.correct

  function pick(i) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.correct) setCorrectCount(c => c + 1)
  }

  function next() {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1)
      setPicked(null)
      return
    }
    const ratio = correctCount / questions.length
    const stars = ratio === 1 ? 3 : ratio >= 0.5 ? 2 : 1
    completeChapter(chapter.id, stars)
    completeMiniGame(chapter.id)
    addXP(chapter.xpReward + (chapter.miniGame.xpReward ?? 0))
    earnBadge(chapter.badge.id)
    if (ratio === 1) earnBadge('perfectionist')
    setFinished(true)
  }

  function finish() {
    if (chapter.id >= 8) navigate('/certificate')
    else navigate('/home')
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.cream, overflow: 'hidden' }}>
      <div style={{ padding: '40px 20px 24px', minHeight: '100dvh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Exit quiz" onClick={() => navigate(`/chapter/${chapter.id}`)}>
            <Icon name="x" size={20} />
          </IconButton>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 14, color: S.coralDeep }}>{chapter.miniGame.title?.toUpperCase() ?? 'QUIZ'}</div>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 20, color: S.ink, lineHeight: 1.05 }}>{chapter.subtitle}</div>
          </div>
          {!finished && (
            <div style={{ display: 'flex', gap: 4 }}>
              {questions.map((_, i) => (
                <div key={i} style={{ width: 8, height: 18, borderRadius: 4, background: i < qIdx ? S.coral : i === qIdx ? S.sun : '#D8D2C9', border: `1.5px solid ${S.ink}` }} />
              ))}
            </div>
          )}
        </div>

        {!finished ? (
          <>
            {/* Prompt card */}
            <ComicCard bg="#fff" style={{ marginTop: 16 }} padding={14}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Sparky size={64} expression={picked === null ? 'thinking' : isCorrect ? 'celebrate' : 'confused'} />
                <div style={{ flex: 1, fontFamily: S.fontComic, fontSize: 16, color: S.ink, paddingTop: 8 }}>
                  <span style={{ fontSize: 20, marginRight: 6 }}>{q.emoji}</span>{q.text}
                </div>
              </div>
            </ComicCard>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              {q.options.map((opt, i) => {
                const isPicked = picked === i
                const showGood = picked !== null && i === q.correct
                const showBad = isPicked && i !== q.correct
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                    style={{
                      background: showGood ? S.grass : showBad ? '#FFD0CC' : '#fff',
                      border: `2.5px solid ${S.ink}`,
                      borderRadius: 18, padding: '12px 14px',
                      boxShadow: isPicked ? `0 2px 0 ${S.ink}` : `0 4px 0 ${S.ink}`,
                      transform: isPicked ? 'translateY(2px)' : 'none',
                      transition: 'all .14s',
                      cursor: picked !== null ? 'default' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: 12,
                      width: '100%', textAlign: 'left', fontFamily: 'inherit',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    <div style={{ flex: 1, fontFamily: S.fontUI, fontWeight: 800, fontSize: 15, color: S.ink }}>{opt}</div>
                    {(showGood || showBad) && (
                      <div style={{ width: 32, height: 32, borderRadius: 99, background: showGood ? S.ink : S.coralDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={showGood ? 'check' : 'x'} size={20} color="#fff" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div style={{ flex: 1 }} />

            {picked !== null ? (
              <div className="anim-pop">
                <ComicCard bg={isCorrect ? S.grass : S.peach} style={{ marginBottom: 12 }} padding={12}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 28 }}>{isCorrect ? '🎉' : '🤔'}</div>
                    <div style={{ flex: 1, fontFamily: S.fontComic, fontSize: 15, color: S.ink }}>{q.explanation}</div>
                  </div>
                </ComicCard>
                <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} onClick={next}>
                  {qIdx < questions.length - 1 ? 'NEXT →' : 'FINISH'}
                </ComicButton>
              </div>
            ) : (
              <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.inkSoft, textAlign: 'center' }}>Tap your answer.</div>
            )}
          </>
        ) : (
          <div className="anim-pop" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
            <Sparky size={100} expression="celebrate" />
            <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink }}>
              {correctCount}/{questions.length} correct!
            </div>
            <ComicCard bg={S.sun} padding={14}>
              <div style={{ fontFamily: S.fontComic, fontSize: 15, color: S.ink }}>
                <span style={{ fontSize: 22, marginRight: 6 }}>{chapter.badge.emoji}</span>
                Earned the <b>{chapter.badge.name}</b> badge! +{chapter.xpReward + (chapter.miniGame.xpReward ?? 0)} XP
              </div>
            </ComicCard>
            <ComicButton size="lg" bg={S.coral} onClick={finish}>
              {chapter.id >= 8 ? 'SEE MY CERTIFICATE →' : 'BACK TO MAP →'}
            </ComicButton>
          </div>
        )}
      </div>
    </div>
  )
}
