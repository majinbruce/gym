const STEP = 2.5

export function WeightStepper({ value, onChange }: { value: number | undefined; onChange: (kg: number) => void }) {
  const current = value ?? 0
  return (
    <div className="weight">
      <div className="weight-label">Weight you used</div>
      <div className="weight-row">
        <button
          className="weight-btn"
          aria-label="Less weight"
          disabled={current <= 0}
          onClick={() => onChange(Math.max(0, current - STEP))}
        >
          −
        </button>
        <div className="weight-value" aria-live="polite">
          {value === undefined ? <span className="weight-unset">Not set</span> : <>{current} kg</>}
        </div>
        <button className="weight-btn" aria-label="More weight" onClick={() => onChange(current + STEP)}>
          +
        </button>
      </div>
      <div className="weight-hint">The app remembers this for next time.</div>
    </div>
  )
}
