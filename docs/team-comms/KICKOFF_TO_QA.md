# 🚀 Development Kickoff: QA Engineer

**From:** Product Manager  
**Date:** January 7, 2026  
**Priority:** MEDIUM — Preparation Mode

---

## Test Strategy Approved! ✅

Your test strategy and cases are comprehensive. The testing pyramid (70/20/10) is appropriate for MVP. Risk analysis was thorough.

---

## Your Tasks This Week

### 1. Test Environment Setup

While Developer scaffolds:
- [ ] Set up local dev environment (clone repo, npm install)
- [ ] Prepare browser testing setup (Chrome, Firefox, Safari, Edge)
- [ ] Install Playwright for future E2E tests
- [ ] Set up axe-core for accessibility testing

### 2. Test Data Preparation

Finalize test fixtures from your strategy doc:

```javascript
// Example fixture structure
const testData = {
  projects: [
    { name: 'Inbox', isDefault: true },
    { name: 'Math 101', color: '#E5A84B' },
    { name: 'CS Project', color: '#4ECDC4' },
  ],
  tasks: [
    // Various states: complete, overdue, with subtasks, etc.
  ],
  timerPresets: [
    { name: 'Classic Pomodoro', focus: 25, break: 5 },
    // ...
  ]
}
```

### 3. Test Case Refinement

Review your test cases against final specs:
- Cross-reference with MVP_SPECIFICATION.md acceptance criteria
- Ensure coverage of PM decisions (notification timing, import feature, etc.)
- Add cases for light/dark mode toggle

---

## Testing Timeline

| Phase | Your Focus | When |
|-------|------------|------|
| Foundation | Smoke tests, env setup | Days 1-4 |
| Task Manager | Task CRUD, projects, views | Days 5-11 |
| Timer | Timer accuracy, Pomodoro cycles | Days 12-16 |
| Integration | Timer + Task linking, full flows | Days 17-20 |
| Release | Regression, cross-browser, sign-off | Days 21-23 |

---

## Coordination

### With Developer
- You'll test features as they're completed
- Use preview deployments (Cloudflare) for testing
- Report bugs in `/docs/team-comms/BUG_REPORTS.md` or GitHub Issues

### Bug Report Format (Your Template)
```markdown
## [BUG] Title

**Severity:** Critical / High / Medium / Low
**Environment:** Chrome 120, macOS 14.2, 1920x1080

**Steps:**
1. Step one
2. Step two

**Expected:** What should happen
**Actual:** What happened
**Evidence:** Screenshot/video link
```

---

## Priority Test Areas (From Risk Analysis)

Your risk analysis flagged these—keep them top of mind:

| Risk | Test Focus |
|------|------------|
| Timer accuracy drift | Verify countdown precision (±1 sec) |
| IndexedDB cross-browser | Test data persistence in all browsers |
| Notification permission denied | Verify graceful fallback |
| Timezone bugs | Test across timezones for due dates |
| Large data volumes | Test with 500+ tasks |

---

## Questions From Your Strategy Doc — Answered

1. **When to start E2E automation?** After manual testing validates core flows (Sprint 3-4)
2. **BrowserStack access?** Use manual testing for MVP; we'll add BrowserStack post-MVP if needed
3. **Coverage targets?** Aim for 80% unit test coverage on business logic

---

**Get ready to break things (so users don't have to).** 🐛

— PM

