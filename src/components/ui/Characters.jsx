// Characters.jsx – Sparky, Bug, KidMira SVG characters
// All expressions ported verbatim from the design reference.
import { S } from '../../tokens'

// ── Sparky – friendly robot guide ────────────────────────────────
export function Sparky({ size = 200, expression = 'happy', style = {}, accent = S.navy, body = S.mint }) {
  const eyes = {
    happy: (
      <g>
        <circle cx="78" cy="92" r="9" fill={S.ink}/><circle cx="122" cy="92" r="9" fill={S.ink}/>
        <circle cx="81" cy="89" r="3" fill="#fff"/><circle cx="125" cy="89" r="3" fill="#fff"/>
      </g>
    ),
    excited: (
      <g>
        <path d="M70 88 q8 -10 16 0" stroke={S.ink} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M114 88 q8 -10 16 0" stroke={S.ink} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M62 78 l-6 -8 M138 78 l6 -8" stroke={S.sun} strokeWidth="3.5" strokeLinecap="round"/>
      </g>
    ),
    confused: (
      <g>
        <circle cx="78" cy="92" r="7" fill={S.ink}/><circle cx="122" cy="94" r="9" fill={S.ink}/>
        <circle cx="80" cy="90" r="2.5" fill="#fff"/><circle cx="125" cy="91" r="3" fill="#fff"/>
      </g>
    ),
    celebrate: (
      <g>
        <path d="M68 86 l20 12 M88 86 l-20 12" stroke={S.ink} strokeWidth="4.5" strokeLinecap="round"/>
        <path d="M112 86 l20 12 M132 86 l-20 12" stroke={S.ink} strokeWidth="4.5" strokeLinecap="round"/>
      </g>
    ),
    sleepy: (
      <g>
        <path d="M68 92 q10 4 20 0" stroke={S.ink} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M112 92 q10 4 20 0" stroke={S.ink} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      </g>
    ),
    thinking: (
      <g>
        <circle cx="78" cy="92" r="9" fill={S.ink}/><circle cx="122" cy="92" r="9" fill={S.ink}/>
        <circle cx="81" cy="89" r="3" fill="#fff"/><circle cx="125" cy="89" r="3" fill="#fff"/>
        <path d="M70 78 q8 -4 16 0" stroke={S.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
    ),
  }

  const mouths = {
    happy:     <path d="M86 116 q14 12 28 0" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>,
    excited:   <path d="M82 112 q18 22 36 0 q-18 -4 -36 0z" fill={S.ink}/>,
    confused:  <path d="M86 120 q8 -6 16 0 q8 6 12 -2" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>,
    celebrate: <path d="M80 110 q20 30 40 0 q-20 -6 -40 0z" fill={S.ink}/>,
    sleepy:    <path d="M92 118 q8 4 16 0" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>,
    thinking:  <path d="M88 120 q12 -4 24 0" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>,
  }

  return (
    <svg viewBox="0 0 200 220" width={size} height={size * 220/200} style={{ overflow: 'visible', ...style }}>
      <defs>
        <pattern id="sparkyHalf" patternUnits="userSpaceOnUse" width="6" height="6">
          <circle cx="3" cy="3" r="1" fill={S.ink} opacity="0.12"/>
        </pattern>
      </defs>
      {/* antenna */}
      <line x1="100" y1="40" x2="100" y2="18" stroke={S.ink} strokeWidth="4" strokeLinecap="round"/>
      <path d="M100 6 l4 8 8 1 -6 6 1.5 8 -7.5 -4 -7.5 4 1.5 -8 -6 -6 8 -1z" fill={S.sun} stroke={S.ink} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* body */}
      <rect x="56" y="140" width="88" height="60" rx="20" fill={accent} stroke={S.ink} strokeWidth="4"/>
      <rect x="56" y="140" width="88" height="60" rx="20" fill="url(#sparkyHalf)"/>
      {/* chest panel */}
      <rect x="76" y="156" width="48" height="30" rx="8" fill={S.paper} stroke={S.ink} strokeWidth="3"/>
      <circle cx="88" cy="171" r="3" fill={S.coral}/>
      <circle cx="100" cy="171" r="3" fill={S.sun}/>
      <circle cx="112" cy="171" r="3" fill={S.grass}/>
      {/* arms */}
      <rect x="36" y="148" width="22" height="34" rx="11" fill={accent} stroke={S.ink} strokeWidth="4"/>
      <rect x="142" y="148" width="22" height="34" rx="11" fill={accent} stroke={S.ink} strokeWidth="4"/>
      <circle cx="47" cy="186" r="10" fill="#fff" stroke={S.ink} strokeWidth="3.5"/>
      <circle cx="153" cy="186" r="10" fill="#fff" stroke={S.ink} strokeWidth="3.5"/>
      {/* head */}
      <rect x="40" y="48" width="120" height="100" rx="36" fill={body} stroke={S.ink} strokeWidth="4.5"/>
      <rect x="40" y="48" width="120" height="100" rx="36" fill="url(#sparkyHalf)"/>
      {/* cheeks */}
      <ellipse cx="64" cy="116" rx="10" ry="6" fill={S.coral} opacity="0.55"/>
      <ellipse cx="136" cy="116" rx="10" ry="6" fill={S.coral} opacity="0.55"/>
      {/* face */}
      {eyes[expression] || eyes.happy}
      {mouths[expression] || mouths.happy}
      {/* highlight */}
      <path d="M58 64 q14 -10 32 -8" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7"/>
    </svg>
  )
}

