import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getResults, clearResults } from '../lib/localResults'
import styles from './History.module.css'

export default function History() {
  const [results, setResults] = useState([])

  useEffect(() => {
    setResults(getResults())
  }, [])

  function handleClear() {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      clearResults()
      setResults([])
    }
  }

  if (results.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>
          No tests yet. <Link to="/" className={styles.link}>Take a test!</Link>
        </p>
      </div>
    )
  }

  const best = results.reduce((b, r) => r.wpm > (b?.wpm || 0) ? r : b, null)
  const avgWpm = Math.round(results.reduce((s, r) => s + r.wpm, 0) / results.length)
  const avgAcc = Math.round(results.reduce((s, r) => s + r.accuracy, 0) / results.length)

  return (
    <div className={styles.page}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>history</h1>
        <button className={styles.clearBtn} onClick={handleClear}>clear</button>
      </div>

      <div className={styles.summary}>
        <SummaryStat label="best wpm" value={best?.wpm} accent />
        <SummaryStat label="avg wpm" value={avgWpm} />
        <SummaryStat label="avg accuracy" value={`${avgAcc}%`} />
        <SummaryStat label="tests" value={results.length} />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>wpm</th><th>raw</th><th>accuracy</th><th>consistency</th><th>mode</th><th>date</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.id} className={r.id === best?.id ? styles.bestRow : ''}>
                <td className={styles.accent}>{r.wpm}</td>
                <td>{r.raw_wpm}</td>
                <td>{r.accuracy}%</td>
                <td>{r.consistency}%</td>
                <td className={styles.dim}>
                  {r.mode === 'time' ? `${r.mode_value}s`
                  : r.mode === 'focus' ? `focus (${r.mode_value}w)`
                  : `${r.mode_value} words`}
                </td>
                <td className={styles.dim}>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummaryStat({ label, value, accent }) {
  return (
    <div className={styles.summaryCard}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={`${styles.summaryValue} ${accent ? styles.accent : ''}`}>{value}</span>
    </div>
  )
}
