# 🎯 Sprint: Task Manager Features

**From:** Product Manager  
**Date:** January 7, 2026  
**Priority:** HIGH — Core MVP Functionality

---

## Overview

UI polish is complete. Now we need to wire up the **core task management functionality**. This is the heart of the MVP.

---

## Sprint Goal

**Users can create, manage, and complete tasks with full data persistence.**

---

## User Stories (Priority Order)

### 1. ✅ Create Task (P0)
> As a user, I can create a new task so I can track what I need to do.

**Acceptance Criteria:**
- [ ] Type task title in Quick Add input
- [ ] Press Enter or click "Add Task" to create
- [ ] Task appears in list immediately
- [ ] Task saved to IndexedDB (persists on refresh)
- [ ] Input clears after successful add
- [ ] Empty input does not create task

---

### 2. ✅ Complete Task (P0)
> As a user, I can mark a task as complete so I know what's done.

**Acceptance Criteria:**
- [ ] Click checkbox to complete task
- [ ] Visual feedback (strikethrough, fade, or move to completed section)
- [ ] Completion saved to IndexedDB
- [ ] Can un-complete a task (toggle)

---

### 3. 🗑️ Delete Task (P0)
> As a user, I can delete a task I no longer need.

**Acceptance Criteria:**
- [ ] Delete button/action on task (hover reveal or swipe)
- [ ] Task removed from list
- [ ] Task removed from IndexedDB
- [ ] Optional: Undo toast (5 seconds)

---

### 4. ✏️ Edit Task (P1)
> As a user, I can edit a task to update its details.

**Acceptance Criteria:**
- [ ] Click task to open edit modal/panel
- [ ] Can edit: title, description
- [ ] Save changes to IndexedDB
- [ ] Cancel discards changes

---

### 5. 📅 Due Dates (P1)
> As a user, I can set a due date so I know when tasks are due.

**Acceptance Criteria:**
- [ ] Date picker in task edit view
- [ ] Due date displayed on task item
- [ ] "Due today" highlighted
- [ ] "Overdue" shown in warning color
- [ ] Due date saved to IndexedDB

---

### 6. 🔥 Priority Levels (P1)
> As a user, I can set priority so I focus on important tasks.

**Acceptance Criteria:**
- [ ] Priority selector: None, Low, Medium, High
- [ ] Visual indicator on task (color dot or icon)
- [ ] Priority saved to IndexedDB
- [ ] Sort by priority option

---

### 7. 📁 Projects (P1)
> As a user, I can organize tasks into projects.

**Acceptance Criteria:**
- [ ] Create new project (name, color)
- [ ] Assign task to project
- [ ] Filter tasks by project (sidebar click)
- [ ] "Inbox" is default project
- [ ] Projects saved to IndexedDB

---

### 8. 📋 Smart Views (P1)
> As a user, I can see filtered views of my tasks.

**Acceptance Criteria:**
- [ ] **Today**: Tasks due today + overdue
- [ ] **Upcoming**: Tasks due in next 7 days
- [ ] **Inbox**: Tasks with no project
- [ ] Views update when tasks change

---

## Technical Notes

### Database Operations (Dexie)
```typescript
// Create
await db.tasks.add({ title, projectId, createdAt: new Date() })

// Read
const tasks = await db.tasks.where('projectId').equals(id).toArray()

// Update  
await db.tasks.update(id, { completedAt: new Date() })

// Delete
await db.tasks.delete(id)
```

### State Management (Zustand)
- Consider a `useTaskStore` for UI state
- Use Dexie's `useLiveQuery` for reactive data

---

## Definition of Done

- [ ] All P0 stories complete and working
- [ ] Data persists across browser refresh
- [ ] No console errors
- [ ] Works in Chrome and Firefox
- [ ] Code reviewed and merged to main

---

## Out of Scope (This Sprint)

- Subtasks (defer to next sprint)
- Recurring tasks (future)
- Search (future)
- Keyboard shortcuts (polish phase)
- Drag-and-drop reordering (future)

---

**Let's make tasks work!** ✅

— PM
