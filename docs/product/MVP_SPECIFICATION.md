# Tempo MVP Specification

## Overview

The MVP includes two core features:
1. **Timer** - Pomodoro-style focus sessions with flexibility
2. **Task Manager** - Simple but powerful task management

Both features should feel integrated—you can start a timer linked to a task.

---

# Feature 1: Timer

## Description
A flexible focus timer that helps students concentrate during study sessions. Supports classic Pomodoro (25/5) and custom configurations.

## User Stories

### T1: Basic Timer
> **As a** student  
> **I want to** start a focus timer  
> **So that** I can concentrate on studying without checking the clock

**Acceptance Criteria:**
- [ ] User can start a timer with one click
- [ ] Timer displays remaining time prominently (MM:SS format)
- [ ] Timer continues running if user navigates away (within app)
- [ ] Audio/visual notification when timer completes
- [ ] User can pause and resume timer
- [ ] User can cancel/reset timer

**Priority:** P0 (Must Have)

---

### T2: Pomodoro Mode
> **As a** student using the Pomodoro technique  
> **I want to** automatically cycle between focus and break periods  
> **So that** I maintain productivity without burnout

**Acceptance Criteria:**
- [ ] Default Pomodoro: 25 min focus → 5 min break → repeat
- [ ] After 4 focus sessions, suggest a long break (15-30 min)
- [ ] Visual indicator showing current phase (focus vs break)
- [ ] Session counter showing completed pomodoros
- [ ] User can skip break if desired
- [ ] Different sounds/colors for focus vs break

**Priority:** P0 (Must Have)

---

### T3: Custom Timer Presets
> **As a** student with different study needs  
> **I want to** create custom timer configurations  
> **So that** I can match my timer to different subjects/tasks

**Acceptance Criteria:**
- [ ] User can create named presets (e.g., "Deep Work", "Light Reading")
- [ ] Configurable: focus duration (1-120 min)
- [ ] Configurable: break duration (1-60 min)
- [ ] Configurable: number of cycles before long break
- [ ] Presets are saved locally and persist
- [ ] Quick-select from saved presets

**Priority:** P1 (Should Have)

---

### T4: Timer + Task Integration
> **As a** student  
> **I want to** link my timer session to a specific task  
> **So that** I can track how much time I spend on each task

**Acceptance Criteria:**
- [ ] When starting timer, user can optionally select a task
- [ ] During timer, linked task is displayed
- [ ] After timer completes, time is logged to the task
- [ ] Task view shows total time spent
- [ ] Can start timer directly from a task

**Priority:** P1 (Should Have)

---

### T5: Focus Statistics
> **As a** student  
> **I want to** see my focus history  
> **So that** I can understand my productivity patterns

**Acceptance Criteria:**
- [ ] Daily total focus time displayed
- [ ] Weekly summary view
- [ ] Streak tracking (consecutive days with focus sessions)
- [ ] Data stored locally

**Priority:** P2 (Nice to Have for MVP)

---

### T6: Ambient Sounds (Stretch)
> **As a** student  
> **I want to** play background sounds during focus  
> **So that** I can block distractions

**Acceptance Criteria:**
- [ ] 3-5 ambient sound options (rain, cafe, white noise, lo-fi, nature)
- [ ] Volume control
- [ ] Sounds auto-stop when timer ends (or continue, user choice)

**Priority:** P2 (Nice to Have for MVP)

---

# Feature 2: Task Manager

## Description
A task management system designed for student workflows—assignments, projects, daily todos. Simple to use but powerful enough for complex academic projects.

## User Stories

### TM1: Create Tasks
> **As a** student  
> **I want to** quickly add tasks  
> **So that** I capture everything I need to do

**Acceptance Criteria:**
- [ ] Quick-add: type task name and press Enter
- [ ] Task has: title (required), description (optional), due date (optional)
- [ ] Due date supports "natural language" hints (today, tomorrow, next Monday)
- [ ] Tasks are saved locally immediately
- [ ] Keyboard shortcut for quick-add (Cmd/Ctrl + N)

**Priority:** P0 (Must Have)

---

### TM2: Task Organization
> **As a** student with multiple classes  
> **I want to** organize tasks into projects/categories  
> **So that** I can separate coursework by subject

**Acceptance Criteria:**
- [ ] User can create projects (e.g., "Math 101", "Personal", "Work")
- [ ] Tasks belong to a project (or "Inbox" by default)
- [ ] Color coding for projects
- [ ] Filter view by project
- [ ] Drag-and-drop to move tasks between projects

**Priority:** P0 (Must Have)

---

