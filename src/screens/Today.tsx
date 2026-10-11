import { useState } from 'react'
import { demoFrame } from '../components/DemoLoop'
import { DAY_NAMES, WEEK, amountLabel, getExercise, type ExerciseId, type Workout } from '../data/program'

type Props = {
  today: Date
  dayIndex: number
  workout: Workout | null
  done: string[]
  weights: Record<string, number>
  streak: number
  onOpen: (id: ExerciseId) => void
  onPickDay: (dayIndex: number) => void
  onHistory: () => void
}

export function Today({ today, dayIndex, workout, done, weights, streak, onOpen, onPickDay, onHistory }: Props) {
  const [picking, setPicking] = useState(false)
  const isOwnDay = dayIndex === today.getDay()
  const doneCount = workout ? workout.items.filter((item) => done.includes(item.id)).length : 0

  return (
    <main className="screen">
      <header className="today-head">
        <div>
          <div className="eyebrow">
            {DAY_NAMES[today.getDay()]}, {today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
          </div>
          <h1>{workout ? workout.focus : 'Rest Day'}</h1>
          {!isOwnDay && <div className="eyebrow">Doing {DAY_NAMES[dayIndex]}'s workout</div>}
        </div>
        <button className="streak" onClick={onHistory} aria-label={`Streak ${streak} days. Open history`}>
          <span className="streak-num">{streak}</span>
          <span className="streak-label">day streak</span>
        </button>
      </header>

      {workout ? (
        <>
          <p className="note">
            <strong>First:</strong> walk slowly for 5 minutes to warm up.
          </p>
          <ol className="cards">
            {workout.items.map((item, i) => {
              const ex = getExercise(item.id)
              const isDone = done.includes(item.id)
              const weight = weights[item.id]
              return (
                <li key={item.id}>
                  <button className={`card${isDone ? ' card-done' : ''}`} onClick={() => onOpen(item.id)}>
                    <img className="card-img" src={demoFrame(ex, 1)} alt="" />
                    <span className="card-body">
                      <span className="card-name">
                        {i + 1}. {ex.name}
                      </span>
                      <span className="card-amount">{amountLabel(ex, item.minutes)}</span>
                      {ex.weighted && weight !== undefined && <span className="card-weight">Last time: {weight} kg</span>}
                    </span>
                    <span className="card-tick" aria-label={isDone ? 'Done' : 'Not done yet'}>
                      {isDone ? '✓' : '›'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="progress">
            {doneCount} of {workout.items.length} done
          </p>
          <p className="note">
            <strong>Rest 1 minute</strong> between sets. Breathe out when you push or pull. Never hold your breath. Stop
            if you feel dizzy or have pain.
          </p>
        </>
      ) : (
        <div className="rest">
          <div className="rest-icon">🌿</div>
          <p>No gym today. Let your body recover.</p>
          <p>A relaxed 20 minute walk is fine if you feel like it.</p>
        </div>
      )}

      <div className="foot">
        <button className="btn btn-secondary" onClick={() => setPicking(!picking)}>
          {picking ? 'Close' : 'Do a different day'}
        </button>
        {picking && (
          <div className="daypick">
            {WEEK.map((w, i) =>
              w ? (
                <button
                  key={i}
                  className={`daypick-btn${i === dayIndex ? ' daypick-on' : ''}`}
                  onClick={() => {
                    onPickDay(i)
                    setPicking(false)
                  }}
                >
                  <strong>{DAY_NAMES[i]}</strong>
                  <span>{w.focus}</span>
                </button>
              ) : null,
            )}
          </div>
        )}
        <button className="btn btn-secondary" onClick={onHistory}>
          📅 My history
        </button>
      </div>
    </main>
  )
}
