import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import styles from './AuthModal.module.css'

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true)
    const fn = mode === 'login' ? signIn : signUp
    const { error: err } = await fn(email, password)
    setLoading(false)
    if (err) { setError(err.message) }
    else if (mode === 'signup') { setMessage('Check your email to confirm.') }
    else { onClose() }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.tabs}>
          <button className={mode === 'login' ? styles.tabActive : ''} onClick={() => setMode('login')}>login</button>
          <button className={mode === 'signup' ? styles.tabActive : ''} onClick={() => setMode('signup')}>register</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input className={styles.input} type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          <input className={styles.input} type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? '…' : mode === 'login' ? 'login' : 'create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
