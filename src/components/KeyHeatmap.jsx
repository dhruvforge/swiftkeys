import { ROWS } from '../data/keyboardLayout'
import { getKeyStats } from '../lib/keyStats'
import styles from './KeyHeatmap.module.css'

// Tints a key from faint to strong red by its error rate. Keys with no
// data stay neutral; keys with very few presses are dimmed.
function keyStyle(stat) {
  if (!stat || stat.presses === 0 || stat.errors === 0) return {}
  const rate = stat.errors / stat.presses
  const confidence = Math.min(1, stat.presses / 8)
  const alpha = (0.18 + rate * 0.7) * confidence
  return {
    background: `rgba(224, 82, 82, ${alpha.toFixed(3)})`,
    borderColor: `rgba(224, 82, 82, ${(alpha * 0.8 + 0.1).toFixed(3)})`,
    color: rate > 0.4 && confidence > 0.5 ? 'var(--text)' : undefined,
  }
}

export default function KeyHeatmap() {
  const stats = getKeyStats()
  const tracked = Object.values(stats).reduce((s, k) => s + k.presses, 0)

  if (tracked === 0) {
    return <p className={styles.empty}>Type a few tests — your most-missed keys will light up here.</p>
  }

  const worst = Object.entries(stats)
    .filter(([, s]) => s.presses >= 4 && s.errors > 0)
    .map(([key, s]) => ({ key, rate: s.errors / s.presses }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 3)

  return (
    <div className={styles.wrap}>
      <div className={styles.keyboard}>
        {ROWS.map((row, ri) => (
          <div key={ri} className={styles.row}>
            {row.map(k => (
              <span
                key={k.code}
                style={{ flexGrow: k.w || 1, ...keyStyle(stats[k.label]) }}
                className={styles.key}
                title={stats[k.label] ? `${stats[k.label].errors}/${stats[k.label].presses} missed` : undefined}
              >
                {k.label}
              </span>
            ))}
          </div>
        ))}
      </div>

      {worst.length > 0 && (
        <p className={styles.worst}>
          most missed:{' '}
          {worst.map(w => (
            <span key={w.key} className={styles.worstKey}>
              {w.key === ' ' ? '␣' : w.key} <em>{Math.round(w.rate * 100)}%</em>
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
