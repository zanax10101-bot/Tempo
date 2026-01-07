# Task Manager Test Cases

**Author:** QA Engineer  
**Date:** January 7, 2026  
**Version:** 1.0  
**Feature:** Task Manager (TM1-TM8)

---

## Overview

This document contains test cases for the Task Manager feature, organized by priority. Test cases cover:
- Task CRUD operations
- Project organization
- Priorities and due dates
- Smart views (Today, Upcoming, Inbox)
- Subtasks
- Search
- Data persistence

---

## Test Case Format

| Field | Description |
|-------|-------------|
| **ID** | TC-TSK-XXX |
| **Priority** | P0 (Blocker) / P1 (Critical) / P2 (Major) / P3 (Minor) |
| **Preconditions** | Required state before test |
| **Steps** | Numbered actions |
| **Expected Result** | Observable outcome |
| **Test Data** | Specific inputs if needed |

---

## P0 - Blocker (Must Pass for Release)

### TC-TSK-001: Create Task - Quick Add
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify quick task creation with Enter key |
| **Preconditions** | App loaded, any view |
| **Steps** | 1. Click quick-add input field<br>2. Type "Study for exam"<br>3. Press Enter |
| **Expected Result** | Task created immediately, appears in list, input clears |
| **Test Data** | Title: "Study for exam" |

---

### TC-TSK-002: Create Task - Keyboard Shortcut
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify Cmd/Ctrl+N opens quick add |
| **Preconditions** | App loaded |
| **Steps** | 1. Press Cmd+N (Mac) or Ctrl+N (Windows)<br>2. Type task title<br>3. Press Enter |
| **Expected Result** | Quick add focused, task created on submit |

---

### TC-TSK-003: Task Persistence - Browser Refresh
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify tasks survive browser refresh |
| **Preconditions** | At least one task exists |
| **Steps** | 1. Note existing tasks<br>2. Press F5 or Cmd+R<br>3. Check task list |
| **Expected Result** | All tasks present after refresh with correct data |

---

### TC-TSK-004: Task Persistence - Browser Close/Reopen
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify tasks persist after closing browser |
| **Preconditions** | Tasks created |
| **Steps** | 1. Create 3 tasks with different properties<br>2. Close browser completely<br>3. Reopen browser and app |
| **Expected Result** | All tasks present with all properties intact |

---

### TC-TSK-005: Complete Task
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify task completion toggle |
| **Preconditions** | Incomplete task exists |
| **Steps** | 1. Click checkbox/completion toggle on task<br>2. Observe task state |
| **Expected Result** | 1. Task marked complete (visual feedback)<br>2. Task moves to "Completed" section<br>3. completedAt timestamp set |

---

### TC-TSK-006: Uncomplete Task
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify task can be uncompleted |
| **Preconditions** | Completed task exists |
| **Steps** | 1. View completed tasks<br>2. Click completion toggle |
| **Expected Result** | Task returns to active state, completedAt cleared |

---

### TC-TSK-007: Delete Task
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify task deletion |
| **Preconditions** | Task exists |
| **Steps** | 1. Open task options/menu<br>2. Click "Delete"<br>3. Confirm deletion (if prompted) |
| **Expected Result** | Task removed from list, removed from database |

---

### TC-TSK-008: Edit Task Title
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify task title editing |
| **Preconditions** | Task exists |
| **Steps** | 1. Click on task to open detail/edit<br>2. Modify title to "Updated title"<br>3. Save/close |
| **Expected Result** | Task shows updated title, persists after refresh |

---

### TC-TSK-009: Create Project
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify project creation |
| **Preconditions** | None |
| **Steps** | 1. Click "Add Project" in sidebar<br>2. Enter name "Math 101"<br>3. Select color<br>4. Save |
| **Expected Result** | Project created, appears in sidebar, selectable for tasks |
| **Test Data** | Name: "Math 101", Color: Blue |

---

