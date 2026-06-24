import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import Logo from './Logo'
import styles from './Header.module.css'

const PAGES = [
  { to: '/', label: 'type test', desc: 'practice typing', end: true },
  { to: '/focus', label: 'focus', desc: 'weak spots & key heatmap' },
  { to: '/history', label: 'history', desc: 'results, streak & goal' },
]

export default function Header() {
  const { theme, setTheme, themes } = useTheme()
  const [open, setOpen] = useState(false)

  // Close the menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink} onClick={() => setOpen(false)}>
        <Logo size={32} />
        <span className={styles.logoText}>SwiftKeys</span>
      </Link>

      <button
        className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {open && (
        <>
          <div className={styles.backdrop} onClick={() => setOpen(false)} />
          <div className={styles.menu}>
            <p className={styles.menuHeading}>navigate</p>
            {PAGES.map(p => (
              <NavLink
                key={p.to}
                to={p.to}
                end={p.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
              >
                <span className={styles.menuLabel}>{p.label}</span>
                <span className={styles.menuDesc}>{p.desc}</span>
              </NavLink>
            ))}

            <div className={styles.menuDivider} />
            <p className={styles.menuHeading}>theme</p>
            <div className={styles.themeRow}>
              {themes.map(t => (
                <button
                  key={t}
                  className={`${styles.themeChip} ${theme === t ? styles.themeChipActive : ''}`}
                  onClick={() => setTheme(t)}
                >{t}</button>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
