# 📬 Message to Product Manager

**From:** UX Designer  
**Date:** January 7, 2026  
**Subject:** Design Direction Complete - Ready for Review

---

Hi PM,

I've completed the initial design direction and dropped everything in `/docs/design/`. Here's a summary of my decisions:

## Deliverables Completed

✅ **Design System** (`DESIGN_SYSTEM.md`)
- Color palette
- Typography
- Spacing & layout tokens
- Component specifications
- Animation system
- Accessibility guidelines
- Tailwind configuration

✅ **Wireframes** (`WIREFRAMES.md`)
- All 6 key screens
- Mobile adaptations
- Empty states
- Onboarding flow

---

## Quick Summary of Decisions

### 1. Visual Direction: "Midnight Focus"

**Dark-mode first**, warm amber accents. The vibe is "late-night study session"—calm but energizing.

**Why:**
- Students often study at night; dark mode reduces eye strain
- Amber accent is warm and distinctive (NOT the cliché tech purple/blue)
- Feels mature without being corporate
- Clear differentiation from competitors

### 2. Color Palette

| Role | Color | Notes |
|------|-------|-------|
| Accent (Focus) | Amber #E5A84B | Warm, energizing |
| Accent (Break) | Teal #4ECDC4 | Cool, relaxing contrast |
| Background | Graphite #0D0D0F → #1C1C21 | Rich dark scale |
| Text | #F5F5F7 → #6B6B70 | High contrast, accessible |

**Priority colors** use a "temperature" scale instead of stoplight:
- High = vivid amber
- Medium = soft warm
- Low = stone gray

### 3. Typography

**Sora** (Google Fonts) - Modern geometric with warmth, distinctive but highly readable.
**JetBrains Mono** for timer display.

Both are free and well-supported.

### 4. Component Library

**Hybrid approach:**
- **Radix UI primitives** for complex accessible components (modals, dropdowns, selects)
- **Custom styling** via Tailwind - no inherited design language to fight
- Aligns with architect's recommendation to avoid full component libraries

### 5. Timer UX

- **Full focus mode** as primary timer view
- **Floating mini-player bar** when navigating away (bottom of screen, like a music player)
- **Satisfying completion**: Ring burst + subtle confetti + chime + mood check prompt

### 6. Mobile

- Bottom tab navigation (Today, Upcoming, Inbox, More)
- Floating Action Button (FAB) for quick-add
- Bottom sheet for task creation
- Full-screen timer view

---

## Open Questions for You

1. **Dark mode first** - Any concerns? Should we include light mode toggle in MVP or defer to v1.1?

2. **Amber accent** - Does this feel right for student productivity? Happy to explore alternatives if the team prefers something cooler (blue/teal).

3. **Onboarding flow** - I've designed a simple 3-screen intro. Is this MVP scope or should we defer?

---

## Next Steps

Once you've reviewed:
1. I'll hand off to Developer with component specs
2. Happy to iterate on any screens that need adjustment
3. Can provide more detailed interaction specs if needed

Let me know your thoughts!

— UX Designer

