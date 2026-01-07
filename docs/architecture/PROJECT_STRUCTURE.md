# Tempo Project Structure

**Author:** Software Architect  
**Date:** January 7, 2026  
**Status:** Proposed  
**Reviewers:** Full Stack Developer

---

## Overview

This document defines the folder structure and code organization for Tempo. The structure follows a **feature-based architecture** with clear separation between UI components, business logic, and data access.

---

## Directory Structure

```
tempo/
├── public/
│   ├── favicon.ico
│   ├── sounds/                    # Timer notification sounds
│   │   ├── focus-end.mp3
│   │   └── break-end.mp3
│   └── manifest.json              # PWA manifest (future)
│
├── src/
│   ├── app/                       # Application shell
│   │   ├── App.tsx                # Root component, routing
│   │   ├── Layout.tsx             # Main layout (sidebar + content)
│   │   └── providers.tsx          # Context providers wrapper
│   │
│   ├── features/                  # Feature modules (core business domains)
│   │   ├── timer/                 # Timer feature
│   │   │   ├── components/        # Timer-specific UI
│   │   │   │   ├── TimerDisplay.tsx
│   │   │   │   ├── TimerControls.tsx
│   │   │   │   ├── PresetSelector.tsx
│   │   │   │   ├── TimerProgress.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/             # Timer business logic
│   │   │   │   ├── useTimer.ts
│   │   │   │   ├── useTimerPresets.ts
│   │   │   │   ├── useTimerNotifications.ts
│   │   │   │   └── index.ts
│   │   │   ├── stores/            # Timer state (Zustand)
│   │   │   │   └── timerStore.ts
│   │   │   ├── utils/             # Timer utilities
│   │   │   │   ├── formatTime.ts
│   │   │   │   └── timerCalculations.ts
│   │   │   ├── types.ts           # Timer-specific types
│   │   │   └── index.ts           # Public exports
│   │   │
│   │   ├── tasks/                 # Task management feature
│   │   │   ├── components/
│   │   │   │   ├── TaskList.tsx
│   │   │   │   ├── TaskItem.tsx
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   ├── TaskDetail.tsx
│   │   │   │   ├── SubtaskList.tsx
│   │   │   │   ├── QuickAddTask.tsx
│   │   │   │   ├── PriorityBadge.tsx
│   │   │   │   ├── DueDatePicker.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTasks.ts
│   │   │   │   ├── useSubtasks.ts
│   │   │   │   ├── useTaskFilters.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── taskSorting.ts
│   │   │   │   ├── dueDateParser.ts  # Natural language dates
│   │   │   │   └── index.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── projects/              # Project management feature
│   │   │   ├── components/
│   │   │   │   ├── ProjectList.tsx
│   │   │   │   ├── ProjectItem.tsx
│   │   │   │   ├── ProjectForm.tsx
│   │   │   │   ├── ColorPicker.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   └── useProjects.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── statistics/            # Focus statistics feature
│   │   │   ├── components/
│   │   │   │   ├── DailySummary.tsx
│   │   │   │   ├── WeeklyChart.tsx
│   │   │   │   ├── StreakIndicator.tsx
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useStatistics.ts
│   │   │   │   └── useStreak.ts
│   │   │   └── index.ts
│   │   │
│   │   └── settings/              # App settings feature
│   │       ├── components/
│   │       │   ├── SettingsPage.tsx
│   │       │   ├── ThemeToggle.tsx
│   │       │   ├── SoundSettings.tsx
│   │       │   ├── ExportData.tsx
│   │       │   └── index.ts
│   │       ├── hooks/
│   │       │   └── useSettings.ts
│   │       └── index.ts
│   │
│   ├── components/                # Shared UI components
│   │   ├── ui/                    # Atomic/base components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── IconButton.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── feedback/              # User feedback components
│   │       ├── Toast.tsx
│   │       ├── ConfirmDialog.tsx
│   │       ├── EmptyState.tsx
│   │       └── index.ts
│   │
│   ├── db/                        # Database layer
│   │   ├── database.ts            # Dexie instance & schema
│   │   ├── seed.ts                # Initial data seeding
│   │   ├── types.ts               # Database entity types
│   │   ├── repositories/          # Data access objects
│   │   │   ├── taskRepository.ts
│   │   │   ├── projectRepository.ts
│   │   │   ├── timerRepository.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── hooks/                     # Shared custom hooks
│   │   ├── useLocalStorage.ts
│   │   ├── useKeyboardShortcut.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   │
│   ├── lib/                       # Third-party integrations & utilities
│   │   ├── notifications.ts       # Browser Notification API wrapper
│   │   ├── audio.ts               # Sound playback utility
│   │   └── analytics.ts           # Analytics (future)
│   │
│   ├── styles/                    # Global styles
│   │   ├── globals.css            # Tailwind imports + global resets
│   │   ├── animations.css         # Custom animations
│   │   └── themes.css             # CSS variables for theming
│   │
│   ├── types/                     # Shared TypeScript types
│   │   ├── common.ts              # Generic utility types
│   │   └── index.ts
│   │
│   ├── utils/                     # Shared utilities
│   │   ├── date.ts                # Date formatting/manipulation
│   │   ├── string.ts              # String utilities
│   │   ├── cn.ts                  # clsx + tailwind-merge helper
│   │   └── index.ts
│   │
│   ├── constants/                 # App constants
│   │   ├── routes.ts
│   │   ├── shortcuts.ts           # Keyboard shortcut definitions
│   │   ├── defaults.ts            # Default values
│   │   └── index.ts
│   │
│   ├── pages/                     # Route-level page components
│   │   ├── TimerPage.tsx
│   │   ├── TasksPage.tsx
│   │   ├── TodayPage.tsx
│   │   ├── UpcomingPage.tsx
│   │   ├── ProjectPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── index.ts
│   │
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts              # Vite type declarations
│
├── tests/                         # Test files (mirrors src structure)
│   ├── unit/
│   │   ├── features/
│   │   │   ├── timer/
│   │   │   │   └── useTimer.test.ts
│   │   │   └── tasks/
│   │   │       └── useTasks.test.ts
│   │   └── utils/
│   │       └── date.test.ts
│   ├── integration/
│   │   └── db/
│   │       └── taskRepository.test.ts
│   └── e2e/
│       ├── timer.spec.ts
│       └── tasks.spec.ts
│
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                         PAGES (Routes)                          │
│  TimerPage, TasksPage, TodayPage, UpcomingPage, SettingsPage   │
└─────────────────────────────┬───────────────────────────────────┘
                              │ compose
┌─────────────────────────────▼───────────────────────────────────┐
│                    FEATURES (Domain Logic)                       │
│  timer/, tasks/, projects/, statistics/, settings/              │
│  - components (feature-specific UI)                              │
│  - hooks (business logic)                                        │
│  - stores (state management)                                     │
│  - types (feature types)                                         │
└─────────────────────────────┬───────────────────────────────────┘
                              │ use
┌─────────────────────────────▼───────────────────────────────────┐
│                   SHARED COMPONENTS (UI)                         │
│  components/ui/, components/layout/, components/feedback/       │
│  - Button, Modal, Input, Sidebar, Toast, etc.                   │
└─────────────────────────────┬───────────────────────────────────┘
                              │ use
┌─────────────────────────────▼───────────────────────────────────┐
│                    DATA LAYER (Persistence)                      │
│  db/database.ts, db/repositories/                               │
│  - Dexie instance                                                │
│  - Repository pattern for data access                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. Feature-Based Organization

Each feature is self-contained:

```
features/timer/
├── components/     # UI components specific to timer
├── hooks/          # Business logic as hooks
├── stores/         # Zustand stores for timer state
├── utils/          # Helper functions
├── types.ts        # TypeScript types
└── index.ts        # Public exports (barrel file)
```

**Benefits**:
- Easy to understand boundaries
- Features can be developed independently
- Clear ownership for code review
- Simpler to delete/refactor entire features

### 2. Shared Components Are Generic

Components in `src/components/` must be:
- Feature-agnostic (no business logic)
- Reusable across features
- Well-documented with props

**Example**:
```typescript
// ✅ Good: Generic button in components/ui/
<Button variant="primary" size="md" onClick={...}>Start</Button>

