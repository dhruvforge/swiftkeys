const KEY = 'swiftkeys-results'
const MAX = 200 // keep last 200 results

export function saveResult(result) {
  const results = getResults()
  results.unshift({ ...result, id: Date.now(), created_at: new Date().toISOString() })
  if (results.length > MAX) results.length = MAX
  try {
    localStorage.setItem(KEY, JSON.stringify(results))
  } catch {
    // storage full — drop oldest half
    results.splice(MAX / 2)
    localStorage.setItem(KEY, JSON.stringify(results))
  }
}

export function getResults() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function clearResults() {
  localStorage.removeItem(KEY)
}
