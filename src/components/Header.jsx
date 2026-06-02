import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import Logo from './Logo'
import styles from './Header.module.css'

export default function Header() {
  const { theme, setTheme, themes } = useTheme()
  const [showThemes, setShowThemes] = useState(false)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <Logo size={32} />
        <span className={styles.logoText}>SwiftKeys</span>
      </Link>

      <nav className={styles.nav}>
        <NavLink to="/focus" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
          focus
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
          history
        </NavLink>

        <div className={styles.themePicker}>
          <button className={styles.themeBtn} onClick={() => setShowThemes(v => !v)} title="themes">
            <PaletteIcon />
          </button>
          {showThemes && (
            <div className={styles.themeDropdown}>
              {themes.map(t => (
                <button
                  key={t}
                  className={`${styles.themeOption} ${theme === t ? styles.themeOptionActive : ''}`}
                  onClick={() => { setTheme(t); setShowThemes(false) }}
                >{t}</button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

function PaletteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  )
}
