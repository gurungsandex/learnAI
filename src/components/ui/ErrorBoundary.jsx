// ErrorBoundary.jsx – catches render-time crashes so a bug in one screen
// doesn't blank the whole app for a kid. Logs to console (only sink available
// client-only); swap for a real error-reporting service once a backend exists.
import { Component } from 'react'
import { S } from '../../tokens'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('LearnAI crashed:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24,
        background: S.cream, textAlign: 'center', fontFamily: S.fontComic,
      }}>
        <div style={{ fontSize: 48 }}>🤖💥</div>
        <div style={{ fontFamily: S.fontDisplay, fontSize: 20, color: S.ink }}>OOPS, BYTE TRIPPED!</div>
        <div style={{ fontSize: 15, color: S.inkSoft, maxWidth: 280 }}>
          Something went wrong. Your progress is saved — try reloading the page.
        </div>
        <button
          onClick={() => { this.setState({ hasError: false }); window.location.href = '/home' }}
          style={{
            fontFamily: S.fontDisplay, fontSize: 14, color: S.ink, background: S.sun,
            border: `2.5px solid ${S.ink}`, borderRadius: 999, padding: '10px 22px',
            boxShadow: `0 3px 0 ${S.ink}`, cursor: 'pointer',
          }}
        >
          BACK TO MAP
        </button>
      </div>
    )
  }
}