// ❌ Bad: Timer-specific logic in shared component
<Button isTimerRunning={...}>...</Button>  // Timer logic doesn't belong here
```

### 3. Hooks Encapsulate Business Logic

All business logic lives in custom hooks, not components:

```typescript
// features/timer/hooks/useTimer.ts
export function useTimer() {
  const { isRunning, remainingSeconds, actions } = useTimerStore()
  
  // Business logic: tick every second
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(actions.tick, 1000)
    return () => clearInterval(interval)
  }, [isRunning])
  
  // Business logic: notify on complete
  useEffect(() => {
    if (remainingSeconds <= 0) {
      playNotificationSound()
      showBrowserNotification()
    }
  }, [remainingSeconds])
  
  return { isRunning, remainingSeconds, ...actions }
}

// features/timer/components/TimerDisplay.tsx
export function TimerDisplay() {
  const { remainingSeconds } = useTimer()
  // Component only renders UI, no logic
  return <div>{formatTime(remainingSeconds)}</div>
}
```

### 4. Repository Pattern for Data Access

Repositories abstract database operations:

```typescript
// db/repositories/taskRepository.ts
export const taskRepository = {
  async getAll(): Promise<Task[]> {
    return db.tasks.toArray()
  },
  
  async getByProject(projectId: number): Promise<Task[]> {
    return db.tasks
      .where('projectId')
      .equals(projectId)
      .toArray()
  },
  
  async create(task: Omit<Task, 'id'>): Promise<number> {
    return db.tasks.add(task as Task)
  },
  
  async update(id: number, changes: Partial<Task>): Promise<void> {
    await db.tasks.update(id, { ...changes, updatedAt: new Date() })
  },
  
  async delete(id: number): Promise<void> {
    await db.transaction('rw', [db.tasks, db.subtasks], async () => {
      await db.subtasks.where('taskId').equals(id).delete()
      await db.tasks.delete(id)
    })
  },
}
```

**Benefits**:
- Single source of truth for data operations
- Easy to mock for testing
- Encapsulates complex queries
- Simplifies future sync implementation

### 5. Barrel Exports

Each folder has an `index.ts` for clean imports:

```typescript
// features/timer/components/index.ts
export { TimerDisplay } from './TimerDisplay'
export { TimerControls } from './TimerControls'
export { PresetSelector } from './PresetSelector'

