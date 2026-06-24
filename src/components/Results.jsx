import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import styles from './Results.module.css'

export default function Results({ stats, wpmHistory, onRestart, saved, isBest }) {
  return (
    <div className={styles.results}>
      {isBest && <p className={styles.bestBadge}>★ new personal best</p>}

      <div className={styles.stats}>
        <Stat label="wpm" value={stats.wpm} accent />
        <Stat label="accuracy" value={`${stats.accuracy}%`} />
        <Stat label="raw" value={stats.raw} />
        <Stat label="consistency" value={`${stats.consistency}%`} />
      </div>

      {wpmHistory.length > 1 && (
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={wpmHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--text-secondary)" opacity={0.15} />
              <XAxis dataKey="second" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, color: 'var(--text)' }} labelStyle={{ color: 'var(--text-secondary)' }} />
              <Line type="monotone" dataKey="wpm" stroke="var(--accent)" strokeWidth={2} dot={false} name="wpm" />
              <Line type="monotone" dataKey="raw" stroke="var(--text-secondary)" strokeWidth={1.5} dot={false} name="raw" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.savedNote}>result saved</p>
        <button className={styles.restartBtn} onClick={onRestart}>
          <RestartIcon /> restart
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value, accent }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={`${styles.statValue} ${accent ? styles.accent : ''}`}>{value}</span>
    </div>
  )
}

function RestartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  )
}
