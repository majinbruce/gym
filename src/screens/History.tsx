import { useState } from 'react'
import { dateKey } from '../lib/schedule'
import { countInMonth } from '../lib/streak'

type Props = { today: Date; completed: string[]; streak: number; onBack: () => void }

export function History({ today, completed, streak, onBack }: Props) {
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const year = month.getFullYear()
  const m = month.getMonth()
  const daysInMonth = new Date(year, m + 1, 0).getDate()
  const blanks = month.getDay()
  const todayKey = dateKey(today)
  const isCurrentMonth = year === today.getFullYear() && m === today.getMonth()
  const done = new Set(completed)

  return (
    <main className="screen">
      <button className="back" onClick={onBack}>
        ‹ Back
      </button>
      <h1>My history</h1>

      <div className="stats">
        <div className="stat">
          <span className="streak-num">{streak}</span>
          <span>day streak</span>
        </div>
        <div className="stat">
          <span className="streak-num">{countInMonth(completed, year, m)}</span>
          <span>workouts this month</span>
        </div>
      </div>

      <div className="cal-head">
        <button className="cal-nav" aria-label="Previous month" onClick={() => setMonth(new Date(year, m - 1, 1))}>
          ‹
        </button>
        <h2>{month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2>
        <button
          className="cal-nav"
          aria-label="Next month"
          disabled={isCurrentMonth}
          onClick={() => setMonth(new Date(year, m + 1, 1))}
        >
          ›
        </button>
      </div>

      <div className="cal">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="cal-dow">
            {d}
          </div>
        ))}
        {Array.from({ length: blanks }, (_, i) => (
          <div key={`b${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const key = dateKey(new Date(year, m, i + 1))
          const isDone = done.has(key)
          return (
            <div
              key={key}
              className={`cal-day${isDone ? ' cal-done' : ''}${key === todayKey ? ' cal-today' : ''}`}
              aria-label={`${i + 1}${isDone ? ', workout done' : ''}`}
            >
              {i + 1}
            </div>
          )
        })}
      </div>
      <p className="note">Green days are the days you finished your workout.</p>
    </main>
  )
}
