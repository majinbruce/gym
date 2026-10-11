import { describe, expect, it } from 'vitest'
import { EXERCISES, WEEK, amountLabel } from '../data/program'
import { dateKey, isWorkoutComplete, workoutFor } from './schedule'
import { countInMonth, currentStreak } from './streak'

// 2026-10-11 is a Sunday
const day = (d: number) => new Date(2026, 9, d)

describe('schedule', () => {
  it('rests on Sunday and trains the other six days', () => {
    expect(workoutFor(0)).toBeNull()
    for (let i = 1; i <= 6; i++) expect(workoutFor(i)).not.toBeNull()
  })

  it('keeps every day to 4 or 5 exercises with no repeats', () => {
    for (const workout of WEEK) {
      if (!workout) continue
      const ids = workout.items.map((item) => item.id)
      expect(ids.length).toBeGreaterThanOrEqual(4)
      expect(ids.length).toBeLessThanOrEqual(5)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it('formats date keys in local time', () => {
    expect(dateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })

  it('knows when a workout is complete', () => {
    const monday = workoutFor(1)!
    expect(isWorkoutComplete(monday, ['chest-press', 'pushdown'])).toBe(false)
    expect(isWorkoutComplete(monday, ['chest-press', 'pushdown', 'curl', 'treadmill'])).toBe(true)
  })

  it('labels reps and minutes', () => {
    expect(amountLabel(EXERCISES['chest-press'])).toBe('3 sets × 12 reps')
    expect(amountLabel(EXERCISES['bird-dog'])).toBe('3 sets × 8 each side')
    expect(amountLabel(EXERCISES.bike, 15)).toBe('15 minutes')
  })
})

describe('streak', () => {
  it('is zero with no history', () => {
    expect(currentStreak([], day(14))).toBe(0)
  })

  it('counts consecutive days including today', () => {
    expect(currentStreak(['2026-10-12', '2026-10-13', '2026-10-14'], day(14))).toBe(3)
  })

  it('does not break while today is unfinished', () => {
    expect(currentStreak(['2026-10-12', '2026-10-13'], day(14))).toBe(2)
  })

  it('breaks on a missed workout day', () => {
    expect(currentStreak(['2026-10-12', '2026-10-14'], day(14))).toBe(1)
  })

  it('skips the Sunday rest day', () => {
    expect(currentStreak(['2026-10-09', '2026-10-10', '2026-10-12'], day(12))).toBe(3)
  })

  it('counts a month', () => {
    expect(countInMonth(['2026-09-30', '2026-10-01', '2026-10-12'], 2026, 9)).toBe(2)
  })
})
