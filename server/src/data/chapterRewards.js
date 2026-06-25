// Server-side source of truth for XP rewards, mirroring src/data/chapters.js
// in the frontend. The client never gets to dictate how much XP it earned —
// it only reports which chapter id it completed, and the server looks up
// the reward. Keep this in sync with the frontend chapter list.
export const CHAPTER_XP = {
  1: 100, 2: 100, 3: 100, 4: 100, 5: 100, 6: 100, 7: 100, 8: 100,
}
