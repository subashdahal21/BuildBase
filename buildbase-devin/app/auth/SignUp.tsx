'use client'

import { useState } from 'react'
import { Role } from '@/app/auth/page'

interface Props {
  role: NonNullable<Role>
  onBack: () => void
  onSignIn: () => void
  onSuccess: (email: string, role: 'builder' | 'investor') => void
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

export default function SignUp({ role, onBack, onSignIn, onSuccess }: Props) {
  const [form, setForm] = useState({ name: '', email: '', password: '', extra: '' })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const accentColor = role === 'builder' ? '#7C5CFC' : '#F59E0B'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up real API — mock delay for now
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)
    onSuccess(form.email, role)
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    border: `0.5px solid ${
      focusedField === name ? accentColor + '70' : 'rgba(255,255,255,0.1)'
    }`,
    transition: 'border-color 0.2s',
  })

  return (
    <div style={{ width: '100%', maxWidth: 400 }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          color: '#7070A0',
          fontSize: 13,
          cursor: 'pointer',
          padding: 0,
          marginBottom: 28,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="#7070A0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: accentColor + '15',
            border: `0.5px solid ${accentColor}30`,
            borderRadius: 999,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: 600,
            color: accentColor,
            marginBottom: 12,
          }}
        >
          {role === 'builder' ? (
            <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
              <path
                d="M6 8L2 11L6 14"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8L20 11L16 14"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 4L9 18"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 22 22" fill="none">
              <path
                d="M3 16L8 10L12 13L19 6"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 6H19V10"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {role === 'builder' ? 'Builder Account' : 'Investor Account'}
        </div>
        <h2
          style={{
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: '#F0F0F8',
            marginBottom: 6,
          }}
        >
          Create your account
        </h2>
        <p style={{ fontSize: 13, color: '#7070A0', fontWeight: 300 }}>
          {role === 'builder'
            ? 'Start building and connecting with investors.'
            : 'Discover and fund the next generation of builders.'}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <div>
          <label style={LABEL_STYLE}>Full name</label>
          <input
            type="text"
            placeholder="Mahesh Neupane"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('name')}
            required
          />
        </div>

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
          <label style={LABEL_STYLE}>Password</label>
          <input
            type="password"
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('password')}
            required
            minLength={8}
          />
        </div>

        {/* Role-specific field */}
        <div>
          <label style={LABEL_STYLE}>
            {role === 'builder' ? 'GitHub username (optional)' : 'Investment range'}
          </label>
          <input
            type="text"
            placeholder={role === 'builder' ? 'github-handle' : 'e.g. $25K–$100K'}
            value={form.extra}
            onChange={e => setForm(f => ({ ...f, extra: e.target.value }))}
            onFocus={() => setFocusedField('extra')}
            onBlur={() => setFocusedField(null)}
            style={fieldStyle('extra')}
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
              Creating account&hellip;
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      {/* Terms */}
      <p
        style={{
          fontSize: 11,
          color: '#50507080',
          textAlign: 'center',
          marginTop: 16,
          lineHeight: 1.6,
        }}
      >
        By continuing you agree to our{' '}
        <span style={{ color: accentColor, cursor: 'pointer' }}>Terms</span> and{' '}
        <span style={{ color: accentColor, cursor: 'pointer' }}>Privacy Policy</span>.
      </p>

      {/* Sign in link */}
      <p
        style={{
          fontSize: 13,
          color: '#7070A0',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Already have an account?{' '}
        <button
          onClick={onSignIn}
          style={{
            background: 'none',
            border: 'none',
            color: accentColor,
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: 0,
          }}
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path
        d="M12 3 A9 9 0 0 1 21 12"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
