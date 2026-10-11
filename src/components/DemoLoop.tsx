import type { Exercise } from '../data/program'

export function demoFrame(ex: Exercise, frame: 0 | 1): string {
  return `${import.meta.env.BASE_URL}demos/${ex.demo}-${frame}.${ex.demoExt ?? 'jpg'}`
}

// Crossfades between the start and end position photos, forever. Works offline.
export function DemoLoop({ ex }: { ex: Exercise }) {
  return (
    <div className="demo" role="img" aria-label={`${ex.name} demonstration`}>
      <img src={demoFrame(ex, 0)} alt="" />
      <img className="demo-top" src={demoFrame(ex, 1)} alt="" />
    </div>
  )
}
