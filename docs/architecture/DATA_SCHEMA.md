# Tempo Data Schema

**Author:** Software Architect  
**Date:** January 7, 2026  
**Status:** Proposed  
**Reviewers:** Full Stack Developer

---

## Overview

This document defines the data model for Tempo MVP. The schema is designed for:

1. **Local-first operation** via IndexedDB
2. **Future cloud sync** compatibility (no major refactors needed)
3. **Relationship integrity** without a SQL foreign key system

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TEMPO DATA MODEL                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐        │
│   │   Project    │         │     Task     │         │   Subtask    │        │
│   ├──────────────┤         ├──────────────┤         ├──────────────┤        │
│   │ id (PK)      │ 1    N  │ id (PK)      │ 1    N  │ id (PK)      │        │
│   │ name         │◄────────┤ projectId(FK)│◄────────┤ taskId (FK)  │        │
│   │ color        │         │ title        │         │ title        │        │
│   │ emoji        │         │ description  │         │ isCompleted  │        │
│   │ sortOrder    │         │ priority     │         │ sortOrder    │        │
│   │ createdAt    │         │ dueDate      │         │ createdAt    │        │
│   │ updatedAt    │         │ completedAt  │         │ updatedAt    │        │
│   └──────────────┘         │ totalTime    │         └──────────────┘        │
│                            │ sortOrder    │                                  │
│                            │ createdAt    │                                  │
│                            │ updatedAt    │                                  │
│   ┌──────────────┐         └──────────────┘                                  │
│   │ TimerPreset  │                │                                          │
│   ├──────────────┤                │                                          │
│   │ id (PK)      │                │ 1                                        │
│   │ name         │                │                                          │
│   │ focusMins    │                │                                          │
│   │ breakMins    │                │                                          │
│   │ longBreak    │                │ N                                        │
│   │ cycles       │         ┌──────┴───────┐                                  │
│   │ isDefault    │         │ TimerSession │                                  │
│   │ sortOrder    │         ├──────────────┤                                  │
│   │ createdAt    │         │ id (PK)      │                                  │
│   │ updatedAt    │ 1    N  │ taskId (FK)  │                                  │
│   └──────────────┼────────►│ presetId(FK) │                                  │
│                            │ type         │                                  │
│                            │ duration     │                                  │
│                            │ actual       │                                  │
│                            │ startedAt    │                                  │
│                            │ completedAt  │                                  │
│   ┌──────────────┐         └──────────────┘                                  │
│   │ UserSettings │                                                           │
│   ├──────────────┤                                                           │
│   │ id (PK)      │ (Singleton - always id=1)                                │
│   │ theme        │                                                           │
│   │ soundEnabled │                                                           │
│   │ notifications│                                                           │
│   │ ...          │                                                           │
│   └──────────────┘                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Entity Definitions

### 1. Project

Organizational container for tasks. Every task belongs to a project (or Inbox).

```typescript
interface Project {
  id: number              // Auto-increment primary key
  name: string            // Required, max 100 chars
  color: string           // Hex color, e.g., "#FF5733"
  emoji?: string          // Optional emoji identifier
  sortOrder: number       // For manual ordering
  isArchived: boolean     // Soft delete / hide
  createdAt: Date
  updatedAt: Date
}

// IndexedDB indexes
// - Primary: id (auto)
// - Index: name (for search)
// - Index: sortOrder (for listing)
// - Index: isArchived (for filtering)
```

**Default Project**: System creates an "Inbox" project with `id: 1` on first launch. This is the default container for tasks without explicit project assignment.

**Business Rules**:
- Inbox project cannot be deleted or archived
- Project names must be unique
- Deleting a project moves tasks to Inbox (not cascade delete)

---

### 2. Task

Core task entity with all MVP fields.

```typescript
interface Task {
  id: number                                      // Auto-increment PK
  projectId: number                               // FK to Project (default: 1 = Inbox)
  
  // Content
  title: string                                   // Required, max 500 chars
  description?: string                            // Optional rich text (markdown?)
  
  // Priority & Status
  priority: 'none' | 'low' | 'medium' | 'high'   // Default: 'none'
  
  // Dates
  dueDate?: Date                                  // Optional deadline
  completedAt?: Date                              // null = incomplete
  
  // Timer Integration
  totalTimeSpent: number                          // Accumulated seconds from sessions
  
  // Organization
  sortOrder: number                               // Within project
  
  // Metadata
  createdAt: Date
  updatedAt: Date
}

// IndexedDB indexes
// - Primary: id (auto)
// - Index: projectId (for project filtering)
// - Index: dueDate (for "Today" and "Upcoming" views)
// - Index: completedAt (for completed vs active filtering)
// - Index: priority (for sorting)
// - Compound: [projectId, sortOrder] (for ordered project tasks)
// - Compound: [completedAt, dueDate] (for smart views)
```

