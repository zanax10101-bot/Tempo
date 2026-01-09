import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'
import { useTimerStore } from '../stores/timerStore'
import { cn } from '@/utils'
import { Check } from '@phosphor-icons/react'

export function PresetSelector() {
  const presets = useLiveQuery(() => db.timerPresets.orderBy('sortOrder').toArray())
  const { presetId, start, isRunning, isPaused } = useTimerStore()

  const handleSelectPreset = (preset: NonNullable<typeof presets>[number]) => {
    // Don't change preset while timer is running
    if (isRunning || isPaused) return

    start({
      focusMinutes: preset.focusMinutes,
      breakMinutes: preset.breakMinutes,
      longBreakMinutes: preset.longBreakMinutes,
      cycles: preset.cyclesBeforeLongBreak,
      presetId: preset.id,
    })

    // Immediately pause so user can start when ready
    useTimerStore.getState().pause()
  }

  if (!presets) return null

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {presets.map((preset) => {
        const isSelected = presetId === preset.id
        return (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset)}
            disabled={isRunning || isPaused}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
              isSelected
                ? 'bg-accent-primary-muted text-accent-primary'
                : 'bg-bg-raised text-text-secondary hover:bg-bg-hover hover:text-text-primary',
              (isRunning || isPaused) && 'cursor-not-allowed opacity-50'
            )}
          >
            {isSelected && <Check weight="bold" className="h-3.5 w-3.5" />}
            <span>{preset.name}</span>
            <span className="text-xs opacity-60">
              {preset.focusMinutes}/{preset.breakMinutes}
            </span>
          </button>
        )
      })}
    </div>
  )
}
