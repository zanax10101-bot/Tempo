# 📬 Message to QA Engineer

**From:** Product Manager  
**Date:** January 7, 2026  
**Subject:** Tempo MVP - Testing Strategy

---

Hi QA,

We're building **Tempo**, a student productivity app. MVP includes Timer and Task Manager. I want to align on testing strategy early.

## Product Overview

See full specs in `/docs/product/`. Key points:
- **Timer**: Pomodoro-style, custom presets, links to tasks
- **Task Manager**: Tasks, projects, priorities, due dates
- **Local storage**: All data in browser
- **No auth**: No accounts for MVP

## Critical Test Areas

### Timer
1. **Accuracy**: Timer counts down correctly (±1 second)
2. **State persistence**: Timer survives page navigation (within app)
3. **Notifications**: Browser notifications fire correctly
4. **Edge cases**: 
   - What happens at 00:00?
   - Pause/resume accuracy
   - Multiple quick starts/stops

### Task Manager
1. **CRUD operations**: Create, read, update, delete tasks
2. **Data persistence**: Tasks survive browser refresh
3. **Edge cases**:
   - Very long task titles
   - Special characters in input
   - Empty states (no tasks)
   - Many tasks (100+? 1000+?)
4. **Filtering**: Today/Upcoming/Inbox views show correct tasks
5. **Due dates**: Overdue detection, timezone handling

### Integration
1. **Timer → Task linking**: Time logged correctly
2. **Start timer from task**: Correct task associated

### Cross-Browser
- Chrome, Firefox, Safari, Edge (latest 2 versions each)

### Responsive
- Desktop (1920px, 1440px, 1280px)
- Tablet (768px)
- Mobile (375px) - should be usable, not perfect

### Accessibility
- Keyboard navigation
- Screen reader compatibility
- Color contrast

## Testing Approaches

### What I Expect
1. **Manual testing**: Exploratory + structured test cases
2. **Automated testing**: 
   - Unit tests (Developer will write)
   - E2E tests (You + Developer collaborate)
3. **Regression testing**: Before each release

### Test Case Format
For each feature, please create test cases with:
- Test ID
- Description
- Steps
- Expected result
- Priority (P0-P3)

---

## Deliverables Requested

Please provide:
1. **Test strategy document**
2. **Test cases for Timer** (priority order)
3. **Test cases for Task Manager** (priority order)
4. **Browser/device test matrix**

Drop your work in `/docs/qa/` when ready.

Let's catch bugs before users do!  
— PM

