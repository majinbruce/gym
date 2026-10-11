const KEY = 'gym-v1'

export type AppData = {
  // Last weight used per exercise, in kg
  weights: Record<string, number>
  // Exercises ticked off, per date key
  done: Record<string, string[]>
  // Date keys of finished workouts
  completed: string[]
  // Day-of-week picked for a date when it is not that date's own workout
  picked: Record<string, number>
}

export const EMPTY: AppData = { weights: {}, done: {}, completed: [], picked: {} }

export function loadData(): AppData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    return { ...EMPTY, ...JSON.parse(raw) }
  } catch {
    return EMPTY
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // Storage can be unavailable (private mode); the app still works for this session.
  }
}