### TC-TSK-010: Assign Task to Project
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify assigning task to project |
| **Preconditions** | Task and project exist |
| **Steps** | 1. Open task detail<br>2. Select project "Math 101"<br>3. Save |
| **Expected Result** | Task associated with project, appears when filtering by project |

---

### TC-TSK-011: Today View - Due Today Tasks
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify Today view shows tasks due today |
| **Preconditions** | Task with due date = today exists |
| **Steps** | 1. Navigate to "Today" view |
| **Expected Result** | Task due today appears in list |

---

### TC-TSK-012: Today View - Overdue Tasks
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify Today view includes overdue tasks |
| **Preconditions** | Task with due date = yesterday exists (overdue) |
| **Steps** | 1. Navigate to "Today" view |
| **Expected Result** | Overdue task appears, visually marked as overdue |

---

### TC-TSK-013: Set Due Date
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify setting due date on task |
| **Preconditions** | Task exists without due date |
| **Steps** | 1. Open task detail<br>2. Click due date field<br>3. Select tomorrow's date<br>4. Save |
| **Expected Result** | Due date displayed on task, task appears in Upcoming view |

---

### TC-TSK-014: Due Date - Overdue Indicator
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify overdue tasks are visually highlighted |
| **Preconditions** | Task with past due date exists |
| **Steps** | 1. View task with overdue date |
| **Expected Result** | Task shows warning indicator (red color, overdue label) |

---

### TC-TSK-015: Inbox View - Default Tasks
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify Inbox shows tasks without project |
| **Preconditions** | Task in Inbox (no project assigned) |
| **Steps** | 1. Create task without selecting project<br>2. Navigate to Inbox |
| **Expected Result** | New task appears in Inbox view |

---

---

## P1 - Critical

### TC-TSK-016: Task Description
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify optional task description |
| **Preconditions** | Task exists |
| **Steps** | 1. Open task detail<br>2. Add description "Read chapters 1-5"<br>3. Save<br>4. Reopen task |
| **Expected Result** | Description saved and displays correctly |

---

### TC-TSK-017: Priority - Set High
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify setting high priority |
| **Preconditions** | Task with no priority |
| **Steps** | 1. Open task or use quick action<br>2. Set priority to "High"<br>3. Verify visual |
| **Expected Result** | Task shows high priority indicator (color/icon) |

---

### TC-TSK-018: Priority - Set from List View
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify quick-set priority without opening detail |
| **Preconditions** | Task visible in list |
| **Steps** | 1. Right-click task (or use priority quick-action)<br>2. Select "Medium" priority |
| **Expected Result** | Priority updated immediately, visual indicator changes |

---

### TC-TSK-019: Priority - Sort
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify sorting tasks by priority |
| **Preconditions** | Tasks with different priorities exist |
| **Steps** | 1. Select "Sort by Priority" option |
| **Expected Result** | Tasks ordered: High → Medium → Low → None |

---

### TC-TSK-020: Due Date - Sort
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify sorting tasks by due date |
| **Preconditions** | Tasks with different due dates exist |
| **Steps** | 1. Select "Sort by Due Date" option |
| **Expected Result** | Tasks ordered by due date (earliest first), tasks without due date at end |

---

### TC-TSK-021: Upcoming View - Next 7 Days
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify Upcoming shows next 7 days |
| **Preconditions** | Tasks with due dates: today, +3 days, +7 days, +10 days |
| **Steps** | 1. Navigate to "Upcoming" view |
| **Expected Result** | Shows tasks due today, +3, +7 days. Does NOT show +10 days task |

---

### TC-TSK-022: Project Color Display
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify project color shows on tasks |
| **Preconditions** | Task assigned to project with specific color |
| **Steps** | 1. View task in list |
| **Expected Result** | Project color indicator visible on task |

---

### TC-TSK-023: Filter by Project
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify clicking project filters tasks |
| **Preconditions** | Tasks in multiple projects |
| **Steps** | 1. Click "Math 101" project in sidebar |
| **Expected Result** | Only tasks from Math 101 shown, other tasks hidden |

---

