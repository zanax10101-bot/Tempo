import { useLiveQuery } from 'dexie-react-hooks'
import { Tray } from '@phosphor-icons/react'
import { db } from '@/db'
import { TaskList } from '@/features/tasks/components/TaskList'
import { QuickAddTask } from '@/features/tasks/components/QuickAddTask'

export function InboxPage() {
  const tasks = useLiveQuery(async () => {
    const allTasks = await db.tasks.toArray()
    // Inbox tasks: in project 1 (Inbox) and not completed
    return allTasks.filter((t) => t.projectId === 1 && !t.completedAt)
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Tray weight="duotone" className="h-8 w-8 text-accent-primary" />
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Inbox</h1>
          <p className="text-sm text-text-secondary">
            {tasks?.length ?? 0} task{tasks?.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Tasks */}
      {tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <EmptyState />
      )}

      <QuickAddTask projectId={1} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-bg-raised/50 py-12 text-center">
      <Tray weight="light" className="h-16 w-16 text-text-tertiary" />
      <h3 className="mt-4 text-lg font-medium text-text-primary">Inbox is empty</h3>
      <p className="mt-1 text-sm text-text-secondary">
        Quick-add tasks will appear here until you organize them.
      </p>
    </div>
  )
}
