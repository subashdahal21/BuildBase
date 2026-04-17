'use client'

import { useState } from 'react'

interface Props {
  onBack: () => void
  onSignUp: () => void
}

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: '#171720',
  border: '0.5px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  fontSize: 14,
  color: '#F0F0F8',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'DM Sans', sans-serif",
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  color: '#9090B0',
  fontWeight: 500,
  marginBottom: 6,
  display: 'block',
}

export default function SignIn({ onBack, onSignUp }: Props) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const accentColor = '#7C5CFC'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up API
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    border: `0.5px solid ${focusedField === name ? accentColor + '70' : 'rgba(255,255,255,0.1)'}`,
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', color: '#7070A0',
          fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#7070A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 24, fontWeight: 800, color: '#F0F0F8', marginBottom: 6,
        }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 13, color: '#7070A0', fontWeight: 300 }}>
          Sign in to continue to Buildbase.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div>
          <label style={LABEL_STYLE}>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('email')}
            required
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ ...LABEL_STYLE, marginBottom: 0 }}>Password</label>
            <button
              type="button"
              style={{
                background: 'none', border: 'none', color: accentColor,
                fontSize: 12, cursor: 'pointer', padding: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Forgot password?
            </button>
          </div>
          <input
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('password')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            padding: '12px 0',
            borderRadius: 10,
            background: loading ? accentColor + '70' : accentColor,
            border: 'none',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'opacity 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 11, color: '#5050A0' }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* GitHub OAuth placeholder */}
      <button
        type="button"
        style={{
          width: '100%',
          padding: '11px 0',
          borderRadius: 10,
          background: '#1C1C28',
          border: '0.5px solid rgba(255,255,255,0.1)',
          color: '#F0F0F8',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'border-color 0.2s',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#F0F0F8">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        Continue with GitHub
      </button>

      {/* Sign up link */}
      <p style={{ fontSize: 13, color: '#7070A0', textAlign: 'center', marginTop: 24 }}>
        Don&apos;t have an account?{' '}
        <button
          onClick={onSignUp}
          style={{
            background: 'none', border: 'none', color: accentColor,
            fontSize: 13, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: 0,
          }}
        >
          Sign up
        </button>
      </p>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M12 3 A9 9 0 0 1 21 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
