import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch {
      setError('Connexion impossible. Vérifie ton email et ton mot de passe.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app" style={{ justifyContent: 'center', padding: '0 20px' }}>
      <Card neo style={{ maxWidth: 360, margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: 19, fontWeight: 700, marginBottom: 4 }}>Miracle Routine</h1>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 20 }}>Connexion</p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            className="field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="field"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: 'var(--negative)', fontSize: 13 }}>{error}</p>}
          <button className="btn btn--primary btn--block" type="submit" disabled={submitting}>
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </Card>
    </div>
  )
}
