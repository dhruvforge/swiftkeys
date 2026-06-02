import { useRef, useEffect, useState, useCallback } from 'react'
import { useTypingTest } from '../hooks/useTypingTest'
import { recordWord } from '../lib/adaptiveLearning'
import { saveResult } from '../lib/localResults'
import Results from './Results'
import styles from './TypingTest.module.css'

const TIME_MODES  = [15, 30, 60, 120]
const WORD_MODES  = [10, 25, 50, 100]

export default function TypingTest({ customWords = null, onFinish }) {
  const [mode, setMode]           = useState('time')
  const [modeValue, setModeValue] = useState(30)
  const [resultSaved, setResultSaved] = useState(false)

  const inputRef         = useRef(null)
  const wordsContainerRef = useRef(null)
  const cursorRef        = useRef(null)
  const isResettingRef   = useRef(false)

  const test = useTypingTest({
    mode, modeValue, customWords,
    onWordComplete: recordWord,
  })
  const { words, typed, wordIndex, charStatuses, started, finished,
          timeLeft, wpmHistory, stats, handleInput, reset } = test

  // Focus input on new word list
  useEffect(() => { inputRef.current?.focus() }, [words])

  // ── Sliding cursor ──────────────────────────────────────────────
  const positionCursor = useCallback((instant = false) => {
    const container = wordsContainerRef.current
    const cursor    = cursorRef.current
    if (!container || !cursor || finished) return

    const activeWord = container.querySelector('[data-active="true"]')
    if (!activeWord) return

    const chars = activeWord.querySelectorAll('[data-ch]')
    const cRect = container.getBoundingClientRect()
    let left, top

    if (typed.length < chars.length) {
      const ch = chars[typed.length]
      const r  = ch.getBoundingClientRect()
      left = r.left - cRect.left
      top  = r.top  - cRect.top + container.scrollTop
    } else if (chars.length > 0) {
      const ch = chars[chars.length - 1]
      const r  = ch.getBoundingClientRect()
      left = r.right - cRect.left
      top  = r.top   - cRect.top + container.scrollTop
    }

    if (left === undefined) return

    if (instant) {
      cursor.style.transition = 'none'
      cursor.style.left = `${left}px`
      cursor.style.top  = `${top}px`
      void cursor.offsetWidth            // flush
      cursor.style.transition = ''
    } else {
      cursor.style.left = `${left}px`
      cursor.style.top  = `${top}px`
    }
  }, [typed, wordIndex, finished])

  useEffect(() => {
    positionCursor(isResettingRef.current)
    isResettingRef.current = false
  }, [positionCursor])

  // Auto-scroll active word into view
  useEffect(() => {
    const container = wordsContainerRef.current
    if (!container) return
    const active = container.querySelector('[data-active="true"]')
    if (!active) return
    const offset = active.getBoundingClientRect().top - container.getBoundingClientRect().top
    if (offset > container.clientHeight * 0.6)
      container.scrollTop += offset - container.clientHeight * 0.4
  }, [wordIndex])

  // Save result
  useEffect(() => {
    if (!finished || !stats || resultSaved) return
    setResultSaved(true)

    const result = {
      wpm: stats.wpm, raw_wpm: stats.raw,
      accuracy: stats.accuracy, consistency: stats.consistency,
      mode: customWords ? 'focus' : mode,
      mode_value: customWords ? customWords.length : modeValue,
    }

    saveResult(result)
    onFinish?.(stats)
  }, [finished, stats, mode, modeValue, resultSaved, customWords, onFinish])

  function doReset() {
    isResettingRef.current = true
    setResultSaved(false)
    reset()
  }

  function handleModeChange(m, v) {
    setMode(m); setModeValue(v); setResultSaved(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Tab') { e.preventDefault(); doReset() }
    if (e.key === ' ' && typed === '') e.preventDefault()
  }

  const displayCount = customWords
    ? words.length
    : mode === 'time' ? Math.min(words.length, 80) : modeValue

  const timerLow = mode === 'time' && started && !finished && timeLeft <= 5

  return (
    <div className={styles.container}>

      {!customWords && (
        <div className={styles.modeSelector}>
          <div className={styles.modeGroup}>
            {TIME_MODES.map(v => (
              <button key={v}
                className={`${styles.modeBtn} ${mode === 'time' && modeValue === v ? styles.active : ''}`}
                onClick={() => handleModeChange('time', v)}>{v}s</button>
            ))}
          </div>
          <div className={styles.modeDivider} />
          <div className={styles.modeGroup}>
            {WORD_MODES.map(v => (
              <button key={v}
                className={`${styles.modeBtn} ${mode === 'words' && modeValue === v ? styles.active : ''}`}
                onClick={() => handleModeChange('words', v)}>{v}</button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.meta}>
        {!finished && mode === 'time' && !customWords && (
          <span className={`${styles.timer} ${started ? styles.timerRunning : ''} ${timerLow ? styles.timerLow : ''}`}>
            {started ? timeLeft : modeValue}
          </span>
        )}
        {!finished && (mode === 'words' || customWords) && (
          <span className={styles.timer}>{wordIndex}/{customWords ? customWords.length : modeValue}</span>
        )}
      </div>

      {!finished ? (
        <>
          <div className={styles.wordsWrapper}>
            <div
              className={styles.wordsContainer}
              ref={wordsContainerRef}
              onClick={() => inputRef.current?.focus()}
            >
              {words.slice(0, displayCount).map((word, wi) => (
                <span
                  key={wi}
                  data-active={wi === wordIndex ? 'true' : undefined}
                  className={`${styles.word} ${wi < wordIndex ? styles.wordDone : ''}`}
                >
                  {word.split('').map((ch, ci) => (
                    <span
                      key={ci}
                      data-ch
                      className={`${styles.char} ${styles[charStatuses[wi]?.[ci] || 'untyped']}`}
                    >{ch}</span>
                  ))}
                </span>
              ))}

              {/* Single animated cursor */}
              <span ref={cursorRef} className={`${styles.cursor} ${started ? styles.cursorActive : ''}`} />
            </div>
          </div>

          <input
            ref={inputRef}
            className={styles.hiddenInput}
            value={typed}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          />
          <p className={styles.hint}>press <kbd>Tab</kbd> to restart</p>
        </>
      ) : (
        <Results
          stats={stats}
          wpmHistory={wpmHistory}
          saved={true}
          onRestart={doReset}
        />
      )}
    </div>
  )
}
