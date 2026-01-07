# Tempo Architecture Overview

**Author:** Software Architect  
**Date:** January 7, 2026  
**Status:** Proposed  
**Version:** 1.0

---

## Executive Summary

Tempo is a **local-first web application** built with React, designed to be fast, reliable, and eventually sync-capable. This document provides a high-level architectural overview.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         PRESENTATION LAYER                           │   │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│   │  │  Timer Page │  │ Tasks Page  │  │ Today Page  │  │  Settings   │ │   │
│   │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │   │
│   └─────────┼────────────────┼────────────────┼────────────────┼────────┘   │
│             │                │                │                │            │
│   ┌─────────▼────────────────▼────────────────▼────────────────▼────────┐   │
│   │                         FEATURE LAYER                                │   │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │   │
│   │  │    Timer     │  │    Tasks     │  │   Projects   │               │   │
│   │  │   Feature    │  │   Feature    │  │   Feature    │               │   │
│   │  │  ┌────────┐  │  │  ┌────────┐  │  │  ┌────────┐  │               │   │
│   │  │  │ Hooks  │  │  │  │ Hooks  │  │  │  │ Hooks  │  │               │   │
│   │  │  └────────┘  │  │  └────────┘  │  │  └────────┘  │               │   │
│   │  │  ┌────────┐  │  │  ┌────────┐  │  │              │               │   │
│   │  │  │ Store  │  │  │  │  Live  │  │  │              │               │   │
│   │  │  │Zustand │  │  │  │Queries │  │  │              │               │   │
│   │  │  └────────┘  │  │  └────────┘  │  │              │               │   │
│   │  └──────────────┘  └──────────────┘  └──────────────┘               │   │
│   └─────────┬────────────────┬────────────────┬─────────────────────────┘   │
│             │                │                │                              │
│   ┌─────────▼────────────────▼────────────────▼─────────────────────────┐   │
│   │                         DATA LAYER                                   │   │
│   │  ┌──────────────────────────────────────────────────────────────┐   │   │
│   │  │                     Dexie.js (IndexedDB)                      │   │   │
│   │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │   │   │
│   │  │  │ Projects │  │  Tasks   │  │ Sessions │  │   Settings   │  │   │   │
│   │  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │   │   │
│   │  └──────────────────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         BROWSER APIS                                 │   │
│   │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐            │   │
│   │  │ Notifications │  │  Web Audio    │  │  localStorage │            │   │
│   │  │     API       │  │     API       │  │ (timer state) │            │   │
│   │  └───────────────┘  └───────────────┘  └───────────────┘            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Timer Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          TIMER DATA FLOW                                  │
└──────────────────────────────────────────────────────────────────────────┘

User clicks "Start"
        │
        ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   TimerControls   │────▶│   useTimer()      │────▶│   timerStore      │
│    Component      │     │      Hook         │     │    (Zustand)      │
└───────────────────┘     └───────────────────┘     └───────────────────┘
                                   │                         │
                                   │                         │ persist
                                   │                         ▼
                                   │               ┌───────────────────┐
                                   │               │   localStorage    │
                                   │               │  (timer backup)   │
                                   │               └───────────────────┘
                                   │
                          setInterval(1s)
                                   │
                                   ▼
                          ┌───────────────────┐
                          │   tick() action   │
                          │   decrements time │
                          └───────────────────┘
                                   │
                          remainingSeconds === 0
                                   │
                                   ▼
        ┌──────────────────────────┴──────────────────────────┐
        │                                                      │
        ▼                                                      ▼
┌───────────────────┐                              ┌───────────────────┐
│ Play notification │                              │  Create session   │
│      sound        │                              │   in IndexedDB    │
└───────────────────┘                              └───────────────────┘
                                                            │
                                                   If linked to task
                                                            │
                                                            ▼
                                                   ┌───────────────────┐
                                                   │  Update task's    │
                                                   │  totalTimeSpent   │
                                                   └───────────────────┘
```

### Task CRUD Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           TASK DATA FLOW                                  │
└──────────────────────────────────────────────────────────────────────────┘

User adds task
        │
        ▼
┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│   QuickAddTask    │────▶│   useTasks()      │────▶│  taskRepository   │
│    Component      │     │      Hook         │     │                   │
└───────────────────┘     └───────────────────┘     └───────────────────┘
                                                            │
                                                            ▼
                                                   ┌───────────────────┐
                                                   │     Dexie.js      │
                                                   │   db.tasks.add()  │
                                                   └───────────────────┘
                                                            │
                                              Dexie triggers observable
                                                            │
                                                            ▼
                                                   ┌───────────────────┐
                                                   │  useLiveQuery()   │
                                                   │   auto-updates    │
                                                   └───────────────────┘
                                                            │
                                              React re-renders with new data
                                                            │
                                                            ▼
                                                   ┌───────────────────┐
                                                   │    TaskList       │
                                                   │   shows new task  │
                                                   └───────────────────┘
```