// Usage (clean imports)
import { TimerDisplay, TimerControls } from '@/features/timer/components'
```

---

## Import Aliases

Configure path aliases for cleaner imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// vite.config.ts
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Usage**:
```typescript
// Before
import { Button } from '../../../components/ui/Button'

// After
import { Button } from '@/components/ui/Button'
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `TaskItem.tsx` |
| Hooks | camelCase, `use` prefix | `useTimer.ts` |
| Utilities | camelCase | `formatTime.ts` |
| Types/Interfaces | PascalCase | `types.ts` containing `Task`, `Project` |
| Constants | SCREAMING_SNAKE_CASE | `DEFAULT_FOCUS_MINUTES` |
| Test files | `.test.ts` or `.spec.ts` | `useTimer.test.ts` |
| CSS/Style files | kebab-case | `globals.css` |

---

## Component Structure

Standard component file structure:

```typescript
// features/tasks/components/TaskItem.tsx

// 1. Imports (grouped: react, third-party, internal)
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Checkbox, Badge } from '@/components/ui'
import { useTasks } from '../hooks'
import type { Task } from '@/db/types'

// 2. Types (component-specific)
interface TaskItemProps {
  task: Task
  onSelect?: (id: number) => void
}

// 3. Component
export function TaskItem({ task, onSelect }: TaskItemProps) {
  const { toggleComplete } = useTasks()
  
  const handleComplete = useCallback(() => {
    toggleComplete(task.id)
  }, [task.id, toggleComplete])
  
  return (
    <motion.div 
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
      layout
    >
      <Checkbox 
        checked={!!task.completedAt} 
        onChange={handleComplete} 
      />
      <span className="flex-1">{task.title}</span>
      {task.priority !== 'none' && (
        <Badge variant={task.priority}>{task.priority}</Badge>
      )}
    </motion.div>
  )
}

// 4. Default export (optional, prefer named exports)
```

