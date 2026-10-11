// The whole routine lives in this file. Change exercises or days here and redeploy.

export type Exercise = {
  name: string
  // Basename of the two demo frames in public/demos (e.g. "leg-press" -> leg-press-0.jpg, leg-press-1.jpg)
  demo: string
  demoExt?: 'jpg' | 'svg'
  // YouTube video id of the form tutorial
  video: string
  // Strength exercises: sets x reps. Cardio: minutes.
  sets?: number
  reps?: string
  minutes?: number
  // Show the weight memory for this exercise
  weighted?: boolean
  where: string
  cues: string[]
  avoid: string
}

export const EXERCISES = {
  'chest-press': {
    name: 'Chest Press Machine',
    demo: 'chest-press',
    video: 'ebNjgZpgytE',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Seated chest press machine',
    cues: [
      'Set the seat so the handles are level with the middle of your chest.',
      'Keep your back and head resting on the pad.',
      'Push forward smoothly, then return slowly. Do not lock the elbows.',
    ],
    avoid: 'Do not let the handles come too far back behind your chest. Stop where the shoulder feels comfortable.',
  },
  pushdown: {
    name: 'Triceps Pushdown',
    demo: 'pushdown',
    video: 'vPeQu_L-1n0',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Cable machine, rope or bar attached at the top',
    cues: [
      'Stand tall, elbows tucked in at your sides.',
      'Push down until your arms are straight.',
      'Come back up slowly. Only the forearms move.',
    ],
    avoid: 'Do not lean over or swing your body to push the weight.',
  },
  curl: {
    name: 'Seated Dumbbell Curl',
    demo: 'curl',
    video: 's9GGVuUXgmY',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Bench with back support and two light dumbbells',
    cues: [
      'Sit with your back against the pad, arms hanging by your sides.',
      'Curl both dumbbells up to your shoulders, palms facing up.',
      'Lower slowly all the way down.',
    ],
    avoid: 'Do not swing or rock your back. If you have to swing, the weight is too heavy.',
  },
  treadmill: {
    name: 'Treadmill Walk',
    demo: 'treadmill',
    video: '8i3Vrd95o2k',
    minutes: 10,
    where: 'Treadmill',
    cues: [
      'Start slow, then walk at a pace where you can still talk.',
      'Stand tall and look straight ahead, not down.',
      'Slow down for the last minute before you stop.',
    ],
    avoid: 'Do not run, and do not step off while the belt is moving.',
  },
  'incline-walk': {
    name: 'Incline Treadmill Walk',
    demo: 'treadmill',
    video: 'Ii71nAaRc_8',
    minutes: 20,
    where: 'Treadmill, incline set to 2 to 4',
    cues: [
      'Walk for 3 minutes flat, then raise the incline to 2 to 4.',
      'Keep a pace where you can still talk comfortably.',
      'Bring the incline back to 0 for the last 2 minutes.',
    ],
    avoid: 'Do not lean on the handrails or bend your neck down to look at the screen.',
  },
  'leg-press': {
    name: 'Leg Press',
    demo: 'leg-press',
    video: 'p5dCqF7wWUw',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Leg press machine',
    cues: [
      'Feet shoulder-width apart in the middle of the plate.',
      'Lower until your knees are bent about halfway. Keep your lower back on the pad.',
      'Push through your heels. Keep a small bend in the knees at the top.',
    ],
    avoid: 'Do not go so deep that your lower back lifts off the seat. Never lock your knees straight.',
  },
  'leg-extension': {
    name: 'Leg Extension',
    demo: 'leg-extension',
    video: 'EAR4tit2Dac',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Leg extension machine',
    cues: [
      'Sit back fully, with the pad resting just above your ankles.',
      'Straighten your legs slowly and pause for a second.',
      'Lower slowly. Do not let the weight drop.',
    ],
    avoid: 'Do not kick the weight up fast. Keep it light and smooth.',
  },
  'leg-curl': {
    name: 'Seated Leg Curl',
    demo: 'leg-curl',
    video: '_2Kd0d-JEUM',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Seated leg curl machine',
    cues: [
      'Sit back fully, with the pad resting behind your ankles.',
      'Pull your heels down and back under the seat.',
      'Let your legs come back up slowly.',
    ],
    avoid: 'Do not arch your back or lift off the seat.',
  },
  'calf-raise': {
    name: 'Standing Calf Raise',
    demo: 'calf-raise',
    video: 'M49slU9_0tY',
    sets: 3,
    reps: '12',
    where: 'Any step or flat floor, holding a rail for balance',
    cues: [
      'Hold on to something steady.',
      'Rise up on your toes as high as you can and pause.',
      'Lower your heels slowly.',
    ],
    avoid: 'Do not bounce. No extra weight is needed.',
  },
  bike: {
    name: 'Stationary Bike',
    demo: 'bike',
    video: 'AVDTF9Uy7Zg',
    minutes: 10,
    where: 'Exercise bike',
    cues: [
      'Set the seat so your knee stays slightly bent at the bottom.',
      'Sit upright and pedal at an easy, steady pace.',
      'Keep the resistance low. You should be able to talk.',
    ],
    avoid: 'Do not hunch forward over the handlebars.',
  },
  'lat-pulldown': {
    name: 'Lat Pulldown',
    demo: 'lat-pulldown',
    video: 'AOpi-p0cJkc',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Lat pulldown machine',
    cues: [
      'Lock your thighs under the pad and hold the bar a little wider than your shoulders.',
      'Pull the bar down to the top of your chest, elbows pointing down.',
      'Let the bar rise slowly until your arms are straight.',
    ],
    avoid: 'Never pull the bar behind your neck. Always pull to the front.',
  },
  'cable-row': {
    name: 'Seated Cable Row',
    demo: 'cable-row',
    video: 'f_r95UajQcg',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Seated row machine',
    cues: [
      'Sit tall with your chest up and knees slightly bent.',
      'Pull the handle to your stomach and squeeze your shoulder blades together.',
      'Reach forward slowly with a straight back.',
    ],
    avoid: 'Do not round your back or rock back and forth.',
  },
  'face-pull': {
    name: 'Face Pull',
    demo: 'face-pull',
    video: 'eTCBSFlCJ_s',
    sets: 3,
    reps: '12',
    weighted: true,
    where: 'Cable machine with rope at face height. Very light weight.',
    cues: [
      'Hold the rope with both hands and step back.',
      'Pull the rope towards your face, elbows high and wide.',
      'Return slowly with control.',
    ],
    avoid: 'Do not shrug your shoulders up to your ears or push your head forward.',
  },
  'bird-dog': {
    name: 'Bird Dog',
    demo: 'bird-dog',
    demoExt: 'svg',
    video: 'LaLKNS7mxrk',
    sets: 3,
    reps: '8 each side',
    where: 'Exercise mat',
    cues: [
      'Start on your hands and knees with a flat back.',
      'Reach one arm forward and the opposite leg straight back.',
      'Hold for 2 seconds, come back, then change sides.',
    ],
    avoid: 'Do not let your back sag or your hips twist. Keep looking at the floor.',
  },
  'glute-bridge': {
    name: 'Glute Bridge',
    demo: 'glute-bridge',
    video: 'Q_Bpj91Yiis',
    sets: 3,
    reps: '12',
    where: 'Exercise mat',
    cues: [
      'Lie on your back, knees bent, feet flat on the floor.',
      'Squeeze your hips and lift them until your body is in a straight line.',
      'Lower slowly.',
    ],
    avoid: 'Do not push up so high that your lower back arches. Get up from the floor slowly.',
  },
  'dead-bug': {
    name: 'Dead Bug',
    demo: 'dead-bug',
    video: 'XcYtWYMz39w',
    sets: 3,
    reps: '8 each side',
    where: 'Exercise mat',
    cues: [
      'Lie on your back with arms straight up and knees bent above your hips.',
      'Slowly lower one arm and the opposite leg towards the floor.',
      'Bring them back and change sides.',
    ],
    avoid: 'Do not let your lower back lift off the floor. Keep your head resting down.',
  },
  'cat-cow': {
    name: 'Cat-Cow Stretch',
    demo: 'cat-cow',
    video: 'tT00XNqJ3uA',
    sets: 2,
    reps: '10',
    where: 'Exercise mat',
    cues: [
      'Start on your hands and knees.',
      'Gently round your back up like a cat.',
      'Then gently let your stomach sink and chest open. Move slowly.',
    ],
    avoid: 'Do not force the stretch or throw your head back. Keep it gentle.',
  },
  'chin-tuck': {
    name: 'Chin Tucks',
    demo: 'chin-tuck',
    demoExt: 'svg',
    video: 'w4kf1ceqyQs',
    sets: 2,
    reps: '10',
    where: 'Sitting or standing tall, anywhere',
    cues: [
      'Sit tall and look straight ahead.',
      'Pull your chin straight back, like making a double chin.',
      'Hold for 3 seconds and relax.',
    ],
    avoid: 'Do not tilt your head up or down. Stop if you feel pain or tingling.',
  },
  'sit-to-stand': {
    name: 'Sit to Stand',
    demo: 'sit-to-stand',
    video: 'ITv-_BkcrD0',
    sets: 3,
    reps: '10',
    where: 'A flat bench. No weights.',
    cues: [
      'Stand in front of a bench, feet shoulder-width apart, arms out in front.',
      'Sit back slowly until you touch the bench.',
      'Stand up by pushing through your heels.',
    ],
    avoid: 'Do not drop onto the bench or let your knees fall inward.',
  },
} satisfies Record<string, Exercise>

