'use client'

import { useState } from 'react'
import { Role } from '@/app/auth/page'

interface Props {
  role: Role
  onBack: () => void
  onSignIn: () => void
}

export default function SignUp({ role, onBack, onSignIn }: Props) {
  const [form, setForm] = useState({ name: '', email: '', password: '', extra: '' })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const accentColor = role === 'builder' ? '#7C5CFC' : '#F59E0B'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    window.location.href = '/onboarding'
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

  const gradientBg = role === 'builder'
    ? 'linear-gradient(135deg, #7C5CFC 0%, #9B7FFF 100%)'
    : 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)'

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
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: accentColor + '12',
          border: `1px solid ${accentColor}28`,
          borderRadius: 999, padding: '5px 14px',
          fontSize: 12, fontWeight: 600, color: accentColor,
          marginBottom: 16, letterSpacing: '0.02em',
        }}>
          {role === 'builder' ? (
            <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
              <path d="M6 8L2 11L6 14" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8L20 11L16 14" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 4L9 18" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
              <path d="M3 16L8 10L12 13L19 6" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 6H19V10" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {role === 'builder' ? 'Builder Account' : 'Investor Account'}
        </div>
        <h2 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 'clamp(26px, 4vw, 32px)',
          fontWeight: 900,
          color: '#F0F0F8',
          marginBottom: 8,
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          Create your account
        </h2>
        <p style={{ fontSize: 16, color: '#7070A0', fontWeight: 300, lineHeight: 1.6 }}>
          {role === 'builder'
            ? 'Start building and connecting with investors.'
            : 'Discover and fund the next generation of builders.'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Full name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('name')}
            required
          />
        </div>

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
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('password')}
            required
            minLength={8}
          />
        </div>

        <div>
          <label style={{ fontSize: 13, color: '#8080A8', fontWeight: 500, marginBottom: 8, display: 'block', letterSpacing: '0.01em' }}>
            {role === 'builder' ? 'GitHub username (optional)' : 'Investment range'}
          </label>
          <input
            type="text"
            placeholder={role === 'builder' ? 'github-handle' : 'e.g. $25K–$100K'}
            value={form.extra}
            onChange={e => setForm(f => ({ ...f, extra: e.target.value }))}
            onFocus={() => setFocusedField('extra')}
            onBlur={() => setFocusedField(null)}
            style={inputStyle('extra')}
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
            background: loading ? accentColor + '80' : gradientBg,
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
          {loading ? <><SpinnerIcon color={accentColor} /> Creating account…</> : 'Create account'}
        </button>
      </form>

      {/* Terms */}
      <p style={{ fontSize: 12, color: '#40406080', textAlign: 'center', marginTop: 16, lineHeight: 1.7 }}>
        By continuing you agree to our{' '}
        <span style={{ color: accentColor, cursor: 'pointer' }}>Terms</span> and{' '}
        <span style={{ color: accentColor, cursor: 'pointer' }}>Privacy Policy</span>.
      </p>

      {/* Sign in link */}
      <p style={{ fontSize: 15, color: '#7070A0', textAlign: 'center', marginTop: 24 }}>
        Already have an account?{' '}
        <button
          onClick={onSignIn}
          style={{
            background: 'none', border: 'none', color: accentColor,
            fontSize: 15, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 600, padding: 0,
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

function SpinnerIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
      <path d="M12 3 A9 9 0 0 1 21 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
