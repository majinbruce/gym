import { WEEK, type Workout } from '../data/program'

// Local-time date key, e.g. "2026-10-11"
export function dateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  copy.setDate(copy.getDate() + n)
  return copy
}

// dayIndex: 0 = Sunday ... 6 = Saturday. Returns null on a rest day.
export function workoutFor(dayIndex: number): Workout | null {
  return WEEK[dayIndex] ?? null
}

export function isWorkoutComplete(workout: Workout, done: string[]): boolean {
  return workout.items.every((item) => done.includes(item.id))
}