---

## State Management Strategy

| State Type | Location | Example |
|------------|----------|---------|
| **Server/DB State** | Dexie `useLiveQuery` | Task list, projects |
| **UI State** | Component `useState` | Modal open, input value |
| **Cross-Component UI** | Zustand store | Timer running state, sidebar collapsed |
| **Derived State** | Computed in hooks | Filtered tasks, statistics |

### Timer State (Zustand)

Timer needs cross-component state:

```typescript
// features/timer/stores/timerStore.ts
interface TimerState {
  // State
  isRunning: boolean
  isPaused: boolean
  phase: 'focus' | 'break' | 'longBreak'
  remainingSeconds: number
  currentCycle: number
  linkedTaskId: number | null
  presetId: number | null
  
  // Actions
  start: (presetId?: number, taskId?: number) => void
  pause: () => void
  resume: () => void
  reset: () => void
  tick: () => void
  skipToBreak: () => void
  skipToFocus: () => void
}
```

### Task State (Dexie Live Queries)

Tasks use Dexie's reactive queries:

```typescript
// features/tasks/hooks/useTasks.ts
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db'

export function useTasks(projectId?: number) {
  const tasks = useLiveQuery(
    () => projectId 
      ? db.tasks.where('projectId').equals(projectId).toArray()
      : db.tasks.toArray(),
    [projectId]
  )
  
  return { tasks: tasks ?? [], isLoading: tasks === undefined }
}
```

---

## Testing Strategy

### Unit Tests (Vitest)

```typescript
// tests/unit/features/timer/useTimer.test.ts
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '@/features/timer/hooks/useTimer'

describe('useTimer', () => {
  it('starts timer and decrements', async () => {
    const { result } = renderHook(() => useTimer())
    
    act(() => result.current.start())
    expect(result.current.isRunning).toBe(true)
    
    // Fast-forward time...
  })
})
```

### Integration Tests

Test repository + database interactions with in-memory Dexie.

### E2E Tests (Playwright)

```typescript
// tests/e2e/timer.spec.ts
import { test, expect } from '@playwright/test'

test('complete a pomodoro session', async ({ page }) => {
  await page.goto('/')
  await page.click('[data-testid="start-timer"]')
  // ...
})
```

---

## Performance Considerations

### Code Splitting

Lazy load pages:

```typescript
// src/app/App.tsx
import { lazy, Suspense } from 'react'

const TimerPage = lazy(() => import('@/pages/TimerPage'))
const TasksPage = lazy(() => import('@/pages/TasksPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  )
}
```

### Bundle Analysis

Include script in package.json:

```json
{
  "scripts": {
    "analyze": "vite-bundle-visualizer"
  }
}
```

---

## Future Considerations

### Adding New Features

When adding a new feature (e.g., Calendar):

1. Create `src/features/calendar/` with standard structure
2. Add page component in `src/pages/CalendarPage.tsx`
3. Add route in `App.tsx`
4. Add navigation item in sidebar
5. Add database entities if needed (with migration)

### Sync Layer (Phase 3)

When adding cloud sync:

```
src/
├── sync/                      # New sync module
│   ├── syncEngine.ts          # Core sync logic
│   ├── conflictResolution.ts  # Handle merge conflicts
│   ├── offlineQueue.ts        # Queue offline operations
│   └── api/                   # API client
│       └── tempoApi.ts
```

---

*Document Version: 1.0*  
*Next Review: After Developer starts implementation*

