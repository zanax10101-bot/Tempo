# Browser & Device Test Matrix

**Author:** QA Engineer  
**Date:** January 7, 2026  
**Version:** 1.0  
**Scope:** Tempo MVP Cross-Browser & Responsive Testing

---

## 1. Overview

This document defines the browser and device combinations that must be tested for Tempo MVP release. Testing ensures consistent functionality across target environments.

---

## 2. Browser Support Matrix

### 2.1 Desktop Browsers

| Browser | Versions | OS | Priority | Test Scope |
|---------|----------|-----|----------|------------|
| **Chrome** | 119, 120 (latest 2) | Windows 11, macOS 14 | P0 | Full |
| **Firefox** | 120, 121 (latest 2) | Windows 11, macOS 14 | P0 | Full |
| **Safari** | 17.1, 17.2 (latest 2) | macOS 14 | P0 | Full |
| **Edge** | 119, 120 (latest 2) | Windows 11 | P1 | Full |

### 2.2 Mobile Browsers

| Browser | Versions | OS | Priority | Test Scope |
|---------|----------|-----|----------|------------|
| **Safari iOS** | 17.x | iOS 17 | P1 | Functional |
| **Chrome Android** | 120 | Android 13/14 | P2 | Smoke |

### 2.3 Browser Feature Requirements

| Feature | Chrome | Firefox | Safari | Edge | Notes |
|---------|--------|---------|--------|------|-------|
| IndexedDB | ✅ | ✅ | ✅ | ✅ | Core data storage |
| localStorage | ✅ | ✅ | ✅ | ✅ | Timer state |
| Notifications API | ✅ | ✅ | ✅* | ✅ | *Safari requires permission |
| Web Audio API | ✅ | ✅ | ✅ | ✅ | Timer sounds |
| CSS Grid | ✅ | ✅ | ✅ | ✅ | Layout |
| CSS Variables | ✅ | ✅ | ✅ | ✅ | Theming |

---

## 3. Device & Viewport Matrix

### 3.1 Desktop Viewports

| Category | Resolution | Aspect | Priority | Test Focus |
|----------|------------|--------|----------|------------|
| **Large Desktop** | 1920×1080 | 16:9 | P0 | Full layout |
| **Standard Desktop** | 1440×900 | 16:10 | P0 | Full layout |
| **Small Desktop** | 1280×800 | 16:10 | P1 | Layout breakpoints |
| **HD Desktop** | 2560×1440 | 16:9 | P2 | High-DPI |

### 3.2 Tablet Viewports

| Device | Resolution | Priority | Test Focus |
|--------|------------|----------|------------|
| **iPad Pro 12.9"** | 1024×1366 | P1 | Tablet layout |
| **iPad Air** | 820×1180 | P1 | Tablet layout |
| **iPad Mini / Standard** | 768×1024 | P0 | Primary tablet breakpoint |
| **Android Tablet** | 800×1280 | P2 | Generic tablet |

### 3.3 Mobile Viewports

| Device | Resolution | Priority | Test Focus |
|--------|------------|----------|------------|
| **iPhone 14/15** | 390×844 | P1 | Modern iPhone |
| **iPhone SE** | 375×667 | P0 | Minimum mobile width |
| **Android (Medium)** | 360×800 | P1 | Common Android |
| **Android (Small)** | 320×568 | P2 | Edge case |

---

## 4. Test Types by Environment

### 4.1 Full Regression (All Browsers)

Run on P0 browsers at P0 viewports:
- Chrome (Windows + macOS) @ 1920px, 1440px
- Firefox (Windows + macOS) @ 1920px
- Safari (macOS) @ 1440px
- Edge (Windows) @ 1920px

**Test Coverage:**
- All P0 and P1 test cases
- Timer functionality
- Task CRUD
- Data persistence
- Navigation
- Notifications

### 4.2 Functional Testing (Primary Browsers)

Run on Chrome and Safari:
- All viewports (desktop, tablet, mobile)
- Responsive breakpoint transitions
- Touch interactions (tablet/mobile)

**Test Coverage:**
- P0 test cases
- Layout at each breakpoint
- Touch targets (44×44px minimum)

### 4.3 Smoke Testing (Secondary Browsers)

Run on Edge, Firefox mobile, Chrome Android:
- P0 viewport only
- Critical path only

**Test Coverage:**
- App loads
- Timer starts/stops
- Task creates/completes
- Data persists

---

## 5. Known Browser-Specific Considerations

### 5.1 Safari

| Issue | Impact | Test Case |
|-------|--------|-----------|
| Private browsing blocks IndexedDB | High | Verify graceful error handling |
| Notification permission flow | Medium | Test permission prompt UX |
| Date input styling | Low | Verify date picker works |
| Audio autoplay restrictions | Medium | Verify notification sounds after interaction |

### 5.2 Firefox

| Issue | Impact | Test Case |
|-------|--------|-----------|
| Strict tracking protection | Low | Verify no third-party dependencies blocked |
| Date picker differences | Low | Verify date selection works |

### 5.3 Edge

| Issue | Impact | Test Case |
|-------|--------|-----------|
| Generally Chrome-like | Low | Basic compatibility |
| IE Mode potential | N/A | Not supporting IE mode |

### 5.4 Mobile Safari (iOS)

| Issue | Impact | Test Case |
|-------|--------|-----------|
| 100vh includes address bar | Medium | Verify full-height layouts |
| Rubber band scrolling | Low | Test scroll containers |
| Keyboard pushes viewport | Medium | Test forms with keyboard |
| No notification API | High | In-app notifications only |

### 5.5 Chrome Android

| Issue | Impact | Test Case |
|-------|--------|-----------|
| Variable bottom bar height | Low | Test navigation area |
| Performance on low-end devices | Medium | Test on mid-range device |

