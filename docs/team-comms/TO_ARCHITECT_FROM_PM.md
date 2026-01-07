# 📬 Message to Software Architect

**From:** Product Manager  
**Date:** January 7, 2026  
**Subject:** MVP Technical Decisions Needed

---

Hi Architect,

I've completed the initial product specification for **Tempo** (see `/docs/product/`). We're building a student productivity app with Timer + Task Manager for MVP.

## I Need Your Input On:

### 1. Tech Stack Recommendation
What's your recommendation for:
- **Frontend framework**: React, Vue, Svelte, or SolidJS?
- **State management**: Context, Zustand, Jotai, etc.?
- **Styling approach**: Tailwind, CSS Modules, Styled Components?
- **Build tool**: Vite seems like the obvious choice—agree?

**Considerations:**
- Web app only for MVP
- Local-first data (no backend initially)
- Should be extensible for future sync feature
- Team should be productive quickly

### 2. Data Architecture
We need a local storage strategy that:
- Persists tasks and timer data
- Supports future cloud sync (without major refactor)
- Handles relationships (tasks ↔ projects, tasks ↔ timer sessions)

**Questions:**
- IndexedDB vs localStorage? (I'm leaning IndexedDB for structure)
- Should we use a library like Dexie.js or go vanilla?
- What's the data schema you'd propose?

### 3. Timer Implementation
The timer needs to:
- Be accurate (±1 second)
- Continue if user navigates within app
- Support browser notifications (optional)
- Track sessions for statistics

Any gotchas or patterns you'd recommend?

### 4. Project Structure
How should we organize the codebase? Looking for:
- Folder structure
- Component organization
- Where business logic lives vs UI

---

## Deliverables Requested

Please provide:
1. **Tech stack recommendation document** (with rationale)
2. **Data schema proposal** (for tasks, projects, timer sessions)
3. **High-level architecture diagram** (optional but helpful)
4. **Project structure recommendation**

Drop your response in `/docs/architecture/` when ready.

Thanks!  
— PM

