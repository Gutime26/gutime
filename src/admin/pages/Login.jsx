import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { login, isAuthenticated } from '../lib/api'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (isAuthenticated()) return <Navigate to="/admin/dashboard" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-root" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--adm-bg)' }}>
      <div className="adm-login">
        <div className="adm-login-logo">GUTIME Admin</div>
        <form onSubmit={handleSubmit}>
          <div className="adm-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="adm-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          {error && <div className="adm-alert adm-alert--error">{error}</div>}
          <button className="adm-btn adm-btn--primary" type="submit" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
            {loading ? 'Accesso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}
