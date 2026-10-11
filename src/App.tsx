import { useEffect, useState } from 'react'
import type { ExerciseId } from './data/program'
import { dateKey, isWorkoutComplete, workoutFor } from './lib/schedule'
import { loadData, saveData, type AppData } from './lib/storage'
import { currentStreak } from './lib/streak'
import { Complete } from './screens/Complete'
import { Exercise } from './screens/Exercise'
import { History } from './screens/History'
import { Today } from './screens/Today'

type View = { name: 'today' } | { name: 'exercise'; id: ExerciseId } | { name: 'complete' } | { name: 'history' }

// The app is often left open in the background, so refresh "today" whenever it comes back.
function useToday(): Date {
  const [today, setToday] = useState(() => new Date())
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === 'visible') setToday(new Date())
    }
    document.addEventListener('visibilitychange', refresh)
    return () => document.removeEventListener('visibilitychange', refresh)
  }, [])
  return today
}

function InstallHint() {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent)
  const installed = window.matchMedia('(display-mode: standalone)').matches || 'standalone' in navigator && navigator.standalone === true
  if (!isIos || installed) return null
  return (
    <p className="install">
      To install: tap the <strong>Share</strong> button below, then <strong>Add to Home Screen</strong>.
    </p>
  )
}

export default function App() {
  const today = useToday()
  const [data, setData] = useState<AppData>(loadData)
  const [view, setView] = useState<View>({ name: 'today' })

  useEffect(() => {
    saveData(data)
  }, [data])
  // Braces matter: newer browsers return a promise from scrollTo, which React would treat as a cleanup.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])

  const key = dateKey(today)
  const dayIndex = data.picked[key] ?? today.getDay()
  const workout = workoutFor(dayIndex)
  const done = data.done[key] ?? []
  const streak = currentStreak(data.completed, today)

  function toggleDone(id: ExerciseId) {
    if (!workout) return
    const nextDone = done.includes(id) ? done.filter((d) => d !== id) : [...done, id]
    const complete = isWorkoutComplete(workout, nextDone)
    const completed = data.completed.filter((k) => k !== key)
    if (complete) completed.push(key)
    setData({ ...data, done: { ...data.done, [key]: nextDone }, completed })
    setView(complete ? { name: 'complete' } : { name: 'today' })
  }

  // Switching to another day's workout starts today's ticks fresh.
  function pickDay(index: number) {
    if (index === dayIndex) return
    setData({
      ...data,
      picked: { ...data.picked, [key]: index },
      done: { ...data.done, [key]: [] },
      completed: data.completed.filter((k) => k !== key),
    })
  }

  if (view.name === 'exercise' && workout) {
    const item = workout.items.find((i) => i.id === view.id)
    if (item) {
      return (
        <Exercise
          id={item.id}
          minutes={item.minutes}
          isDone={done.includes(item.id)}
          weight={data.weights[item.id]}
          onWeight={(kg) => setData({ ...data, weights: { ...data.weights, [item.id]: kg } })}
          onToggleDone={() => toggleDone(item.id)}
          onBack={() => setView({ name: 'today' })}
        />
      )
    }
  }

  if (view.name === 'complete') {
    return (
      <Complete streak={streak} onClose={() => setView({ name: 'today' })} onHistory={() => setView({ name: 'history' })} />
    )
  }

  if (view.name === 'history') {
    return (
      <History today={today} completed={data.completed} streak={streak} onBack={() => setView({ name: 'today' })} />
    )
  }

  return (
    <>
      <InstallHint />
      <Today
        today={today}
        dayIndex={dayIndex}
        workout={workout}
        done={done}
        weights={data.weights}
        streak={streak}
        onOpen={(id) => setView({ name: 'exercise', id })}
        onPickDay={pickDay}
        onHistory={() => setView({ name: 'history' })}
      />
    </>
  )
}