---

## Timer Implementation Details

### Challenge: Timer Accuracy

Browser `setInterval` is not reliable—tabs can be throttled, and drift accumulates.

### Solution: Drift-Corrected Timer

```typescript
// Pseudocode for accurate timer
const useTimer = () => {
  const [endTime, setEndTime] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)
  
  const start = (durationSeconds: number) => {
    // Store absolute end time, not relative duration
    const end = Date.now() + durationSeconds * 1000
    setEndTime(end)
    localStorage.setItem('timerEndTime', end.toString())
  }
  
  useEffect(() => {
    if (!endTime) return
    
    const tick = () => {
      const now = Date.now()
      const remainingMs = Math.max(0, endTime - now)
      setRemaining(Math.ceil(remainingMs / 1000))
      
      if (remainingMs <= 0) {
        onTimerComplete()
      }
    }
    
    // Tick immediately, then every second
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [endTime])
  
  // On mount, recover from localStorage if timer was running
  useEffect(() => {
    const savedEndTime = localStorage.getItem('timerEndTime')
    if (savedEndTime) {
      const end = parseInt(savedEndTime, 10)
      if (end > Date.now()) {
        setEndTime(end)
      }
    }
  }, [])
  
  return { remaining, start, pause, reset }
}
```

### Timer State Persistence

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      TIMER PERSISTENCE STRATEGY                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  In-Memory (Zustand)              localStorage                           │
│  ┌─────────────────────┐         ┌─────────────────────┐                │
│  │ isRunning: true     │   ◄──►  │ timerEndTime: ...   │                │
│  │ isPaused: false     │   sync  │ timerPhase: 'focus' │                │
│  │ remainingSeconds: X │         │ linkedTaskId: 5     │                │
│  │ phase: 'focus'      │         └─────────────────────┘                │
│  │ linkedTaskId: 5     │                                                 │
│  └─────────────────────┘                                                 │
│                                                                          │
│  Why localStorage for timer?                                             │
│  - Faster reads than IndexedDB (sync vs async)                          │
│  - Timer state is ephemeral, not historical                             │
│  - Need to recover quickly on page reload                               │
│                                                                          │
│  IndexedDB stores:                                                       │
│  - Completed sessions (history)                                          │
│  - Timer presets (configuration)                                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## State Management Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         STATE MANAGEMENT                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                        Zustand Stores                              │ │
│  │                     (Ephemeral/UI State)                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │ timerStore   │  │   uiStore    │  │ searchStore  │             │ │
│  │  │              │  │              │  │              │             │ │
│  │  │ - isRunning  │  │ - sidebarOpen│  │ - query      │             │ │
│  │  │ - remaining  │  │ - modalOpen  │  │ - results    │             │ │
│  │  │ - phase      │  │ - theme      │  │              │             │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                   Dexie useLiveQuery                               │ │
│  │                   (Persistent/Domain State)                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │ │
│  │  │ useTasks()   │  │useProjects() │  │useSessions() │             │ │
│  │  │              │  │              │  │              │             │ │
│  │  │ - tasks[]    │  │ - projects[] │  │ - sessions[] │             │ │
│  │  │ - loading    │  │ - loading    │  │ - stats      │             │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                     React Component State                          │ │
│  │                      (Local/Transient)                             │ │
│  │                                                                     │ │
│  │  - Form input values                                               │ │
│  │  - Dropdown open/closed                                            │ │
│  │  - Animation states                                                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            APP LAYOUT                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────┬─────────────────────────────────────────────────────┐   │
│  │            │                                                      │   │
│  │  SIDEBAR   │                    MAIN CONTENT                      │   │
│  │            │                                                      │   │
│  │ ┌────────┐ │   ┌─────────────────────────────────────────────┐   │   │
│  │ │ Timer  │ │   │                  HEADER                      │   │   │
│  │ │ (Home) │ │   │  Page Title    Search (Cmd+K)    Settings   │   │   │
│  │ └────────┘ │   └─────────────────────────────────────────────┘   │   │
│  │            │                                                      │   │
│  │ ── Views ─ │   ┌─────────────────────────────────────────────┐   │   │
│  │ ┌────────┐ │   │                                              │   │   │
│  │ │ Today  │ │   │                                              │   │   │
│  │ └────────┘ │   │                                              │   │   │
│  │ ┌────────┐ │   │              PAGE CONTENT                    │   │   │
│  │ │Upcoming│ │   │                                              │   │   │
│  │ └────────┘ │   │           (Routes render here)               │   │   │
│  │ ┌────────┐ │   │                                              │   │   │
│  │ │ Inbox  │ │   │                                              │   │   │
│  │ └────────┘ │   │                                              │   │   │
│  │            │   │                                              │   │   │
│  │ ─Projects─ │   │                                              │   │   │
│  │ ┌────────┐ │   └─────────────────────────────────────────────┘   │   │
│  │ │Project1│ │                                                      │   │
│  │ └────────┘ │   ┌─────────────────────────────────────────────┐   │   │
│  │ ┌────────┐ │   │          FLOATING TIMER (when active)        │   │   │
│  │ │Project2│ │   │   Currently focusing on: "Read Chapter 5"    │   │   │
│  │ └────────┘ │   │              ⏱️ 18:42                         │   │   │
│  │ ┌────────┐ │   └─────────────────────────────────────────────┘   │   │
│  │ │+ New   │ │                                                      │   │
│  │ └────────┘ │                                                      │   │
│  │            │                                                      │   │
│  └────────────┴─────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Routes:
  /           → TimerPage (home)
  /today      → TodayPage (tasks due today)
  /upcoming   → UpcomingPage (next 7 days)
  /inbox      → InboxPage (unsorted tasks)
  /project/:id→ ProjectPage (project tasks)
  /settings   → SettingsPage
