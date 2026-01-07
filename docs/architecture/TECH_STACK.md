# Tempo Tech Stack Recommendation

**Author:** Software Architect  
**Date:** January 7, 2026  
**Status:** Proposed  
**Reviewers:** Full Stack Developer, DevOps Engineer

---

## Executive Summary

This document outlines the recommended technology stack for Tempo MVP. The selections prioritize **developer productivity**, **performance**, **future extensibility for sync**, and **maintainability**.

| Layer | Selection | Rationale |
|-------|-----------|-----------|
| Framework | React 18 | Ecosystem maturity, team velocity |
| Build Tool | Vite | Fast DX, optimized production builds |
| State Management | Zustand | Simple, performant, sync-ready |
| Data Layer | Dexie.js (IndexedDB) | Structured local data, future sync |
| Styling | Tailwind CSS | Rapid development, design consistency |
| Language | TypeScript | Type safety, better DX |

---

## 1. Frontend Framework

### Recommendation: **React 18**

### Alternatives Evaluated

| Framework | Pros | Cons |
|-----------|------|------|
| **React** | Massive ecosystem, mature tooling, abundant resources, easy hiring | Larger bundle than alternatives, virtual DOM overhead |
| **Vue 3** | Excellent DX, smaller bundle, good reactivity | Smaller ecosystem, composition API learning curve |
| **Svelte** | Tiny bundle, compile-time magic, minimal boilerplate | Smaller ecosystem, fewer libraries, less hiring pool |
| **SolidJS** | Best performance, fine-grained reactivity, React-like syntax | Young ecosystem, fewer resources, riskier bet |

### Decision Rationale

React wins for Tempo because:

1. **Ecosystem Depth**: Rich library ecosystem for timers, animations, accessibility, and drag-and-drop (all needed for our MVP)
2. **Team Velocity**: Most developers know React; onboarding is fast
3. **Future-Proofing**: React Server Components and ecosystem innovations align with future cloud sync features
4. **Risk Mitigation**: Battle-tested in production by major companies

**Dissenting Opinion Noted**: SolidJS would deliver better runtime performance and smaller bundles. If the team has SolidJS experience, it's a valid alternative. The architecture will be framework-agnostic enough to allow migration if needed.

---

## 2. Build Tool

### Recommendation: **Vite**

No real competition here. Vite provides:

- **Fast cold start**: ESM-based dev server
- **Instant HMR**: Sub-millisecond hot module replacement
- **Optimized production**: Rollup-based builds with tree-shaking
- **First-class TypeScript**: Zero config required
- **Plugin ecosystem**: Compatible with Rollup plugins

### Configuration Highlights

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          dexie: ['dexie'],
        },
      },
    },
  },
})
```

---

## 3. State Management

### Recommendation: **Zustand**

### Alternatives Evaluated

| Solution | Pros | Cons |
|----------|------|------|
| **React Context** | Built-in, no deps | Re-render issues, boilerplate, no devtools |
| **Redux Toolkit** | Mature, devtools, middleware | Overkill for MVP, verbose |
| **Zustand** | Minimal API, performant, middleware support | Less structured than Redux |
| **Jotai** | Atomic, great for derived state | Requires different mental model |
| **Valtio** | Proxy-based, mutable API | Less explicit, debugging harder |

### Decision Rationale

Zustand is ideal for Tempo because:

1. **Simplicity**: Minimal boilerplate, learn in 10 minutes
2. **Performance**: Selective re-renders without `memo` gymnastics
3. **Sync-Ready**: Middleware architecture supports persistence and future sync adapters
4. **TypeScript**: Excellent type inference

### Architecture Pattern

```typescript
// Example: Timer store with persistence middleware
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerState {
  isRunning: boolean
  remainingSeconds: number
  linkedTaskId: string | null
  actions: {
    start: () => void
    pause: () => void
    reset: () => void
    tick: () => void
  }
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      remainingSeconds: 25 * 60,
      linkedTaskId: null,
      actions: {
        start: () => set({ isRunning: true }),
        pause: () => set({ isRunning: false }),
        reset: () => set({ remainingSeconds: 25 * 60, isRunning: false }),
        tick: () => set((s) => ({ remainingSeconds: s.remainingSeconds - 1 })),
      },
    }),
    { name: 'tempo-timer' }
  )
)
```

---

## 4. Data Layer

### Recommendation: **Dexie.js** (IndexedDB wrapper)

### Why IndexedDB over localStorage?

| Feature | localStorage | IndexedDB |
|---------|--------------|-----------|
| Storage limit | ~5-10MB | ~50MB+ (browser dependent) |
| Data types | Strings only | Objects, blobs, arrays |
| Querying | None | Indexes, ranges, compound queries |
| Async | No | Yes |
| Transactions | No | Yes |
| Future sync | Hard to migrate | Schema maps to relational/document DBs |

### Why Dexie.js?

1. **Promise-based API**: Clean async/await syntax
2. **Live Queries**: `useLiveQuery()` hook for reactive data
3. **Schema versioning**: Built-in migrations
4. **Sync ecosystem**: Dexie Cloud exists for future paid sync tier
5. **Offline-first**: Designed for local-first apps

### Database Schema Preview

```typescript
// db/schema.ts
import Dexie, { Table } from 'dexie'

