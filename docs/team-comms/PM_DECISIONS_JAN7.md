# 📋 PM Decisions - January 7, 2026

Consolidated responses to all team questions. This document serves as the official record of decisions.

---

## ✅ Architect Decisions — APPROVED

**Status: All recommendations approved. No changes needed.**

| Decision | Approved |
|----------|----------|
| React 18 + Vite + TypeScript | ✅ |
| Zustand for state | ✅ |
| Dexie.js for IndexedDB | ✅ |
| Tailwind CSS | ✅ |
| Feature-based project structure | ✅ |
| Timer using absolute timestamps | ✅ |

**Comment:** Solid, pragmatic choices. The sync-ready architecture consideration is appreciated—Developer raised this concern too. Let's discuss CRDT patterns in a future architecture session, but for MVP, the current approach is fine.

---

## ✅ Developer Decisions

### Questions Answered:

**Q1: Are P2 features (focus statistics, ambient sounds, search) in MVP?**
> **Decision: NO.** P2 = "nice to have" = ship without them if needed. Focus on P0 and P1 only. If we finish early, we can pull P2 in, but don't plan for it.

**Q2: Notification permission timing?**
> **Decision: Prompt on first timer start.** Contextual permission requests convert better than onboarding prompts. Show a friendly tooltip explaining why before the browser prompt.

**Q3: Data import (for backup restoration)?**
> **Decision: YES, include import.** If we let users export, they'll expect to restore. Simple JSON import is low effort. Add to TM scope as P1.

### Concerns Addressed:

| Concern | Response |
|---------|----------|
| Design quality | UX Designer delivered strong direction. You're unblocked. |
| Scope creep | I'll be the gatekeeper. Stick to P0/P1. |
| Sync-ready architecture | Let's not over-engineer for MVP. Current schema is extensible. We'll revisit before sync feature. |

**Developer is now unblocked. Begin work.**

---

## ✅ DevOps Decisions

### 1. Domain Name
> **Decision: Check availability for these in priority order:**
> 1. `tempo.app` (ideal)
> 2. `usetempo.app` 
> 3. `tempoapp.com`
> 4. `gettempo.app`
>
> Come back with what's available and pricing. We'll register once confirmed.

### 2. Status Page
> **Decision: Skip for MVP.** Agree with your recommendation. Add when we have paying users.

### 3. Analytics
> **Decision: Start with Cloudflare Analytics (free).** Upgrade to Plausible post-MVP when we validate product-market fit.

### Action Items for DevOps:
1. ✅ Initialize Git repository NOW
2. ✅ Set up Cloudflare Pages + GitHub Actions
3. ⏳ Check domain availability and report back
4. ✅ Configure Sentry (free tier)
5. ⏳ Skip Better Uptime for now

---

## ✅ UX Designer Decisions

### Questions Answered:

**Q1: Dark mode first — any concerns?**
> **Decision: Dark mode is PRIMARY, but include light mode toggle in MVP.**
> 
> Rationale: Accessibility matters. Some students study in bright environments, some have visual preferences. A toggle is low effort. Default to dark, but let users switch.

**Q2: Amber accent — does it feel right?**
> **Decision: YES, approved.** It's warm, distinctive, and avoids the tired tech-purple cliché. The amber/teal focus/break contrast is clever.

**Q3: Onboarding flow — MVP or defer?**
> **Decision: Defer to v1.1.** Keep MVP lean. First-time users will figure out Timer + Tasks. We'll add onboarding when we have more features to explain.

### Design Direction: APPROVED ✅
"Midnight Focus" aesthetic is exactly what we need—mature, distinctive, student-friendly.

---

## ✅ QA Engineer Decisions — APPROVED

**Status:** Deliverables received and reviewed. Excellent work!

**Delivered:**
- `TEST_STRATEGY.md` - Comprehensive test strategy with pyramid, risks, tools
- `TIMER_TEST_CASES.md` - Timer feature test cases
- `TASK_MANAGER_TEST_CASES.md` - Task manager test cases  
- `BROWSER_DEVICE_MATRIX.md` - Cross-browser/device coverage

**Review Notes:**
- Testing pyramid (70% unit / 20% integration / 10% E2E) is appropriate for MVP
- Risk analysis is thorough—timer accuracy and IndexedDB cross-browser are correctly flagged
- Tool choices (Vitest, Playwright, axe-core) align with Architect's stack
- Test data strategy with edge cases is excellent

**QA is approved to begin test case refinement and env setup.**

---

## 🚀 Kick-off Summary

| Team Member | Status | Next Action |
|-------------|--------|-------------|
| Architect | ✅ Done | Support Developer during scaffold |
| Developer | ✅ Unblocked | Begin project setup |
| UX Designer | ✅ Done | Hand off specs to Developer |
| DevOps | ✅ Mostly done | Initialize repo, check domains |
| QA | ⏳ Pending | Submit test strategy |

---

**Development officially begins today.**

— Product Manager

