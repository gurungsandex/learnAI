// ChapterScreen.jsx – 4-beat story + goal choice block
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { Sparky, Bug, KidMira } from '../ui/Characters'
import { SpeechBubble, Icon } from '../ui/ComicPrimitives'

const BEATS = [
  { who: 'sparky', expr: 'excited', text: "Meet Mira. Her bedroom is a DISASTER. We're gonna build a tiny robot brain — an AGENT — to help her clean it up.", side: 'left' },
  { who: 'mira',   expr: 'confused', text: "Wait. A robot can just… do my chores?", side: 'right' },
  { who: 'sparky', expr: 'happy',   text: "Not exactly. An AGENT is a program with a GOAL. It looks, thinks, then acts. Over and over.", side: 'left' },
  { who: 'bug',    expr: 'thinking', text: "Goal → Look → Think → Act. That's the loop, kid.", side: 'right' },
]

function BedroomScene() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 360 780" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
      <rect width="360" height="500" fill="#FFE0C2"/>
      <g opacity="0.4">
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={(i * 53) % 360} cy={(i * 71) % 500} r="3" fill={S.coral} />
        ))}
      </g>
      <path d="M0 500 L360 500 L360 780 L0 780 Z" fill="#D9A87A"/>
      <path d="M0 500 L360 500 L360 530 L0 530 Z" fill="#B7855A"/>
      {/* window */}
      <rect x="32" y="80" width="100" height="120" fill={S.mint} stroke={S.ink} strokeWidth="3"/>
      <path d="M82 80 v120 M32 140 h100" stroke={S.ink} strokeWidth="3"/>
      <rect x="22" y="74" width="120" height="14" fill={S.coralDeep} stroke={S.ink} strokeWidth="3"/>
      {/* poster */}
      <rect x="200" y="100" width="100" height="80" fill="#fff" stroke={S.ink} strokeWidth="3" transform="rotate(-3 250 140)"/>
      <text x="250" y="135" fontFamily="Bowlby One SC, system-ui" fontSize="14" fill={S.coralDeep} textAnchor="middle" transform="rotate(-3 250 140)">AI RULES</text>
      <circle cx="250" cy="155" r="14" fill={S.sun} stroke={S.ink} strokeWidth="2.5" transform="rotate(-3 250 140)"/>
      {/* bed */}
      <rect x="180" y="340" width="170" height="100" fill={S.coral} stroke={S.ink} strokeWidth="3" rx="6"/>
      <rect x="180" y="340" width="170" height="30" fill={S.coralDeep} stroke={S.ink} strokeWidth="3" rx="6"/>
      <rect x="195" y="320" width="50" height="30" fill="#fff" stroke={S.ink} strokeWidth="3" rx="8"/>
      {/* floor clutter */}
      <path d="M40 600 q-4 -16 18 -18 q22 -2 22 14 q0 16 -16 18 q-22 4 -24 -14z" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
      <path d="M50 600 h22" stroke={S.coral} strokeWidth="3"/>
      <rect x="100" y="620" width="50" height="14" fill={S.mint} stroke={S.ink} strokeWidth="2.5" transform="rotate(-8 125 627)"/>
      <circle cx="280" cy="640" r="22" fill={S.sun} stroke={S.ink} strokeWidth="2.5"/>
      <path d="M280 618 q-12 8 -8 22 M280 618 q12 8 8 22" stroke={S.ink} strokeWidth="2" fill="none"/>
      <path d="M40 700 l16 -10 l8 6 l16 -6 l10 14 l-12 8 l-12 -4 l-14 4 z" fill={S.lilac} stroke={S.ink} strokeWidth="2.5"/>
      <rect x="200" y="700" width="30" height="30" rx="3" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
      <path d="M230 708 q12 0 12 8 q0 8 -12 8" fill="none" stroke={S.ink} strokeWidth="2.5"/>
    </svg>
  )
}

