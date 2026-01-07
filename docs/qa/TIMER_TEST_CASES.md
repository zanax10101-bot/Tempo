# Timer Test Cases

**Author:** QA Engineer  
**Date:** January 7, 2026  
**Version:** 1.0  
**Feature:** Timer (T1-T5)

---

## Overview

This document contains test cases for the Timer feature, organized by priority. Test cases cover:
- Basic timer operations (start, pause, resume, reset)
- Pomodoro mode cycling
- Custom presets
- Timer-task integration
- Edge cases and error handling

---

## Test Case Format

| Field | Description |
|-------|-------------|
| **ID** | TC-TMR-XXX |
| **Priority** | P0 (Blocker) / P1 (Critical) / P2 (Major) / P3 (Minor) |
| **Preconditions** | Required state before test |
| **Steps** | Numbered actions |
| **Expected Result** | Observable outcome |
| **Test Data** | Specific inputs if needed |

---

## P0 - Blocker (Must Pass for Release)

### TC-TMR-001: Start Timer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer starts and counts down correctly |
| **Preconditions** | Timer page loaded, timer idle |
| **Steps** | 1. Click "Start" button<br>2. Observe timer display for 10 seconds |
| **Expected Result** | Timer displays MM:SS format, decrements by 1 second each second (±1s tolerance over 10s) |
| **Test Data** | Default preset (25:00) |

---

### TC-TMR-002: Pause Timer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer pauses and holds value |
| **Preconditions** | Timer running (any duration remaining) |
| **Steps** | 1. Note current time display<br>2. Click "Pause" button<br>3. Wait 5 seconds<br>4. Verify display |
| **Expected Result** | Timer stops counting, displays paused state, value unchanged after 5s |

---

### TC-TMR-003: Resume Timer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify paused timer resumes correctly |
| **Preconditions** | Timer paused at known value (e.g., 20:30) |
| **Steps** | 1. Click "Resume" button<br>2. Observe timer for 5 seconds |
| **Expected Result** | Timer resumes from paused value, continues countdown accurately |

---

### TC-TMR-004: Reset Timer
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer resets to initial duration |
| **Preconditions** | Timer running or paused |
| **Steps** | 1. Click "Reset" or "Cancel" button<br>2. Verify timer state |
| **Expected Result** | Timer returns to idle state, displays preset duration (e.g., 25:00), no session logged |

---

### TC-TMR-005: Timer Completion
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer completes and fires notification |
| **Preconditions** | Browser notification permission granted |
| **Steps** | 1. Set timer to 5 seconds (or use dev override)<br>2. Start timer<br>3. Wait for completion |
| **Expected Result** | 1. Timer reaches 00:00<br>2. Audio notification plays (if sound enabled)<br>3. Browser notification appears<br>4. Visual completion state shown<br>5. Session recorded in history |
| **Test Data** | Short duration for efficiency |

---

### TC-TMR-006: Timer Display Format
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify correct MM:SS display across durations |
| **Preconditions** | None |
| **Steps** | 1. Test display for various remaining times |
| **Expected Result** | All times display correctly |
| **Test Data** | - 25:00 (standard)<br>- 59:59 (max minutes display)<br>- 01:00:00 (1 hour, if supported)<br>- 00:59 (under 1 minute)<br>- 00:01 (last second)<br>- 00:00 (completion) |

---

### TC-TMR-007: Timer Accuracy Over Long Session
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer remains accurate over extended period |
| **Preconditions** | System clock verified |
| **Steps** | 1. Note system time<br>2. Start 25-minute timer<br>3. Wait until completion<br>4. Verify elapsed system time |
| **Expected Result** | Timer completes within ±5 seconds of 25 minutes elapsed |
| **Notes** | Use wall clock or system time comparison |

---

### TC-TMR-008: Timer Persistence on Navigation
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify running timer persists when navigating within app |
| **Preconditions** | Timer running |
| **Steps** | 1. Start timer at known time (e.g., 24:30)<br>2. Navigate to Tasks page<br>3. Wait 10 seconds<br>4. Return to Timer page |
| **Expected Result** | Timer still running, shows approximately 24:20 (accounting for navigation time) |