### TC-TSK-024: Create Subtask
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify subtask creation |
| **Preconditions** | Parent task exists |
| **Steps** | 1. Open task detail<br>2. Click "Add Subtask"<br>3. Enter "Read chapter 1"<br>4. Save |
| **Expected Result** | Subtask appears under parent, parent shows "0/1" progress |

---

### TC-TSK-025: Complete Subtask
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify subtask completion updates progress |
| **Preconditions** | Task with 3 subtasks, 1 completed |
| **Steps** | 1. Complete second subtask |
| **Expected Result** | Progress shows "2/3", subtask marked complete |

---

### TC-TSK-026: Complete All Subtasks
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify parent NOT auto-completed when all subtasks done |
| **Preconditions** | Task with subtasks, some incomplete |
| **Steps** | 1. Complete all subtasks |
| **Expected Result** | Progress shows "3/3", parent task remains incomplete (per spec) |

---

### TC-TSK-027: Delete Task with Subtasks
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify subtasks are deleted with parent |
| **Preconditions** | Task with subtasks |
| **Steps** | 1. Delete parent task |
| **Expected Result** | Task and all subtasks removed from database |

---

### TC-TSK-028: Smart View Real-time Update
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify views update when task properties change |
| **Preconditions** | Task in Inbox view |
| **Steps** | 1. Open Inbox view<br>2. Set due date to today on task<br>3. Open Today view |
| **Expected Result** | Task now appears in Today view (may disappear from Inbox if logic changes) |

---

### TC-TSK-029: Move Task to Different Project
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify changing task project |
| **Preconditions** | Task in Project A, Project B exists |
| **Steps** | 1. Open task<br>2. Change project to Project B<br>3. Save |
| **Expected Result** | Task no longer in Project A filter, appears in Project B |

---

### TC-TSK-030: Undo Task Completion
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify undo action for completion |
| **Preconditions** | None |
| **Steps** | 1. Complete a task<br>2. Look for "Undo" option (toast/notification)<br>3. Click Undo within timeout |
| **Expected Result** | Task restored to incomplete state |

---

---

## P2 - Major

### TC-TSK-031: Drag and Drop - Reorder Tasks
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify manual task reordering |
| **Preconditions** | Multiple tasks in same project |
| **Steps** | 1. Drag task from position 3 to position 1<br>2. Refresh page |
| **Expected Result** | Task order persists after refresh |

---

### TC-TSK-032: Drag and Drop - Move Between Projects
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify dragging task to different project |
| **Preconditions** | Task exists, multiple projects in sidebar |
| **Steps** | 1. Drag task to different project in sidebar |
| **Expected Result** | Task moves to new project |

---

### TC-TSK-033: Natural Language Due Date - Today
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify "today" hint in due date |
| **Preconditions** | Due date input |
| **Steps** | 1. Type "today" in due date field |
| **Expected Result** | Today's date auto-selected |

---

### TC-TSK-034: Natural Language Due Date - Tomorrow
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify "tomorrow" hint |
| **Preconditions** | Due date input |
| **Steps** | 1. Type "tomorrow" in due date field |
| **Expected Result** | Tomorrow's date auto-selected |

---

### TC-TSK-035: Natural Language Due Date - Next Monday
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify "next Monday" hint |
| **Preconditions** | Due date input |
| **Steps** | 1. Type "next monday" in due date field |
| **Expected Result** | Correct date for next Monday selected |

---

### TC-TSK-036: Clear Due Date
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify removing due date |
| **Preconditions** | Task with due date |
| **Steps** | 1. Open task<br>2. Clear due date<br>3. Save |
| **Expected Result** | Due date removed, task no longer in Today/Upcoming |

---

### TC-TSK-037: Edit Project Name
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify project renaming |
| **Preconditions** | Project exists |
| **Steps** | 1. Right-click project or open settings<br>2. Rename to "Advanced Math"<br>3. Save |
| **Expected Result** | Project name updated everywhere |

---

