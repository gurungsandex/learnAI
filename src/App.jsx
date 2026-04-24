import { Routes, Route, Navigate } from 'react-router-dom'
import { useGame } from './context/GameContext'

import SplashScreen      from './components/screens/SplashScreen'
import OnboardingScreen  from './components/screens/OnboardingScreen'
import HomeScreen        from './components/screens/HomeScreen'
import ChapterScreen     from './components/screens/ChapterScreen'
import MiniGameScreen    from './components/screens/MiniGameScreen'
import AIBuilderScreen   from './components/screens/AIBuilderScreen'
import ProfileScreen     from './components/screens/ProfileScreen'
import CertificateScreen from './components/screens/CertificateScreen'

export default function App() {
  const { state } = useGame()

  return (
    <div className="relative min-h-dvh bg-bg-deep overflow-x-hidden">
      <Routes>
        {/* Splash is always the first screen */}
        <Route path="/"             element={<SplashScreen />} />

        {/* Onboarding (first-time setup) */}
        <Route path="/onboarding"   element={<OnboardingScreen />} />

        {/* Main game hub (adventure map) */}
        <Route path="/home"         element={<HomeScreen />} />

        {/* Chapter story + interaction  :id = chapter number 1-8 */}
        <Route path="/chapter/:id"  element={<ChapterScreen />} />

        {/* Mini game for a chapter      :id = chapter number 1-8 */}
        <Route path="/minigame/:id" element={<MiniGameScreen />} />

        {/* AI Agent Builder */}
        <Route path="/builder"      element={<AIBuilderScreen />} />

        {/* Player profile + badges */}
        <Route path="/profile"      element={<ProfileScreen />} />

        {/* Completion certificate */}
        <Route path="/certificate"  element={<CertificateScreen />} />

        {/* Fallback */}
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
