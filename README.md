# 🤖 ByteQuest — AI Learning App for Kids

> **Learn AI through comic-style adventures and build your own AI agent!**
> Designed for kids ages 8–12. No backend needed — runs entirely in the browser.

---

## 🚀 Quick Start

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org) (choose the "LTS" version).

### 2. Open a terminal in this folder
On Mac: right-click the `bytequest` folder → "Open Terminal here"  
On Windows: right-click → "Open in Terminal"

### 3. Install packages
```bash
npm install
```

### 4. Run the app
```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

---

## 📦 Build for Production
```bash
npm run build
```
This creates a `dist/` folder you can deploy anywhere.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Push your code to a GitHub repository
2. Run: `npm run build`
3. Deploy the `dist/` folder using [GitHub Pages](https://pages.github.com) or drag it to [Netlify](https://netlify.com) / [Vercel](https://vercel.com)

**Note:** If deploying to a GitHub Pages *subfolder* (e.g. `username.github.io/bytequest`), edit `vite.config.js` and change `base: '/'` to `base: '/bytequest/'`.

---

## 📱 Wrap as a Mobile App (Capacitor.js)

To publish to iOS App Store or Google Play:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# Initialize
npx cap init ByteQuest com.yourname.bytequest

# Build web first
npm run build

# Add platforms
npx cap add ios
npx cap add android

# Sync and open
npx cap sync
npx cap open ios      # Opens Xcode
npx cap open android  # Opens Android Studio
```

---

## 🗂️ Project Structure

```
bytequest/
├── public/
│   └── favicon.svg              ← App icon
├── src/
│   ├── main.jsx                 ← App entry point
│   ├── App.jsx                  ← Routes
│   ├── index.css                ← Global styles (comic theme)
│   ├── context/
│   │   └── GameContext.jsx      ← All game state + localStorage save
│   ├── data/
│   │   ├── chapters.js          ← All 8 chapters (ADD NEW ONES HERE)
│   │   └── badges.js            ← All badges
│   └── components/
│       ├── ui/
│       │   ├── Character.jsx    ← Zara + Byte SVG characters
│       │   └── StarBurst.jsx    ← XP bar, top header, celebration overlay
│       └── screens/
│           ├── SplashScreen.jsx
│           ├── OnboardingScreen.jsx
│           ├── HomeScreen.jsx       ← Adventure map
│           ├── ChapterScreen.jsx    ← Story panels + interaction
│           ├── MiniGameScreen.jsx   ← Quiz game
│           ├── AIBuilderScreen.jsx  ← Visual AI agent builder
│           ├── ProfileScreen.jsx    ← Stats + badges
│           └── CertificateScreen.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

## ✏️ How to Add a New Chapter

Open `src/data/chapters.js` and copy this template:

```js
{
  id: 9,                          // Next chapter number
  title: 'Your Chapter Title',
  subtitle: 'What it teaches',
  icon: '🎯',                     // Any emoji
  color: '#10B981',               // Hex color for the map node
  xpReward: 100,

  panels: [
    {
      id: 1,
      bg: 'lab',                  // 'school' | 'street' | 'city' | 'lab' | 'space' | 'sky'
      caption: 'Scene narration goes here...',
      characters: {
        left:  { name: 'zara', emotion: 'happy' },
        right: { name: 'byte', emotion: 'excited' },
      },
      dialogue: [
        { speaker: 'zara', text: "What Zara says!" },
        { speaker: 'byte', text: "What Byte says!" },
      ],
    },
    // Add more panels...
  ],

  interaction: {
    type: 'sort',
    prompt: '🎯 Tap the correct items!',
    helpText: 'Explanation for kids.',
    items: [
      { id: 1, label: 'Item name', emoji: '🔥', isCorrect: true  },
      { id: 2, label: 'Wrong one', emoji: '💧', isCorrect: false },
      // 6-8 items recommended
    ],
  },

  miniGame: {
    type: 'quiz',
    title: 'Quiz Title 🧠',
    xpReward: 50,
    questions: [
      {
        text: 'Question text here?',
        emoji: '🤔',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 1,                // Index of correct answer (0-3)
        explanation: 'Why this is correct! 💡',
      },
      // Add 4 questions total
    ],
  },

  badge: {
    id: 'my_badge_id',
    name: 'Badge Name',
    emoji: '🏅',
    description: 'What the player achieved!',
  },
},
```

Also add the badge to `src/data/badges.js`:
```js
{ id: 'my_badge_id', name: 'Badge Name', emoji: '🏅', chapter: 9, description: 'Description' },
```

---

## 🎨 Changing Colors / Theme

Edit `tailwind.config.js` → `theme.extend.colors` to change the app's color palette.  
Main colors:
- `gold` — `#FBBF24` (primary accent)
- `cyan` — `#22D3EE` (Byte's color)
- `pink` — `#EC4899` (highlights)
- `bg-deep` — `#0A0714` (background)

---

## 🔧 Character Emotions

Both Zara and Byte support these emotions:
`happy` `sad` `excited` `surprised` `thinking` `laughing` `determined` `proud` `confused` `listening` `concerned` `curious`

Use them in `panels[].characters.left.emotion` or `characters.right.emotion`.

---

## 💾 Data Storage

All progress is saved to `localStorage` under the key `bytequest_save`.  
There is no backend, database, or user accounts — everything lives on the player's device.

To clear saved data during development, open browser DevTools → Application → Local Storage → delete `bytequest_save`.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework + dev server |
| Tailwind CSS | Styling (comic theme) |
| Framer Motion | Animations + transitions |
| React Router v6 | Screen navigation |
| lucide-react | Icons |
| localStorage | Save game data |
| Capacitor.js | (Optional) Mobile app wrapper |

---

## 📄 License

MIT — free to use, fork, and customize!

---

*Built with ❤️ for curious kids everywhere. Go build something amazing!* 🚀
