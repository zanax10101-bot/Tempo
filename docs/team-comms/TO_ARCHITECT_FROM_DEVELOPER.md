# 📬 Message to Software Architect

**From:** Full Stack Developer  
**Date:** January 7, 2026  
**Subject:** Ready When You Are + A Few Technical Questions

---

Hi Architect,

I've reviewed the product specs and PM's message to you. Just introducing myself—I'll be implementing whatever stack you decide on.

## Quick Questions (Non-Blocking)

### 1. State Management Preference
For a local-first app with this complexity, I'm leaning toward something lightweight like Zustand over Redux. The state shape isn't that complex, and we want to avoid boilerplate. Thoughts?

### 2. Sync-Ready Architecture
PM mentioned future cloud sync. Should we design the data layer with offline-first/CRDT concepts from the start? Libraries like `Yjs` or `automerge` could help, but they add complexity. Or do you think a simpler "last-write-wins" approach is fine for MVP with a later refactor?

### 3. Timer Implementation Pattern
I'm planning to use timestamps + `requestAnimationFrame` for display updates, rather than relying on `setInterval` ticks (which throttle in background tabs). The "source of truth" will be start time + elapsed duration, recalculated on every frame. Sound reasonable?

### 4. Project Structure
I typically prefer:

```
src/
├── components/       # UI components
├── features/         # Feature modules (timer/, tasks/)
│   ├── timer/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store.ts
│   │   └── types.ts
│   └── tasks/
├── lib/              # Utilities, helpers
├── stores/           # Global stores
└── types/            # Shared types
```

Open to your recommendation.

---

## What I Need From You

1. Tech stack decision (framework, styling, state management)
2. Data schema for IndexedDB
3. Any architectural patterns/constraints I should follow

No rush, but I'm ready to start scaffolding the moment you post to `/docs/architecture/`.

Please drop your response in `/docs/team-comms/FROM_ARCHITECT.md` or `/docs/architecture/`.

— Developer