### TC-TSK-038: Edit Project Color
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify project color change |
| **Preconditions** | Project with tasks |
| **Steps** | 1. Edit project color to red<br>2. View tasks |
| **Expected Result** | Project and associated tasks show new color |

---

### TC-TSK-039: Delete Project - Tasks to Inbox
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify deleting project moves tasks to Inbox |
| **Preconditions** | Project with tasks |
| **Steps** | 1. Delete project<br>2. Check Inbox |
| **Expected Result** | Project deleted, tasks moved to Inbox (not deleted) |

---

### TC-TSK-040: Cannot Delete Inbox Project
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify Inbox is protected |
| **Preconditions** | None |
| **Steps** | 1. Attempt to delete Inbox project |
| **Expected Result** | Delete option disabled or action rejected |

---

### TC-TSK-041: Task with Time Spent Display
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify total time spent shows on task |
| **Preconditions** | Task with timer sessions logged |
| **Steps** | 1. View task in list or detail |
| **Expected Result** | Shows accumulated time (e.g., "2h 15m") |

---

### TC-TSK-042: Search - By Title
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify search finds tasks by title |
| **Preconditions** | Tasks with varied titles |
| **Steps** | 1. Press Cmd+K or click search<br>2. Type "exam" |
| **Expected Result** | Tasks with "exam" in title appear in results |
| **Test Data** | Search: "exam", expect: "Study for exam", "Final exam prep" |

---

### TC-TSK-043: Search - By Project
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify search finds tasks by project name |
| **Preconditions** | Tasks in project "Math 101" |
| **Steps** | 1. Search for "math" |
| **Expected Result** | Tasks from "Math 101" project appear |

---

### TC-TSK-044: Search - Real-time Results
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify search updates as user types |
| **Preconditions** | None |
| **Steps** | 1. Open search<br>2. Type "s"<br>3. Type "st"<br>4. Type "stu" |
| **Expected Result** | Results narrow with each keystroke |

---

### TC-TSK-045: View/Hide Completed Tasks
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify toggle for completed tasks visibility |
| **Preconditions** | Mix of completed and incomplete tasks |
| **Steps** | 1. Toggle "Show completed" off<br>2. Toggle "Show completed" on |
| **Expected Result** | Completed tasks hidden/shown accordingly |

---

---

## P3 - Minor

### TC-TSK-046: Task Creation Animation
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify smooth animation when task added |
| **Preconditions** | None |
| **Steps** | 1. Create new task |
| **Expected Result** | Task appears with animation (fade in, slide, etc.) |

---

### TC-TSK-047: Task Completion Animation
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify satisfying completion feedback |
| **Preconditions** | Task exists |
| **Steps** | 1. Complete task |
| **Expected Result** | Visual celebration (checkmark animation, strikethrough, etc.) |

---

### TC-TSK-048: Project Emoji
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify emoji on project |
| **Preconditions** | None |
| **Steps** | 1. Create/edit project<br>2. Add emoji 📚<br>3. Save |
| **Expected Result** | Emoji displays next to project name |

---

### TC-TSK-049: Search Keyboard Shortcut
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify Cmd+K or Cmd+F opens search |
| **Preconditions** | App loaded |
| **Steps** | 1. Press Cmd+K |
| **Expected Result** | Search modal/bar opens, cursor in input |

---

### TC-TSK-050: Empty State - No Tasks
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify helpful empty state |
| **Preconditions** | No tasks in project/view |
| **Steps** | 1. View project with no tasks |
| **Expected Result** | Helpful message shown (e.g., "No tasks yet. Add one!") with action |

---

---

## Edge Cases & Error Handling

### TC-TSK-E01: Very Long Task Title
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify handling of long task titles |
| **Preconditions** | None |
| **Steps** | 1. Create task with 500+ character title |
| **Expected Result** | Either accepted and truncated/wrapped in UI, or rejected with max length error |
| **Test Data** | Lorem ipsum x 100 words |

---

### TC-TSK-E02: Special Characters in Title
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify special characters handled safely |
| **Preconditions** | None |
| **Steps** | 1. Create task: `<script>alert('xss')</script>` |
| **Expected Result** | Text displayed literally, no script execution |

