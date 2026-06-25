// CertificateScreen.jsx – celebration + certificate card, shown after all 8 chapters
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame, getLevel } from '../../context/GameContext'
import { Sparky } from '../ui/Characters'
import { ComicButton, Icon, IconButton, Halftone } from '../ui/ComicPrimitives'

const CONFETTI_COLORS = [S.sun, S.mint, S.lilac, '#fff']

export default function CertificateScreen() {
  const navigate = useNavigate()
  const { state } = useGame()
  const level = getLevel(state.xp)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden', background: `radial-gradient(circle at 50% 30%, ${S.sun} 0%, ${S.coral} 60%, ${S.coralDeep} 100%)` }}>
      <Halftone color="#fff" op={0.18} size={5} />

      {/* Sun rays */}
      <svg width="100%" height="100%" viewBox="0 0 360 780" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, opacity: 0.45 }}>
        <g transform="translate(180 280)">
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={i} d="M0 -400 L40 0 L-40 0 Z" fill="#fff" opacity="0.25" transform={`rotate(${i * 20})`} />
          ))}
        </g>
      </svg>

      {/* Confetti */}
      <svg width="100%" height="100%" viewBox="0 0 360 780" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const x = (i * 47) % 360, y = (i * 113) % 700
          const rot = (i * 37) % 360
          return <rect key={i} x={x} y={y} width="6" height="14" rx="1" fill={CONFETTI_COLORS[i % 4]} transform={`rotate(${rot} ${x + 3} ${y + 7})`} />
        })}
      </svg>

      {/* Close */}
      <div style={{ position: 'absolute', top: 30, left: 16, zIndex: 10 }}>
        <IconButton label="Close certificate" onClick={() => navigate('/profile')}>
          <Icon name="x" size={20} />
        </IconButton>
      </div>

      {/* Chapter complete pill */}
      <div style={{ position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 4 }}>
        <div style={{ fontFamily: S.fontDisplay, fontSize: 18, color: S.ink, background: '#fff', display: 'inline-block', padding: '4px 14px', borderRadius: 99, border: `2.5px solid ${S.ink}`, boxShadow: `0 3px 0 ${S.ink}` }}>
          🎉 ALL 8 CHAPTERS COMPLETE
        </div>
      </div>

      {/* Sparky */}
      <div className="anim-bob" style={{ position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}>
        <Sparky size={140} expression="celebrate" />
      </div>

      {/* Certificate card */}
      <div style={{ position: 'absolute', top: 270, left: 18, right: 18, zIndex: 4 }}>
        <div style={{ background: S.paper, border: `3.5px solid ${S.ink}`, borderRadius: 18, padding: 18, boxShadow: `0 6px 0 ${S.ink}`, position: 'relative' }}>
          <span style={{ position: 'absolute', top: 8, left: 14 }}><Icon name="star" size={18} color={S.sun} /></span>
          <span style={{ position: 'absolute', top: 8, right: 14 }}><Icon name="star" size={18} color={S.sun} /></span>

          <div style={{ textAlign: 'center', fontFamily: S.fontComic, fontSize: 12, color: S.inkSoft, letterSpacing: 2 }}>OFFICIAL · CERTIFICATE · OF · AGENT-OLOGY</div>
          <div style={{ marginTop: 10, fontFamily: S.fontDisplay, fontSize: 26, color: S.coralDeep, textAlign: 'center', lineHeight: 1.05 }}>{state.playerName || 'EXPLORER'}</div>
          <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.ink, textAlign: 'center', marginTop: 4 }}>has officially leveled up to</div>
          <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink, textAlign: 'center', lineHeight: 1.05, marginTop: 4 }}>{level.title.toUpperCase()}</div>
          <div style={{ fontFamily: S.fontComic, fontSize: 13, color: S.inkSoft, textAlign: 'center', marginTop: 10, lineHeight: 1.3 }}>
            For completing all 8 chapters, earning {state.badges.length} badges, and proving that <i>goal → look → think → act</i> beats yelling at the floor.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14 }}>
            <div>
              <div style={{ borderBottom: `2px solid ${S.ink}`, width: 80, marginBottom: 2 }}>
                <span style={{ fontFamily: S.fontSig, fontSize: 18, color: S.navy }}>Sparky</span>
              </div>
              <div style={{ fontFamily: S.fontComic, fontSize: 10, color: S.inkSoft }}>Robot Headmaster</div>
            </div>
            {/* Wax seal */}
            <svg width="64" height="64" viewBox="0 0 64 64">
              <g transform="translate(32 32)">
                {Array.from({ length: 12 }).map((_, i) => (
                  <path key={i} d="M0 -28 L6 -22 L-6 -22 Z" fill={S.coralDeep} stroke={S.ink} strokeWidth="1.5" transform={`rotate(${i * 30})`} />
                ))}
                <circle r="22" fill={S.coral} stroke={S.ink} strokeWidth="2.5" />
                <text fontFamily="Bowlby One SC" fontSize="11" textAnchor="middle" y="-2" fill="#fff">LV</text>
                <text fontFamily="Bowlby One SC" fontSize="14" textAnchor="middle" y="11" fill="#fff">{level.level}</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ position: 'absolute', bottom: 24, left: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 5 }}>
        <ComicButton size="lg" bg={S.ink} color="#fff" style={{ width: '100%' }} onClick={() => navigate('/home')}>
          <Icon name="share" size={18} color="#fff" /> SHARE WITH A FRIEND
        </ComicButton>
        <div style={{ display: 'flex', gap: 10 }}>
          <ComicButton size="md" bg="#fff" color={S.ink} style={{ flex: 1 }} onClick={() => navigate('/home')}>
            <Icon name="download" size={16} /> DOWNLOAD
          </ComicButton>
          <ComicButton size="md" bg={S.sun} color={S.ink} style={{ flex: 1 }} onClick={() => navigate('/home')}>
            BACK TO MAP →
          </ComicButton>
        </div>
      </div>
    </div>
  )
}
