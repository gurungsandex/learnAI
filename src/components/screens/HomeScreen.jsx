// HomeScreen.jsx – winding game map with 6 chapter nodes
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { Icon, ComicCard, Halftone, BottomNav } from '../ui/ComicPrimitives'

const CHAPTERS = [
  { id: 1, x: 60,  y: 580, label: 'WHAT IS\nAI?',        state: 'done',    icon: 'star' },
  { id: 2, x: 220, y: 510, label: 'PROMPTS\n101',         state: 'done',    icon: 'star' },
  { id: 3, x: 110, y: 410, label: 'MEET THE\nAGENT',      state: 'current', icon: 'play' },
  { id: 4, x: 240, y: 305, label: 'GIVE IT\nA GOAL',      state: 'locked',  icon: 'lock' },
  { id: 5, x: 90,  y: 210, label: 'TOOLS &\nMEMORY',      state: 'locked',  icon: 'lock' },
  { id: 6, x: 230, y: 115, label: 'BUILD\nYOUR BOT',      state: 'locked',  icon: 'trophy' },
]

function ChapterNode({ c, onClick }) {
  const bg = c.state === 'done' ? S.sun : c.state === 'current' ? S.coral : '#D8D2C9'
  const isCurrent = c.state === 'current'
  const label = c.label.replace('\n', ' ') + (c.state === 'locked' ? ' (locked)' : c.state === 'done' ? ' (completed)' : '')
  return (
    <button
      onClick={onClick}
      disabled={c.state === 'locked'}
      aria-label={label}
      style={{
        position: 'absolute', left: c.x, top: c.y, width: 96, marginLeft: -48,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: c.state === 'locked' ? 'not-allowed' : 'pointer', zIndex: 4,
        background: 'none', border: 'none', padding: 0, fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {isCurrent && (
        <div style={{
          position: 'absolute', top: -20, fontFamily: S.fontComic, fontSize: 12,
          background: '#fff', border: `2px solid ${S.ink}`, padding: '2px 8px',
          borderRadius: 99, boxShadow: `0 2px 0 ${S.ink}`, whiteSpace: 'nowrap',
        }}>
          YOU ARE HERE
        </div>
      )}
      <div
        className={isCurrent ? 'anim-pulse' : ''}
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: bg, border: `3px solid ${S.ink}`,
          boxShadow: `0 5px 0 ${S.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Icon name={c.icon} size={32} color={c.state === 'locked' ? '#fff' : S.ink} />
      </div>
      <div style={{
        marginTop: 6, padding: '3px 10px', borderRadius: 12,
        background: isCurrent ? S.ink : 'rgba(255,255,255,0.85)',
        color: isCurrent ? S.sun : S.ink,
        fontFamily: S.fontDisplay, fontSize: 11, lineHeight: 1.05,
        textAlign: 'center', whiteSpace: 'pre',
        border: `2px solid ${S.ink}`,
      }}>
        {c.label}
      </div>
    </button>
  )
}

export default function HomeScreen() {
  const navigate = useNavigate()

  function handleNav(id) {
    if (id === 'profile') navigate('/profile')
    else if (id === 'builder') navigate('/builder')
  }

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100dvh',
      background: `linear-gradient(180deg, ${S.mint} 0%, #C8E8D8 50%, ${S.cream} 100%)`,
      overflow: 'hidden',
    }}>
      <Halftone color={S.navy} op={0.06} size={6} />

      {/* Hills + clouds */}
      <svg width="100%" height="100%" viewBox="0 0 360 700" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid slice">
        <path d="M-20 240 q60 -40 120 0 q60 40 140 -10 q60 -50 140 0 L420 700 L-20 700 Z" fill={S.blush} opacity="0.45"/>
        <path d="M-20 380 q80 -50 160 0 q80 50 200 -20 q40 -30 80 10 L420 700 L-20 700 Z" fill={S.peach} opacity="0.55"/>
        {/* Cloud 1 */}
        <circle cx="40" cy="120" r="18" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="60" cy="110" r="22" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="80" cy="120" r="16" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="60" cy="130" r="20" fill="#fff" stroke="none"/>
        {/* Cloud 2 */}
        <circle cx="280" cy="60" r="14" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="300" cy="55" r="18" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="320" cy="62" r="14" fill="#fff" stroke={S.ink} strokeWidth="2.5"/>
        <circle cx="300" cy="68" r="14" fill="#fff" stroke="none"/>
      </svg>

      {/* Top HUD */}
      <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
        <ComicCard bg={S.sun} padding="6px 12px" radius={S.rPill} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="bolt" size={18} color={S.coralDeep} />
          <span style={{ fontFamily: S.fontDisplay, fontSize: 16, color: S.ink }}>240 XP</span>
        </ComicCard>
        <ComicCard bg="#fff" padding="6px 12px" radius={S.rPill} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="fire" size={18} color={S.coralDeep} />
          <span style={{ fontFamily: S.fontDisplay, fontSize: 16, color: S.ink }}>5</span>
        </ComicCard>
        <div style={{ flex: 1 }} />
        <button onClick={() => navigate('/profile')} aria-label="View profile" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
          <ComicCard bg={S.peach} padding="6px" radius={S.rPill}>
            <Icon name="profile" size={22} />
          </ComicCard>
        </button>
      </div>

      {/* Winding dashed path */}
      <svg width="100%" height="700" viewBox="0 0 360 700" style={{ position: 'absolute', top: 0, left: 0 }}>
        <path
          d="M90 600 Q160 580 240 540 Q300 510 200 460 Q120 420 130 380 Q150 320 250 290 Q330 260 220 220 Q120 190 110 160 Q120 130 230 100"
          stroke={S.ink} strokeWidth="6" fill="none" strokeDasharray="2 14" strokeLinecap="round"
        />
      </svg>

      {/* Chapter nodes */}
      {CHAPTERS.map(c => (
        <ChapterNode
          key={c.id}
          c={c}
          onClick={() => c.state === 'current' && navigate('/chapter/3')}
        />
      ))}

      {/* Bottom nav */}
      <BottomNav active="home" onNav={handleNav} />
    </div>
  )
}