// ── Bug – AI companion spark ──────────────────────────────────────
export function Bug({ size = 100, expression = 'happy', style = {}, color = S.coral }) {
  const eyes = {
    happy: (
      <g>
        <circle cx="40" cy="48" r="5" fill={S.ink}/><circle cx="60" cy="48" r="5" fill={S.ink}/>
        <circle cx="42" cy="46" r="2" fill="#fff"/><circle cx="62" cy="46" r="2" fill="#fff"/>
      </g>
    ),
    excited: (
      <g>
        <path d="M34 46 q6 -6 12 0" stroke={S.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M54 46 q6 -6 12 0" stroke={S.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
    ),
    confused: (
      <g>
        <circle cx="40" cy="48" r="4" fill={S.ink}/>
        <circle cx="60" cy="50" r="5" fill={S.ink}/>
      </g>
    ),
    celebrate: (
      <g>
        <path d="M34 44 l12 8 M46 44 l-12 8" stroke={S.ink} strokeWidth="3" strokeLinecap="round"/>
        <path d="M54 44 l12 8 M66 44 l-12 8" stroke={S.ink} strokeWidth="3" strokeLinecap="round"/>
      </g>
    ),
    thinking: (
      <g>
        <circle cx="40" cy="48" r="5" fill={S.ink}/>
        <circle cx="60" cy="48" r="5" fill={S.ink}/>
      </g>
    ),
  }

  const mouths = {
    happy:     <path d="M42 60 q8 6 16 0" stroke={S.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>,
    excited:   <path d="M40 58 q10 14 20 0 q-10 -3 -20 0z" fill={S.ink}/>,
    confused:  <circle cx="50" cy="62" r="3" fill={S.ink}/>,
    celebrate: <path d="M38 58 q12 16 24 0 q-12 -3 -24 0z" fill={S.ink}/>,
    thinking:  <path d="M42 62 q8 -2 16 0" stroke={S.ink} strokeWidth="3" fill="none" strokeLinecap="round"/>,
  }

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: 'visible', ...style }}>
      <g opacity="0.6">
        <circle cx="14" cy="22" r="2" fill={S.sun}/>
        <circle cx="86" cy="30" r="1.5" fill={S.sun}/>
        <circle cx="22" cy="84" r="1.8" fill={S.sun}/>
      </g>
      <path d="M50 12 C72 12 86 28 86 50 C86 72 72 90 50 90 C28 90 14 72 14 50 C14 28 28 12 50 12 Z" fill={color} stroke={S.ink} strokeWidth="3.5"/>
      <path d="M50 6 l4 10 -8 0z" fill={color} stroke={S.ink} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M86 50 l-10 4 0 -8z" fill={color} stroke={S.ink} strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M14 50 l10 -4 0 8z" fill={color} stroke={S.ink} strokeWidth="2.5" strokeLinejoin="round"/>
      {eyes[expression] || eyes.happy}
      {mouths[expression] || mouths.happy}
      <ellipse cx="32" cy="60" rx="5" ry="3" fill={S.coralDeep} opacity="0.4"/>
      <ellipse cx="68" cy="60" rx="5" ry="3" fill={S.coralDeep} opacity="0.4"/>
      <path d="M30 28 q8 -6 16 -4" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  )
}

