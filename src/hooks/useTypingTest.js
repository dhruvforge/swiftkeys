import { useState, useEffect, useRef, useCallback } from 'react'
import { generateWords } from '../data/words'

export function useTypingTest({ mode, modeValue, punctuation = false, customWords = null, onWordComplete }) {
  const [words, setWords] = useState([])
  const [typed, setTyped] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charStatuses, setCharStatuses] = useState([])
  const [completedWords, setCompletedWords] = useState([])
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(mode === 'time' ? modeValue : null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [wpmHistory, setWpmHistory] = useState([])

  const timerRef = useRef(null)
  const startTimeRef = useRef(null)
  const wordStartTimeRef = useRef(null)
  const completedWordsRef = useRef([])

  const reset = useCallback(() => {
    let newWords
    if (customWords) {
      newWords = customWords
    } else {
      const count = mode === 'time' ? 200 : modeValue
      newWords = generateWords(count, { punctuation })
    }

    setWords(newWords)
    setTyped('')
    setWordIndex(0)
    setCharStatuses(newWords.map(w => Array(w.length).fill('untyped')))
    setCompletedWords([])
    completedWordsRef.current = []
    setStarted(false)
    setFinished(false)
    setTimeLeft(mode === 'time' ? modeValue : null)
    setTimeElapsed(0)
    setWpmHistory([])
    clearInterval(timerRef.current)
    startTimeRef.current = null
    wordStartTimeRef.current = null
  }, [mode, modeValue, punctuation, customWords])

  useEffect(() => { reset() }, [reset])

  useEffect(() => {
    if (!started || finished) return

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000

      if (mode === 'time') {
        const remaining = Math.max(0, modeValue - elapsed)
        setTimeLeft(Math.ceil(remaining))
        if (remaining <= 0) finishTest()
      } else {
        setTimeElapsed(elapsed)
      }

      setWpmHistory(prev => {
        const sec = Math.floor(elapsed)
        if (prev.length > 0 && prev[prev.length - 1].second === sec) return prev
        const correctChars = completedWordsRef.current.reduce((sum, { word, typed: t }) => {
          let c = 0
          for (let i = 0; i < word.length; i++) if (t[i] === word[i]) c++
          return sum + c + 1
        }, 0)
        const totalChars = completedWordsRef.current.reduce((sum, { typed: t }) => sum + t.length + 1, 0)
        const minutes = elapsed / 60
        const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0
        const raw = minutes > 0 ? Math.round(totalChars / 5 / minutes) : 0
        return [...prev, { second: sec, wpm, raw }]
      })
    }, 200)

    return () => clearInterval(timerRef.current)
  }, [started, finished, mode, modeValue])

  function finishTest() {
    setFinished(true)
    clearInterval(timerRef.current)
  }

  function handleInput(value) {
    if (finished) return

    if (!started && value.length > 0) {
      setStarted(true)
      startTimeRef.current = Date.now()
      wordStartTimeRef.current = Date.now()
    }

    // Track when first char of a new word is typed
    if (typed.length === 0 && value.length === 1) {
      wordStartTimeRef.current = Date.now()
    }

    if (value.endsWith(' ')) {
      const submittedWord = value.trimEnd()
      const word = words[wordIndex]
      const isCorrect = submittedWord === word
      const timeMs = wordStartTimeRef.current ? Date.now() - wordStartTimeRef.current : 500

      onWordComplete?.(word, isCorrect, timeMs, submittedWord)

      const newCompleted = [...completedWordsRef.current, { word, typed: submittedWord }]
      completedWordsRef.current = newCompleted
      setCompletedWords(newCompleted)

      const nextIndex = wordIndex + 1
      const wordLimit = customWords ? customWords.length : (mode === 'words' ? modeValue : Infinity)

      if (nextIndex >= wordLimit) {
        finishTest()
        return
      }

      setWordIndex(nextIndex)
      setTyped('')
      wordStartTimeRef.current = null

      setCharStatuses(prev => {
        const updated = [...prev]
        updated[wordIndex] = word.split('').map((ch, i) => {
          if (i >= submittedWord.length) return 'incorrect'
          return submittedWord[i] === ch ? 'correct' : 'incorrect'
        })
        return updated
      })
    } else {
      setTyped(value)
      setCharStatuses(prev => {
        const updated = [...prev]
        const word = words[wordIndex]
        updated[wordIndex] = word.split('').map((ch, i) => {
          if (i >= value.length) return 'untyped'
          return value[i] === ch ? 'correct' : 'incorrect'
        })
        return updated
      })
    }
  }

  const stats = finished ? computeStats(completedWordsRef.current, timeElapsed, mode, modeValue, wpmHistory) : null

  return { words, typed, wordIndex, charStatuses, started, finished, timeLeft, timeElapsed, wpmHistory, stats, handleInput, reset }
}

function computeStats(completedWords, timeElapsed, mode, modeValue, wpmHistory) {
  let correctChars = 0, totalChars = 0
  for (const { word, typed } of completedWords) {
    for (let i = 0; i < Math.max(word.length, typed.length); i++) {
      totalChars++
      if (i < word.length && i < typed.length && typed[i] === word[i]) correctChars++
    }
    totalChars++
  }
  const minutes = (mode === 'time' ? modeValue : timeElapsed) / 60
  const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0
  const raw = minutes > 0 ? Math.round(totalChars / 5 / minutes) : 0
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0

  const wpms = wpmHistory.map(h => h.wpm).filter(w => w > 0)
  let consistency = 100
  if (wpms.length > 1) {
    const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length
    const stddev = Math.sqrt(wpms.reduce((sum, w) => sum + (w - mean) ** 2, 0) / wpms.length)
    consistency = mean > 0 ? Math.round(Math.max(0, 100 - (stddev / mean) * 100)) : 0
  }
  return { wpm, raw, accuracy, consistency }
}
