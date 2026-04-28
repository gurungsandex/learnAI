// OnboardingScreen.jsx – 2-step Sparky welcome + mode pick
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext'
import { S } from '../../tokens'
import { Sparky } from '../ui/Characters'
import { ComicButton, Icon, Halftone } from '../ui/ComicPrimitives'

function ModeCard({ icon, title, sub, color, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', borderRadius: 18, cursor: 'pointer',
        background: active ? color : '#fff',
        border: `2.5px solid ${S.ink}`,
        boxShadow: active ? `0 6px 0 ${S.ink}` : `0 4px 0 ${S.ink}`,
        transform: active ? 'translateY(-2px)' : 'none',
        transition: 'all .12s',
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: `2.5px solid ${S.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: S.fontDisplay, fontSize: 18, color: S.ink, letterSpacing: 0.5 }}>{title}</div>
        <div style={{ fontFamily: S.fontComic, fontSize: 15, color: S.inkSoft }}>{sub}</div>
      </div>
      {active && (
        <div style={{ width: 28, height: 28, borderRadius: 99, background: S.ink, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={18} color={S.sun} />
        </div>
      )}
    </div>
  )
}

export default function OnboardingScreen() {
  const navigate = useNavigate()
  const { setPlayer } = useGame()
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState(null)

  function finish() {
    setPlayer('FOX_42', '#FFB4A2')
    navigate('/home', { replace: true })
  }

  // ── Step 0: Welcome ──────────────────────────────────────────
  if (step === 0) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
        <Halftone color={S.coralDeep} op={0.05} size={5} />
        <div style={{ padding: '40px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh', boxSizing: 'border-box' }}>
          {/* Skip */}
          <div
            style={{ alignSelf: 'flex-end', fontFamily: S.fontUI, fontWeight: 700, color: S.inkSoft, fontSize: 14, cursor: 'pointer' }}
            onClick={finish}
          >
            Skip
          </div>

          {/* Sun-burst + Sparky */}
          <div style={{ position: 'relative', marginTop: 16 }}>
            <svg width="280" height="280" style={{ position: 'absolute', top: -30, left: -50 }}>
              <g transform="translate(140 140)">
                {Array.from({ length: 12 }).map((_, i) => (
                  <path key={i} d="M0 -130 L18 -90 L-18 -90 Z" fill={S.sun} stroke={S.ink} strokeWidth="2.5" transform={`rotate(${i * 30})`} />
                ))}
                <circle r="100" fill={S.cream} stroke={S.ink} strokeWidth="3" />
              </g>
            </svg>
            <div style={{ position: 'relative', zIndex: 2 }} className="anim-bob">
              <Sparky size={210} expression="excited" />
            </div>
          </div>

          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 36, color: S.ink, letterSpacing: 1, lineHeight: 1 }}>HEY, IT'S SPARKY!</div>
            <div style={{ fontFamily: S.fontComic, fontSize: 19, color: S.inkSoft, marginTop: 12, lineHeight: 1.3 }}>
              I'm a robot who's bad at math but great at making friends. Wanna learn about AI together?
            </div>
          </div>

          <div style={{ flex: 1 }} />
          <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} onClick={() => setStep(1)}>
            LET'S GO →
          </ComicButton>
        </div>
      </div>
    )
  }

  // ── Step 1: Choose mode ──────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
      <Halftone color={S.coralDeep} op={0.05} size={5} />
      <div style={{ padding: '40px 24px 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh', boxSizing: 'border-box' }}>
        {/* Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setStep(0)}>
          <Icon name="arrowback" size={22} />
          <span style={{ fontFamily: S.fontUI, fontWeight: 800, color: S.ink }}>Back</span>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 10 }}>
          <div style={{ width: 28, height: 6, borderRadius: 99, background: S.lock }} />
          <div style={{ width: 28, height: 6, borderRadius: 99, background: S.coral, border: `1.5px solid ${S.ink}` }} />
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Sparky size={120} expression="thinking" />
          <div style={{ fontFamily: S.fontDisplay, fontSize: 26, lineHeight: 1.05, marginTop: 6, color: S.ink }}>HOW DO YOU LIKE TO LEARN?</div>
          <div style={{ fontFamily: S.fontComic, fontSize: 16, color: S.inkSoft, marginTop: 6 }}>You can change this anytime.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
          <ModeCard
            active={mode === 'read'} icon="text" title="Read & Tap"
            sub="Speech bubbles + comic panels" color={S.mint}
            onClick={() => setMode('read')}
          />
          <ModeCard
            active={mode === 'voice'} icon="mic" title="Listen & Watch"
            sub="Sparky reads everything aloud" color={S.peach}
            onClick={() => setMode('voice')}
          />
        </div>

        <div style={{ flex: 1 }} />
        <ComicButton size="lg" bg={mode ? S.coral : '#D8D2C9'} disabled={!mode} style={{ width: '100%' }} onClick={finish}>
          START THE STORY →
        </ComicButton>
      </div>
    </div>
  )
}