---

### TC-TMR-009: Timer Recovery After Page Reload
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify timer recovers state after browser refresh |
| **Preconditions** | Timer running |
| **Steps** | 1. Start timer at known time<br>2. Note remaining time<br>3. Refresh browser (F5)<br>4. Check timer state |
| **Expected Result** | Timer recovers, continues from correct position (based on elapsed wall time) |

---

### TC-TMR-010: Pomodoro Focus → Break Transition
| Field | Value |
|-------|-------|
| **Priority** | P0 |
| **Description** | Verify automatic transition from focus to break |
| **Preconditions** | Pomodoro mode enabled |
| **Steps** | 1. Start focus session<br>2. Wait for completion (or use short test preset)<br>3. Observe transition |
| **Expected Result** | 1. Focus session completes with notification<br>2. Break session offered/started<br>3. Break timer shows correct duration (5 min default)<br>4. Visual indicator shows "Break" phase |

---

## P1 - Critical

### TC-TMR-011: Pomodoro Long Break After 4 Cycles
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify long break triggered after completing cycle count |
| **Preconditions** | Completed 3 full cycles (focus + break each) |
| **Steps** | 1. Complete 4th focus session<br>2. Observe break suggestion |
| **Expected Result** | Long break (15-30 min) offered instead of short break (5 min) |

---

### TC-TMR-012: Skip Break
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify user can skip break and start new focus |
| **Preconditions** | Break session offered/active |
| **Steps** | 1. Click "Skip Break" or equivalent<br>2. Verify state |
| **Expected Result** | Break skipped, new focus session ready to start (not auto-started) |

---

### TC-TMR-013: Session Counter Display
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify completed pomodoro count displays correctly |
| **Preconditions** | Fresh session (counter at 0) |
| **Steps** | 1. Complete 1 focus session<br>2. Check counter<br>3. Complete 2nd focus session<br>4. Check counter |
| **Expected Result** | Counter shows 1 after first focus, 2 after second |

---

### TC-TMR-014: Create Custom Preset
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify custom timer preset creation |
| **Preconditions** | None |
| **Steps** | 1. Navigate to preset settings<br>2. Click "Create Preset"<br>3. Enter: Name="Deep Work", Focus=50, Break=10, Long Break=30, Cycles=2<br>4. Save |
| **Expected Result** | Preset saved, appears in preset list, selectable for timer |
| **Test Data** | Name: "Deep Work", Focus: 50 min, Break: 10 min, Long Break: 30 min, Cycles: 2 |

---

### TC-TMR-015: Select Custom Preset
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify selecting custom preset updates timer |
| **Preconditions** | Custom preset exists (e.g., 50/10) |
| **Steps** | 1. Open preset selector<br>2. Select custom preset<br>3. Verify timer display |
| **Expected Result** | Timer displays preset's focus duration (50:00), uses preset's break/long break settings |

---

### TC-TMR-016: Preset Persistence
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify custom presets persist after browser refresh |
| **Preconditions** | Custom preset created |
| **Steps** | 1. Create custom preset<br>2. Refresh browser<br>3. Check preset list |
| **Expected Result** | Custom preset still available with all settings intact |

---

### TC-TMR-017: Default Preset Setting
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify setting a preset as default |
| **Preconditions** | Multiple presets exist |
| **Steps** | 1. Select non-default preset<br>2. Mark as default<br>3. Refresh browser<br>4. Check which preset is selected |
| **Expected Result** | New default preset is auto-selected on fresh load |

---

### TC-TMR-018: Link Timer to Task
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify starting timer linked to specific task |
| **Preconditions** | At least one task exists |
| **Steps** | 1. Navigate to task<br>2. Click timer/play icon on task<br>3. Start timer |
| **Expected Result** | 1. Timer page shows linked task name<br>2. Task visible during focus session |

---

