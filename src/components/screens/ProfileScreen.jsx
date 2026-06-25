// ProfileScreen.jsx – YOUR JOURNEY (progress + badges)
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame, getLevel, xpToNextLevel } from '../../context/GameContext'
import { ALL_BADGES } from '../../data/badges'
import { ComicButton, ComicCard, Icon, IconButton, Halftone, BottomNav } from '../ui/ComicPrimitives'

function Pill({ icon, label, bg }) {
  return (
    <div style={{ background: bg, border: `2px solid ${S.ink}`, borderRadius: 99, padding: '2px 8px', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon name={icon} size={13} color={S.coralDeep} />
      <span style={{ fontFamily: S.fontDisplay, fontSize: 11, color: S.ink }}>{label}</span>
    </div>
  )
}

function StatBox({ emoji, value, label }) {
  return (
    <ComicCard bg="#fff" padding={10} radius={14}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 22 }}>{emoji}</div>
        <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink, lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: S.fontComic, fontSize: 12, color: S.inkSoft }}>{label}</div>
      </div>
    </ComicCard>
  )
}

export default function ProfileScreen() {
  const navigate = useNavigate()
  const { state } = useGame()

  function handleNav(id) {
    if (id === 'home') navigate('/home')
    else if (id === 'builder') navigate('/builder')
  }

  const level = getLevel(state.xp)
  const { current, needed, pct } = xpToNextLevel(state.xp)
  const totalStars = Object.values(state.chapterStars).reduce((a, b) => a + b, 0)
  const badgeRows = ALL_BADGES.map(b => ({ ...b, got: state.badges.includes(b.id) }))

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
      <Halftone color={S.coralDeep} op={0.05} size={5} />
      <div style={{ padding: '40px 20px 100px', minHeight: '100dvh', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Back to home" onClick={() => navigate('/home')}>
            <Icon name="arrowback" size={20} />
          </IconButton>
          <div style={{ flex: 1, fontFamily: S.fontDisplay, fontSize: 22, color: S.ink }}>YOUR JOURNEY</div>
          <IconButton label="Settings">
            <Icon name="gear" size={18} />
          </IconButton>
        </div>

        {/* Avatar card */}
        <ComicCard bg={S.peach} style={{ marginTop: 16 }} padding={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 76, height: 76, borderRadius: 99, background: state.avatarColor || '#fff', border: `3px solid ${S.ink}`, boxShadow: `0 3px 0 ${S.ink}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 36 }}>
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: S.fontDisplay, fontSize: 20, color: S.ink, lineHeight: 1 }}>{state.playerName || 'EXPLORER'}</div>
              <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.inkSoft }}>{level.title}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <Pill icon="bolt" label={`${state.xp} XP`} bg={S.sun} />
                <Pill icon="fire" label={`${state.streakCount} day streak`} bg="#fff" />
              </div>
            </div>
          </div>

          {/* Level bar */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: S.fontDisplay, fontSize: 12, color: S.ink, marginBottom: 4 }}>
              <span>LV {level.level}</span><span>{current} / {needed}</span>
            </div>
            <div style={{ height: 16, background: '#fff', border: `2.5px solid ${S.ink}`, borderRadius: 99, overflow: 'hidden', boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.08)' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${S.coral}, ${S.sun})` }} />
            </div>
          </div>
        </ComicCard>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
          <StatBox emoji="📖" value={state.completedChapters.length} label="Chapters" />
          <StatBox emoji="⭐" value={totalStars} label="Stars" />
          <StatBox emoji="🤖" value={state.agentBlocks.length > 0 ? 1 : 0} label="Bots built" />
        </div>

        {/* Badges */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontFamily: S.fontDisplay, fontSize: 18, color: S.ink, marginBottom: 10 }}>BADGES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {badgeRows.map(b => (
              <div
                key={b.id}
                style={{
                  background: b.got ? S.sun : '#D8D2C9', border: `2.5px solid ${S.ink}`, borderRadius: 16,
                  boxShadow: `0 4px 0 ${S.ink}`, padding: '12px 8px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  opacity: b.got ? 1 : 0.6, position: 'relative',
                }}
              >
                <div style={{ fontSize: 30, filter: b.got ? 'none' : 'grayscale(0.6)' }}>{b.emoji}</div>
                <div style={{ fontFamily: S.fontUI, fontWeight: 800, fontSize: 11, textAlign: 'center', color: S.ink }}>{b.name}</div>
                {!b.got && (
                  <div style={{ position: 'absolute', top: 4, right: 4 }}>
                    <Icon name="lock" size={14} color={S.inkSoft} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {state.hasCompletedGame && (
          <div style={{ marginTop: 18 }}>
            <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} onClick={() => navigate('/certificate')}>
              🏆 SEE MY CERTIFICATE
            </ComicButton>
          </div>
        )}
      </div>

      <BottomNav active="profile" onNav={handleNav} />
    </div>
  )
}
