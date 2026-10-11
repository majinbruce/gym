import { addDays, dateKey, workoutFor } from './schedule'

// Consecutive workout days up to today. Rest days don't break the streak,
// and neither does today while it is still unfinished.
export function currentStreak(completed: string[], today: Date): number {
  const set = new Set(completed)
  let streak = 0
  let day = today
  if (!set.has(dateKey(day))) day = addDays(day, -1)
  for (let i = 0; i < 3650; i++) {
    if (set.has(dateKey(day))) streak++
    else if (workoutFor(day.getDay()) !== null) break
    day = addDays(day, -1)
  }
  return streak
}

// month: 0 = January
export function countInMonth(completed: string[], year: number, month: number): number {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`
  return completed.filter((key) => key.startsWith(prefix)).length
}