---

### TC-TSK-E03: Unicode/Emoji in Title
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify international characters |
| **Preconditions** | None |
| **Steps** | 1. Create tasks with: "日本語タスク", "العربية", "🎯 Goal task" |
| **Expected Result** | All characters display correctly |

---

### TC-TSK-E04: Empty Title Rejection
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify empty title prevented |
| **Preconditions** | None |
| **Steps** | 1. Try to create task with empty title<br>2. Try with whitespace-only title |
| **Expected Result** | Task creation prevented, error/validation shown |

---

### TC-TSK-E05: Large Volume - 100 Tasks
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify performance with many tasks |
| **Preconditions** | None |
| **Steps** | 1. Create 100 tasks<br>2. Scroll through list<br>3. Search<br>4. Complete tasks |
| **Expected Result** | UI remains responsive, no freezing |

---

### TC-TSK-E06: Large Volume - 1000 Tasks
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Stress test with very large dataset |
| **Preconditions** | None |
| **Steps** | 1. Import/create 1000 tasks<br>2. Test basic operations |
| **Expected Result** | App functions (may have some lag), no crashes |

---

### TC-TSK-E07: Due Date - Leap Year
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify February 29th handling |
| **Preconditions** | Test in leap year or mock date |
| **Steps** | 1. Set due date to Feb 29 in leap year |
| **Expected Result** | Date saved and displayed correctly |

---

### TC-TSK-E08: Due Date - Year Boundary
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify Dec 31 → Jan 1 transition |
| **Preconditions** | Task due Dec 31 |
| **Steps** | 1. Wait until Jan 1 (or mock)<br>2. Check task status |
| **Expected Result** | Task correctly shows as overdue |

---

### TC-TSK-E09: Timezone - Due Today
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify due date in user's timezone |
| **Preconditions** | System timezone set |
| **Steps** | 1. Set task due "today" at 11pm<br>2. Check at 12:01am next day |
| **Expected Result** | Task shows as overdue after midnight local time |

---

### TC-TSK-E10: Concurrent Browser Tabs
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify handling of multiple tabs |
| **Preconditions** | App open in 2 tabs |
| **Steps** | 1. Create task in Tab 1<br>2. Refresh Tab 2 |
| **Expected Result** | Tab 2 shows new task after refresh |

---

### TC-TSK-E11: Duplicate Project Names
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify duplicate project name handling |
| **Preconditions** | Project "Math" exists |
| **Steps** | 1. Create another project named "Math" |
| **Expected Result** | Either prevented with error, or allowed (per spec: names must be unique → rejected) |

---

### TC-TSK-E12: Delete Subtask
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify individual subtask deletion |
| **Preconditions** | Task with multiple subtasks |
| **Steps** | 1. Delete one subtask |
| **Expected Result** | Subtask removed, progress indicator updates |

---

---

## Integration Test Cases

### TC-TSK-INT-01: Start Timer from Task
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify timer starts linked to task |
| **Preconditions** | Task exists |
| **Steps** | 1. Click timer icon on task<br>2. Verify timer page |
| **Expected Result** | Timer page opens with task linked, task name visible |

---

### TC-TSK-INT-02: Complete Task After Timer
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify completion prompt after timer |
| **Preconditions** | Timer linked to task, timer completes |
| **Steps** | 1. Start timer linked to task<br>2. Complete timer session<br>3. Observe prompt |
| **Expected Result** | Option to mark task complete or start another session |

---

---

## Test Execution Tracking

| Test ID | Status | Tester | Date | Build | Notes |
|---------|--------|--------|------|-------|-------|
| TC-TSK-001 | | | | | |
| TC-TSK-002 | | | | | |
| ... | | | | | |

**Status Key:** ✅ Pass | ❌ Fail | ⏸️ Blocked | ⏭️ Skipped

---

*Document Version: 1.0*  
*Last Updated: January 7, 2026*  
*Owner: QA Engineer*