// ── KidMira – story character (girl in overalls) ──────────────────
export function KidMira({ size = 180, expression = 'happy', style = {} }) {
  return (
    <svg viewBox="0 0 180 220" width={size} height={size * 220/180} style={{ overflow: 'visible', ...style }}>
      {/* hair back */}
      <path d="M40 72 q-6 50 14 90 l112 0 q20 -40 14 -90 q-12 -36 -70 -36 q-58 0 -70 36z" fill="#5C3A2E" stroke={S.ink} strokeWidth="3.5"/>
      {/* face */}
      <ellipse cx="90" cy="92" rx="48" ry="54" fill="#FFD7B5" stroke={S.ink} strokeWidth="3.5"/>
      {/* hair curls */}
      <path d="M48 70 q4 -20 28 -20 q14 0 22 12 q14 -12 30 -8 q24 6 18 30 q-12 -10 -32 -8 q-12 1 -20 -8 q-10 12 -28 10 q-14 -2 -18 -8z" fill="#5C3A2E" stroke={S.ink} strokeWidth="3"/>
      {/* eyes */}
      {expression === 'excited' ? (
        <g>
          <path d="M62 96 q8 -10 16 0" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M104 96 q8 -10 16 0" stroke={S.ink} strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
      ) : (
        <g>
          <circle cx="70" cy="100" r="6" fill={S.ink}/><circle cx="112" cy="100" r="6" fill={S.ink}/>
          <circle cx="72" cy="98" r="2" fill="#fff"/><circle cx="114" cy="98" r="2" fill="#fff"/>
        </g>
      )}
      {/* cheeks */}
      <ellipse cx="58" cy="118" rx="8" ry="5" fill={S.coral} opacity="0.5"/>
      <ellipse cx="124" cy="118" rx="8" ry="5" fill={S.coral} opacity="0.5"/>
      {/* mouth */}
      <path
        d={expression === 'excited' ? "M76 124 q14 16 30 0 q-14 -3 -30 0z" : "M78 122 q12 10 24 0"}
        stroke={S.ink} strokeWidth="3.5"
        fill={expression === 'excited' ? S.coralDeep : 'none'}
        strokeLinecap="round"
      />
      {/* body – overalls */}
      <path d="M30 200 q4 -50 60 -50 q56 0 60 50z" fill={S.coral} stroke={S.ink} strokeWidth="4"/>
      <rect x="64" y="148" width="52" height="22" fill="#FFD7B5" stroke={S.ink} strokeWidth="3"/>
      {/* straps */}
      <path d="M70 150 l-8 50 M110 150 l8 50" stroke={S.navy} strokeWidth="6" strokeLinecap="round"/>
      <circle cx="68" cy="170" r="3" fill={S.sun} stroke={S.ink} strokeWidth="2"/>
      <circle cx="112" cy="170" r="3" fill={S.sun} stroke={S.ink} strokeWidth="2"/>
    </svg>
  )
}
