const KEY = 'swiftkeys-goal'

export function getGoal() {
  const v = localStorage.getItem(KEY)
  return v ? Number(v) : null
}

export function setGoal(wpm) {
  if (wpm) localStorage.setItem(KEY, String(wpm))
  else localStorage.removeItem(KEY)
}

// Best wpm among prior results for the same mode + value (used to detect a
// new personal best when a test finishes).
export function bestWpmFor(results, mode, modeValue) {
  return results
    .filter(r => r.mode === mode && r.mode_value === modeValue)
    .reduce((best, r) => Math.max(best, r.wpm), 0)
}