export interface Project {
  id?: number
  name: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id?: number
  title: string
  description?: string
  projectId: number | null  // null = Inbox
  priority: 'none' | 'low' | 'medium' | 'high'
  dueDate?: Date
  completedAt?: Date
  totalTimeSpent: number    // seconds
  createdAt: Date
  updatedAt: Date
}

export interface TimerSession {
  id?: number
  taskId: number | null
  presetId: number | null
  type: 'focus' | 'break'
  duration: number          // planned duration in seconds
  actualDuration: number    // actual time spent
  completedAt: Date
}

export class TempoDB extends Dexie {
  projects!: Table<Project>
  tasks!: Table<Task>
  timerSessions!: Table<TimerSession>

  constructor() {
    super('TempoDB')
    this.version(1).stores({
      projects: '++id, name, createdAt',
      tasks: '++id, projectId, priority, dueDate, completedAt, createdAt',
      timerSessions: '++id, taskId, type, completedAt',
    })
  }
}

export const db = new TempoDB()
```

---

## 5. Styling

### Recommendation: **Tailwind CSS**

### Alternatives Evaluated

| Solution | Pros | Cons |
|----------|------|------|
| **Tailwind CSS** | Rapid development, consistent design, small production CSS | Verbose class names, learning curve |
| **CSS Modules** | Scoped CSS, familiar syntax | More files, slower iteration |
| **Styled Components** | JS-in-CSS, dynamic styles | Runtime overhead, bundle size |
| **Vanilla Extract** | Type-safe, zero runtime | More complex setup |

### Decision Rationale

Tailwind is optimal for Tempo because:

1. **Speed**: Build UIs 2-3x faster with utility classes
2. **Consistency**: Design tokens enforce visual coherence
3. **Custom Design**: PM explicitly wants "no AI slop"—Tailwind enables unique designs without fighting a component library
4. **Performance**: PurgeCSS removes unused styles; production CSS is tiny

### Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom Tempo palette (to be defined with UX Designer)
        tempo: {
          focus: '#...', // Focus session color
          break: '#...', // Break session color
          // ...
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'timer-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
```

### Complementary Tools

- **clsx** or **tailwind-merge**: Conditional class composition
- **@tailwindcss/forms**: Form element resets (optional)

---

## 6. TypeScript

### Recommendation: **Strict TypeScript**

Non-negotiable for a production app. Benefits:

- Catch bugs at compile time
- Self-documenting code
- Better IDE support
- Refactoring confidence

### Configuration

```json
// tsconfig.json (key settings)
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

---

## 7. Additional Libraries

### Recommended

| Library | Purpose | Justification |
|---------|---------|---------------|
| **@tanstack/react-query** | Async state | Future API calls, caching (optional for MVP) |
| **date-fns** | Date manipulation | Light, tree-shakeable, immutable |
| **react-hot-toast** | Notifications | Lightweight, accessible toast notifications |
| **@dnd-kit/core** | Drag and drop | Task reordering, move between projects |
| **framer-motion** | Animations | Completion animations, transitions |
| **react-hook-form** | Forms | Timer presets, task editing (optional) |

### Not Recommended (Yet)

| Library | Why Not |
|---------|---------|
| Component libraries (Radix, shadcn) | We want custom design, not generic look |
| Redux | Overkill for MVP scope |
| GraphQL | No backend for MVP |
| Storybook | Adds overhead; consider post-MVP |

---

## 8. Development Tooling

| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality, React best practices |
| **Prettier** | Code formatting |
| **Vitest** | Unit testing (Vite-native) |
| **Playwright** | E2E testing |
| **Husky + lint-staged** | Pre-commit hooks |

---

## Package.json Preview

```json
{
  "name": "tempo",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.5.0",
    "dexie": "^3.2.0",
    "dexie-react-hooks": "^1.1.0",
    "date-fns": "^3.0.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "postcss": "^8.4.0",
    "prettier": "^3.2.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vitest": "^1.2.0"
  }
}
```

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| IndexedDB data loss (browser clear) | Medium | High | Implement JSON export; warn users; add cloud sync in Phase 3 |
| Bundle size creep | Low | Medium | Monitor with `vite-bundle-visualizer`; lazy load features |
| Zustand complexity scaling | Low | Low | Can migrate to Redux Toolkit if needed |
| Tailwind class name verbosity | Low | Low | Extract components; use @apply sparingly |

---

## Decision Log

| Decision | Date | Alternatives Considered | Decided By |
|----------|------|------------------------|------------|
| React over Svelte/SolidJS | 2026-01-07 | Vue, Svelte, SolidJS | Architect |
| Zustand over Redux | 2026-01-07 | Context, Redux, Jotai | Architect |
| Dexie over raw IndexedDB | 2026-01-07 | localStorage, raw IDB | Architect |
| Tailwind over CSS Modules | 2026-01-07 | Styled Components, CSS Modules | Architect |

---

## Open Questions for Team

1. **For Developer**: Any experience with these tools? Comfort level?
2. **For UX Designer**: Design token format preference? Figma variables → Tailwind config?
3. **For DevOps**: Any hosting constraints that affect build output?

---

*Document Version: 1.0*  
*Next Review: After Developer feedback*

