import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ROWS } from '../data/keyboardLayout'
import styles from './MiniKeyboard.module.css'

export default function MiniKeyboard() {
  const [pressed, setPressed] = useState(() => new Set())

  useEffect(() => {
    const down = e => setPressed(prev => {
      if (prev.has(e.code)) return prev
      const next = new Set(prev)
      next.add(e.code)
      return next
    })
    const up = e => setPressed(prev => {
      if (!prev.has(e.code)) return prev
      const next = new Set(prev)
      next.delete(e.code)
      return next
    })
    const clear = () => setPressed(new Set())

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', clear)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', clear)
    }
  }, [])

  return createPortal(
    <div className={styles.keyboard} aria-hidden="true">
      {ROWS.map((row, ri) => (
        <div key={ri} className={styles.row}>
          {row.map(key => (
            <span
              key={key.code}
              style={{ flexGrow: key.w || 1 }}
              className={`${styles.key} ${pressed.has(key.code) ? styles.active : ''}`}
            >
              {key.label}
            </span>
          ))}
        </div>
      ))}
    </div>,
    document.body
  )
}
