/**
 * chapters.js
 * ─────────────────────────────────────────────────────────────
 * All 8 LearnAI chapters.
 *
 * HOW TO ADD A NEW CHAPTER:
 *   1. Copy the template at the bottom of this file
 *   2. Fill in id, title, panels, miniGame, badge
 *   3. That's it! The app automatically picks it up.
 * ─────────────────────────────────────────────────────────────
 */

export const chapters = [

  // ════════════════════════════════════════════════════════
  // CHAPTER 1 – What is AI?
  // ════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Meet Byte!',
    subtitle: 'What is AI?',
    icon: '🤖',
    color: '#7C3AED',
    xpReward: 100,
    concept: 'AI is a computer program that can learn and make decisions!',

    panels: [
      {
        id: 1,
        bg: 'school',
        caption: 'One afternoon, Zara is walking home...',
        characters: { left: null, right: { name: 'zara', emotion: 'happy' } },
        dialogue: [],
      },
      {
        id: 2,
        bg: 'street',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'surprised' }, right: null },
        dialogue: [
          { speaker: 'zara', text: "WHOA! My backpack is GLOWING! 😱" },
        ],
      },
      {
        id: 3,
        bg: 'street',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'surprised' }, right: { name: 'byte', emotion: 'excited' } },
        dialogue: [
          { speaker: 'byte', text: "HELLO! I'm BYTE! Your AI companion! 🤖✨" },
          { speaker: 'zara', text: "A robot... from my BACKPACK?! How??!" },
        ],
      },
      {
        id: 4,
        bg: 'sky',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'happy' }, right: { name: 'zara', emotion: 'thinking' } },
        dialogue: [
          { speaker: 'byte', text: "I'm Artificial Intelligence! AI for short. I can LEARN things and help you!" },
          { speaker: 'zara', text: "Wait... like Siri? Or Netflix recommendations?" },
        ],
      },
      {
        id: 5,
        bg: 'sky',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'excited' }, right: { name: 'zara', emotion: 'happy' } },
        dialogue: [
          { speaker: 'byte', text: "EXACTLY! AI is everywhere — games, maps, music, chatbots!" },
          { speaker: 'zara', text: "Cool! So... what's our mission?" },
          { speaker: 'byte', text: "To learn how AI works — and BUILD one together! 🚀" },
        ],
      },
    ],

    // ── Interactive sorting activity ──────────────────────
    interaction: {
      type: 'sort',
      prompt: '🤔 Tap everything that is powered by AI!',
      helpText: 'AI can think, learn, and make decisions!',
      items: [
        { id: 1, label: 'Netflix',       emoji: '📺', isCorrect: true  },
        { id: 2, label: 'A Toaster',     emoji: '🍞', isCorrect: false },
        { id: 3, label: 'Siri',          emoji: '🎤', isCorrect: true  },
        { id: 4, label: 'A Lamp',        emoji: '💡', isCorrect: false },
        { id: 5, label: 'Google Maps',   emoji: '🗺️', isCorrect: true  },
        { id: 6, label: 'A Bicycle',     emoji: '🚲', isCorrect: false },
        { id: 7, label: 'ChatGPT',       emoji: '💬', isCorrect: true  },
        { id: 8, label: 'A Pencil',      emoji: '✏️', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Quick Quiz! 🧠',
      xpReward: 50,
      questions: [
        {
          text: 'What does "AI" stand for?',
          emoji: '🤖',
          options: ['Alien Intelligence', 'Artificial Intelligence', 'Auto Internet', 'Amazing Ideas'],
          correct: 1,
          explanation: 'AI = Artificial Intelligence! It\'s a computer that can LEARN and think! 🧠',
        },
        {
          text: 'Which one uses AI?',
          emoji: '📱',
          options: ['A paper notebook', 'A regular TV remote', 'YouTube recommendations', 'A wooden chair'],
          correct: 2,
          explanation: 'YouTube uses AI to figure out which videos you\'ll love next! 🎥',
        },
        {
          text: 'How is AI different from a regular calculator?',
          emoji: '🔢',
          options: ['It\'s bigger', 'It can learn from examples', 'It runs on batteries', 'It\'s made of gold'],
          correct: 1,
          explanation: 'Regular calculators just follow fixed rules. AI can LEARN new things! ✨',
        },
        {
          text: 'Which of these is NOT an example of AI?',
          emoji: '🧐',
          options: ['Face ID on a phone', 'Spam filter in email', 'An electric fan', 'A self-driving car'],
          correct: 2,
          explanation: 'An electric fan just spins — no learning or thinking needed! 💨',
        },
      ],
    },

    badge: { id: 'ai_explorer', name: 'AI Explorer', emoji: '🚀', description: 'You discovered what AI is!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 2 – How AI Learns
  // ════════════════════════════════════════════════════════
  {
    id: 2,
    title: 'Brain Food!',
    subtitle: 'How AI Learns',
    icon: '🧠',
    color: '#EC4899',
    xpReward: 100,
    concept: 'AI learns from examples — the more examples it sees, the smarter it gets!',

    panels: [
      {
        id: 1,
        bg: 'lab',
        caption: 'The next day at Zara\'s room...',
        characters: { left: { name: 'byte', emotion: 'sad' }, right: { name: 'zara', emotion: 'concerned' } },
        dialogue: [
          { speaker: 'byte', text: "Zara... I'm HUNGRY. My brain needs food! 🥺" },
          { speaker: 'zara', text: "Robots eat food?! What kind?!" },
        ],
      },
      {
        id: 2,
        bg: 'lab',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'thinking' }, right: { name: 'zara', emotion: 'curious' } },
        dialogue: [
          { speaker: 'byte', text: "Not regular food — DATA! Examples! Stories! Pictures!" },
          { speaker: 'zara', text: "So you learn by... looking at lots of examples?" },
          { speaker: 'byte', text: "EXACTLY! That's called TRAINING! 🎓" },
        ],
      },
      {
        id: 3,
        bg: 'space',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'happy' }, right: { name: 'byte', emotion: 'excited' } },
        dialogue: [
          { speaker: 'zara', text: "So it's like how I learned to read — by reading lots of books?" },
          { speaker: 'byte', text: "YES! You saw thousands of words and your brain learned patterns! AI does the same! 📚" },
        ],
      },
      {
        id: 4,
        bg: 'city',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'happy' }, right: { name: 'zara', emotion: 'thinking' } },
        dialogue: [
          { speaker: 'byte', text: "Spotify shows you songs. You like some, skip some. It LEARNS your taste!" },
          { speaker: 'zara', text: "Oh WOW! So every tap teaches it something new?" },
          { speaker: 'byte', text: "Every. Single. Tap. That's your training data! 🎵" },
        ],
      },
    ],

    interaction: {
      type: 'feed',
      prompt: '🍽️ Feed Byte the RIGHT training data!',
      helpText: 'Byte is learning to recognize CATS. Tap the cat pictures!',
      items: [
        { id: 1, label: 'Fluffy cat',   emoji: '🐱', isCorrect: true  },
        { id: 2, label: 'Dog',          emoji: '🐶', isCorrect: false },
        { id: 3, label: 'Tabby cat',    emoji: '🐈', isCorrect: true  },
        { id: 4, label: 'Fish',         emoji: '🐟', isCorrect: false },
        { id: 5, label: 'Black cat',    emoji: '🐈‍⬛', isCorrect: true  },
        { id: 6, label: 'Rabbit',       emoji: '🐰', isCorrect: false },
        { id: 7, label: 'Kitten',       emoji: '😺', isCorrect: true  },
        { id: 8, label: 'Hamster',      emoji: '🐹', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Training Time! 🏋️',
      xpReward: 50,
      questions: [
        {
          text: 'What do we call the information AI uses to learn?',
          emoji: '📊',
          options: ['Power supply', 'Training data', 'Computer chips', 'WiFi signal'],
          correct: 1,
          explanation: 'Training data = the examples AI studies to get smarter! 📖',
        },
        {
          text: 'Spotify learns what music you like by...',
          emoji: '🎵',
          options: ['Reading your mind', 'Watching which songs you skip or replay', 'Asking your parents', 'Guessing randomly'],
          correct: 1,
          explanation: 'Every like, skip, and replay is data that teaches Spotify your taste! 🎧',
        },
        {
          text: 'What happens if you give AI BAD training data?',
          emoji: '😱',
          options: ['Nothing changes', 'It learns wrong things', 'It gets faster', 'It gets colder'],
          correct: 1,
          explanation: 'Garbage in, garbage out! Bad data = bad AI. That\'s why good data is SO important! 🗑️',
        },
        {
          text: 'The more examples an AI sees, usually it gets...',
          emoji: '📈',
          options: ['Slower and tired', 'Smarter and more accurate', 'Smaller in size', 'Less useful'],
          correct: 1,
          explanation: 'More examples = more patterns learned = smarter AI! 🚀',
        },
      ],
    },

    badge: { id: 'data_chef', name: 'Data Chef', emoji: '🍳', description: 'You fed Byte training data!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 3 – AI Vision
  // ════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'What Do You See?',
    subtitle: 'AI Can See!',
    icon: '👁️',
    color: '#0EA5E9',
    xpReward: 100,
    concept: 'AI can look at pictures and recognize what\'s in them — just like your eyes!',

    panels: [
      {
        id: 1,
        bg: 'city',
        caption: 'Zara and Byte reach a locked door...',
        characters: { left: { name: 'zara', emotion: 'thinking' }, right: { name: 'byte', emotion: 'thinking' } },
        dialogue: [
          { speaker: 'zara', text: "This door has a camera. It needs to recognize my face! 📷" },
          { speaker: 'byte', text: "That's computer vision! AI that can SEE! 👁️" },
        ],
      },
      {
        id: 2,
        bg: 'lab',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'excited' }, right: { name: 'zara', emotion: 'curious' } },
        dialogue: [
          { speaker: 'byte', text: "AI breaks images into tiny dots called PIXELS. Then it finds patterns!" },
          { speaker: 'zara', text: "Like how I recognize my friend's face even in a dark hallway?" },
          { speaker: 'byte', text: "Exactly! You learned from seeing them 1000s of times! AI does too! 🧩" },
        ],
      },
      {
        id: 3,
        bg: 'school',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'happy' }, right: { name: 'byte', emotion: 'happy' } },
        dialogue: [
          { speaker: 'zara', text: "So Face ID on my phone... it trained on face pictures?" },
          { speaker: 'byte', text: "Millions of them! Doctors also use AI vision to spot diseases in X-rays! 🏥" },
          { speaker: 'zara', text: "Whoa. AI can save lives?!" },
          { speaker: 'byte', text: "Totally! That's why it's so important to learn this stuff! 💪" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '🏷️ Tap every picture that shows computer vision being used!',
      helpText: 'Computer vision = AI that can recognize things in photos or video.',
      items: [
        { id: 1, label: 'Face unlock',      emoji: '😊🔓', isCorrect: true  },
        { id: 2, label: 'Sending a text',   emoji: '💬',   isCorrect: false },
        { id: 3, label: 'Medical X-ray AI', emoji: '🩻',   isCorrect: true  },
        { id: 4, label: 'Playing music',    emoji: '🎵',   isCorrect: false },
        { id: 5, label: 'Self-driving car', emoji: '🚗',   isCorrect: true  },
        { id: 6, label: 'Setting an alarm', emoji: '⏰',   isCorrect: false },
        { id: 7, label: 'Photo filters',    emoji: '🤳',   isCorrect: true  },
        { id: 8, label: 'Charging a phone', emoji: '🔋',   isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Vision Quest! 👁️',
      xpReward: 50,
      questions: [
        {
          text: 'What are the tiny dots that make up a digital image?',
          emoji: '🔬',
          options: ['Atoms', 'Pixels', 'Bytes', 'Squares'],
          correct: 1,
          explanation: 'Images are made of millions of tiny PIXELS. AI reads them like you read letters! 🔍',
        },
        {
          text: 'Face ID on your phone works by...',
          emoji: '🤳',
          options: ['Typing your password', 'Reading your fingerprint', 'AI recognizing your face features', 'Scanning your voice'],
          correct: 2,
          explanation: 'Face ID uses AI vision! It maps hundreds of points on your face. 😮',
        },
        {
          text: 'AI vision in hospitals is used to...',
          emoji: '🏥',
          options: ['Cook food', 'Spot diseases in medical scans', 'Clean floors', 'Answer phones'],
          correct: 1,
          explanation: 'AI can analyze X-rays and MRIs to spot things even doctors might miss! 🩺',
        },
        {
          text: 'For AI to recognize cats, it needs to be trained on...',
          emoji: '🐱',
          options: ['Cat sounds', 'Thousands of cat pictures', 'Cat fur samples', 'Cat names'],
          correct: 1,
          explanation: 'AI vision learns from PICTURES! The more cat pics it sees, the better it gets! 📸',
        },
      ],
    },

    badge: { id: 'vision_master', name: 'Vision Master', emoji: '👁️', description: 'You taught AI to see!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 4 – AI Language (NLP)
  // ════════════════════════════════════════════════════════
  {
    id: 4,
    title: 'Talk to Me!',
    subtitle: 'AI Understands Words',
    icon: '💬',
    color: '#10B981',
    xpReward: 100,
    concept: 'AI can read, understand, and even write language — just like you!',

    panels: [
      {
        id: 1,
        bg: 'school',
        caption: 'Byte got confused by a message...',
        characters: { left: { name: 'byte', emotion: 'confused' }, right: { name: 'zara', emotion: 'laughing' } },
        dialogue: [
          { speaker: 'byte', text: "ERROR! Someone said 'This test is a piece of cake!' I don't see any cake! 🎂😭" },
          { speaker: 'zara', text: "Hahaha! That's a saying! It means the test was EASY!" },
        ],
      },
      {
        id: 2,
        bg: 'lab',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'thinking' }, right: { name: 'byte', emotion: 'listening' } },
        dialogue: [
          { speaker: 'zara', text: "Understanding language is tricky — words can mean different things!" },
          { speaker: 'byte', text: "That's NLP — Natural Language Processing! Teaching AI to understand human words! 📖" },
        ],
      },
      {
        id: 3,
        bg: 'city',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'happy' }, right: { name: 'zara', emotion: 'excited' } },
        dialogue: [
          { speaker: 'byte', text: "Siri, Alexa, Google — they all use NLP!" },
          { speaker: 'zara', text: "And ChatGPT! It can write essays and answer questions!" },
          { speaker: 'byte', text: "Trained on BILLIONS of sentences from the internet! 🌐" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '🗣️ Tap everything that uses AI language skills!',
      helpText: 'NLP = AI that reads, writes, or understands words.',
      items: [
        { id: 1, label: 'ChatGPT',          emoji: '🤖', isCorrect: true  },
        { id: 2, label: 'A street lamp',    emoji: '💡', isCorrect: false },
        { id: 3, label: 'Google Translate', emoji: '🌍', isCorrect: true  },
        { id: 4, label: 'A ruler',          emoji: '📏', isCorrect: false },
        { id: 5, label: 'Spam filters',     emoji: '📧', isCorrect: true  },
        { id: 6, label: 'A clock',          emoji: '⏰', isCorrect: false },
        { id: 7, label: 'Siri / Alexa',     emoji: '🎤', isCorrect: true  },
        { id: 8, label: 'A stapler',        emoji: '📌', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Word Wizard! 🪄',
      xpReward: 50,
      questions: [
        {
          text: 'NLP stands for...',
          emoji: '💬',
          options: ['New Language Program', 'Natural Language Processing', 'Number Logic Path', 'Network Link Protocol'],
          correct: 1,
          explanation: 'NLP = Natural Language Processing. It helps AI understand human language! 🗣️',
        },
        {
          text: 'Google Translate uses AI to...',
          emoji: '🌍',
          options: ['Show you maps', 'Convert words between languages', 'Play music', 'Show the weather'],
          correct: 1,
          explanation: 'Google Translate uses NLP trained on billions of translated sentences! 🔤',
        },
        {
          text: 'An email spam filter uses AI to...',
          emoji: '📧',
          options: ['Send emails faster', 'Detect if an email looks suspicious', 'Add emojis', 'Make emails colorful'],
          correct: 1,
          explanation: 'Spam filters read the words in emails and decide if they look like junk! 🗑️',
        },
        {
          text: 'Why is language hard for AI to understand?',
          emoji: '🤔',
          options: ['Words take too much storage', 'Words can have multiple meanings', 'Letters are too small', 'AI hates reading'],
          correct: 1,
          explanation: '"Cool" can mean temperature OR awesome! Context is everything. That\'s why NLP is so complex! 😂',
        },
      ],
    },

    badge: { id: 'word_wizard', name: 'Word Wizard', emoji: '💬', description: 'You helped AI understand language!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 5 – Recommendations
  // ════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'The Recommender!',
    subtitle: 'AI Knows Your Taste',
    icon: '⭐',
    color: '#F59E0B',
    xpReward: 100,
    concept: 'AI watches what you like, then suggests things you\'ll probably love!',

    panels: [
      {
        id: 1,
        bg: 'school',
        caption: 'Zara is bored after school...',
        characters: { left: { name: 'zara', emotion: 'sad' }, right: { name: 'byte', emotion: 'happy' } },
        dialogue: [
          { speaker: 'zara', text: "Ugh, I don't know what to watch. There are SO many shows! 😩" },
          { speaker: 'byte', text: "Let me help! First — tell me what you like!" },
        ],
      },
      {
        id: 2,
        bg: 'lab',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'thinking' }, right: { name: 'zara', emotion: 'curious' } },
        dialogue: [
          { speaker: 'byte', text: "Netflix watches your taste: what you watch, pause, or skip!" },
          { speaker: 'zara', text: "It's literally watching ME watch TV?" },
          { speaker: 'byte', text: "Yep! Your behavior is the data that trains the recommender! 📊" },
        ],
      },
      {
        id: 3,
        bg: 'city',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'excited' }, right: { name: 'byte', emotion: 'excited' } },
        dialogue: [
          { speaker: 'zara', text: "TikTok keeps showing me exactly what I love! Is that the same thing?!" },
          { speaker: 'byte', text: "100%! TikTok's recommender is SO good, people use it for HOURS! ⚠️" },
          { speaker: 'zara', text: "So I need to be careful... AI can be too good sometimes! 😅" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '⭐ Which apps use recommendation AI?',
      helpText: 'Recommenders suggest things based on what you\'ve liked before!',
      items: [
        { id: 1, label: 'Netflix',         emoji: '🎬', isCorrect: true  },
        { id: 2, label: 'A calculator',    emoji: '🔢', isCorrect: false },
        { id: 3, label: 'Spotify',         emoji: '🎵', isCorrect: true  },
        { id: 4, label: 'A light switch',  emoji: '💡', isCorrect: false },
        { id: 5, label: 'TikTok',          emoji: '📱', isCorrect: true  },
        { id: 6, label: 'A window',        emoji: '🪟', isCorrect: false },
        { id: 7, label: 'Amazon',          emoji: '🛒', isCorrect: true  },
        { id: 8, label: 'A notebook',      emoji: '📓', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Taste Tester! 🎯',
      xpReward: 50,
      questions: [
        {
          text: 'How does Netflix decide what to suggest to you?',
          emoji: '🎬',
          options: ['A person manually picks it', 'It uses your watch history to find patterns', 'It picks randomly', 'It asks your parents'],
          correct: 1,
          explanation: 'Netflix AI studies your viewing history to find patterns in what you enjoy! 📺',
        },
        {
          text: 'What kind of data does Spotify use to learn your music taste?',
          emoji: '🎵',
          options: ['Your name and age', 'What songs you play, skip, or replay', 'Your school grades', 'Your location only'],
          correct: 1,
          explanation: 'Every play and skip teaches Spotify what sounds you love! 🎧',
        },
        {
          text: 'Why might recommender AI be risky?',
          emoji: '⚠️',
          options: ['It can break your phone', 'It can keep you glued to a screen for too long', 'It uses too much electricity', 'It makes your eyes glow'],
          correct: 1,
          explanation: 'Super-accurate recommendations can make apps addictive. Digital wellness matters! 🧘',
        },
        {
          text: 'Amazon suggests products based on...',
          emoji: '🛒',
          options: ['What color you like', 'Your past purchases and browsing', 'Your height and weight', 'Your favorite color'],
          correct: 1,
          explanation: 'Amazon tracks what you browse and buy, then suggests things you might want! 🎁',
        },
      ],
    },

    badge: { id: 'trend_spotter', name: 'Trend Spotter', emoji: '⭐', description: 'You understand recommendation AI!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 6 – Decision Making / Decision Trees
  // ════════════════════════════════════════════════════════
  {
    id: 6,
    title: 'Fork in the Road!',
    subtitle: 'AI Makes Decisions',
    icon: '🧭',
    color: '#F97316',
    xpReward: 100,
    concept: 'AI makes decisions by asking YES/NO questions — just like a choose-your-own-adventure book!',

    panels: [
      {
        id: 1,
        bg: 'space',
        caption: 'Zara and Byte find themselves in a maze...',
        characters: { left: { name: 'zara', emotion: 'thinking' }, right: { name: 'byte', emotion: 'thinking' } },
        dialogue: [
          { speaker: 'zara', text: "So many paths! How does AI decide which way to go?" },
          { speaker: 'byte', text: "It uses something called a DECISION TREE! 🌳" },
        ],
      },
      {
        id: 2,
        bg: 'lab',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'excited' }, right: { name: 'zara', emotion: 'listening' } },
        dialogue: [
          { speaker: 'byte', text: "It asks YES or NO questions, one at a time, until it reaches an answer!" },
          { speaker: 'zara', text: "Like: 'Is it raining? YES → bring umbrella. NO → leave it home'?" },
          { speaker: 'byte', text: "Perfect example! You just built a mini decision tree! 🌟" },
        ],
      },
      {
        id: 3,
        bg: 'city',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'surprised' }, right: { name: 'byte', emotion: 'happy' } },
        dialogue: [
          { speaker: 'zara', text: "Wait — is that how Gmail decides if an email is spam?!" },
          { speaker: 'byte', text: "'Does it have suspicious words? YES. Does it have unknown links? YES. → SPAM!' 🗑️" },
          { speaker: 'zara', text: "That's so simple! Why didn't I think of that?!" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '🌳 Which of these use decision-making AI?',
      helpText: 'Decision trees answer YES/NO questions to reach a conclusion!',
      items: [
        { id: 1, label: 'Spam filter',       emoji: '📧', isCorrect: true  },
        { id: 2, label: 'A mirror',          emoji: '🪞', isCorrect: false },
        { id: 3, label: 'Loan approval AI',  emoji: '💳', isCorrect: true  },
        { id: 4, label: 'A shoe',            emoji: '👟', isCorrect: false },
        { id: 5, label: 'Game difficulty AI',emoji: '🎮', isCorrect: true  },
        { id: 6, label: 'A water bottle',    emoji: '💧', isCorrect: false },
        { id: 7, label: 'Medical diagnosis', emoji: '🩺', isCorrect: true  },
        { id: 8, label: 'A table',           emoji: '🪑', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Decision Dash! 🏃',
      xpReward: 50,
      questions: [
        {
          text: 'A decision tree makes decisions by asking...',
          emoji: '🌳',
          options: ['Long math formulas', 'Yes/No questions in a sequence', 'Random guesses', 'Only one question total'],
          correct: 1,
          explanation: 'Decision trees branch at every YES/NO question until they reach a final answer! 🎯',
        },
        {
          text: 'An email spam filter\'s first decision tree question might be:',
          emoji: '📧',
          options: ['Is the email purple?', 'Does it contain suspicious words?', 'Was it sent on a Monday?', 'Is it longer than 100 words?'],
          correct: 1,
          explanation: 'Spam filters look for words like "FREE MONEY" or "CLICK NOW" as warning signs! 🚨',
        },
        {
          text: 'Why are decision trees useful for AI?',
          emoji: '🤔',
          options: ['They look like real trees', 'They make decisions fast and are easy to understand', 'They need less electricity', 'They work only for games'],
          correct: 1,
          explanation: 'Decision trees are fast AND humans can understand WHY they made a decision! That\'s powerful! 💡',
        },
        {
          text: 'A game that makes itself harder when you win uses...',
          emoji: '🎮',
          options: ['Pure luck', 'Decision-making AI based on your performance', 'Extra batteries', 'A bigger screen'],
          correct: 1,
          explanation: 'Adaptive game difficulty uses AI to keep the game challenging but not impossible! 🎯',
        },
      ],
    },

    badge: { id: 'decision_maker', name: 'Decision Maker', emoji: '🌳', description: 'You mastered AI decision trees!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 7 – What is an AI Agent?
  // ════════════════════════════════════════════════════════
  {
    id: 7,
    title: 'Agent Academy!',
    subtitle: 'AI That Takes Action',
    icon: '🕵️',
    color: '#8B5CF6',
    xpReward: 100,
    concept: 'An AI agent is an AI that can take ACTIONS to reach a goal — not just answer questions!',

    panels: [
      {
        id: 1,
        bg: 'lab',
        caption: 'Byte has exciting news...',
        characters: { left: { name: 'byte', emotion: 'excited' }, right: { name: 'zara', emotion: 'curious' } },
        dialogue: [
          { speaker: 'byte', text: "Zara! Ready for the NEXT level? We're going to build an AI AGENT!" },
          { speaker: 'zara', text: "What's the difference between AI and an AI agent?" },
        ],
      },
      {
        id: 2,
        bg: 'space',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'thinking' }, right: { name: 'zara', emotion: 'listening' } },
        dialogue: [
          { speaker: 'byte', text: "Regular AI: you ask, it answers. That's it! 💬" },
          { speaker: 'byte', text: "AI Agent: it has a GOAL and takes ACTIONS on its own to reach it! 🎯" },
          { speaker: 'zara', text: "Like a robot with a mission?!" },
          { speaker: 'byte', text: "Exactly! SENSE → THINK → ACT — again and again! ⚡" },
        ],
      },
      {
        id: 3,
        bg: 'city',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'excited' }, right: { name: 'byte', emotion: 'happy' } },
        dialogue: [
          { speaker: 'zara', text: "So a self-driving car is an agent? It senses the road, thinks, then steers?" },
          { speaker: 'byte', text: "100%! And customer service chatbots! They listen, think, then respond! 🤖" },
          { speaker: 'zara', text: "I want to build one! Can I??" },
          { speaker: 'byte', text: "That's EXACTLY what we're doing next! 🔨✨" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '🕵️ Which of these are AI AGENTS (they take action with a goal)?',
      helpText: 'Agents SENSE their environment, THINK, and take ACTION!',
      items: [
        { id: 1, label: 'Self-driving car',    emoji: '🚗', isCorrect: true  },
        { id: 2, label: 'A photo album',       emoji: '📸', isCorrect: false },
        { id: 3, label: 'Customer service bot',emoji: '💬', isCorrect: true  },
        { id: 4, label: 'A dictionary',        emoji: '📚', isCorrect: false },
        { id: 5, label: 'Delivery drone',      emoji: '🚁', isCorrect: true  },
        { id: 6, label: 'A stapler',           emoji: '📎', isCorrect: false },
        { id: 7, label: 'Game AI opponent',    emoji: '🎮', isCorrect: true  },
        { id: 8, label: 'A calendar',          emoji: '📅', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Agent Training! 🎓',
      xpReward: 50,
      questions: [
        {
          text: 'An AI agent is different from regular AI because it...',
          emoji: '🕵️',
          options: ['Is much bigger', 'Takes actions on its own to reach a goal', 'Only works on phones', 'Needs an internet connection'],
          correct: 1,
          explanation: 'AI agents SENSE, THINK, and ACT in a loop to reach their goal! 🎯',
        },
        {
          text: 'The SENSE → THINK → ACT loop means...',
          emoji: '🔄',
          options: ['The agent takes one action and stops', 'The agent keeps observing and responding to changes', 'The agent needs a human for every step', 'The agent only works at night'],
          correct: 1,
          explanation: 'Great agents constantly sense their environment and adjust their actions! 🌊',
        },
        {
          text: 'Which of these best describes an AI agent?',
          emoji: '🤖',
          options: ['A calculator that adds numbers', 'A self-driving car that navigates to a destination', 'A clock that shows time', 'A light that turns on/off'],
          correct: 1,
          explanation: 'A self-driving car has a goal (destination), senses the road, and acts (steers)! Classic agent! 🚗',
        },
        {
          text: 'A chatbot that answers FAQ questions is an example of...',
          emoji: '💬',
          options: ['A database', 'An AI agent that helps users reach their goal', 'A video game', 'A spreadsheet'],
          correct: 1,
          explanation: 'Good chatbots sense what you need, think about the best response, and act by replying! 🎯',
        },
      ],
    },

    badge: { id: 'agent_recruit', name: 'Agent Recruit', emoji: '🕵️', description: 'You understand AI agents!' },
  },

  // ════════════════════════════════════════════════════════
  // CHAPTER 8 – Build Your AI Agent (FINAL CHAPTER)
  // ════════════════════════════════════════════════════════
  {
    id: 8,
    title: 'Your Creation!',
    subtitle: 'Build Your AI Agent',
    icon: '⚡',
    color: '#EF4444',
    xpReward: 150,   // Bonus XP for final chapter!
    concept: 'You\'ve learned it all — now it\'s time to BUILD your very own AI agent!',

    panels: [
      {
        id: 1,
        bg: 'lab',
        caption: 'The final challenge begins...',
        characters: { left: { name: 'zara', emotion: 'excited' }, right: { name: 'byte', emotion: 'proud' } },
        dialogue: [
          { speaker: 'byte', text: "Zara... you've learned about AI, training, vision, language, and agents!" },
          { speaker: 'zara', text: "I still can't believe how much I know now! 😲" },
        ],
      },
      {
        id: 2,
        bg: 'space',
        caption: null,
        characters: { left: { name: 'byte', emotion: 'excited' }, right: { name: 'zara', emotion: 'determined' } },
        dialogue: [
          { speaker: 'byte', text: "Now it's YOUR turn! Build your own AI agent using everything you've learned!" },
          { speaker: 'zara', text: "I'm going to build an agent that helps kids with homework! 📚" },
          { speaker: 'byte', text: "AMAZING idea! Let's do it! Time to BUILD! 🔨⚡" },
        ],
      },
      {
        id: 3,
        bg: 'sky',
        caption: null,
        characters: { left: { name: 'zara', emotion: 'happy' }, right: { name: 'byte', emotion: 'happy' } },
        dialogue: [
          { speaker: 'byte', text: "Remember: TRIGGER → CONDITION → ACTION. You've got this! 💪" },
          { speaker: 'zara', text: "I never thought I'd say this but... I LOVE AI! 🤖❤️" },
          { speaker: 'byte', text: "And the future of AI? It's being built by explorers like YOU! 🌟" },
        ],
      },
    ],

    interaction: {
      type: 'sort',
      prompt: '🏆 What should a great AI agent be able to do?',
      helpText: 'Think about your AI agent — what makes it helpful and responsible?',
      items: [
        { id: 1, label: 'Understand questions',  emoji: '❓', isCorrect: true  },
        { id: 2, label: 'Say mean things',       emoji: '😡', isCorrect: false },
        { id: 3, label: 'Give helpful answers',  emoji: '✅', isCorrect: true  },
        { id: 4, label: 'Make things up',        emoji: '🤥', isCorrect: false },
        { id: 5, label: 'Be safe to use',        emoji: '🛡️', isCorrect: true  },
        { id: 6, label: 'Ignore the user',       emoji: '🙈', isCorrect: false },
        { id: 7, label: 'Keep improving',        emoji: '📈', isCorrect: true  },
        { id: 8, label: 'Spread fake info',      emoji: '📢', isCorrect: false },
      ],
    },

    miniGame: {
      type: 'quiz',
      title: 'Final Boss Quiz! 🏆',
      xpReward: 75,   // Bonus XP!
      questions: [
        {
          text: 'When building an AI agent, what should come FIRST?',
          emoji: '🔨',
          options: ['Making it look pretty', 'Defining its goal clearly', 'Adding lots of features', 'Testing on strangers'],
          correct: 1,
          explanation: 'Always start with a CLEAR GOAL. What problem is your agent solving? 🎯',
        },
        {
          text: 'What is a TRIGGER in an AI agent?',
          emoji: '⚡',
          options: ['A way to turn it off', 'The event that starts the agent\'s response', 'A type of data storage', 'A visual design element'],
          correct: 1,
          explanation: 'A trigger is what STARTS your agent\'s action — like "when user says hello"! 🔔',
        },
        {
          text: 'Why is it important for AI agents to be honest?',
          emoji: '🛡️',
          options: ['To look smart', 'To build trust and avoid causing harm', 'To use less battery', 'To run faster'],
          correct: 1,
          explanation: 'Responsible AI is honest. AI that lies or misleads can cause real harm! ⚠️',
        },
        {
          text: 'You\'ve now completed LearnAI! What are you?',
          emoji: '🌟',
          options: ['A confused student', 'An AI Explorer who understands how AI works!', 'A professional programmer', 'A robot scientist'],
          correct: 1,
          explanation: 'YOU DID IT! You understand AI concepts that most adults don\'t! Go build something amazing! 🚀🎉',
        },
      ],
    },

    badge: { id: 'ai_creator', name: 'AI Creator', emoji: '⚡', description: 'You built your first AI agent!' },
  },

]

// ── Helper: get chapter by ID ──────────────────────────────
export function getChapter(id) {
  return chapters.find(c => c.id === Number(id))
}

// ── Total XP available in the game ────────────────────────
export const TOTAL_XP = chapters.reduce(
  (sum, c) => sum + c.xpReward + (c.miniGame?.xpReward ?? 50),
  0
)
