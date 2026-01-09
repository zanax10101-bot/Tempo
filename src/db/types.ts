// Database entity types for Tempo

export interface Project {
  id?: number
  name: string
  color: string
  emoji?: string
  sortOrder: number
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id?: number
  projectId: number
  title: string
  description?: string
  priority: 'none' | 'low' | 'medium' | 'high'
  dueDate?: Date
  completedAt?: Date
  totalTimeSpent: number
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Subtask {
  id?: number
  taskId: number
  title: string
  isCompleted: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface TimerPreset {
  id?: number
  name: string
  focusMinutes: number
  breakMinutes: number
  longBreakMinutes: number
  cyclesBeforeLongBreak: number
  isDefault: boolean
  isBuiltIn: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface TimerSession {
  id?: number
  taskId?: number
  presetId?: number
  type: 'focus' | 'break'
  plannedDuration: number
  actualDuration: number
  wasCompleted: boolean
  startedAt: Date
  endedAt: Date
}

export interface UserSettings {
  id: 1
  theme: 'light' | 'dark' | 'system'
  accentColor: string
  defaultPresetId: number
  autoStartBreaks: boolean
  autoStartFocus: boolean
  soundEnabled: boolean
  soundVolume: number
  browserNotifications: boolean
  defaultProjectId: number
  lastExportDate?: Date
  updatedAt: Date
}

// Export format for JSON backup
export interface TempoExport {
  version: '1.0'
  exportedAt: string
  data: {
    projects: Project[]
    tasks: Task[]
    subtasks: Subtask[]
    timerPresets: TimerPreset[]
    timerSessions: TimerSession[]
    userSettings: UserSettings
  }
}
