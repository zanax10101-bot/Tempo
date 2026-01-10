import { cn } from '@/utils'

interface SessionIndicatorProps {
  completed: boolean
  phase?: 'focus' | 'break'
  className?: string
}

/**
 * Session indicator icon for Pomodoro cycles.
 * Replaces the emoji 🍅 with a consistent, geometric design.
 * 
 * Uses a simple filled/outlined circle with accent colors
 * to match the refined UI aesthetic.
 */
export function SessionIndicator({ 
  completed, 
  phase = 'focus',
  className 
}: SessionIndicatorProps) {
  if (completed) {
    // Completed session: filled circle with accent color
    return (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-4 w-4', className)}
        aria-label="Completed session"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          className={cn(
            phase === 'focus' 
              ? 'fill-accent-primary' 
              : 'fill-accent-secondary'
          )}
        />
        {/* Small inner highlight for depth */}
        <circle
          cx="6"
          cy="6"
          r="2"
          className="fill-white/20"
        />
      </svg>
    )
  }

  // Remaining session: outlined circle
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      aria-label="Remaining session"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        className="stroke-text-tertiary"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}

/**
 * Alternative: Tomato-shaped icon (more literal Pomodoro reference)
 * Use this if team prefers a more playful, recognizable indicator.
 */
export function TomatoIndicator({ 
  completed,
  className 
}: Omit<SessionIndicatorProps, 'phase'>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
      aria-label={completed ? 'Completed session' : 'Remaining session'}
    >
      {/* Stem */}
      <path
        d="M10 2C10 2 8.5 3 10 4.5C11.5 3 10 2 10 2Z"
        className={completed ? 'fill-success' : 'fill-text-tertiary/50'}
      />
      {/* Tomato body */}
      <ellipse
        cx="10"
        cy="11.5"
        rx="7"
        ry="6.5"
        className={cn(
          completed 
            ? 'fill-accent-primary' 
            : 'fill-none stroke-text-tertiary',
          !completed && 'stroke-[1.5]'
        )}
      />
      {/* Highlight */}
      {completed && (
        <ellipse
          cx="7.5"
          cy="9.5"
          rx="2"
          ry="1.5"
          className="fill-white/25"
        />
      )}
    </svg>
  )
}
