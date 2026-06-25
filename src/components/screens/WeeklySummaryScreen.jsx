// WeeklySummaryScreen.jsx – last-7-days XP/chapter recap, powered by GameContext's xpLog/chapterLog
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame } from '../../context/GameContext'
import { Sparky } from '../ui/Characters'
import { ComicCard, Icon, IconButton, Halftone } from '../ui/ComicPrimitives'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

// Last 7 calendar days, oldest first, each labeled with a short weekday name.
function last7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default function WeeklySummaryScreen() {
  const navigate = useNavigate()
  const { state } = useGame()

  const days = last7Days()
  const xpByDay = days.map(date => state.xpLog.filter(e => e.date === date).reduce((sum, e) => sum + e.amount, 0))
  const maxXp = Math.max(1, ...xpByDay)
  const totalXp = xpByDay.reduce((a, b) => a + b, 0)
  const chaptersThisWeek = state.chapterLog.filter(e => days.includes(e.date)).length
  const activeDays = xpByDay.filter(v => v > 0).length

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
      <Halftone color={S.coralDeep} op={0.05} size={5} />
      <div style={{ padding: '40px 20px 40px', minHeight: '100dvh', boxSizing: 'border-box' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Back to profile" onClick={() => navigate('/profile')}>
            <Icon name="arrowback" size={20} />
          </IconButton>
          <div style={{ flex: 1, fontFamily: S.fontDisplay, fontSize: 20, color: S.ink }}>THIS WEEK</div>
        </div>

        <ComicCard bg={S.peach} style={{ marginTop: 16 }} padding={16}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Sparky size={64} expression={totalXp > 0 ? 'celebrate' : 'thinking'} />
            <div>
              <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink }}>{totalXp} XP</div>
              <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.inkSoft }}>
                {activeDays === 0 ? "No activity yet this week — let's go!" : `Active ${activeDays} of the last 7 days`}
              </div>
            </div>
          </div>
        </ComicCard>

        {/* Bar chart */}
        <ComicCard bg="#fff" style={{ marginTop: 14 }} padding={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 110, gap: 8 }}>
            {days.map((date, i) => {
              const isToday = date === todayStr()
              const h = Math.round((xpByDay[i] / maxXp) * 80)
              return (
                <div key={date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: '100%', maxWidth: 26, height: Math.max(h, 4),
                    background: xpByDay[i] > 0 ? S.coral : '#EDE5D8',
                    border: `2px solid ${S.ink}`, borderRadius: 6,
                  }} />
                  <div style={{
                    fontFamily: S.fontUI, fontWeight: 800, fontSize: 10,
                    color: isToday ? S.coralDeep : S.inkSoft,
                  }}>
                    {WEEKDAY[new Date(date).getDay()]}
                  </div>
                </div>
              )
            })}
          </div>
        </ComicCard>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
          <ComicCard bg={S.sun} padding={14}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>📖</div>
              <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink }}>{chaptersThisWeek}</div>
              <div style={{ fontFamily: S.fontComic, fontSize: 12, color: S.inkSoft }}>Chapters this week</div>
            </div>
          </ComicCard>
          <ComicCard bg={S.mint} padding={14}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>🔥</div>
              <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink }}>{state.streakCount}</div>
              <div style={{ fontFamily: S.fontComic, fontSize: 12, color: S.inkSoft }}>Day streak</div>
            </div>
          </ComicCard>
        </div>
      </div>
    </div>
  )
}
