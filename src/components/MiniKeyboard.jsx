import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './MiniKeyboard.module.css'

// Each key: physical event.code + the label to show. `w` is a flex-grow
// multiplier so wider keys (Backspace, Shift, Space…) look right.
const ROWS = [
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' }, { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' }, { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' }, { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' }, { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' }, { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' }, { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '⌫', w: 2 },
  ],
  [
    { code: 'Tab', label: 'tab', w: 1.5 },
    { code: 'KeyQ', label: 'q' }, { code: 'KeyW', label: 'w' },
    { code: 'KeyE', label: 'e' }, { code: 'KeyR', label: 'r' },
    { code: 'KeyT', label: 't' }, { code: 'KeyY', label: 'y' },
    { code: 'KeyU', label: 'u' }, { code: 'KeyI', label: 'i' },
    { code: 'KeyO', label: 'o' }, { code: 'KeyP', label: 'p' },
    { code: 'BracketLeft', label: '[' }, { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', w: 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'caps', w: 1.75 },
    { code: 'KeyA', label: 'a' }, { code: 'KeyS', label: 's' },
    { code: 'KeyD', label: 'd' }, { code: 'KeyF', label: 'f' },
    { code: 'KeyG', label: 'g' }, { code: 'KeyH', label: 'h' },
    { code: 'KeyJ', label: 'j' }, { code: 'KeyK', label: 'k' },
    { code: 'KeyL', label: 'l' }, { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: '↵', w: 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: '⇧', w: 2.25 },
    { code: 'KeyZ', label: 'z' }, { code: 'KeyX', label: 'x' },
    { code: 'KeyC', label: 'c' }, { code: 'KeyV', label: 'v' },
    { code: 'KeyB', label: 'b' }, { code: 'KeyN', label: 'n' },
    { code: 'KeyM', label: 'm' }, { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' }, { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: '⇧', w: 2.25 },
  ],
  [
    { code: 'Space', label: '', w: 12 },
  ],
]

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
