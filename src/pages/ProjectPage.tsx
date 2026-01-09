import { useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { Folder } from '@phosphor-icons/react'
import { db } from '@/db'
import { TaskList } from '@/features/tasks/components/TaskList'
import { QuickAddTask } from '@/features/tasks/components/QuickAddTask'

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const id = Number(projectId)

  const project = useLiveQuery(() => db.projects.get(id), [id])

  const tasks = useLiveQuery(
    async () => {
      const allTasks = await db.tasks.toArray()
      return allTasks.filter((t) => t.projectId === id && !t.completedAt)
    },
    [id]
  )

  if (!project) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-text-secondary">Project not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: project.color + '20' }}
        >
          {project.emoji ? (
            <span className="text-lg">{project.emoji}</span>
          ) : (
            <Folder weight="duotone" className="h-5 w-5" style={{ color: project.color }} />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">{project.name}</h1>
          <p className="text-sm text-text-secondary">
            {tasks?.length ?? 0} task{tasks?.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Tasks */}
      {tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <EmptyState projectName={project.name} />
      )}

      <QuickAddTask projectId={id} />
    </div>
  )
}

function EmptyState({ projectName }: { projectName: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-bg-raised/50 py-12 text-center">
      <Folder weight="light" className="h-16 w-16 text-text-tertiary" />
      <h3 className="mt-4 text-lg font-medium text-text-primary">No tasks yet</h3>
      <p className="mt-1 text-sm text-text-secondary">
        Add tasks to {projectName} to get started.
      </p>
    </div>
  )
}