export type ExerciseId = keyof typeof EXERCISES

export type Workout = {
  focus: string
  // An entry can override the minutes for a cardio exercise on that day
  items: { id: ExerciseId; minutes?: number }[]
}

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Index 0 is Sunday. null means rest day.
export const WEEK: (Workout | null)[] = [
  null,
  {
    focus: 'Chest & Arms',
    items: [{ id: 'chest-press' }, { id: 'pushdown' }, { id: 'curl' }, { id: 'treadmill' }],
  },
  {
    focus: 'Legs',
    items: [{ id: 'leg-press' }, { id: 'leg-extension' }, { id: 'leg-curl' }, { id: 'calf-raise' }, { id: 'bike' }],
  },
  {
    focus: 'Back & Posture',
    items: [{ id: 'lat-pulldown' }, { id: 'cable-row' }, { id: 'face-pull' }, { id: 'bird-dog' }],
  },
  {
    focus: 'Easy Day: Walk & Core',
    items: [{ id: 'incline-walk' }, { id: 'glute-bridge' }, { id: 'dead-bug' }, { id: 'cat-cow' }, { id: 'chin-tuck' }],
  },
  {
    focus: 'Upper Body',
    items: [{ id: 'chest-press' }, { id: 'lat-pulldown' }, { id: 'cable-row' }, { id: 'pushdown' }, { id: 'curl' }],
  },
  {
    focus: 'Legs & Walk',
    items: [
      { id: 'leg-press' },
      { id: 'sit-to-stand' },
      { id: 'leg-curl' },
      { id: 'calf-raise' },
      { id: 'bike', minutes: 15 },
    ],
  },
]

export function getExercise(id: ExerciseId): Exercise {
  return EXERCISES[id]
}

// "3 sets × 12 reps" or "10 minutes"
export function amountLabel(ex: Exercise, minutesOverride?: number): string {
  const minutes = minutesOverride ?? ex.minutes
  if (minutes) return `${minutes} minutes`
  return `${ex.sets} sets × ${ex.reps}${/^\d+$/.test(ex.reps ?? '') ? ' reps' : ''}`
}
