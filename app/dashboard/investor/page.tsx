export default function InvestorDashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C0C12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        background: '#171720',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '40px 48px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💼</div>
        <h1 style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: 28, fontWeight: 800, color: '#F59E0B', marginBottom: 8,
        }}>
          Hello, Investor!
        </h1>
        <p style={{ fontSize: 14, color: '#7070A0' }}>
          Your investor dashboard is coming soon.
        </p>
      </div>
    </div>
  )
}