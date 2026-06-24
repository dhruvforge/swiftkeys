const KEY = 'swiftkeys-keystats'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} }
  catch { return {} }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

// Fold a typed character onto the physical key it belongs to, so shifted
// symbols ('@', '(', '"', ':' …) count toward their base key on the heatmap.
const SHIFT_MAP = {
  '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6',
  '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=',
  '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'",
  '<': ',', '>': '.', '?': '/', '~': '`',
}

function toKey(ch) {
  if (ch === ' ') return null
  if (ch >= 'A' && ch <= 'Z') return ch.toLowerCase()
  return SHIFT_MAP[ch] || ch
}

// Compare a submitted word against the target, char by char, and tally
// presses/errors per physical key.
export function recordKeys(target, typed) {
  const data = load()
  const n = Math.max(target.length, typed.length)
  for (let i = 0; i < n; i++) {
    const ch = target[i]
    if (ch === undefined) continue
    const key = toKey(ch)
    if (!key) continue
    if (!data[key]) data[key] = { presses: 0, errors: 0 }
    data[key].presses++
    if (typed[i] !== ch) data[key].errors++
  }
  save(data)
}

// Returns { key: { presses, errors } } keyed by label used in keyboardLayout.
export function getKeyStats() {
  return load()
}

export function clearKeyStats() {
  localStorage.removeItem(KEY)
}
