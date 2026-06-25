// ResetPasswordScreen.jsx – landing page for the password-reset email link
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGame } from '../../context/GameContext'
import { S } from '../../tokens'
import { Sparky } from '../ui/Characters'
import { ComicButton, Halftone } from '../ui/ComicPrimitives'

const inputStyle = {
  width: '100%', padding: '12px 14px', fontFamily: S.fontUI, fontSize: 16,
  border: `2.5px solid ${S.ink}`, borderRadius: 14, background: '#fff',
  boxSizing: 'border-box', color: S.ink,
}

export default function ResetPasswordScreen() {
  const navigate = useNavigate()
  const { confirmPasswordReset } = useGame()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await confirmPasswordReset(token, password)
      setDone(true)
    } catch {
      setError('That reset link is invalid or has expired. Request a new one.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
      <Halftone color={S.coralDeep} op={0.05} size={5} />
      <div style={{ padding: '40px 24px 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center' }}>
          <Sparky size={110} expression={done ? 'excited' : 'thinking'} />
          <div style={{ fontFamily: S.fontDisplay, fontSize: 24, color: S.ink, marginTop: 10 }}>
            {done ? 'PASSWORD UPDATED!' : 'CHOOSE A NEW PASSWORD'}
          </div>
        </div>

        {done ? (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} onClick={() => navigate('/auth', { replace: true })}>
              SIGN IN
            </ComicButton>
          </div>
        ) : !token ? (
          <div style={{ marginTop: 24, fontFamily: S.fontUI, color: S.ink, textAlign: 'center' }}>
            This link is missing its reset token. Please use the link from your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontFamily: S.fontUI, fontWeight: 800, fontSize: 13, color: S.inkSoft, display: 'block', marginBottom: 6 }}>
                New password
              </span>
              <input
                style={inputStyle}
                type="password"
                autoComplete="new-password"
                minLength={10}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            {error && (
              <div role="alert" style={{ background: S.peach, border: `2px solid ${S.ink}`, borderRadius: 12, padding: '10px 14px', fontFamily: S.fontUI, fontSize: 14, color: S.ink, marginBottom: 14 }}>
                {error}
              </div>
            )}

            <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} disabled={busy}>
              {busy ? '…' : 'UPDATE PASSWORD'}
            </ComicButton>
          </form>
        )}
      </div>
    </div>
  )
}
