# 📬 Response from Software Architect

**To:** Product Manager  
**From:** Software Architect  
**Date:** January 7, 2026  
**Subject:** RE: MVP Technical Decisions

---

Hi PM,

Architecture documentation is ready in `/docs/architecture/`. Here's the TL;DR:

## Summary of Decisions

### 1. Tech Stack ✅

| Layer | Choice |
|-------|--------|
| Framework | **React 18** (ecosystem wins over perf edge cases) |
| Build | **Vite** (agreed, obvious choice) |
| State | **Zustand** (simple, sync-ready via middleware) |
| Data | **Dexie.js** over IndexedDB (cleaner API, live queries) |
| Styling | **Tailwind CSS** (fast iteration, custom design) |
| Language | **TypeScript** (strict mode) |

Full rationale in [`TECH_STACK.md`](../architecture/TECH_STACK.md).

### 2. Data Architecture ✅

Going with **IndexedDB via Dexie.js**. You were right to lean that way.

Schema designed for:
- Tasks ↔ Projects (many-to-one)
- Tasks ↔ Timer Sessions (one-to-many)
- Tasks ↔ Subtasks (one-to-many, 1 level)
- Timer Presets (independent)

Future sync considerations baked in (can add `syncId` field later without refactor).

Full schema in [`DATA_SCHEMA.md`](../architecture/DATA_SCHEMA.md).

### 3. Timer Implementation ✅

Key gotchas addressed:

| Challenge | Solution |
|-----------|----------|
| Browser throttling tabs | Store **absolute end time**, not relative duration |
| Timer drift | Calculate remaining from `endTime - Date.now()` each tick |
| User navigates away | Persist timer state to localStorage, recover on mount |
| Browser notifications | Use Notifications API with user permission flow |

Accuracy should be ±1s as required.

Details in [`ARCHITECTURE_OVERVIEW.md`](../architecture/ARCHITECTURE_OVERVIEW.md).

### 4. Project Structure ✅

Feature-based organization:

```
src/
├── features/          # Domain modules (timer, tasks, projects)
│   ├── timer/
│   │   ├── components/
│   │   ├── hooks/     # Business logic lives here
│   │   └── stores/
│   └── tasks/
├── components/        # Shared UI (Button, Modal, etc.)
├── db/               # Dexie instance + repositories
└── pages/            # Route-level components
```

Full structure in [`PROJECT_STRUCTURE.md`](../architecture/PROJECT_STRUCTURE.md).

---

## Open Items for Other Team Members

I've flagged questions for:
- **Developer**: Tool familiarity, any concerns?
- **UX Designer**: Design token format (Figma → Tailwind config)?
- **DevOps**: Any hosting constraints?

---

## Recommended Next Steps

1. **Developer** reviews tech stack, raises concerns
2. **UX Designer** shares initial design direction/tokens
3. **DevOps** sets up CI/CD pipeline for Vite build
4. **Architect + Developer** scaffold project together

Let me know if anything needs revision.

— Architect

