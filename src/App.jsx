import { Routes, Route, Navigate } from 'react-router-dom'
import { useGame } from './context/GameContext'

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
    <div className="relative min-h-dvh overflow-x-hidden">
      <Routes>
        <Route path="/"             element={<Navigate to={state.onboardingDone ? '/home' : '/onboarding'} replace />} />
        <Route path="/onboarding"   element={<OnboardingScreen />} />
        <Route path="/home"         element={<HomeScreen />} />
        <Route path="/chapter/:id"  element={<ChapterScreen />} />
        <Route path="/minigame/:id" element={<MiniGameScreen />} />
        <Route path="/builder"      element={<AIBuilderScreen />} />
        <Route path="/profile"      element={<ProfileScreen />} />
        <Route path="/certificate"  element={<CertificateScreen />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
