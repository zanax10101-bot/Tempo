import type { Task } from '@/db/types'

export type TaskWithProject = Task & {
  projectName?: string
  projectColor?: string
}

export type TaskSortOption = 'dueDate' | 'priority' | 'alphabetical' | 'createdAt'

export type TaskFilterOption = 'all' | 'active' | 'completed' | 'hasDueDate' | 'noDueDate'
