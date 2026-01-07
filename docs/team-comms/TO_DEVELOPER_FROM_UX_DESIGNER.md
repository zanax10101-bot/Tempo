# 📬 Message to Full Stack Developer

**From:** UX Designer  
**Date:** January 7, 2026  
**Subject:** Design System Ready + Answers to Your Questions

---

Hi Developer,

Great to meet you too! I've completed the design system and wireframes—everything is in `/docs/design/`. Let me answer your specific questions:

---

## Your Questions, Answered

### 1. Component Library

**Decision: Radix primitives + custom Tailwind styling**

Use **Radix UI** for:
- `Dialog` (modals)
- `DropdownMenu`
- `Select`
- `Popover`
- `Tooltip`
- `Switch`
- `Checkbox`
- `RadioGroup`

Build **custom** for:
- Buttons
- Inputs
- Cards
- Task items
- Timer display
- Navigation

This gives us accessibility for free while maintaining our unique look. No fighting shadcn's default styling—we own the design.

### 2. Animation Preferences

**All of the above**, with priority:

| Priority | Animation Type | Implementation |
|----------|---------------|----------------|
| **P0** | Micro-interactions | CSS transitions (hover, focus, active states) |
| **P0** | Timer completion | Framer Motion (ring burst, confetti, scale) |
| **P1** | Task completion | CSS + SVG animation (checkmark draw, strikethrough) |
| **P1** | Modal transitions | Framer Motion (scale + fade) |
| **P2** | Page transitions | Optional—cross-fade is enough |

**Animation system setup:**
- Use CSS transitions for simple hover/focus (faster, no JS)
- Use Framer Motion for complex orchestrated animations
- I've defined timing functions and durations in the design system

**Key celebratory moments:**
- Timer completion: Ring explodes, brief confetti, success chime
- Task completion: Checkbox fills, checkmark draws in, text strikes through with satisfying settle

### 3. Timer UX When Navigating

**Recommendation: Bottom floating mini-player bar**

```
┌─────────────────────────────────────────────────────────────────┐
│  🍅 FOCUS   24:37   ▓▓▓▓▓▓▓░░░░   Calculus homework   ⏸  ✕  ↗  │
└─────────────────────────────────────────────────────────────────┘
```

**Behavior:**
1. Timer starts → User stays on full timer screen
2. User navigates to tasks → Mini-player appears at bottom (fixed position)
3. Click mini-player → Returns to full timer view
4. Timer completes → Full modal overlays current screen
5. Close (✕) button → Confirm dialog: "End session early?"

**Component architecture implications:**
- Timer state should be global (Zustand store, which architect already specified)
- Mini-player renders conditionally based on `isRunning && currentRoute !== '/timer'`
- Timer logic runs in background regardless of route

### 4. Responsive Breakpoints

Your breakpoints are perfect! I'm designing for:

| Breakpoint | Behavior |
|------------|----------|
| `< 640px` | Mobile: bottom tabs, FAB, bottom-sheet modals |
| `640-768px` | Large mobile: same as above, more padding |
| `768-1024px` | Tablet: collapsed sidebar (icons only, 60px) |
| `> 1024px` | Desktop: full sidebar (260px), optimal layout |

---

## What I've Provided

### Design System (`DESIGN_SYSTEM.md`)

- **CSS variables** - Full token system for colors, spacing, typography
- **Tailwind config** - Ready to copy into `tailwind.config.js`
- **Component specs** - States for buttons, inputs, tasks, timer, modals
- **Animation inventory** - What animates, how, and timing

### Wireframes (`WIREFRAMES.md`)

- All 6 key screens with annotations
- Component breakdowns
- Mobile adaptations
- Empty states
- First-time user experience (optional)

---

## Additional Implementation Notes

### Fonts

```html
<!-- Add to index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Total font weight: ~50KB (acceptable for the distinctiveness it provides).

### Icons

**Phosphor Icons** - React package available:
```bash
npm install @phosphor-icons/react
```

Use "regular" weight for most icons, "bold" for timer controls.

### Key Z-Index Layers

```css
--z-sidebar: 10;
--z-header: 20;
--z-mini-player: 30;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-toast: 60;
```

### Color Mode

I'm designing dark-first, but the system supports light mode. Implementation:
- Add `class="dark"` to `<html>` by default
- Toggle class for light mode
- All colors reference CSS variables, so theming is automatic

---

## Questions for You

1. **Radix packages** - Should I list out exactly which Radix packages you'll need, or will you determine that as you build?

2. **Timer accuracy** - Any concerns about `setInterval` drift over long sessions? I've seen some apps use `requestAnimationFrame` + timestamp comparison. Let me know if you want me to adjust the timer UI to account for slight variations.

3. **Drag and drop** - For task reordering, you mentioned `@dnd-kit`. Is that confirmed? I can provide specific drop zone styling if helpful.

---

Happy to jump on a call if you want to walk through anything. Otherwise, let me know if you need more detailed specs for any component!

— UX Designer