### TC-TMR-019: Time Logged to Task on Completion
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify completed session adds time to linked task |
| **Preconditions** | Timer linked to task, task has 0 time logged |
| **Steps** | 1. Start timer linked to task (use short duration)<br>2. Complete timer session<br>3. Check task's time spent |
| **Expected Result** | Task shows logged time (session duration) |
| **Test Data** | 5-minute test session |

---

### TC-TMR-020: Phase Visual Indicator
| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Description** | Verify visual distinction between focus and break |
| **Preconditions** | None |
| **Steps** | 1. Start focus session, note appearance<br>2. Complete and start break, note appearance |
| **Expected Result** | Clear visual difference (color, icon, label) between focus and break phases |

---

## P2 - Major

### TC-TMR-021: Multiple Quick Start/Stop
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify timer handles rapid start/stop cycles |
| **Preconditions** | Timer idle |
| **Steps** | 1. Click Start<br>2. Click Pause (within 1s)<br>3. Click Resume (within 1s)<br>4. Click Reset (within 1s)<br>5. Repeat 5 times |
| **Expected Result** | Timer responds correctly each time, no frozen UI, no console errors |

---

### TC-TMR-022: Edit Preset
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify editing existing preset |
| **Preconditions** | Custom preset exists |
| **Steps** | 1. Select preset to edit<br>2. Change focus from 50 to 45 min<br>3. Save<br>4. Verify preset |
| **Expected Result** | Preset updated, shows 45 min focus |

---

### TC-TMR-023: Delete Custom Preset
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify custom preset deletion |
| **Preconditions** | Custom preset exists |
| **Steps** | 1. Select custom preset<br>2. Click delete<br>3. Confirm deletion |
| **Expected Result** | Preset removed, no longer in list, default preset selected |

---

### TC-TMR-024: Cannot Delete Built-in Preset
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify built-in presets cannot be deleted |
| **Preconditions** | None |
| **Steps** | 1. Select "Classic Pomodoro" (built-in)<br>2. Attempt to delete |
| **Expected Result** | Delete option disabled or hidden for built-in presets |

---

### TC-TMR-025: Preset Validation - Focus Duration
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify focus duration validation (1-120 min) |
| **Preconditions** | Preset creation/edit form open |
| **Steps** | 1. Enter focus: 0<br>2. Try to save<br>3. Enter focus: 121<br>4. Try to save<br>5. Enter focus: 60<br>6. Save |
| **Expected Result** | 0 and 121 rejected with error message, 60 accepted |

---

### TC-TMR-026: Timer Sound Toggle
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify sound enable/disable setting |
| **Preconditions** | Sound enabled by default |
| **Steps** | 1. Complete timer, verify sound plays<br>2. Disable sound in settings<br>3. Complete timer, verify no sound |
| **Expected Result** | Sound plays when enabled, silent when disabled |

---

### TC-TMR-027: Browser Tab - Timer Continues
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify timer continues when tab is backgrounded |
| **Preconditions** | Timer running |
| **Steps** | 1. Start timer at 24:00<br>2. Switch to different browser tab<br>3. Wait 60 seconds<br>4. Return to Tempo tab |
| **Expected Result** | Timer shows approximately 23:00 (±2s), having continued in background |

---

### TC-TMR-028: Cancelled Session Recording
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify cancelled sessions are recorded appropriately |
| **Preconditions** | None |
| **Steps** | 1. Start 25-min timer<br>2. Wait 5 minutes<br>3. Cancel/reset timer<br>4. Check session history |
| **Expected Result** | Session recorded with wasCompleted=false, actualDuration=5min, plannedDuration=25min |

---

### TC-TMR-029: Notification Permission Denied
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify graceful handling when notifications blocked |
| **Preconditions** | Browser notifications denied |
| **Steps** | 1. Deny notification permission<br>2. Complete timer session |
| **Expected Result** | Timer completes normally, in-app notification shown, no console errors |

---

