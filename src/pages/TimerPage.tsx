import { TimerDisplay } from '@/features/timer/components/TimerDisplay'
import { TimerControls } from '@/features/timer/components/TimerControls'
import { PresetSelector } from '@/features/timer/components/PresetSelector'
import { useTimerStore } from '@/features/timer/stores/timerStore'
import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils'

export function TimerPage() {
  const { phase, linkedTaskId } = useTimerStore()

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center animate-fade-in">
      {/* Back button */}
      <div className="absolute left-6 top-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          Back to tasks
        </Link>
      </div>

      {/* Phase indicator */}
      <div
        className={cn(
          'mb-8 text-sm font-semibold uppercase tracking-widest',
          phase === 'focus' ? 'text-accent-primary' : 'text-accent-secondary'
        )}
      >
        {phase === 'focus' ? 'Focus' : phase === 'break' ? 'Break' : 'Long Break'}
      </div>

      {/* Timer display */}
      <TimerDisplay />

      {/* Linked task */}
      {linkedTaskId && (
        <div className="mt-8 text-center">
          <p className="text-sm text-text-tertiary">Working on:</p>
          <p className="mt-1 text-text-secondary">📝 Task name here</p>
        </div>
      )}

      {/* Controls */}
      <TimerControls />

      {/* Preset selector */}
      <div className="mt-12">
        <PresetSelector />
      </div>
    </div>
  )
}
