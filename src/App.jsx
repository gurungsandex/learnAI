import { Routes, Route, Navigate } from 'react-router-dom'
import { useGame } from './context/GameContext'

import AuthScreen         from './components/screens/AuthScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen'
import OnboardingScreen  from './components/screens/OnboardingScreen'
import HomeScreen        from './components/screens/HomeScreen'
import ChapterScreen     from './components/screens/ChapterScreen'
import MiniGameScreen    from './components/screens/MiniGameScreen'
import AIBuilderScreen   from './components/screens/AIBuilderScreen'
import ProfileScreen     from './components/screens/ProfileScreen'
import CertificateScreen from './components/screens/CertificateScreen'

// When no backend is configured, the app behaves exactly as before
// (local-only, no accounts). Once VITE_API_URL is set, a parent must sign
// in before reaching onboarding/gameplay.
function RequireAuth({ children }) {
  const { apiEnabled, auth } = useGame()
  if (!apiEnabled) return children
  if (!auth.authChecked) return null
  if (!auth.isAuthenticated) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  const { state, apiEnabled, auth } = useGame()
  const loggedInHome = apiEnabled && !auth.isAuthenticated ? '/auth' : state.onboardingDone ? '/home' : '/onboarding'

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <Routes>
        <Route path="/"              element={<Navigate to={loggedInHome} replace />} />
        <Route path="/auth"          element={<AuthScreen />} />
        <Route path="/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/onboarding"   element={<RequireAuth><OnboardingScreen /></RequireAuth>} />
        <Route path="/home"         element={<RequireAuth><HomeScreen /></RequireAuth>} />
        <Route path="/chapter/:id"  element={<RequireAuth><ChapterScreen /></RequireAuth>} />
        <Route path="/minigame/:id" element={<RequireAuth><MiniGameScreen /></RequireAuth>} />
        <Route path="/builder"      element={<RequireAuth><AIBuilderScreen /></RequireAuth>} />
        <Route path="/profile"      element={<RequireAuth><ProfileScreen /></RequireAuth>} />
        <Route path="/certificate"  element={<RequireAuth><CertificateScreen /></RequireAuth>} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
