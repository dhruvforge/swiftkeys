const KEY = 'swiftkeys-adaptive'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} }
  catch { return {} }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

// Record a single word attempt after it is submitted
export function recordWord(word, correct, timeMs) {
  const data = load()
  if (!data[word]) data[word] = { attempts: 0, errors: 0, totalTimeMs: 0 }
  data[word].attempts++
  if (!correct) data[word].errors++
  data[word].totalTimeMs += timeMs
  save(data)
}

// Higher score = harder word = should appear more in practice
function difficultyScore({ attempts, errors, totalTimeMs }) {
  if (attempts === 0) return 0
  const errorRate = errors / attempts
  const avgMs = totalTimeMs / attempts
  // fast < 300 ms/word, slow > 900 ms/word
  const timePenalty = Math.min(1, Math.max(0, (avgMs - 300) / 600))
  return errorRate * 0.65 + timePenalty * 0.35
}

// Returns top-n weakest words sorted by difficulty (need ≥2 attempts)
export function getWeakWords(n = 25) {
  const data = load()
  return Object.entries(data)
    .filter(([, s]) => s.attempts >= 2)
    .map(([word, s]) => ({
      word,
      attempts: s.attempts,
      errors: s.errors,
      accuracy: Math.round((1 - s.errors / s.attempts) * 100),
      avgMs: Math.round(s.totalTimeMs / s.attempts),
      score: difficultyScore(s),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
}

// All tracked words sorted by difficulty (for the focus page table)
export function getAllStats() {
  const data = load()
  return Object.entries(data)
    .map(([word, s]) => ({
      word,
      attempts: s.attempts,
      errors: s.errors,
      accuracy: Math.round((1 - s.errors / s.attempts) * 100),
      avgMs: Math.round(s.totalTimeMs / s.attempts),
      score: difficultyScore(s),
    }))
    .sort((a, b) => b.score - a.score)
}

// Generates a practice word list: 65% weak words, 35% random from allWords
export function generateAdaptiveList(count, allWords) {
  const weak = getWeakWords(40).map(w => w.word)
  if (weak.length === 0) return allWords.slice(0, count)

  const result = []
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.65) {
      result.push(weak[Math.floor(Math.random() * weak.length)])
    } else {
      result.push(allWords[Math.floor(Math.random() * allWords.length)])
    }
  }
  return result
}

export function getTotalStats() {
  const data = load()
  const words = Object.values(data)
  if (!words.length) return { tracked: 0, accuracy: 0, avgMs: 0 }
  const totalAttempts = words.reduce((s, w) => s + w.attempts, 0)
  const totalErrors = words.reduce((s, w) => s + w.errors, 0)
  const totalMs = words.reduce((s, w) => s + w.totalTimeMs, 0)
  return {
    tracked: words.length,
    accuracy: Math.round((1 - totalErrors / totalAttempts) * 100),
    avgMs: Math.round(totalMs / totalAttempts),
  }
}

export function clearStats() {
  localStorage.removeItem(KEY)
}
