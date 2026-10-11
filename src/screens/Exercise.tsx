import { DemoLoop } from '../components/DemoLoop'
import { VideoEmbed } from '../components/VideoEmbed'
import { WeightStepper } from '../components/WeightStepper'
import { amountLabel, getExercise, type ExerciseId } from '../data/program'

type Props = {
  id: ExerciseId
  minutes?: number
  isDone: boolean
  weight: number | undefined
  onWeight: (kg: number) => void
  onToggleDone: () => void
  onBack: () => void
}

export function Exercise({ id, minutes, isDone, weight, onWeight, onToggleDone, onBack }: Props) {
  const ex = getExercise(id)
  return (
    <main className="screen">
      <button className="back" onClick={onBack}>
        ‹ Back
      </button>
      <h1>{ex.name}</h1>
      <DemoLoop ex={ex} />
      <div className="amount">{amountLabel(ex, minutes)}</div>
      <p className="where">📍 {ex.where}</p>

      <h2>How to do it</h2>
      <ol className="cues">
        {ex.cues.map((cue) => (
          <li key={cue}>{cue}</li>
        ))}
      </ol>
      <p className="avoid">
        <strong>Careful:</strong> {ex.avoid}
      </p>

      <VideoEmbed key={id} videoId={ex.video} title={ex.name} />

      {ex.weighted && <WeightStepper value={weight} onChange={onWeight} />}

      <div className="sticky-action">
        <button className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'}`} onClick={onToggleDone}>
          {isDone ? 'Done ✓  (tap to undo)' : 'Done ✓'}
        </button>
      </div>
    </main>
  )
}