function ChoiceButton({ children, onClick }) {
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClick() }}
      style={{
        background: '#fff', border: `2.5px solid ${S.ink}`,
        borderRadius: 16, padding: '12px 14px', boxShadow: `0 4px 0 ${S.ink}`,
        fontFamily: S.fontUI, fontWeight: 700, fontSize: 15, color: S.ink,
        cursor: 'pointer', textAlign: 'left',
      }}
    >
      {children}
    </div>
  )
}

export default function ChapterScreen() {
  const navigate = useNavigate()
  const [beatIdx, setBeatIdx] = useState(0)
  const [showChoice, setShowChoice] = useState(false)
  const beat = BEATS[beatIdx]

  function advance() {
    if (showChoice) return
    if (beatIdx < BEATS.length - 1) setBeatIdx(beatIdx + 1)
    else setShowChoice(true)
  }

  const speakerColor = beat.who === 'sparky' ? S.navy : S.coralDeep

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100dvh', background: '#FFEAD6', overflow: 'hidden' }}
      onClick={advance}
    >
      <BedroomScene />

      {/* Top bar */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
        <div
          onClick={(e) => { e.stopPropagation(); navigate('/home') }}
          style={{ width: 36, height: 36, borderRadius: 12, background: '#fff', border: `2.5px solid ${S.ink}`, boxShadow: `0 3px 0 ${S.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Icon name="x" size={20} />
        </div>
        <div style={{ flex: 1, height: 14, background: '#fff', border: `2.5px solid ${S.ink}`, borderRadius: 99, boxShadow: `0 3px 0 ${S.ink}`, overflow: 'hidden' }}>
          <div style={{ width: `${(beatIdx + 1) / BEATS.length * 100}%`, height: '100%', background: `linear-gradient(90deg, ${S.coral}, ${S.sun})`, transition: 'width .3s' }} />
        </div>
        <div style={{ background: S.ink, color: S.sun, fontFamily: S.fontDisplay, fontSize: 13, padding: '4px 10px', borderRadius: 99, border: `2px solid ${S.ink}` }}>3/12</div>
      </div>

      {/* Speaker portrait */}
      <div style={{ position: 'absolute', bottom: 130, [beat.side === 'left' ? 'left' : 'right']: 8, zIndex: 4 }}>
        {beat.who === 'sparky' && <Sparky size={130} expression={beat.expr} />}
        {beat.who === 'bug'    && <Bug size={90} expression={beat.expr} />}
        {beat.who === 'mira'   && <KidMira size={140} expression={beat.expr} />}
      </div>

      {/* Speech bubble */}
      {!showChoice && (
        <div
          key={beatIdx}
          className="anim-pop"
          style={{ position: 'absolute', bottom: 200, left: 16, right: 16, zIndex: 6 }}
        >
          <SpeechBubble bg="#fff" tail={beat.side} fontSize={17}>
            <div style={{ fontFamily: S.fontComic }}>
              <div style={{ fontFamily: S.fontDisplay, fontSize: 12, color: speakerColor, marginBottom: 4, letterSpacing: 0.5 }}>
                {beat.who.toUpperCase()}
              </div>
              {beat.text}
            </div>
          </SpeechBubble>
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

      {/* Choice block */}
      {showChoice && (
        <div style={{ position: 'absolute', bottom: 16, left: 12, right: 12, zIndex: 7 }}>
          <div style={{ fontFamily: S.fontDisplay, fontSize: 14, color: S.ink, textAlign: 'center', background: '#fff', display: 'inline-block', padding: '4px 12px', borderRadius: 99, border: `2px solid ${S.ink}`, marginBottom: 8, marginLeft: '50%', transform: 'translateX(-50%)' }}>
            What's Mira's goal?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ChoiceButton onClick={() => navigate('/minigame/3')}>🧦 Pick up everything off the floor</ChoiceButton>
            <ChoiceButton onClick={() => navigate('/minigame/3')}>🎮 Order pizza for dinner</ChoiceButton>
          </div>
        </div>
      )}
    </div>
  )
}
