/**
 * Character.jsx
 * ──────────────────────────────────────────────────────────────
 * SVG characters used in comic panels.
 * Props:
 *   name     : 'zara' | 'byte'
 *   emotion  : 'happy' | 'sad' | 'excited' | 'surprised' |
 *              'thinking' | 'laughing' | 'determined' | 'proud'
 *              'confused' | 'listening' | 'concerned' | 'curious'
 *   size     : number (default 110)
 *   flip     : boolean (mirror horizontally, for right-side characters)
 *   color    : string (overrides Zara's skin/Byte's body color)
 * ──────────────────────────────────────────────────────────────
 */

// ── Zara (adventurous girl) ────────────────────────────────────
export function ZaraCharacter({ emotion = 'happy', size = 110, flip = false, skinColor = '#F5A873' }) {
  const w = size
  const h = size * 1.35

  // Eye styles per emotion
  const eyes = {
    happy:      <><circle cx="38" cy="52" r="5" fill="#222"/><circle cx="62" cy="52" r="5" fill="#222"/><circle cx="40" cy="50" r="1.5" fill="white"/><circle cx="64" cy="50" r="1.5" fill="white"/></>,
    sad:        <><path d="M33 55 Q38 50 43 55" stroke="#222" strokeWidth="2.5" fill="none"/><path d="M57 55 Q62 50 67 55" stroke="#222" strokeWidth="2.5" fill="none"/></>,
    excited:    <><ellipse cx="38" cy="52" rx="6" ry="7" fill="#222"/><ellipse cx="62" cy="52" rx="6" ry="7" fill="#222"/><circle cx="40" cy="49" r="2" fill="white"/><circle cx="64" cy="49" r="2" fill="white"/></>,
    surprised:  <><circle cx="38" cy="52" r="7" fill="#222"/><circle cx="62" cy="52" r="7" fill="#222"/><circle cx="40" cy="50" r="2" fill="white"/><circle cx="64" cy="50" r="2" fill="white"/></>,
    thinking:   <><circle cx="38" cy="52" r="5" fill="#222"/><circle cx="62" cy="52" r="5" fill="#222"/><circle cx="36" cy="52" r="1.5" fill="white"/><circle cx="60" cy="52" r="1.5" fill="white"/></>,
    laughing:   <><path d="M32 50 Q38 56 44 50" stroke="#222" strokeWidth="2.5" fill="none"/><path d="M56 50 Q62 56 68 50" stroke="#222" strokeWidth="2.5" fill="none"/></>,
    determined: <><rect x="31" y="49" width="14" height="8" rx="4" fill="#222"/><rect x="55" y="49" width="14" height="8" rx="4" fill="#222"/></>,
    proud:      <><circle cx="38" cy="52" r="5" fill="#222"/><circle cx="62" cy="52" r="5" fill="#222"/><circle cx="40" cy="50" r="1.5" fill="white"/><circle cx="64" cy="50" r="1.5" fill="white"/></>,
    confused:   <><circle cx="38" cy="52" r="5" fill="#222"/><circle cx="62" cy="52" r="5" fill="#222"/><circle cx="41" cy="51" r="1.5" fill="white"/><circle cx="65" cy="51" r="1.5" fill="white"/></>,
    listening:  <><circle cx="38" cy="52" r="5" fill="#222"/><circle cx="62" cy="52" r="5" fill="#222"/></>,
    concerned:  <><path d="M33 53 Q38 50 43 53" stroke="#222" strokeWidth="2.5" fill="none"/><path d="M57 53 Q62 50 67 53" stroke="#222" strokeWidth="2.5" fill="none"/></>,
    curious:    <><circle cx="38" cy="52" r="6" fill="#222"/><circle cx="62" cy="52" r="6" fill="#222"/><circle cx="41" cy="50" r="2" fill="white"/><circle cx="65" cy="50" r="2" fill="white"/></>,
  }

  // Mouth styles per emotion
  const mouths = {
    happy:      <path d="M42 68 Q50 76 58 68" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    sad:        <path d="M42 72 Q50 64 58 72" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    excited:    <ellipse cx="50" cy="72" rx="9" ry="7" fill="#222"/>,
    surprised:  <ellipse cx="50" cy="73" rx="7" ry="8" fill="#222"/>,
    thinking:   <path d="M44 70 Q50 73 56 70" stroke="#222" strokeWidth="2" fill="none"/>,
    laughing:   <><ellipse cx="50" cy="70" rx="10" ry="6" fill="#222"/><path d="M41 70 Q50 78 59 70" stroke="#222" strokeWidth="0" fill="#FF6B9D"/></>,
    determined: <path d="M42 70 L58 70" stroke="#222" strokeWidth="3" strokeLinecap="round"/>,
    proud:      <path d="M40 68 Q50 78 60 68" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round"/>,
    confused:   <path d="M43 70 Q48 75 55 68" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    listening:  <path d="M44 70 Q50 73 56 70" stroke="#222" strokeWidth="2" fill="none"/>,
    concerned:  <path d="M44 72 Q50 68 56 72" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
    curious:    <path d="M44 70 Q50 76 56 70" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round"/>,
  }

  // Eyebrow styles
  const brows = {
    happy:      <><path d="M32 43 Q38 40 44 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M56 43 Q62 40 68 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
    sad:        <><path d="M32 44 Q38 47 44 44" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M56 44 Q62 47 68 44" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
    surprised:  <><path d="M32 40 Q38 36 44 40" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M56 40 Q62 36 68 40" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
    excited:    <><path d="M31 39 Q38 35 45 39" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M55 39 Q62 35 69 39" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
    thinking:   <><path d="M32 43 Q38 40 44 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M56 40 Q62 39 68 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
    determined: <><path d="M31 42 L44 40" stroke="#5D3A1A" strokeWidth="3" strokeLinecap="round"/><path d="M56 40 L69 42" stroke="#5D3A1A" strokeWidth="3" strokeLinecap="round"/></>,
    default:    <><path d="M32 43 Q38 40 44 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M56 43 Q62 40 68 43" stroke="#5D3A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/></>,
  }

  const eyeSVG   = eyes[emotion]   || eyes.happy
  const mouthSVG = mouths[emotion] || mouths.happy
  const browSVG  = brows[emotion]  || brows.default

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 100 135"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', display: 'block', overflow: 'visible' }}
    >
      {/* ── Hair / Afro ── */}
      <ellipse cx="50" cy="28" rx="30" ry="26" fill="#3D1A00"/>
      <circle cx="22" cy="34" r="14" fill="#3D1A00"/>
      <circle cx="78" cy="34" r="14" fill="#3D1A00"/>
      <circle cx="50" cy="10" r="18" fill="#3D1A00"/>

      {/* ── Head ── */}
      <ellipse cx="50" cy="52" rx="26" ry="28" fill={skinColor}/>

      {/* ── Cheeks ── */}
      <circle cx="28" cy="62" r="6" fill="#F4A0A0" opacity="0.5"/>
      <circle cx="72" cy="62" r="6" fill="#F4A0A0" opacity="0.5"/>

      {/* ── Eyebrows ── */}
      {browSVG}

      {/* ── Eyes ── */}
      {eyeSVG}

      {/* ── Nose ── */}
      <ellipse cx="50" cy="62" rx="3" ry="2" fill="rgba(0,0,0,0.1)"/>

      {/* ── Mouth ── */}
      {mouthSVG}

      {/* ── Neck ── */}
      <rect x="43" y="78" width="14" height="10" rx="4" fill={skinColor}/>

      {/* ── Body / T-shirt ── */}
      <rect x="25" y="86" width="50" height="40" rx="10" fill="#6B21A8"/>

      {/* ── Shirt collar ── */}
      <path d="M43 86 Q50 94 57 86" stroke="white" strokeWidth="2" fill="none"/>

      {/* ── Arms ── */}
      <rect x="10" y="88" width="15" height="32" rx="7" fill={skinColor}/>
      <rect x="75" y="88" width="15" height="32" rx="7" fill={skinColor}/>

      {/* ── Backpack strap hint ── */}
      <rect x="22" y="88" width="4" height="30" rx="2" fill="#FBBF24" opacity="0.6"/>
      <rect x="74" y="88" width="4" height="30" rx="2" fill="#FBBF24" opacity="0.6"/>

      {/* ── Legs ── */}
      <rect x="33" y="124" width="14" height="10" rx="5" fill="#1E3A5F"/>
      <rect x="53" y="124" width="14" height="10" rx="5" fill="#1E3A5F"/>

      {/* ── Shoes ── */}
      <ellipse cx="40" cy="134" rx="9" ry="4" fill="#111"/>
      <ellipse cx="60" cy="134" rx="9" ry="4" fill="#111"/>

      {/* ── Thinking bubble ── */}
      {emotion === 'thinking' && (
        <>
          <circle cx="72" cy="38" r="3" fill="white" opacity="0.8"/>
          <circle cx="79" cy="30" r="5" fill="white" opacity="0.8"/>
          <circle cx="87" cy="20" r="8" fill="white" opacity="0.8"/>
          <text x="87" y="24" textAnchor="middle" fontSize="8" fill="#333">?</text>
        </>
      )}
      {/* ── Excitement sparkles ── */}
      {(emotion === 'excited' || emotion === 'surprised') && (
        <>
          <text x="82" y="20" fontSize="10">✨</text>
          <text x="10" y="28" fontSize="8">⭐</text>
        </>
      )}
    </svg>
  )
}

