export function Complete({ streak, onClose, onHistory }: { streak: number; onClose: () => void; onHistory: () => void }) {
  return (
    <main className="screen complete">
      <div className="complete-icon">🎉</div>
      <h1>Workout complete!</h1>
      <p>Well done. Finish with a slow 5 minute walk and drink some water.</p>
      <div className="complete-streak">
        <span className="streak-num">{streak}</span>
        <span>{streak === 1 ? 'day in a row' : 'days in a row'}</span>
      </div>
      <button className="btn btn-primary" onClick={onClose}>
        OK
      </button>
      <button className="btn btn-secondary" onClick={onHistory}>
        📅 My history
      </button>
    </main>
  )
}