---

## 6. Responsive Breakpoints

Based on Tailwind CSS defaults:

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **xs** | < 640px | Single column, compact UI |
| **sm** | ≥ 640px | Wider touch targets |
| **md** | ≥ 768px | Tablet layout, sidebar collapse option |
| **lg** | ≥ 1024px | Full desktop layout |
| **xl** | ≥ 1280px | Comfortable spacing |
| **2xl** | ≥ 1536px | Maximum width containers |

### 6.1 Breakpoint Test Checklist

| Element | Mobile (375px) | Tablet (768px) | Desktop (1440px) |
|---------|----------------|----------------|------------------|
| Sidebar | Hidden/hamburger | Collapsible | Always visible |
| Timer display | Full width | Centered | Centered |
| Task list | Single column | Single column | May have side panel |
| Quick add | Bottom fixed | Top of content | Top of content |
| Navigation | Bottom tabs | Sidebar icons | Sidebar with labels |

---

## 7. Accessibility Testing Matrix

### 7.1 Assistive Technologies

| Technology | Browser | OS | Priority |
|------------|---------|-----|----------|
| **VoiceOver** | Safari | macOS | P1 |
| **VoiceOver** | Safari | iOS | P2 |
| **NVDA** | Chrome/Firefox | Windows | P1 |
| **TalkBack** | Chrome | Android | P3 |

### 7.2 Accessibility Test Areas

| Area | Test Method | Pass Criteria |
|------|-------------|---------------|
| **Keyboard Navigation** | Tab through all elements | All interactive elements reachable |
| **Focus Indicators** | Visual inspection | Clear focus ring on all focusable elements |
| **Color Contrast** | axe-core / manual | WCAG AA (4.5:1 text, 3:1 UI) |
| **Screen Reader** | VoiceOver/NVDA | All content announced, forms labeled |
| **Reduced Motion** | prefers-reduced-motion | Animations disabled/reduced |
| **Text Scaling** | 200% browser zoom | Layout functional, no overlap |

---

## 8. Test Environment Setup

### 8.1 Local Testing

```
Development machine requirements:
- Chrome, Firefox, Safari (if macOS)
- Device emulation via DevTools
- Multiple viewport sizes
```

### 8.2 Real Device Testing

| Device | Owner | Purpose |
|--------|-------|---------|
| iPhone (recent) | QA | iOS Safari testing |
| iPad | QA | Tablet layout |
| Android phone | QA | Chrome Android |
| Windows laptop | Developer/QA | Edge, Windows testing |
| MacBook | Developer | Safari, macOS testing |

### 8.3 Cloud Testing (Optional)

| Service | Use Case |
|---------|----------|
| **BrowserStack** | Cross-browser, real devices |
| **Sauce Labs** | Automated cross-browser |
| **LambdaTest** | Budget alternative |

---

## 9. Test Execution Schedule

### 9.1 Per Sprint

| Activity | Browsers | Viewports |
|----------|----------|-----------|
| Feature testing | Chrome | Desktop only |
| Integration testing | Chrome + Safari | Desktop + Tablet |

### 9.2 Pre-Release

| Activity | Browsers | Viewports |
|----------|----------|-----------|
| Full regression | All P0 | All P0 |
| Smoke test | All P1 | Primary |
| Accessibility audit | Chrome + Safari | Desktop |

### 9.3 Post-Release

| Activity | Browsers | Viewports |
|----------|----------|-----------|
| Production smoke | Chrome + Safari | Desktop + Mobile |

---

## 10. Test Results Template

### 10.1 Browser Compatibility Results

| Browser | Version | OS | Timer | Tasks | Persist | Notif | Status |
|---------|---------|-----|-------|-------|---------|-------|--------|
| Chrome | 120 | Win 11 | | | | | |
| Chrome | 120 | macOS 14 | | | | | |
| Firefox | 121 | Win 11 | | | | | |
| Firefox | 121 | macOS 14 | | | | | |
| Safari | 17.2 | macOS 14 | | | | | |
| Edge | 120 | Win 11 | | | | | |

**Status Key:** ✅ Pass | ❌ Fail | ⚠️ Issues | ⏭️ Not Tested

### 10.2 Responsive Results

| Viewport | Chrome | Safari | Firefox | Issues |
|----------|--------|--------|---------|--------|
| 1920×1080 | | | | |
| 1440×900 | | | | |
| 1280×800 | | | | |
| 768×1024 | | | | |
| 375×667 | | | | |

---

## 11. Issue Tracking

### 11.1 Browser-Specific Bugs

| ID | Browser | Issue | Severity | Status |
|----|---------|-------|----------|--------|
| | | | | |

### 11.2 Responsive Issues

| ID | Viewport | Issue | Severity | Status |
|----|----------|-------|----------|--------|
| | | | | |

---

## 12. Sign-Off Criteria

### 12.1 Minimum Release Criteria

- [ ] All P0 browsers pass full regression
- [ ] All P0 viewports pass responsive testing
- [ ] No Critical/High bugs in any P0 environment
- [ ] Accessibility audit passes WCAG AA
- [ ] Performance budget met on primary browsers

### 12.2 Sign-Off Record

| Browser/Device | Tester | Date | Build | Result |
|----------------|--------|------|-------|--------|
| Chrome Windows | | | | |
| Chrome macOS | | | | |
| Firefox Windows | | | | |
| Safari macOS | | | | |
| Edge Windows | | | | |
| Mobile Safari | | | | |
| Responsive (all) | | | | |
| Accessibility | | | | |

---

*Document Version: 1.0*  
*Last Updated: January 7, 2026*  
*Owner: QA Engineer*

