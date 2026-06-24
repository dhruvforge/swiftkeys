const DAY = 86400000

function midnight(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

// Derive practice streaks from saved results' dates. A "streak" is
// consecutive calendar days with at least one test.
export function computeStreak(results) {
  if (!results.length) return { current: 0, longest: 0 }

  const days = [...new Set(results.map(r => midnight(r.created_at)))].sort((a, b) => a - b)

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] - days[i - 1] === DAY ? run + 1 : 1
    if (run > longest) longest = run
  }

  // Current streak only counts if the latest day is today or yesterday.
  const today = midnight(Date.now())
  const last = days[days.length - 1]
  let current = 0
  if (last === today || last === today - DAY) {
    current = 1
    for (let i = days.length - 1; i > 0; i--) {
      if (days[i] - days[i - 1] === DAY) current++
      else break
    }
  }

  return { current, longest }
}
