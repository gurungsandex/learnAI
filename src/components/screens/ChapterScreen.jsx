// ChapterScreen.jsx – data-driven story panels for the chapter at :id
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame } from '../../context/GameContext'
import { getChapter } from '../../data/chapters'
import { Sparky, Bug, KidMira } from '../ui/Characters'
import { SpeechBubble, Icon, IconButton, Halftone } from '../ui/ComicPrimitives'

const BG_COLOR = {
  school: S.cream, street: '#E8DFD0', sky: S.mint,
  lab: S.lilac, space: S.navy, city: S.peach,
}

// Flatten a chapter's panels into one beat per dialogue line (plus a
// narration-only beat for panels that have a caption but no dialogue).
function buildBeats(chapter) {
  const beats = []
  for (const panel of chapter.panels) {
    if (panel.dialogue.length === 0 && panel.caption) {
      beats.push({ caption: panel.caption, bg: panel.bg })
      continue
    }
    for (const line of panel.dialogue) {
      const side = panel.characters?.left?.name === line.speaker ? 'left' : 'right'
      const expr = (side === 'left' ? panel.characters?.left : panel.characters?.right)?.emotion
      beats.push({ who: line.speaker, text: line.text, side, expr, bg: panel.bg })
    }
  }
  return beats
}

function Portrait({ who, expr, size }) {
  if (who === 'byte') return <Sparky size={size} expression={expr || 'happy'} />
  if (who === 'bug') return <Bug size={size * 0.7} expression={expr || 'happy'} />
  return <KidMira size={size * 1.05} expression={expr || 'happy'} />
}

function ChoiceButton({ children, onClick }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      style={{
        background: '#fff', border: `2.5px solid ${S.ink}`,
        borderRadius: 16, padding: '12px 14px', boxShadow: `0 4px 0 ${S.ink}`,
        fontFamily: S.fontUI, fontWeight: 700, fontSize: 15, color: S.ink,
        cursor: 'pointer', textAlign: 'left', width: '100%',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </button>
  )
}

export default function ChapterScreen() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state, isUnlocked } = useGame()
  const chapter = useMemo(() => getChapter(id), [id])
  const beats = useMemo(() => (chapter ? buildBeats(chapter) : []), [chapter])
  const [beatIdx, setBeatIdx] = useState(0)
  const [showChoice, setShowChoice] = useState(false)

  useEffect(() => {
    if (!chapter || !isUnlocked(Number(id))) navigate('/home', { replace: true })
  }, [chapter, id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Marks when the player started this chapter's story, so MiniGameScreen can
  // award the speedrunner badge if the quiz is finished within 3 minutes of it.
  useEffect(() => {
    if (chapter) sessionStorage.setItem(`chapterStart_${chapter.id}`, String(Date.now()))
  }, [chapter])

  if (!chapter || !isUnlocked(Number(id))) return null

  const beat = beats[beatIdx]

  function advance() {
    if (showChoice) return
    if (beatIdx < beats.length - 1) setBeatIdx(beatIdx + 1)
    else setShowChoice(true)
  }

  const speakerColor = beat?.who === 'byte' ? S.navy : S.coralDeep
  const bg = BG_COLOR[beat?.bg] || S.cream

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100dvh', background: bg, overflow: 'hidden' }}
      onClick={advance}
      role={showChoice ? undefined : 'button'}
      tabIndex={showChoice ? undefined : 0}
      aria-label={showChoice ? undefined : 'Tap or press Enter to continue'}
      onKeyDown={(e) => { if (!showChoice && (e.key === 'Enter' || e.key === ' ')) advance() }}
    >
      <Halftone color={S.ink} op={0.05} size={6} />

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
        <IconButton label="Exit chapter" onClick={(e) => { e.stopPropagation(); navigate('/home') }}>
          <Icon name="x" size={20} />
        </IconButton>
        <div style={{ flex: 1, height: 14, background: '#fff', border: `2.5px solid ${S.ink}`, borderRadius: 99, boxShadow: `0 3px 0 ${S.ink}`, overflow: 'hidden' }}>
          <div style={{ width: `${((beatIdx + 1) / beats.length) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${S.coral}, ${S.sun})`, transition: 'width .3s' }} />
        </div>
        <div style={{ background: S.ink, color: S.sun, fontFamily: S.fontDisplay, fontSize: 13, padding: '4px 10px', borderRadius: 99, border: `2px solid ${S.ink}` }}>
          {chapter.id}/8
        </div>
      </div>

      {/* Speaker portrait */}
      {beat?.who && (
        <div style={{ position: 'absolute', bottom: 130, [beat.side === 'left' ? 'left' : 'right']: 8, zIndex: 4 }}>
          <Portrait who={beat.who} expr={beat.expr} size={130} />
        </div>
      )}

      {/* Speech bubble / caption */}
      {!showChoice && beat && (
        <div key={beatIdx} className="anim-pop" style={{ position: 'absolute', bottom: 200, left: 16, right: 16, zIndex: 6 }}>
          {beat.who ? (
            <SpeechBubble bg="#fff" tail={beat.side} fontSize={17}>
              <div style={{ fontFamily: S.fontComic }}>
                <div style={{ fontFamily: S.fontDisplay, fontSize: 12, color: speakerColor, marginBottom: 4, letterSpacing: 0.5 }}>
                  {beat.who.toUpperCase()}
                </div>
                {beat.text}
              </div>
            </SpeechBubble>
          ) : (
            <SpeechBubble bg="#fff" tail="left" fontSize={15}>
              <div style={{ fontFamily: S.fontComic, fontStyle: 'italic', color: S.inkSoft }}>{beat.caption}</div>
            </SpeechBubble>
          )}
        </div>
      )}

      {/* Tap to continue hint */}
      {!showChoice && (
        <div
          className="anim-pulse"
          style={{ position: 'absolute', bottom: 88, right: 16, fontFamily: S.fontComic, fontSize: 13, color: S.ink, background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: 99, border: `2px solid ${S.ink}`, zIndex: 5 }}
        >
          tap to continue ›
        </div>
      )}

      {/* End of story: go to the chapter's knowledge check */}
      {showChoice && (
        <div style={{ position: 'absolute', bottom: 16, left: 12, right: 12, zIndex: 7 }}>
          <div style={{ fontFamily: S.fontDisplay, fontSize: 14, color: S.ink, textAlign: 'center', background: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: 99, border: `2px solid ${S.ink}`, marginBottom: 8, marginLeft: '50%', transform: 'translateX(-50%)' }}>
            Ready for a quick check?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ChoiceButton onClick={() => navigate(`/minigame/${chapter.id}`)}>🧠 Take the quiz</ChoiceButton>
          </div>
        </div>
      )}
    </div>
  )
}
