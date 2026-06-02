import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function ResultsGraph({ wpmHistory }) {
  if (!wpmHistory || wpmHistory.length === 0) return null

  return (
    <div className="results-graph">
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={wpmHistory} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--text-secondary)" opacity={0.2} />
          <XAxis
            dataKey="second"
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, color: 'var(--text)' }}
            labelStyle={{ color: 'var(--text-secondary)' }}
          />
          <Line type="monotone" dataKey="wpm" stroke="var(--accent)" strokeWidth={2} dot={false} name="wpm" />
          <Line type="monotone" dataKey="raw" stroke="var(--text-secondary)" strokeWidth={1.5} dot={false} name="raw" strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
