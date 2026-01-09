import { create } from 'zustand'

export type TimerPhase = 'focus' | 'break' | 'longBreak'

interface TimerState {
  // State
  isRunning: boolean
  isPaused: boolean
  phase: TimerPhase
  remainingSeconds: number
  totalSeconds: number
  currentCycle: number
  totalCycles: number
  linkedTaskId: number | null
  presetId: number | null

  // Preset config (cached for current session)
  focusMinutes: number
  breakMinutes: number
  longBreakMinutes: number

  // Computed
  progress: number

  // Actions
  start: (config?: {
    focusMinutes?: number
    breakMinutes?: number
    longBreakMinutes?: number
    cycles?: number
    taskId?: number
    presetId?: number
  }) => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
  skipToBreak: () => void
  skipToFocus: () => void
  completePhase: () => void
}

const DEFAULT_FOCUS_SECONDS = 25 * 60
const DEFAULT_CYCLES = 4

export const useTimerStore = create<TimerState>((set, get) => ({
  // Initial state
  isRunning: false,
  isPaused: false,
  phase: 'focus',
  remainingSeconds: DEFAULT_FOCUS_SECONDS,
  totalSeconds: DEFAULT_FOCUS_SECONDS,
  currentCycle: 1,
  totalCycles: DEFAULT_CYCLES,
  linkedTaskId: null,
  presetId: null,
  focusMinutes: 25,
  breakMinutes: 5,
  longBreakMinutes: 15,
  progress: 0,

  // Actions
  start: (config) => {
    const focusMinutes = config?.focusMinutes ?? 25
    const breakMinutes = config?.breakMinutes ?? 5
    const longBreakMinutes = config?.longBreakMinutes ?? 15
    const totalCycles = config?.cycles ?? 4
    const totalSeconds = focusMinutes * 60

    set({
      isRunning: true,
      isPaused: false,
      phase: 'focus',
      remainingSeconds: totalSeconds,
      totalSeconds,
      currentCycle: 1,
      totalCycles,
      linkedTaskId: config?.taskId ?? null,
      presetId: config?.presetId ?? null,
      focusMinutes,
      breakMinutes,
      longBreakMinutes,
      progress: 0,
    })
  },

  pause: () => {
    set({ isPaused: true, isRunning: false })
  },

  resume: () => {
    set({ isPaused: false, isRunning: true })
  },

  reset: () => {
    const { focusMinutes } = get()
    const totalSeconds = focusMinutes * 60
    set({
      isRunning: false,
      isPaused: false,
      phase: 'focus',
      remainingSeconds: totalSeconds,
      totalSeconds,
      currentCycle: 1,
      progress: 0,
    })
  },

  tick: () => {
    const { remainingSeconds, isRunning, totalSeconds } = get()

    if (!isRunning) return

    if (remainingSeconds <= 1) {
      get().completePhase()
      return
    }

    const newRemaining = remainingSeconds - 1
    const progress = ((totalSeconds - newRemaining) / totalSeconds) * 100

    set({
      remainingSeconds: newRemaining,
      progress,
    })
  },

  completePhase: () => {
    const { phase, currentCycle, totalCycles, breakMinutes, longBreakMinutes, focusMinutes } = get()

    if (phase === 'focus') {
      // Check if we should do a long break
      const isLongBreak = currentCycle >= totalCycles
      const nextPhase: TimerPhase = isLongBreak ? 'longBreak' : 'break'
      const breakDuration = isLongBreak ? longBreakMinutes * 60 : breakMinutes * 60

      set({
        phase: nextPhase,
        remainingSeconds: breakDuration,
        totalSeconds: breakDuration,
        progress: 0,
        isRunning: false, // Pause at phase transition
        isPaused: true,
      })
    } else {
      // Break completed, start new focus
      const nextCycle = phase === 'longBreak' ? 1 : currentCycle + 1
      const focusDuration = focusMinutes * 60

      set({
        phase: 'focus',
        remainingSeconds: focusDuration,
        totalSeconds: focusDuration,
        currentCycle: nextCycle,
        progress: 0,
        isRunning: false,
        isPaused: true,
      })
    }

    // TODO: Play notification sound
    // TODO: Show browser notification
  },

  skipToBreak: () => {
    const { currentCycle, totalCycles, breakMinutes, longBreakMinutes } = get()
    const isLongBreak = currentCycle >= totalCycles
    const nextPhase: TimerPhase = isLongBreak ? 'longBreak' : 'break'
    const breakDuration = isLongBreak ? longBreakMinutes * 60 : breakMinutes * 60

    set({
      phase: nextPhase,
      remainingSeconds: breakDuration,
      totalSeconds: breakDuration,
      progress: 0,
      isRunning: false,
      isPaused: true,
    })
  },

  skipToFocus: () => {
    const { phase, currentCycle, focusMinutes } = get()
    const nextCycle = phase === 'longBreak' ? 1 : currentCycle + 1
    const focusDuration = focusMinutes * 60

    set({
      phase: 'focus',
      remainingSeconds: focusDuration,
      totalSeconds: focusDuration,
      currentCycle: nextCycle,
      progress: 0,
      isRunning: false,
      isPaused: true,
    })
  },
}))
