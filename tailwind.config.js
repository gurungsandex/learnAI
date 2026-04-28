/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Sparky Comic Color Palette ─────────────────────────────────
      colors: {
        ink:        '#1B2A33',
        'ink-soft': '#3E5460',
        paper:      '#FFF6EC',
        'paper-deep':'#F7E9D5',
        cream:      '#FFE8D6',
        coral:      '#FF7A6B',
        'coral-deep':'#E55A4B',
        peach:      '#FFB4A2',
        blush:      '#FFCDB2',
        mint:       '#A8DADC',
        'mint-deep':'#7BC0C2',
        navy:       '#457B9D',
        'navy-deep':'#2D5C7C',
        sun:        '#FFD23F',
        'sun-deep': '#F2B600',
        grass:      '#7DD87D',
        'grass-deep':'#4FB14F',
        rose:       '#E76F8C',
        lilac:      '#B8A6E0',
        lock:       '#9AA8B0',
      },
      // ── Typography ───────────────────────────────────────────────────
      fontFamily: {
        display: ['"Bowlby One SC"', 'cursive'],
        comic:   ['"Patrick Hand"', 'cursive'],
        ui:      ['"Nunito"', 'sans-serif'],
        sig:     ['"Caveat"', 'cursive'],
      },
      // ── Animations ───────────────────────────────────────────────────
      keyframes: {
        spkBob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%':      { transform: 'translateY(-6px) rotate(2deg)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.06)' },
        },
        bubblePop: {
          '0%':   { transform: 'scale(0.92)', opacity: '0' },
          '100%': { transform: 'scale(1)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'spk-bob':    'spkBob 2.4s ease-in-out infinite',
        pulse:        'pulse 1.6s ease-in-out infinite',
        'bubble-pop': 'bubblePop 0.25s ease-out forwards',
        float:        'float 2.6s ease-in-out infinite',
      },
      // ── Border radius ─────────────────────────────────────────────────
      borderRadius: {
        sm:   '10px',
        md:   '16px',
        lg:   '22px',
        xl:   '28px',
        pill: '999px',
      },
      // ── Box shadows (ink shadows — never soft blur) ──────────────────
      boxShadow: {
        ink:    '0 4px 0 #1B2A33',
        'ink-sm':'0 2px 0 #1B2A33',
        'ink-lg':'0 6px 0 #1B2A33',
        'ink-pressed':'0 1px 0 #1B2A33',
      },
    },
  },
  plugins: [],
}
