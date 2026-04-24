import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // PWA-friendly base path (change to '/learnai/' if deploying to GitHub Pages subfolder)
  base: '/',
})
