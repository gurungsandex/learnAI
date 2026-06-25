// AuthScreen.jsx – parent sign-up / sign-in / forgot-password
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../context/GameContext'
import { S } from '../../tokens'
import { Sparky } from '../ui/Characters'
import { ComicButton, Icon, Halftone } from '../ui/ComicPrimitives'

const inputStyle = {
  width: '100%', padding: '12px 14px', fontFamily: S.fontUI, fontSize: 16,
  border: `2.5px solid ${S.ink}`, borderRadius: 14, background: '#fff',
  boxSizing: 'border-box', color: S.ink,
}

function Field({ label, ...props }) {
  return (
    <label style={{ display: 'block', marginBottom: 14 }}>
      <span style={{ fontFamily: S.fontUI, fontWeight: 800, fontSize: 13, color: S.inkSoft, display: 'block', marginBottom: 6 }}>
        {label}
      </span>
      <input style={inputStyle} {...props} />
    </label>
  )
}

export default function AuthScreen() {
  const navigate = useNavigate()
  const { register, login, requestPasswordReset } = useGame()
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setBusy(true)
    try {
      if (mode === 'forgot') {
        await requestPasswordReset(email)
        setInfo('If that email is registered, a reset link has been sent.')
      } else if (mode === 'register') {
        await register(email, password)
        navigate('/onboarding', { replace: true })
      } else {
        await login(email, password)
        navigate('/home', { replace: true })
      }
    } catch (err) {
      setError(mode === 'register' && /409/.test(err.message)
        ? 'That email is already registered. Try signing in instead.'
        : mode === 'forgot' ? 'Something went wrong. Please try again.'
        : 'Incorrect email or password.')
    } finally {
      setBusy(false)
    }
  }

  const title = mode === 'register' ? 'CREATE A PARENT ACCOUNT' : mode === 'forgot' ? 'RESET YOUR PASSWORD' : 'WELCOME BACK'
  const cta = mode === 'register' ? 'SIGN UP' : mode === 'forgot' ? 'SEND RESET LINK' : 'SIGN IN'

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: S.paper, overflow: 'hidden' }}>
      <Halftone color={S.coralDeep} op={0.05} size={5} />
      <div style={{ padding: '40px 24px 24px', display: 'flex', flexDirection: 'column', minHeight: '100dvh', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center' }}>
          <Sparky size={110} expression="thinking" />
          <div style={{ fontFamily: S.fontDisplay, fontSize: 24, color: S.ink, marginTop: 10, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontFamily: S.fontComic, fontSize: 15, color: S.inkSoft, marginTop: 6 }}>
            Parents manage the account — kids get their own profile inside.
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {mode !== 'forgot' && (
            <Field
              label="Password"
              type="password"
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              minLength={mode === 'register' ? 10 : undefined}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          )}

          {error && (
            <div role="alert" style={{ background: S.peach, border: `2px solid ${S.ink}`, borderRadius: 12, padding: '10px 14px', fontFamily: S.fontUI, fontSize: 14, color: S.ink, marginBottom: 14 }}>
              {error}
            </div>
          )}
          {info && (
            <div role="status" style={{ background: S.mint, border: `2px solid ${S.ink}`, borderRadius: 12, padding: '10px 14px', fontFamily: S.fontUI, fontSize: 14, color: S.ink, marginBottom: 14 }}>
              {info}
            </div>
          )}

          <ComicButton size="lg" bg={S.coral} style={{ width: '100%' }} disabled={busy}>
            {busy ? '…' : cta}
          </ComicButton>
        </form>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', fontFamily: S.fontUI, fontSize: 14 }}>
          {mode === 'login' && (
            <>
              <button type="button" onClick={() => { setMode('forgot'); setError(null); setInfo(null) }} style={{ background: 'none', border: 'none', color: S.navyDeep, fontWeight: 800, cursor: 'pointer' }}>
                Forgot your password?
              </button>
              <button type="button" onClick={() => { setMode('register'); setError(null); setInfo(null) }} style={{ background: 'none', border: 'none', color: S.inkSoft, cursor: 'pointer' }}>
                New here? <span style={{ color: S.coralDeep, fontWeight: 800 }}>Create an account</span>
              </button>
            </>
          )}
          {mode !== 'login' && (
            <button type="button" onClick={() => { setMode('login'); setError(null); setInfo(null) }} style={{ background: 'none', border: 'none', color: S.inkSoft, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="arrowback" size={16} /> Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