**Computed Properties** (not stored, derived in app):
- `isOverdue`: `dueDate < now && !completedAt`
- `isDueToday`: `dueDate === today && !completedAt`
- `subtaskProgress`: `completedSubtasks / totalSubtasks`

**Business Rules**:
- Completing a task sets `completedAt` to current timestamp
- "Uncompleting" sets `completedAt` to null
- Time spent accumulates from completed timer sessions
- Due dates are stored as start-of-day in user's timezone

---

### 3. Subtask

One level of task breakdown.

```typescript
interface Subtask {
  id: number              // Auto-increment PK
  taskId: number          // FK to Task (required)
  title: string           // Required, max 200 chars
  isCompleted: boolean    // Default: false
  sortOrder: number       // Within parent task
  createdAt: Date
  updatedAt: Date
}

// IndexedDB indexes
// - Primary: id (auto)
// - Index: taskId (for parent lookup)
// - Compound: [taskId, sortOrder] (for ordered subtasks)
```

**Business Rules**:
- Deleting a task cascade-deletes all subtasks
- No nested subtasks (1 level only for MVP)
- Completing all subtasks does NOT auto-complete parent (per spec)

---

### 4. TimerPreset

Saved timer configurations.

```typescript
interface TimerPreset {
  id: number              // Auto-increment PK
  name: string            // e.g., "Deep Work", "Light Reading"
  focusMinutes: number    // 1-120, default: 25
  breakMinutes: number    // 1-60, default: 5
  longBreakMinutes: number // 5-60, default: 15
  cyclesBeforeLongBreak: number // 1-10, default: 4
  isDefault: boolean      // Only one preset can be default
  isBuiltIn: boolean      // System presets can't be deleted
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

// IndexedDB indexes
// - Primary: id (auto)
// - Index: isDefault (for quick default lookup)
// - Index: sortOrder (for listing)
```

**Default Presets** (seeded on first launch):

| ID | Name | Focus | Break | Long Break | Cycles |
|----|------|-------|-------|------------|--------|
| 1 | Classic Pomodoro | 25 | 5 | 15 | 4 |
| 2 | Long Focus | 50 | 10 | 30 | 2 |
| 3 | Quick Sprint | 15 | 3 | 10 | 4 |

**Business Rules**:
- Setting a preset as default un-defaults all others
- Built-in presets can be modified but not deleted
- User can create unlimited custom presets

---

### 5. TimerSession

Record of completed timer sessions (for statistics).

```typescript
interface TimerSession {
  id: number              // Auto-increment PK
  
  // Relationships
  taskId?: number         // Optional FK to Task
  presetId?: number       // Optional FK to TimerPreset
  
  // Session Type
  type: 'focus' | 'break' // What kind of session
  
  // Duration
  plannedDuration: number // Seconds (from preset or custom)
  actualDuration: number  // Seconds actually focused
  
  // Completion
  wasCompleted: boolean   // Did user finish or cancel early?
  
  // Timestamps
  startedAt: Date
  endedAt: Date
}

// IndexedDB indexes
// - Primary: id (auto)
// - Index: taskId (for task time aggregation)
// - Index: type (for focus vs break filtering)
// - Index: startedAt (for date range queries)
// - Index: endedAt (for statistics)
// - Compound: [type, startedAt] (for daily focus time)
```

**Business Rules**:
- A session is created when timer starts (or when it ends?)
  - **Recommendation**: Create on completion only (simpler, no orphaned sessions)
- `actualDuration` may be less than `plannedDuration` if cancelled
- Sessions accumulate to `Task.totalTimeSpent` if linked

---

### 6. UserSettings

Singleton for app-wide preferences.

```typescript
interface UserSettings {
  id: 1                   // Always 1 (singleton pattern)
  
  // Appearance
  theme: 'light' | 'dark' | 'system'
  accentColor: string     // Hex color
  
  // Timer Defaults
  defaultPresetId: number // FK to TimerPreset
  autoStartBreaks: boolean
  autoStartFocus: boolean
  
  // Notifications
  soundEnabled: boolean
  soundVolume: number     // 0-100
  browserNotifications: boolean
  
  // Task Defaults
  defaultProjectId: number // FK to Project
  
  // Data
  lastExportDate?: Date
  
  updatedAt: Date
}
```

**Implementation Note**: Use `.get(1)` or `.put({ ...settings, id: 1 })` pattern.

---

## Dexie.js Schema Definition

```typescript
// src/db/database.ts
import Dexie, { Table } from 'dexie'
import type { 
  Project, 
  Task, 
  Subtask, 
  TimerPreset, 
  TimerSession, 
  UserSettings 
} from './types'

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
      tasks: '++id, projectId, dueDate, completedAt, priority, [projectId+sortOrder], [completedAt+dueDate]',
      subtasks: '++id, taskId, [taskId+sortOrder]',
      timerPresets: '++id, isDefault, sortOrder',
      timerSessions: '++id, taskId, type, startedAt, endedAt, [type+startedAt]',
      userSettings: 'id',
    })
  }
}

export const db = new TempoDB()
```

