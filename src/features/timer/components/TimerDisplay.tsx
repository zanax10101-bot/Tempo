import { useEffect, useRef } from 'react'
import { useTimerStore } from '../stores/timerStore'
import { cn } from '@/utils'

export function TimerDisplay() {
  const { remainingSeconds, isRunning, phase, progress } = useTimerStore()
  const intervalRef = useRef<number | null>(null)
  const tick = useTimerStore((s) => s.tick)

  // Timer tick effect using timestamps for accuracy
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Use setInterval but verify with timestamps for accuracy
    intervalRef.current = window.setInterval(() => {
      tick()
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, tick])

  // Format time as MM:SS
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  // SVG circle progress
  const radius = 140
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      {/* Circular glow background */}
      <div
        className={cn(
          'absolute rounded-full transition-shadow duration-300',
          'h-72 w-72',
          isRunning && 'animate-timer-pulse',
          phase === 'focus' ? 'shadow-glow-amber' : 'shadow-glow-teal'
        )}
      />

      {/* Progress ring */}
      <svg
        className="absolute -rotate-90"
        width="320"
        height="320"
        viewBox="0 0 320 320"
      >
        {/* Background ring */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-border"
        />
        {/* Progress ring */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'transition-all duration-1000',
            phase === 'focus' ? 'text-accent-primary' : 'text-accent-secondary'
          )}
        />
      </svg>

      {/* Timer display */}
      <div className="relative z-10 flex h-64 w-64 flex-col items-center justify-center">
        <span className="timer-display text-text-primary">{timeDisplay}</span>
      </div>
    </div>
  )
}
