import { useLiveQuery } from 'dexie-react-hooks'
import { format } from 'date-fns'
import { Sun, Plus, Timer } from '@phosphor-icons/react'
import { db } from '@/db'
import { TaskList } from '@/features/tasks/components/TaskList'
import { QuickAddTask } from '@/features/tasks/components/QuickAddTask'
import { Button } from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'

export function TodayPage() {
  const navigate = useNavigate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const tasks = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray()
    // Filter for tasks due today or overdue (and not completed)
    return allTasks.filter(
      (t) => !t.completedAt && t.dueDate && t.dueDate < tomorrow
    )
  })

  const overdueTasks = tasks?.filter((t) => t.dueDate && t.dueDate < today) ?? []
  const todayTasks = tasks?.filter((t) => t.dueDate && t.dueDate >= today && t.dueDate < tomorrow) ?? []

  const completedToday = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray()
    return allTasks.filter(
      (t) => t.completedAt && t.completedAt >= today && t.completedAt < tomorrow
    )
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sun weight="duotone" className="h-8 w-8 text-accent-primary" />
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Today</h1>
            <p className="text-sm text-text-secondary">
              {format(new Date(), 'EEEE, MMMM d')}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate('/timer')}
          className="gap-2"
        >
          <Timer weight="bold" className="h-4 w-4" />
          Start Focus
        </Button>
      </div>

      {/* Overdue section */}
      {overdueTasks.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-error">
            Overdue
          </h2>
          <TaskList tasks={overdueTasks} />
        </section>
      )}

      {/* Today section */}
      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-tertiary">
          Due Today
        </h2>
        {todayTasks.length > 0 ? (
          <TaskList tasks={todayTasks} />
        ) : (
          <EmptyState />
        )}
      </section>

      {/* Quick add */}
      <QuickAddTask defaultDueDate={today} />

      {/* Completed today */}
      {completedToday && completedToday.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-tertiary">
            Completed Today ({completedToday.length})
          </h2>
          <TaskList tasks={completedToday} showCompleted />
        </section>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-bg-raised/50 py-12 text-center">
      <Sun weight="light" className="h-16 w-16 text-text-tertiary" />
      <h3 className="mt-4 text-lg font-medium text-text-primary">Nothing due today!</h3>
      <p className="mt-1 text-sm text-text-secondary">
        Enjoy your free time, or add a task to get ahead.
      </p>
      <Button variant="secondary" className="mt-4 gap-2">
        <Plus weight="bold" className="h-4 w-4" />
        Add Task
      </Button>
    </div>
  )
}
