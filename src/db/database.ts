import Dexie, { type Table } from 'dexie'
import type { Project, Task, Subtask, TimerPreset, TimerSession, UserSettings } from './types'

export class TempoDB extends Dexie {
  projects!: Table<Project>
  tasks!: Table<Task>
  subtasks!: Table<Subtask>
  timerPresets!: Table<TimerPreset>
  timerSessions!: Table<TimerSession>
  userSettings!: Table<UserSettings>

  constructor() {
    super('TempoDB')

    this.version(1).stores({
      projects: '++id, name, sortOrder, isArchived',
      tasks:
        '++id, projectId, dueDate, completedAt, priority, [projectId+sortOrder], [completedAt+dueDate]',
      subtasks: '++id, taskId, [taskId+sortOrder]',
      timerPresets: '++id, isDefault, sortOrder',
      timerSessions: '++id, taskId, type, startedAt, endedAt, [type+startedAt]',
      userSettings: 'id',
    })
  }
}

export const db = new TempoDB()