// ── Byte (AI robot companion) ──────────────────────────────────
export function ByteCharacter({ emotion = 'happy', size = 100, flip = false }) {
  const w = size
  const h = size * 1.2

  // Byte's color changes by emotion
  const bodyColors = {
    happy:      '#22D3EE',  // cyan
    sad:        '#6B7280',  // gray
    excited:    '#FBBF24',  // gold
    surprised:  '#A855F7',  // purple
    thinking:   '#8B5CF6',  // purple
    laughing:   '#4ADE80',  // green
    determined: '#F87171',  // coral
    proud:      '#22D3EE',  // cyan
    confused:   '#F59E0B',  // amber
    listening:  '#38BDF8',  // sky blue
    concerned:  '#94A3B8',  // slate
    curious:    '#C084FC',  // light purple
  }

  // Byte's eye expressions
  const eyeExpressions = {
    happy:      <><text x="28" y="55" fontSize="16" textAnchor="middle">^</text><text x="72" y="55" fontSize="16" textAnchor="middle">^</text></>,
    sad:        <><text x="28" y="55" fontSize="18" textAnchor="middle">T</text><text x="72" y="55" fontSize="18" textAnchor="middle">T</text></>,
    excited:    <><circle cx="28" cy="50" r="10" fill="white"/><circle cx="28" cy="50" r="6" fill="#111"/><circle cx="72" cy="50" r="10" fill="white"/><circle cx="72" cy="50" r="6" fill="#111"/></>,
    surprised:  <><circle cx="28" cy="50" r="11" fill="white"/><circle cx="28" cy="50" r="7" fill="#111"/><circle cx="72" cy="50" r="11" fill="white"/><circle cx="72" cy="50" r="7" fill="#111"/></>,
    thinking:   <><text x="28" y="55" fontSize="16" textAnchor="middle">~</text><text x="72" y="55" fontSize="16" textAnchor="middle">~</text></>,
    laughing:   <><path d="M18 46 Q28 56 38 46" stroke="white" strokeWidth="3" fill="none"/><path d="M62 46 Q72 56 82 46" stroke="white" strokeWidth="3" fill="none"/></>,
    determined: <><rect x="17" y="43" width="22" height="12" rx="3" fill="white"/><rect x="61" y="43" width="22" height="12" rx="3" fill="white"/></>,
    proud:      <><text x="28" y="55" fontSize="16" textAnchor="middle">◠</text><text x="72" y="55" fontSize="16" textAnchor="middle">◠</text></>,
    confused:   <><text x="28" y="55" fontSize="18" textAnchor="middle">?</text><text x="72" y="55" fontSize="18" textAnchor="middle">!</text></>,
    listening:  <><circle cx="28" cy="50" r="8" fill="white"/><circle cx="28" cy="50" r="4" fill="#111"/><circle cx="72" cy="50" r="8" fill="white"/><circle cx="72" cy="50" r="4" fill="#111"/></>,
    concerned:  <><text x="28" y="55" fontSize="18" textAnchor="middle">;</text><text x="72" y="55" fontSize="18" textAnchor="middle">;</text></>,
    curious:    <><circle cx="28" cy="50" r="9" fill="white"/><circle cx="31" cy="48" r="5" fill="#111"/><circle cx="72" cy="50" r="9" fill="white"/><circle cx="75" cy="48" r="5" fill="#111"/></>,
  }

  const bodyColor = bodyColors[emotion] || bodyColors.happy
  const eyeSVG    = eyeExpressions[emotion] || eyeExpressions.happy

  return (
    <svg
      width={w} height={h}
      viewBox="0 0 100 120"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', display: 'block', overflow: 'visible' }}
    >
      {/* ── Antenna ── */}
      <line x1="50" y1="6" x2="50" y2="20" stroke="#888" strokeWidth="3"/>
      <circle cx="50" cy="5" r="5" fill="#FBBF24"/>
      {/* Antenna star blink */}
      <circle cx="50" cy="5" r="5" fill="#FBBF24" opacity="0.5">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* ── Head ── */}
      <rect x="15" y="18" width="70" height="60" rx="20" fill={bodyColor}/>
      {/* Head border */}
      <rect x="15" y="18" width="70" height="60" rx="20" fill="none" stroke="#111" strokeWidth="3"/>

      {/* ── Screen/face panel inside head ── */}
      <rect x="22" y="28" width="56" height="40" rx="12" fill="#0A0714" opacity="0.7"/>

      {/* ── Eyes ── */}
      {eyeSVG}

      {/* ── Mouth ── */}
      {(emotion === 'happy' || emotion === 'proud') && (
        <path d="M35 68 Q50 76 65 68" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      )}
      {emotion === 'sad' && (
        <path d="M35 74 Q50 66 65 74" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      )}
      {(emotion === 'excited' || emotion === 'laughing') && (
        <ellipse cx="50" cy="70" rx="12" ry="6" fill="white"/>
      )}
      {emotion === 'determined' && (
        <line x1="35" y1="70" x2="65" y2="70" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      )}
      {emotion === 'thinking' && (
        <path d="M38 68 Q50 72 62 68" stroke="white" strokeWidth="2" fill="none"/>
      )}

      {/* ── Body ── */}
      <rect x="25" y="76" width="50" height="32" rx="12" fill={bodyColor}/>
      <rect x="25" y="76" width="50" height="32" rx="12" fill="none" stroke="#111" strokeWidth="3"/>

      {/* ── Chest light ── */}
      <circle cx="50" cy="90" r="6" fill="#FBBF24" opacity="0.9"/>
      <circle cx="50" cy="90" r="6" fill="#FBBF24">
        <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite"/>
      </circle>

      {/* ── Buttons on chest ── */}
      <circle cx="38" cy="100" r="3" fill="#111" opacity="0.5"/>
      <circle cx="50" cy="102" r="3" fill="#111" opacity="0.5"/>
      <circle cx="62" cy="100" r="3" fill="#111" opacity="0.5"/>

      {/* ── Arms ── */}
      <rect x="5"  y="80" width="18" height="22" rx="9" fill={bodyColor}/>
      <rect x="5"  y="80" width="18" height="22" rx="9" fill="none" stroke="#111" strokeWidth="2.5"/>
      <rect x="77" y="80" width="18" height="22" rx="9" fill={bodyColor}/>
      <rect x="77" y="80" width="18" height="22" rx="9" fill="none" stroke="#111" strokeWidth="2.5"/>

      {/* ── Feet / base ── */}
      <rect x="30" y="106" width="16" height="10" rx="5" fill={bodyColor}/>
      <rect x="30" y="106" width="16" height="10" rx="5" fill="none" stroke="#111" strokeWidth="2"/>
      <rect x="54" y="106" width="16" height="10" rx="5" fill={bodyColor}/>
      <rect x="54" y="106" width="16" height="10" rx="5" fill="none" stroke="#111" strokeWidth="2"/>

      {/* ── Excitement sparkles ── */}
      {emotion === 'excited' && (
        <>
          <text x="5"  y="28" fontSize="12">⚡</text>
          <text x="83" y="28" fontSize="12">⚡</text>
        </>
      )}
      {/* ── Thinking particles ── */}
      {emotion === 'thinking' && (
        <>
          <circle cx="78" cy="30" r="3" fill="white" opacity="0.6"/>
          <circle cx="86" cy="22" r="5" fill="white" opacity="0.6"/>
          <text x="86" y="25" textAnchor="middle" fontSize="7" fill="#333">🤔</text>
        </>
      )}
    </svg>
  )
}

// ── Generic <Character> component ─────────────────────────────
export default function Character({ name, emotion, size, flip, avatarColor }) {
  if (name === 'zara') {
    return <ZaraCharacter emotion={emotion} size={size} flip={flip} skinColor={avatarColor || '#F5A873'} />
  }
  if (name === 'byte') {
    return <ByteCharacter emotion={emotion} size={size} flip={flip} />
  }
  return null
}
