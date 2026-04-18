'use client'

import { useState } from 'react'

interface Props {
  onBack: () => void
  onSignUp: () => void
}

const accentColor = '#7C5CFC'

export default function SignIn({ onBack, onSignUp }: Props) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background: '#0E0E18',
    border: `1px solid ${focusedField === name ? accentColor + '80' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: focusedField === name ? `0 0 0 3px ${accentColor}18` : 'none',
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 16,
    color: '#F0F0F8',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, box-shadow 0.2s',
  })

  return (
    <div style={{ width: '100%', maxWidth: 460 }}>

      {/* Mobile logo */}
      <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#1C1C28" />
          <path d="M8 16 C8 11 11.5 8 16 8 C20.5 8 24 11 24 16" stroke="#7C5CFC" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16 C8 21 11.5 24 16 24 C20.5 24 24 21 24 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="#7C5CFC" />
        </svg>
        <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: '#F0F0F8' }}>
          Buildbase
        </span>
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', color: '#60608A',
          fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 32,
          fontFamily: "'DM Sans', sans-serif",
          transition: 'color 0.2s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900,
          color: '#F0F0F8',
          marginBottom: 8,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 16, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          Sign in to continue to Buildbase.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('email')}
            required
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, letterSpacing: '0.01em' }}>Password</label>
            <button
              type="button"
              style={{
                background: 'none', border: 'none', color: accentColor,
                fontSize: 13, cursor: 'pointer', padding: 0,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
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
            style={inputStyle('password')}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-btn-primary"
          style={{
            marginTop: 6,
            padding: '15px 0',
            borderRadius: 12,
            background: loading ? accentColor + '80' : `linear-gradient(135deg, ${accentColor} 0%, #9B7FFF 100%)`,
            border: 'none',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: loading ? 'none' : `0 4px 24px ${accentColor}40`,
            transition: 'all 0.2s',
          }}
        >
          {loading ? <><SpinnerIcon /> Signing in…</> : 'Sign in'}
        </button>
      </form>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontSize: 12, color: '#40405A', letterSpacing: '0.05em' }}>OR</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* GitHub OAuth */}
      <button
        type="button"
        className="auth-btn-secondary"
        style={{
          width: '100%',
          padding: '14px 0',
          borderRadius: 12,
          background: '#13131E',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#F0F0F8',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'all 0.2s',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F0F0F8">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        Continue with GitHub
      </button>

      {/* Sign up link */}
      <p style={{ fontSize: 15, color: '#7070A0', textAlign: 'center', marginTop: 28 }}>
        Don&apos;t have an account?{' '}
        <button
          onClick={onSignUp}
          style={{
            background: 'none', border: 'none', color: accentColor,
            fontSize: 15, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0,
          }}
        >
          Sign up free
        </button>
      </p>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
      <path d="M12 3 A9 9 0 0 1 21 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
