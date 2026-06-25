// MiniGameScreen.jsx – "Spot the Goal" quiz
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { Sparky } from '../ui/Characters'
import { ComicButton, ComicCard, Icon, IconButton } from '../ui/ComicPrimitives'

const OPTIONS = [
  { id: 'cleanup',   label: 'Pick up all the socks',  emoji: '🧦', sub: 'A clear, doable goal', good: true  },
  { id: 'happy',     label: 'Make Mira feel happy',   emoji: '😊', sub: "Too fuzzy — agent can't measure it", good: false },
  { id: 'spaghetti', label: 'Become a chef',          emoji: '🍝', sub: 'Way too big', good: false },
]

export default function MiniGameScreen() {
  const navigate = useNavigate()
  const [picked, setPicked] = useState(null)
  const result = picked ? OPTIONS.find(o => o.id === picked) : null

  function sparkExpr() {
    if (!result) return 'thinking'
    return result.good ? 'celebrate' : 'confused'
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.cream, overflow: 'hidden' }}>
      <div style={{ padding: '40px 20px 24px', minHeight: '100dvh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Exit mini-game" onClick={() => navigate('/chapter/3')}>
            <Icon name="x" size={20} />
          </IconButton>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 14, color: S.coralDeep }}>MINI-GAME</div>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 20, color: S.ink, lineHeight: 1.05 }}>SPOT THE GOAL</div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 8, height: 18, borderRadius: 4, background: i < 2 ? S.coral : '#D8D2C9', border: `1.5px solid ${S.ink}` }} />
            ))}
          </div>
        </div>

        {/* Prompt card */}
        <ComicCard bg="#fff" style={{ marginTop: 16 }} padding={14}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Sparky size={64} expression={sparkExpr()} />
            <div style={{ flex: 1, fontFamily: S.fontComic, fontSize: 16, color: S.ink, paddingTop: 8 }}>
              A good agent goal is <b>specific</b> and <b>measurable</b>. Which one fits?
            </div>
          </div>
        </ComicCard>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
          {OPTIONS.map(o => (
            <button
              key={o.id}
              onClick={() => !picked && setPicked(o.id)}
              disabled={!!picked}
              style={{
                background: picked === o.id ? (o.good ? S.grass : '#FFD0CC') : '#fff',
                border: `2.5px solid ${S.ink}`,
                borderRadius: 18, padding: '12px 14px',
                boxShadow: picked === o.id ? `0 2px 0 ${S.ink}` : `0 4px 0 ${S.ink}`,
                transform: picked === o.id ? 'translateY(2px)' : 'none',
                transition: 'all .14s',
                cursor: picked ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', textAlign: 'left', fontFamily: 'inherit',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <div style={{ fontSize: 28 }}>{o.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: S.fontUI, fontWeight: 800, fontSize: 15, color: S.ink }}>{o.label}</div>
                {picked === o.id && (
                  <div style={{ fontFamily: S.fontComic, fontSize: 13, color: S.inkSoft, marginTop: 2 }}>{o.sub}</div>
                )}
              </div>
              {picked === o.id && (
                <div style={{ width: 32, height: 32, borderRadius: 99, background: o.good ? S.ink : S.coralDeep, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={o.good ? 'check' : 'x'} size={20} color="#fff" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Feedback + CTA */}
        {result && (
          <div className="anim-pop">
            <ComicCard bg={result.good ? S.grass : S.peach} style={{ marginBottom: 12 }} padding={12}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ fontSize: 28 }}>{result.good ? '🎉' : '🤔'}</div>
                <div style={{ flex: 1, fontFamily: S.fontComic, fontSize: 15, color: S.ink }}>
                  {result.good
                    ? <><b>Nice!</b> +20 XP. An agent needs a goal it can check off.</>
                    : <>Not quite — try one the agent can <b>measure</b>.</>}
                </div>
              </div>
            </ComicCard>
            <ComicButton
              size="lg"
              bg={result.good ? S.coral : S.mint}
              style={{ width: '100%' }}
              onClick={() => result.good ? navigate('/builder') : setPicked(null)}
            >
              {result.good ? 'NEXT →' : 'TRY AGAIN'}
            </ComicButton>
          </div>
        )}
        {!result && (
          <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.inkSoft, textAlign: 'center' }}>Tap your answer.</div>
        )}
      </div>
    </div>
  )
}
