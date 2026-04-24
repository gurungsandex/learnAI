/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── LearnAI Comic Color Palette ─────────────────────────────────
      colors: {
        bg: {
          deep:  '#0A0714',
          panel: '#130D24',
          card:  '#1C1338',
        },
        purple: {
          dark:  '#1E0A3C',
          mid:   '#6B21A8',
          light: '#A855F7',
          glow:  '#C084FC',
        },
        gold:    '#FBBF24',
        'gold-bright': '#FDE047',
        cyan:    '#22D3EE',
        pink:    '#EC4899',
        green:   '#4ADE80',
        coral:   '#FB7185',
        orange:  '#FB923C',
        sky:     '#38BDF8',
      },
      // ── Typography ────────────────────────────────────────────────────
      fontFamily: {
        comic: ['Bangers', 'cursive'],
        body:  ['Nunito', 'sans-serif'],
      },
      // ── Animations ────────────────────────────────────────────────────
      keyframes: {
        'bounce-in': {
          '0%':   { transform: 'scale(0)',    opacity: '0' },
          '60%':  { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'xp-glow': {
          '0%, 100%': { boxShadow: '0 0 8px #FBBF24' },
          '50%':      { boxShadow: '0 0 24px #FBBF24, 0 0 48px #FBBF24' },
        },
        'star-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%':      { transform: 'translateX(-8px)' },
          '60%':      { transform: 'translateX(8px)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'pop': {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '80%':  { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'bounce-in':  'bounce-in 0.45s ease-out forwards',
        float:        'float 3s ease-in-out infinite',
        'xp-glow':    'xp-glow 2s ease-in-out infinite',
        'star-spin':  'star-spin 4s linear infinite',
        shake:        'shake 0.4s ease-in-out',
        'slide-up':   'slide-up 0.4s ease-out forwards',
        pop:          'pop 0.35s ease-out forwards',
        pulse:        'pulse 2s ease-in-out infinite',
      },
      // ── Font weights (numeric aliases so font-700/800/900 work) ──────
      fontWeight: {
        '700': '700',
        '800': '800',
        '900': '900',
      },
      // ── Border radius ─────────────────────────────────────────────────
      borderRadius: {
        comic: '14px',
      },
      // ── Box shadows ───────────────────────────────────────────────────
      boxShadow: {
        comic:     '4px 4px 0px rgba(0,0,0,0.9)',
        'comic-lg':'6px 6px 0px rgba(0,0,0,0.9)',
        glow:      '0 0 20px rgba(251,191,36,0.5)',
        'glow-cyan':'0 0 20px rgba(34,211,238,0.5)',
      },
    },
  },
  plugins: [],
}
