import { useLiveQuery } from 'dexie-react-hooks'
import { format, addDays, startOfDay, isSameDay } from 'date-fns'
import { Calendar } from '@phosphor-icons/react'
import { db } from '@/db'
import { TaskList } from '@/features/tasks/components/TaskList'
import { QuickAddTask } from '@/features/tasks/components/QuickAddTask'

export function UpcomingPage() {
  const today = startOfDay(new Date())
  const nextWeek = addDays(today, 7)

  const tasks = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray()
    return allTasks.filter(
      (t) => !t.completedAt && t.dueDate && t.dueDate > today && t.dueDate <= nextWeek
    ).sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0
      return a.dueDate.getTime() - b.dueDate.getTime()
    })
  })

  // Group tasks by day
  const groupedTasks = tasks?.reduce((groups, task) => {
    if (!task.dueDate) return groups
    const dateKey = format(task.dueDate, 'yyyy-MM-dd')
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(task)
    return groups
  }, {} as Record<string, typeof tasks>) ?? {}

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Calendar weight="duotone" className="h-8 w-8 text-accent-primary" />
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Upcoming</h1>
          <p className="text-sm text-text-secondary">Next 7 days</p>
        </div>
      </div>

      {/* Tasks grouped by day */}
      {Object.entries(groupedTasks).length > 0 ? (
        Object.entries(groupedTasks).map(([dateKey, dayTasks]) => {
          const date = new Date(dateKey)
          const isTomorrow = isSameDay(date, addDays(today, 1))
          return (
            <section key={dateKey}>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-tertiary">
                {isTomorrow ? 'Tomorrow' : format(date, 'EEEE, MMMM d')}
              </h2>
              <TaskList tasks={dayTasks ?? []} />
            </section>
          )
        })
      ) : (
        <EmptyState />
      )}

      <QuickAddTask />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-bg-raised/50 py-12 text-center">
      <Calendar weight="light" className="h-16 w-16 text-text-tertiary" />
      <h3 className="mt-4 text-lg font-medium text-text-primary">Nothing upcoming</h3>
      <p className="mt-1 text-sm text-text-secondary">
        Tasks due in the next 7 days will appear here.
      </p>
    </div>
  )
}