```

---

## Future: Sync Architecture

When we add cloud sync in Phase 3:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SYNC ARCHITECTURE (Future)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐              ┌─────────────────┐                   │
│  │    Browser 1    │              │    Browser 2    │                   │
│  │   (Laptop)      │              │   (Phone)       │                   │
│  │  ┌───────────┐  │              │  ┌───────────┐  │                   │
│  │  │ IndexedDB │  │              │  │ IndexedDB │  │                   │
│  │  └─────┬─────┘  │              │  └─────┬─────┘  │                   │
│  └────────┼────────┘              └────────┼────────┘                   │
│           │                                │                             │
│           │         ┌──────────────┐       │                             │
│           └────────▶│  Sync Server │◀──────┘                             │
│                     │              │                                     │
│                     │ - Auth       │                                     │
│                     │ - Conflict   │                                     │
│                     │   Resolution │                                     │
│                     │ - Change Log │                                     │
│                     └──────┬───────┘                                     │
│                            │                                             │
│                     ┌──────▼───────┐                                     │
│                     │   Database   │                                     │
│                     │ (PostgreSQL) │                                     │
│                     └──────────────┘                                     │
│                                                                          │
│  Options:                                                                │
│  1. Dexie Cloud (hosted solution, easiest)                              │
│  2. Custom sync with CRDTs                                              │
│  3. Simple last-write-wins with REST API                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Security Considerations

### MVP (No Backend)

| Threat | Risk | Mitigation |
|--------|------|------------|
| Data loss (browser clear) | Medium | Export feature, clear warnings |
| XSS | Low | React escapes by default; CSP headers |
| Data theft | Low | Data is local-only; no network exposure |

### Future (With Sync)

| Threat | Risk | Mitigation |
|--------|------|------------|
| Auth bypass | High | Use established auth provider (Auth0, Clerk) |
| Data exposure | High | HTTPS, encrypted storage, access controls |
| CSRF | Medium | SameSite cookies, CSRF tokens |

---

## Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 2.0s | Lighthouse |
| JS Bundle (gzipped) | < 100KB | Build output |
| CSS (gzipped) | < 15KB | Build output |
| IndexedDB operations | < 50ms | Performance API |
| Timer accuracy | ±1s | Manual testing |

---

## Technology Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | React 18 | Ecosystem, team velocity, future-proof |
| Build | Vite | Speed, modern defaults |
| State (UI) | Zustand | Simple, performant, sync-ready |
| State (Data) | Dexie useLiveQuery | Reactive, IndexedDB native |
| Styling | Tailwind CSS | Rapid development, custom design |
| Language | TypeScript (strict) | Type safety, better DX |

---

## Related Documents

- [Tech Stack Details](./TECH_STACK.md)
- [Data Schema](./DATA_SCHEMA.md)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [MVP Specification](/docs/product/MVP_SPECIFICATION.md)

---

*Document Version: 1.0*  
*Next Review: After implementation kickoff*

