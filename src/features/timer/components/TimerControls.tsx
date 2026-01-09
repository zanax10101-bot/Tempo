import { Play, Pause, ArrowClockwise, SkipForward, Circle } from '@phosphor-icons/react'
import { useTimerStore } from '../stores/timerStore'
import { Button } from '@/components/ui'
import { cn } from '@/utils'

export function TimerControls() {
  const { isRunning, isPaused, phase, currentCycle, totalCycles } = useTimerStore()
  const { start, pause, resume, reset, skipToBreak, skipToFocus } = useTimerStore()

  const handlePlayPause = () => {
    if (isRunning) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      start()
    }
  }

  const handleSkip = () => {
    if (phase === 'focus') {
      skipToBreak()
    } else {
      skipToFocus()
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      {/* Main controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause button */}
        <button
          onClick={handlePlayPause}
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
            phase === 'focus'
              ? 'bg-accent-primary text-text-inverse hover:bg-accent-primary-hover'
              : 'bg-accent-secondary text-text-inverse hover:bg-accent-secondary-hover'
          )}
        >
          {isRunning ? (
            <Pause weight="fill" className="h-7 w-7" />
          ) : (
            <Play weight="fill" className="h-7 w-7" style={{ transform: 'translateX(2%)' }} />
          )}
        </button>

        {/* Reset button */}
        <Button
          variant="ghost"
          onClick={reset}
          className="h-12 w-12 rounded-full p-0"
          title="Reset timer"
        >
          <ArrowClockwise weight="bold" className="h-5 w-5" />
        </Button>

        {/* Skip button */}
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="h-12 w-12 rounded-full p-0"
          title={phase === 'focus' ? 'Skip to break' : 'Skip to focus'}
        >
          <SkipForward weight="bold" className="h-5 w-5" />
        </Button>
      </div>

      {/* Session indicator */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-text-tertiary">
          Session {currentCycle} of {totalCycles}
        </span>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalCycles }).map((_, i) => (
            <Circle
              key={i}
              weight={i < currentCycle ? 'fill' : 'regular'}
              className={cn(
                'h-4 w-4 transition-colors',
                i < currentCycle
                  ? 'text-accent-primary'
                  : 'text-text-tertiary'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
