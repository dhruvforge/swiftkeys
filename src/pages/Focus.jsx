import { useState, useMemo } from 'react'
import { getWeakWords, getTotalStats, generateAdaptiveList, clearStats } from '../lib/adaptiveLearning'
import { clearKeyStats } from '../lib/keyStats'
import { commonWords } from '../data/words'
import TypingTest from '../components/TypingTest'
import KeyHeatmap from '../components/KeyHeatmap'
import styles from './Focus.module.css'

export default function Focus() {
  const [practicing, setPracticing] = useState(false)
  const [lastResult, setLastResult] = useState(null)

  const weakWords = useMemo(() => getWeakWords(20), [lastResult, practicing])
  const totalStats = useMemo(() => getTotalStats(), [lastResult, practicing])

  const adaptiveWords = useMemo(
    () => generateAdaptiveList(40, commonWords),
    [practicing]
  )

  if (practicing) {
    return (
      <div className={styles.page}>
        <div className={styles.practiceHeader}>
          <span className={styles.practiceLabel}>focus session</span>
          <button className={styles.exitBtn} onClick={() => setPracticing(false)}>← back</button>
        </div>
        <TypingTest
          customWords={adaptiveWords}
          onFinish={result => { setLastResult(result); setPracticing(false) }}
        />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>focus</h1>
          <p className={styles.subtitle}>adaptive training based on your weak spots</p>
        </div>
        <button className={styles.practiceBtn} onClick={() => setPracticing(true)} disabled={weakWords.length === 0}>
          {weakWords.length === 0 ? 'need more data' : 'start session'}
        </button>
      </div>

      {lastResult && (
        <div className={styles.lastResult}>
          <span className={styles.resultLabel}>last session</span>
          <div className={styles.resultStats}>
            <span className={styles.resultStat}><strong>{lastResult.wpm}</strong> wpm</span>
            <span className={styles.resultStat}><strong>{lastResult.accuracy}%</strong> acc</span>
            <span className={styles.resultStat}><strong>{lastResult.consistency}%</strong> cons</span>
          </div>
        </div>
      )}

      {totalStats.tracked === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className={styles.overview}>
            <OverviewCard label="words tracked" value={totalStats.tracked} />
            <OverviewCard label="overall accuracy" value={`${totalStats.accuracy}%`} accent={totalStats.accuracy >= 90} />
            <OverviewCard label="avg speed" value={`${totalStats.avgMs}ms`} />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>weakest words</h2>
            {weakWords.length === 0 ? (
              <p className={styles.noData}>Type more — need ≥2 attempts per word.</p>
            ) : (
              <div className={styles.wordGrid}>
                {weakWords.map(w => (
                  <WordCard key={w.word} {...w} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>key accuracy</h2>
            <KeyHeatmap />
          </div>

          <button className={styles.clearBtn} onClick={() => { clearStats(); clearKeyStats(); setLastResult(null) }}>
            reset learning data
          </button>
        </>
      )}
    </div>
  )
}

function OverviewCard({ label, value, accent }) {
  return (
    <div className={styles.overviewCard}>
      <span className={styles.overviewLabel}>{label}</span>
      <span className={`${styles.overviewValue} ${accent ? styles.accentValue : ''}`}>{value}</span>
    </div>
  )
}

function WordCard({ word, accuracy, avgMs, score, errors, attempts }) {
  const level = score > 0.6 ? 'hard' : score > 0.3 ? 'medium' : 'easy'
  return (
    <div className={`${styles.wordCard} ${styles[level]}`}>
      <span className={styles.wordText}>{word}</span>
      <div className={styles.wordBar}>
        <div className={styles.wordBarFill} style={{ width: `${accuracy}%` }} />
      </div>
      <div className={styles.wordMeta}>
        <span>{accuracy}% acc</span>
        <span>{avgMs}ms</span>
        <span className={styles.attempts}>{errors}/{attempts}</span>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyIcon}>⌨</p>
      <p className={styles.emptyTitle}>no data yet</p>
      <p className={styles.emptyText}>
        Take a few typing tests on the home page. SwiftKeys will automatically track your per-word accuracy and speed, then show your weak spots here.
      </p>
    </div>
  )
}
