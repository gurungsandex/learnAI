// ComicPrimitives.jsx – shared UI components for the Sparky design system
import { S } from '../../tokens'

// ── Halftone overlay ─────────────────────────────────────────────
export function Halftone({ color = S.ink, op = 0.07, size = 6, style = {} }) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${size/2}' cy='${size/2}' r='${size*0.18}' fill='${color}' opacity='${op}'/></svg>`
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
      backgroundSize: `${size}px ${size}px`,
      ...style,
    }} />
  )
}

// ── ComicButton ──────────────────────────────────────────────────
export function ComicButton({ children, bg = S.coral, color = '#fff', onClick, style = {}, size = 'md', disabled = false }) {
  const sz =
    size === 'lg' ? { padding: '16px 24px', fontSize: 19, borderRadius: 18 } :
    size === 'sm' ? { padding: '8px 14px',  fontSize: 14, borderRadius: 12 } :
                   { padding: '12px 20px',  fontSize: 16, borderRadius: 14 }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cbtn"
      style={{
        background:   disabled ? '#D8D2C9' : bg,
        color:        disabled ? '#9A938A' : color,
        border:       `2.5px solid ${S.ink}`,
        fontFamily:   S.fontUI,
        fontWeight:   800,
        letterSpacing: 0.3,
        boxShadow:    S.shadow,
        cursor:       disabled ? 'not-allowed' : 'pointer',
        transition:   'transform .08s, box-shadow .08s',
        WebkitTapHighlightColor: 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...sz,
        ...style,
      }}
    >
      {children}
    </button>
  )
}

// ── IconButton ───────────────────────────────────────────────────
export function IconButton({ children, onClick, label, size = 36, style = {} }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        width: size, height: size, borderRadius: 12,
        background: '#fff', border: `2.5px solid ${S.ink}`,
        boxShadow: `0 3px 0 ${S.ink}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

// ── ComicCard ────────────────────────────────────────────────────
export function ComicCard({ children, bg = '#fff', style = {}, padding = 16, radius = S.rLg }) {
  return (
    <div style={{
      background:   bg,
      border:       `2.5px solid ${S.ink}`,
      borderRadius: radius,
      padding,
      boxShadow:    S.shadow,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── SpeechBubble ─────────────────────────────────────────────────
export function SpeechBubble({ children, tail = 'left', bg = '#fff', color = S.ink, style = {}, fontSize = 18, lineHeight = 1.25 }) {
  const tailSide = tail === 'right' ? { right: 18 } : { left: 18 }
  return (
    <div style={{
      position: 'relative',
      background:   bg,
      color,
      border:       `2.5px solid ${S.ink}`,
      borderRadius: 18,
      padding:      '12px 16px',
      fontFamily:   S.fontComic,
      fontSize,
      lineHeight,
      boxShadow:    S.shadow,
      ...style,
    }}>
      {children}
      <svg width="22" height="18" viewBox="0 0 22 18" style={{ position: 'absolute', bottom: -16, ...tailSide }}>
        <path d="M2 0 L20 0 L4 17 Z" fill={bg} stroke={S.ink} strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M2 0 L20 0" stroke={bg} strokeWidth="3"/>
      </svg>
    </div>
  )
}

// ── Icon ─────────────────────────────────────────────────────────
export function Icon({ name, size = 24, color = S.ink, strokeWidth = 2.6 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':      return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>
    case 'map':       return <svg {...p}><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/></svg>
    case 'play':      return <svg {...p}><path d="M7 4l13 8-13 8V4z" fill={color}/></svg>
    case 'lock':      return <svg {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    case 'star':      return <svg {...p}><path d="M12 3l2.6 6 6.4.5-4.9 4.3 1.5 6.2L12 17l-5.6 3 1.5-6.2L3 9.5l6.4-.5L12 3z" fill={color}/></svg>
    case 'starline':  return <svg {...p}><path d="M12 3l2.6 6 6.4.5-4.9 4.3 1.5 6.2L12 17l-5.6 3 1.5-6.2L3 9.5l6.4-.5L12 3z"/></svg>
    case 'bolt':      return <svg {...p}><path d="M13 2L4 14h7l-2 8 9-12h-7l2-8z" fill={color}/></svg>
    case 'fire':      return <svg {...p}><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-3s-3 2-3 6a6 6 0 0 0 12 0c0-6-6-11-6-11z" fill={color}/></svg>
    case 'heart':     return <svg {...p}><path d="M12 21s-8-5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6-8 11-8 11z" fill={color}/></svg>
    case 'check':     return <svg {...p}><path d="M5 12l5 5 9-11"/></svg>
    case 'x':         return <svg {...p}><path d="M5 5l14 14M19 5L5 19"/></svg>
    case 'arrow':     return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    case 'arrowback': return <svg {...p}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>
    case 'mic':       return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
    case 'text':      return <svg {...p}><path d="M5 7h14M5 12h10M5 17h14"/></svg>
    case 'profile':   return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>
    case 'trophy':    return <svg {...p}><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 13h6l1 4H8l1-4zM7 21h10"/></svg>
    case 'gear':      return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
    case 'share':     return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>
    case 'download':  return <svg {...p}><path d="M12 3v13M6 11l6 6 6-6M4 21h16"/></svg>
    case 'plus':      return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'sparkle':   return <svg {...p}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill={color}/></svg>
    case 'zap':       return <svg {...p}><path d="M13 3L4 14h7l-2 7 9-12h-7l2-6z"/></svg>
    default:          return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>
  }
}

// ── BottomNav ────────────────────────────────────────────────────
export function BottomNav({ active, onNav }) {
  const items = [
    { id: 'home',    icon: 'map',     label: 'Map' },
    { id: 'builder', icon: 'sparkle', label: 'Build' },
    { id: 'profile', icon: 'profile', label: 'Me' },
  ]
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 12, zIndex: 8,
      background: '#fff',
      border: `2.5px solid ${S.ink}`,
      borderRadius: 22,
      boxShadow: `0 5px 0 ${S.ink}`,
      padding: 8,
      display: 'flex',
      justifyContent: 'space-around',
    }}>
      {items.map(it => (
        <button
          key={it.id}
          onClick={() => onNav(it.id)}
          aria-label={it.label}
          aria-current={active === it.id ? 'page' : undefined}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            padding: '6px 0',
            borderRadius: 14,
            cursor: 'pointer',
            border: active === it.id ? `2px solid ${S.ink}` : '2px solid transparent',
            background: active === it.id ? S.sun : 'transparent',
            fontFamily: 'inherit',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Icon name={it.icon} size={22} />
          <span style={{ fontFamily: S.fontUI, fontWeight: 800, fontSize: 11, color: S.ink }}>{it.label}</span>
        </button>
      ))}
    </div>
  )
}
