// AIBuilderScreen.jsx – IF/THEN agent builder (Tidy-Bot 3000)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { S } from '../../tokens'
import { useGame } from '../../context/GameContext'
import { Sparky } from '../ui/Characters'
import { ComicButton, ComicCard, Icon, IconButton } from '../ui/ComicPrimitives'

const MAX_RULES = 5 // matches the 'Builder Pro' badge requirement (5+ rules)

const IF_OPTIONS = [
  { id: 'sock',  label: 'I see a sock',  emoji: '🧦' },
  { id: 'book',  label: 'I see a book',  emoji: '📕' },
  { id: 'toy',   label: 'I see a toy',   emoji: '🧸' },
  { id: 'trash', label: 'I see trash',   emoji: '🗑' },
]

const THEN_OPTIONS = [
  { id: 'pickup', label: 'pick it up',    emoji: '✋' },
  { id: 'basket', label: 'put in basket', emoji: '🧺' },
  { id: 'shelf',  label: 'put on shelf',  emoji: '📚' },
  { id: 'ignore', label: 'ignore it',     emoji: '😴' },
]

function BlockRow({ keyword, kwBg, options, value, onChange, highlight }) {
  const [open, setOpen] = useState(false)
  const cur = options.find(o => o.id === value) || options[0]
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ background: kwBg, color: '#fff', fontFamily: S.fontDisplay, fontSize: 14, padding: '6px 10px', borderRadius: 10, border: `2px solid ${S.ink}`, letterSpacing: 0.5, minWidth: 56, textAlign: 'center' }}>
        {keyword}
      </div>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{ flex: 1, background: highlight ? S.cream : '#F7F4EE', border: `2px solid ${S.ink}`, borderRadius: 12, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'inherit', WebkitTapHighlightColor: 'transparent' }}
      >
        <div style={{ fontSize: 22 }}>{cur.emoji}</div>
        <div style={{ flex: 1, fontFamily: S.fontUI, fontWeight: 700, fontSize: 14, color: S.ink, textAlign: 'left' }}>{cur.label}</div>
        <Icon name="arrow" size={16} color={S.inkSoft} />
      </button>
      {open && (
        <div role="listbox" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, zIndex: 10, background: '#fff', border: `2.5px solid ${S.ink}`, borderRadius: 14, boxShadow: `0 5px 0 ${S.ink}`, padding: 6, minWidth: 180 }}>
          {options.map(o => (
            <button
              key={o.id}
              role="option"
              aria-selected={o.id === value}
              onClick={() => { onChange(o.id); setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 8, cursor: 'pointer', background: o.id === value ? S.cream : 'transparent', width: '100%', textAlign: 'left', fontFamily: 'inherit', border: 'none' }}
            >
              <div style={{ fontSize: 20 }}>{o.emoji}</div>
              <div style={{ fontFamily: S.fontUI, fontWeight: 700, fontSize: 14, color: S.ink }}>{o.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function RuleCard({ idx, rule, onChange, onRemove, running }) {
  return (
    <div style={{ position: 'relative' }}>
      {onRemove && (
        <IconButton
          label={`Remove rule ${idx + 1}`}
          onClick={onRemove}
          size={26}
          style={{ position: 'absolute', top: -8, right: -6, borderRadius: 99, boxShadow: `0 2px 0 ${S.ink}`, zIndex: 2, border: `2px solid ${S.ink}` }}
        >
          <Icon name="x" size={14} />
        </IconButton>
      )}
      <ComicCard bg="#fff" padding={12}>
        <BlockRow keyword="IF" kwBg={S.coral} options={IF_OPTIONS} value={rule.ifBlock} onChange={(v) => onChange(idx, 'ifBlock', v)} highlight={running} />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
          <Icon name="arrow" size={20} color={S.inkSoft} />
        </div>
        <BlockRow keyword="THEN" kwBg={S.mintDeep} options={THEN_OPTIONS} value={rule.thenBlock} onChange={(v) => onChange(idx, 'thenBlock', v)} highlight={running} />
      </ComicCard>
    </div>
  )
}

export default function AIBuilderScreen() {
  const navigate = useNavigate()
  const { setAgentBlocks, earnBadge } = useGame()
  const [program, setProgram] = useState([{ ifBlock: 'sock', thenBlock: 'pickup' }])
  const [running, setRunning] = useState(false)

  function updateRule(idx, key, value) {
    setProgram(p => p.map((r, i) => i === idx ? { ...r, [key]: value } : r))
  }
  function addRule() {
    if (program.length < MAX_RULES) setProgram([...program, { ifBlock: 'book', thenBlock: 'shelf' }])
  }
  function removeRule(idx) {
    setProgram(p => p.filter((_, i) => i !== idx))
  }
  function run() {
    setAgentBlocks(program)
    if (program.length >= 5) earnBadge('builder_pro')
    setRunning(true)
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: '#F0F4FF', overflow: 'hidden' }}>
      <div style={{ padding: '40px 16px 100px', minHeight: '100dvh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Back to home" onClick={() => navigate('/home')}>
            <Icon name="arrowback" size={20} />
          </IconButton>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 13, color: S.navy }}>AGENT BUILDER</div>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 22, color: S.ink, lineHeight: 1 }}>TIDY-BOT 3000</div>
          </div>
          <div style={{ width: 60, height: 60 }}>
            <Sparky size={60} expression={running ? 'celebrate' : 'happy'} />
          </div>
        </div>

        {/* Goal pill */}
        <div style={{ marginTop: 14, alignSelf: 'flex-start' }}>
          <ComicCard bg={S.sun} padding="6px 12px" radius={S.rPill} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: S.fontDisplay, fontSize: 12 }}>GOAL</span>
            <span style={{ fontFamily: S.fontComic, fontSize: 14 }}>Clean Mira's floor</span>
          </ComicCard>
        </div>

        {/* Rule cards */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {program.map((rule, idx) => (
            <RuleCard
              key={idx} idx={idx} rule={rule}
              onChange={updateRule}
              onRemove={program.length > 1 ? () => removeRule(idx) : null}
              running={running}
            />
          ))}
          {program.length < MAX_RULES && (
            <button
              onClick={addRule}
              style={{ border: `2.5px dashed ${S.ink}`, borderRadius: 18, padding: '14px', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: S.fontUI, fontWeight: 800, color: S.ink, cursor: 'pointer', width: '100%', WebkitTapHighlightColor: 'transparent' }}
            >
              <Icon name="plus" size={18} /> ADD RULE
            </button>
          )}
        </div>

        <div style={{ flex: 1, minHeight: 16 }} />

        {/* Run preview */}
        {running && (
          <ComicCard bg="#fff" style={{ marginTop: 16 }} padding={14}>
            <div style={{ fontFamily: S.fontDisplay, fontSize: 13, color: S.navy, marginBottom: 8 }}>WATCHING TIDY-BOT…</div>
            <div style={{ fontFamily: S.fontComic, fontSize: 14, color: S.ink, lineHeight: 1.5 }}>
              <div>👀 Sees a sock → ✋ picks it up</div>
              <div>👀 Sees a sock → ✋ picks it up</div>
              <div>👀 Sees a book → 📚 puts on shelf</div>
              <div style={{ marginTop: 4, color: S.grassDeep, fontWeight: 700 }}>✓ Floor is clean!</div>
            </div>
          </ComicCard>
        )}

        {/* CTA */}
        <div style={{ marginTop: 16 }}>
          <ComicButton
            size="lg" bg={S.grass} color={S.ink} style={{ width: '100%' }}
            onClick={() => running ? navigate('/profile') : run()}
          >
            {running ? 'GREAT! NEXT →' : '▶ RUN MY AGENT'}
          </ComicButton>
        </div>
      </div>
    </div>
  )
}