### TM3: Task Completion
> **As a** student  
> **I want to** mark tasks as complete  
> **So that** I feel accomplished and know what's done

**Acceptance Criteria:**
- [ ] One-click/tap to complete task
- [ ] Satisfying completion animation/feedback
- [ ] Completed tasks move to "Completed" section
- [ ] Option to view/hide completed tasks
- [ ] Undo completion (within 5 seconds or from completed view)

**Priority:** P0 (Must Have)

---

### TM4: Task Priorities
> **As a** student juggling deadlines  
> **I want to** prioritize my tasks  
> **So that** I focus on what matters most

**Acceptance Criteria:**
- [ ] Priority levels: None, Low, Medium, High
- [ ] Visual indicator (color/icon) for priority
- [ ] Sort by priority option
- [ ] Quick-set priority from task list (not just edit view)

**Priority:** P1 (Should Have)

---

### TM5: Due Dates & Overdue
> **As a** student with deadlines  
> **I want to** see what's due soon and what's overdue  
> **So that** I don't miss assignments

**Acceptance Criteria:**
- [ ] Due date displayed on task
- [ ] "Due today" highlighted distinctively
- [ ] "Overdue" highlighted in warning color
- [ ] "Upcoming" view: tasks due in next 7 days
- [ ] Sort by due date option

**Priority:** P0 (Must Have)

---

### TM6: Subtasks
> **As a** student with complex assignments  
> **I want to** break tasks into subtasks  
> **So that** I can tackle big projects step by step

**Acceptance Criteria:**
- [ ] Tasks can have subtasks (1 level deep for MVP)
- [ ] Subtask has: title, completion status
- [ ] Progress indicator on parent task (e.g., "2/5 subtasks done")
- [ ] Completing all subtasks doesn't auto-complete parent (user choice)

**Priority:** P1 (Should Have)

---

### TM7: Smart Views
> **As a** student  
> **I want to** see filtered views of my tasks  
> **So that** I can focus on what's relevant now

**Acceptance Criteria:**
- [ ] "Today" view: tasks due today + overdue
- [ ] "Upcoming" view: tasks due in next 7 days
- [ ] "Inbox" view: unsorted tasks
- [ ] Views update in real-time

**Priority:** P1 (Should Have)

---

### TM8: Search
> **As a** student with many tasks  
> **I want to** search my tasks  
> **So that** I can quickly find what I'm looking for

**Acceptance Criteria:**
- [ ] Search by task title
- [ ] Search by project name
- [ ] Results update as user types
- [ ] Keyboard shortcut (Cmd/Ctrl + K or Cmd/Ctrl + F)

**Priority:** P2 (Nice to Have for MVP)

---

### TM9: Recurring Tasks (Stretch)
> **As a** student with regular commitments  
> **I want to** create recurring tasks  
> **So that** I don't have to recreate them manually

**Acceptance Criteria:**
- [ ] Recurrence options: daily, weekly, monthly, custom
- [ ] When completed, next occurrence is auto-created
- [ ] Edit/delete recurrence rule

**Priority:** P3 (Future)

---

# Integration: Timer ↔ Tasks

The magic happens when these features work together:

1. **Start timer from task**: Click timer icon on any task to begin focused work
2. **Time tracking**: Timer sessions logged to associated task
3. **Context during focus**: See which task you're working on during timer
4. **Completion flow**: After timer, prompt to update task status

---

# Technical Requirements

## Data Storage (MVP)
- Local storage (IndexedDB or localStorage)
- Data export option (JSON)
- No account required

## Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)  
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Responsive Design
- Desktop-first for MVP
- Tablet-friendly
- Mobile-aware (usable, not optimized)

## Performance
- Initial load: < 2 seconds
- Timer accuracy: ±1 second
- Smooth animations (60fps)

## Accessibility
- Keyboard navigable
- Screen reader compatible
- Color contrast compliance (WCAG AA)

---

# Out of Scope for MVP

- User accounts / authentication
- Cloud sync
- Calendar feature
- Habit tracking
- Countdown feature
- Mobile apps (native)
- Integrations (Google Calendar, etc.)
- Collaboration features
- Offline mode (PWA) - nice to have but not required

---

# Open Questions

1. **Data format**: What structure for local storage? (For Architect)
2. **Timer notification**: Browser notifications vs in-app only? (For UX)
3. **Design system**: Should we use an existing component library? (For UX + Developer)
4. **Tech stack**: React? Vue? Svelte? (For Architect + Developer)

---

*Document Version: 1.0*  
*Last Updated: January 7, 2026*  
*Owner: Product Manager*