---

## Schema Migrations Strategy

Dexie handles migrations via version numbers:

```typescript
// Future migration example
this.version(2).stores({
  // Add new index
  tasks: '++id, projectId, dueDate, completedAt, priority, tags, [projectId+sortOrder]',
}).upgrade(tx => {
  // Data transformation if needed
  return tx.table('tasks').toCollection().modify(task => {
    task.tags = [] // Initialize new field
  })
})
```

**Migration Rules**:
1. Never remove indexed fields without migration
2. Always increment version for schema changes
3. Test migrations with realistic data volumes

---

## Sync-Ready Considerations

The schema is designed for future cloud sync:

### 1. UUID Alternative

Currently using auto-increment IDs. For sync, consider:

```typescript
// Option A: Add syncId field later
interface Task {
  id: number        // Local ID
  syncId?: string   // UUID for cloud, added in v2
  // ...
}

// Option B: Use UUID from start (recommended if sync is certain)
interface Task {
  id: string        // UUID
  // ...
}
```

**Recommendation**: Start with auto-increment for simplicity. Add `syncId` when implementing sync. Dexie Cloud handles this pattern well.

### 2. Conflict Resolution Fields

When adding sync, consider:

```typescript
interface SyncMetadata {
  lastSyncedAt?: Date
  version: number       // Optimistic locking
  isDeleted: boolean    // Soft delete for sync
  deviceId?: string     // Origin device
}
```

### 3. Offline Queue

Future pattern for sync:

```typescript
interface PendingSync {
  id: number
  entityType: 'task' | 'project' | ...
  entityId: number
  operation: 'create' | 'update' | 'delete'
  payload: object
  createdAt: Date
}
```

---

## Data Seeding

On first launch, seed essential data:

```typescript
// src/db/seed.ts
import { db } from './database'

export async function seedDatabase() {
  const projectCount = await db.projects.count()
  if (projectCount > 0) return // Already seeded
  
  // 1. Create Inbox project
  await db.projects.add({
    name: 'Inbox',
    color: '#6B7280', // Gray
    emoji: '📥',
    sortOrder: 0,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  
  // 2. Create default timer presets
  await db.timerPresets.bulkAdd([
    {
      name: 'Classic Pomodoro',
      focusMinutes: 25,
      breakMinutes: 5,
      longBreakMinutes: 15,
      cyclesBeforeLongBreak: 4,
      isDefault: true,
      isBuiltIn: true,
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Long Focus',
      focusMinutes: 50,
      breakMinutes: 10,
      longBreakMinutes: 30,
      cyclesBeforeLongBreak: 2,
      isDefault: false,
      isBuiltIn: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Quick Sprint',
      focusMinutes: 15,
      breakMinutes: 3,
      longBreakMinutes: 10,
      cyclesBeforeLongBreak: 4,
      isDefault: false,
      isBuiltIn: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
  
  // 3. Create default user settings
  await db.userSettings.add({
    id: 1,
    theme: 'system',
    accentColor: '#3B82F6', // Blue
    defaultPresetId: 1,
    autoStartBreaks: false,
    autoStartFocus: false,
    soundEnabled: true,
    soundVolume: 80,
    browserNotifications: false,
    defaultProjectId: 1,
    updatedAt: new Date(),
  })
}
```

---

## Data Export Format

For the "export to JSON" feature:

```typescript
interface TempoExport {
  version: '1.0'
  exportedAt: string  // ISO date
  data: {
    projects: Project[]
    tasks: Task[]
    subtasks: Subtask[]
    timerPresets: TimerPreset[]
    timerSessions: TimerSession[]
    userSettings: UserSettings
  }
}
```

---

## Queries Reference

Common query patterns for the developer:

```typescript
// Today's tasks (due today or overdue, not completed)
const today = startOfDay(new Date())
const tomorrow = startOfDay(addDays(new Date(), 1))

const todayTasks = await db.tasks
  .where('dueDate')
  .below(tomorrow)
  .and(task => !task.completedAt)
  .toArray()

// Tasks by project
const projectTasks = await db.tasks
  .where('projectId')
  .equals(projectId)
  .and(task => !task.completedAt)
  .sortBy('sortOrder')

// Total focus time today
const todaySessions = await db.timerSessions
  .where('[type+startedAt]')
  .between(['focus', today], ['focus', tomorrow])
  .toArray()

const totalFocusSeconds = todaySessions.reduce(
  (sum, s) => sum + s.actualDuration, 
  0
)

// Task with subtasks
const task = await db.tasks.get(taskId)
const subtasks = await db.subtasks
  .where('taskId')
  .equals(taskId)
  .sortBy('sortOrder')
```

---

*Document Version: 1.0*  
*Next Review: After Developer implementation feedback*

