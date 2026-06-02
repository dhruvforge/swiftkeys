import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
  dark: {
    '--bg': '#0e0d16',
    '--bg-secondary': 'rgba(255,255,255,0.042)',
    '--text': '#e2e0d8',
    '--text-secondary': '#5a5d65',
    '--accent': '#e2b714',
    '--correct': '#d1cfca',
    '--incorrect': '#e05252',
    '--cursor': '#e2b714',
    '--glass-bg': 'rgba(255,255,255,0.042)',
    '--glass-border': 'rgba(255,255,255,0.075)',
    '--orb1': 'rgba(82,42,140,0.38)',
    '--orb2': 'rgba(28,65,130,0.32)',
  },
  light: {
    '--bg': '#f0eff8',
    '--bg-secondary': 'rgba(0,0,0,0.04)',
    '--text': '#1e1c2e',
    '--text-secondary': '#888a96',
    '--accent': '#7c4dff',
    '--correct': '#1e1c2e',
    '--incorrect': '#e03a3a',
    '--cursor': '#7c4dff',
    '--glass-bg': 'rgba(255,255,255,0.55)',
    '--glass-border': 'rgba(0,0,0,0.08)',
    '--orb1': 'rgba(140,110,220,0.22)',
    '--orb2': 'rgba(80,130,220,0.18)',
  },
  ocean: {
    '--bg': '#080f1a',
    '--bg-secondary': 'rgba(100,200,255,0.04)',
    '--text': '#a8dce8',
    '--text-secondary': '#2e5f78',
    '--accent': '#00d4ff',
    '--correct': '#a8dce8',
    '--incorrect': '#e05252',
    '--cursor': '#00d4ff',
    '--glass-bg': 'rgba(0,180,255,0.05)',
    '--glass-border': 'rgba(0,180,255,0.1)',
    '--orb1': 'rgba(0,100,180,0.4)',
    '--orb2': 'rgba(0,160,200,0.25)',
  },
  forest: {
    '--bg': '#080f08',
    '--bg-secondary': 'rgba(100,200,100,0.04)',
    '--text': '#b8d8b0',
    '--text-secondary': '#3a5c38',
    '--accent': '#5dbe6e',
    '--correct': '#b8d8b0',
    '--incorrect': '#e05252',
    '--cursor': '#5dbe6e',
    '--glass-bg': 'rgba(80,180,80,0.05)',
    '--glass-border': 'rgba(80,180,80,0.1)',
    '--orb1': 'rgba(30,90,30,0.45)',
    '--orb2': 'rgba(20,60,40,0.35)',
  },
  rose: {
    '--bg': '#120810',
    '--bg-secondary': 'rgba(255,100,180,0.04)',
    '--text': '#ecc8e4',
    '--text-secondary': '#6b3a60',
    '--accent': '#ff6b9d',
    '--correct': '#ecc8e4',
    '--incorrect': '#ff4444',
    '--cursor': '#ff6b9d',
    '--glass-bg': 'rgba(255,80,160,0.05)',
    '--glass-border': 'rgba(255,80,160,0.1)',
    '--orb1': 'rgba(120,30,90,0.42)',
    '--orb2': 'rgba(80,10,60,0.35)',
  },
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('swiftkeys-theme') || 'dark')

  useEffect(() => {
    const vars = themes[theme]
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
    localStorage.setItem('swiftkeys-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: Object.keys(themes) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
