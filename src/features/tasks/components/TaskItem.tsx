import { useState } from 'react'
import { format, isToday, isPast, isTomorrow } from 'date-fns'
import { Timer, Calendar } from '@phosphor-icons/react'
import type { Task } from '@/db/types'
import { db } from '@/db'
import { Checkbox } from '@/components/ui'
import { cn } from '@/utils'
import { useNavigate } from 'react-router-dom'

interface TaskItemProps {
  task: Task
  showCompleted?: boolean
}

export function TaskItem({ task, showCompleted = false }: TaskItemProps) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const isCompleted = !!task.completedAt
  const isOverdue = task.dueDate && isPast(task.dueDate) && !isToday(task.dueDate) && !isCompleted

  const handleToggleComplete = async () => {
    await db.tasks.update(task.id!, {
      completedAt: isCompleted ? undefined : new Date(),
      updatedAt: new Date(),
    })
  }

  const handleStartTimer = () => {
    // TODO: Link timer to task
    navigate('/timer')
  }

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM d')
  }

  const priorityColors = {
    high: 'bg-priority-high',
    medium: 'bg-priority-medium',
    low: 'bg-priority-low',
    none: '',
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 transition-all duration-150',
        'hover:border-border hover:bg-bg-hover',
        isCompleted && showCompleted && 'opacity-60'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <Checkbox checked={isCompleted} onCheckedChange={handleToggleComplete} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-medium text-text-primary transition-all',
            isCompleted && 'text-text-tertiary line-through'
          )}
        >
          {task.title}
        </p>

        {/* Meta row */}
        {(task.dueDate || task.totalTimeSpent > 0) && (
          <div className="mt-1 flex items-center gap-3 text-xs">
            {task.dueDate && (
              <span
                className={cn(
                  'flex items-center gap-1',
                  isOverdue ? 'text-error' : isToday(task.dueDate) ? 'text-warning' : 'text-text-tertiary'
                )}
              >
                <Calendar weight="regular" className="h-3 w-3" />
                {formatDueDate(task.dueDate)}
              </span>
            )}
            {task.totalTimeSpent > 0 && (
              <span className="flex items-center gap-1 text-text-tertiary">
                <Timer weight="regular" className="h-3 w-3" />
                {Math.round(task.totalTimeSpent / 60)}m
              </span>
            )}
          </div>
        )}
      </div>

      {/* Priority indicator */}
      {task.priority !== 'none' && (
        <span
          className={cn(
            'h-2 w-2 rounded-full',
            priorityColors[task.priority]
          )}
          title={`${task.priority} priority`}
        />
      )}

      {/* Timer button (shows on hover) */}
      <button
        onClick={handleStartTimer}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-sm text-text-tertiary transition-all',
          'hover:bg-accent-primary-muted hover:text-accent-primary',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
        title="Start timer for this task"
      >
        <Timer weight="bold" className="h-4 w-4" />
      </button>
    </div>
  )
}