### TC-TMR-030: Daily Focus Time Display
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify daily focus time aggregation |
| **Preconditions** | Complete 2 focus sessions today |
| **Steps** | 1. Complete 25-min session<br>2. Complete 25-min session<br>3. Check daily stats |
| **Expected Result** | Shows 50 minutes total focus time for today |

---

## P3 - Minor

### TC-TMR-031: Preset Name Uniqueness
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify duplicate preset names are handled |
| **Preconditions** | Preset "My Preset" exists |
| **Steps** | 1. Create new preset<br>2. Enter name "My Preset"<br>3. Save |
| **Expected Result** | Either prevented with error, or allowed (not necessarily unique) |

---

### TC-TMR-032: Timer Display - Hour Support
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify display format for 60+ minute sessions |
| **Preconditions** | Custom preset with 90 min focus |
| **Steps** | 1. Create preset with 90 min focus<br>2. Select and start |
| **Expected Result** | Timer displays appropriately (90:00 or 1:30:00) |

---

### TC-TMR-033: Keyboard Shortcut - Start/Pause
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify keyboard shortcut for timer control |
| **Preconditions** | Timer page focused |
| **Steps** | 1. Press spacebar (or defined shortcut)<br>2. Verify timer starts<br>3. Press again<br>4. Verify timer pauses |
| **Expected Result** | Keyboard shortcut toggles start/pause |

---

### TC-TMR-034: Auto-Start Break Setting
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify auto-start break configuration |
| **Preconditions** | Auto-start break enabled in settings |
| **Steps** | 1. Enable auto-start break<br>2. Complete focus session |
| **Expected Result** | Break timer starts automatically without user action |

---

### TC-TMR-035: Weekly Focus Summary
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify weekly focus time aggregation |
| **Preconditions** | Sessions logged across multiple days |
| **Steps** | 1. Check weekly summary view |
| **Expected Result** | Shows total focus time for current week, possibly with daily breakdown |

---

## Edge Cases & Error Handling

### TC-TMR-E01: System Clock Change During Timer
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify timer handles system time changes |
| **Preconditions** | Timer running |
| **Steps** | 1. Start timer<br>2. Change system clock forward 10 minutes<br>3. Observe timer |
| **Expected Result** | Timer adjusts based on absolute end time (completes or shows correct remaining) |

---

### TC-TMR-E02: Browser Close During Timer
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify timer state after browser close and reopen |
| **Preconditions** | Timer running |
| **Steps** | 1. Start timer at known time<br>2. Close browser completely<br>3. Wait 2 minutes<br>4. Reopen browser and app |
| **Expected Result** | Timer either: (a) recovers with correct time, or (b) shows as completed if time elapsed |

---

### TC-TMR-E03: Very Short Focus Duration (1 min)
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify minimum duration works correctly |
| **Preconditions** | None |
| **Steps** | 1. Create preset with 1 min focus<br>2. Start and complete |
| **Expected Result** | Timer counts down, completes, transitions to break normally |

---

### TC-TMR-E04: Maximum Focus Duration (120 min)
| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Description** | Verify maximum duration displays correctly |
| **Preconditions** | None |
| **Steps** | 1. Create preset with 120 min focus<br>2. Start timer<br>3. Verify display |
| **Expected Result** | Timer shows 120:00 or 2:00:00, counts down correctly |

---

### TC-TMR-E05: IndexedDB Unavailable
| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Description** | Verify graceful handling when IndexedDB unavailable |
| **Preconditions** | IndexedDB blocked (private browsing on some browsers) |
| **Steps** | 1. Open app in Safari private mode<br>2. Attempt to use timer |
| **Expected Result** | Clear error message, timer may work without persistence, no crash |

---

## Test Execution Tracking

| Test ID | Status | Tester | Date | Build | Notes |
|---------|--------|--------|------|-------|-------|
| TC-TMR-001 | | | | | |
| TC-TMR-002 | | | | | |
| ... | | | | | |

**Status Key:** ✅ Pass | ❌ Fail | ⏸️ Blocked | ⏭️ Skipped

---

*Document Version: 1.0*  
*Last Updated: January 7, 2026*  
*Owner: QA Engineer*

