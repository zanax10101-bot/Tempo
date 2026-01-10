# 🐛 UI Issues Report — January 7, 2026

**Reported by:** User (Product Testing)  
**Reviewed by:** PM  
**Priority:** Should fix before MVP release

---

## Issue 1: Quick Add Task Input Styling

**Location:** Task list pages (Today, Inbox, etc.)  
**Severity:** Medium  

**Problem:**
- Black outline/border has wrong color (doesn't match design system)
- Left side padding issue — text overlaps/touches the input border

**Expected:**
- Border should be `var(--border-default)` or transparent
- Proper padding on left side (12-16px)

**Screenshot:** See attached (input field with "hello" text)

**Owner:** Developer

---

## Issue 2: Glowing Rectangle on Timer Page

**Location:** `/timer` page  
**Severity:** Medium  

**Problem:**
- There's a visible rectangle box with glow effect around the timer circle area
- Looks unintentional — possibly a debug border or incorrect container styling

**Expected:**
- Timer should have circular glow only (amber `box-shadow: 0 0 24px rgba(229, 168, 75, 0.3)`)
- No rectangular container visible

**Screenshot:** See attached (timer showing 24:53)

**Owner:** Developer

---

## Issue 3: Play Button Icon Not Centered

**Location:** Timer controls  
**Severity:** Low  

**Problem:**
- The play triangle icon is slightly offset to the left
- Not visually centered within the circular button

**Expected:**
- Icon should be optically centered (may need slight right offset since triangles appear left-heavy)

**Fix suggestion:**
```css
/* Play icons often need slight right offset for optical centering */
.play-icon {
  transform: translateX(2px);
}
```

**Owner:** Developer

---

## Issue 4: Logo and "Back to Tasks" Overlapping

**Location:** Timer page header  
**Severity:** Medium  

**Problem:**
- "← Back to Tasks" link overlaps with "TEMPO" logo
- Elements are positioned on top of each other

**Expected:**
- Clear separation between back navigation and logo
- Proper layout: Back link on left, logo centered or in proper header position

**Owner:** Developer

---

## Issue 5: Tomato Emoji Looks Out of Place

**Location:** Timer page — session indicators  
**Severity:** Low (Design Polish)  

**Problem:**
- Using 🍅 emoji for pomodoro session counter
- Emoji style doesn't match the refined UI aesthetic
- Looks inconsistent across different OS/browsers

**Recommendation:**
- Replace with SVG icon or Phosphor icon
- Options:
  - Custom tomato SVG (simple, geometric style)
  - Phosphor `<Timer />` or `<Circle />` icons
  - Simple filled/outlined circles in accent color

**Owner:** UX Designer + Developer

---

## Summary Table

| # | Issue | Location | Severity | Owner |
|---|-------|----------|----------|-------|
| 1 | Input border/padding | Quick Add Task | Medium | Developer |
| 2 | Rectangle glow box | Timer page | Medium | Developer |
| 3 | Play icon off-center | Timer controls | Low | Developer |
| 4 | Logo/back link overlap | Timer header | Medium | Developer |
| 5 | Emoji doesn't fit UI | Session indicator | Low | UX + Dev |

---

## Note on Feature Completeness

User noted many features are not yet implemented. **This is expected** — we're in early development. Current state is foundation + scaffolded components.

Features in progress:
- Task CRUD (create, edit, delete)
- Task persistence (save to IndexedDB)
- Timer logic (countdown, state management)
- Full Pomodoro cycles

---

**Action Required:**

1. **Developer:** Please address issues 1-4 in next commit
2. **UX Designer:** Please provide SVG/icon recommendation for issue 5
3. **QA:** Add these to regression test checklist

---

*Report created: January 7, 2026*
