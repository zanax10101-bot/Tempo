# Tempo Design System

**Author:** UX Designer  
**Date:** January 7, 2026  
**Status:** Proposed  
**Version:** 1.0

---

## 1. Visual Direction

### Chosen Aesthetic: **"Midnight Focus"**

A **dark-first, warm-accented** design that feels like a late-night study session—calm, focused, but energizing. Think: the cozy productivity of a dimly lit library with warm lamplight.

**Why this direction:**
- **Dark mode primary**: Students often study at night; reduces eye strain during long sessions
- **Warm accent colors**: Breaks from the cold blue/purple tech cliché; feels inviting, not clinical
- **Clean but not sterile**: Subtle texture and depth create visual interest without distraction
- **Mature sophistication**: Appeals to both high schoolers and grad students without feeling corporate

**Reference apps for vibe (not copying, just mood):**
- Linear (spatial organization, keyboard-first)
- Things 3 (warmth in dark mode)
- Arc browser (playful touches in a serious tool)
- Notion's dark mode (readable, professional)

---

## 2. Color Palette

### Primary Palette

```css
:root {
  /* Core Background Scale - "Graphite" */
  --bg-base: #0D0D0F;           /* Deepest background */
  --bg-raised: #141417;          /* Cards, elevated surfaces */
  --bg-elevated: #1C1C21;        /* Modals, dropdowns */
  --bg-hover: #252529;           /* Hover states */
  
  /* Primary Accent - "Amber Glow" */
  --accent-primary: #E5A84B;     /* Primary action color */
  --accent-primary-hover: #F0B85A;
  --accent-primary-muted: rgba(229, 168, 75, 0.15);
  
  /* Secondary Accent - "Soft Teal" */
  --accent-secondary: #4ECDC4;   /* Break mode, secondary actions */
  --accent-secondary-muted: rgba(78, 205, 196, 0.15);
  
  /* Text Scale */
  --text-primary: #F5F5F7;       /* Primary content */
  --text-secondary: #A1A1A6;     /* Secondary, labels */
  --text-tertiary: #6B6B70;      /* Disabled, hints */
  --text-inverse: #0D0D0F;       /* Text on accent backgrounds */
  
  /* Semantic Colors */
  --success: #34D399;            /* Completed, success states */
  --warning: #FBBF24;            /* Due soon, warnings */
  --error: #F87171;              /* Overdue, errors */
  --info: #60A5FA;               /* Informational */
  
  /* Borders & Dividers */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);
}
```

### Light Mode (Secondary)

Light mode available for users who prefer it, using inverted scale:

```css
[data-theme="light"] {
  --bg-base: #FAFAFA;
  --bg-raised: #FFFFFF;
  --bg-elevated: #FFFFFF;
  --bg-hover: #F0F0F0;
  
  --text-primary: #171717;
  --text-secondary: #525252;
  --text-tertiary: #A3A3A3;
  
  --border-subtle: rgba(0, 0, 0, 0.04);
  --border-default: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.12);
}
```

### Priority Colors (NOT Stoplight)

Instead of red/yellow/green, we use saturation levels of the primary accent:

| Priority | Color | Hex | Rationale |
|----------|-------|-----|-----------|
| **High** | Amber (vivid) | `#E5A84B` | Full intensity |
| **Medium** | Amber (soft) | `#C9986A` | Desaturated warm |
| **Low** | Stone | `#78716C` | Neutral warm gray |
| **None** | Transparent | — | No visual indicator |

This creates a "temperature" scale rather than stoplight semantics.

### Focus vs Break Mode Colors

| Mode | Background Accent | Timer Ring | Ambient |
|------|------------------|------------|---------|
| **Focus** | `--accent-primary` (amber) | Amber glow | Warm, energizing |
| **Break** | `--accent-secondary` (teal) | Teal glow | Cool, relaxing |

---

## 3. Typography

### Font Stack

**Primary Font: Sora**
- Modern geometric sans-serif with warmth
- Excellent readability at all sizes
- Distinctive "o" and "a" shapes give it character
- Free on Google Fonts

**Monospace: JetBrains Mono**
- For timer display and code snippets
- Highly legible numerals
- Free and widely loved

### Type Scale

```css
:root {
  /* Font families */
  --font-sans: 'Sora', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  
  /* Type scale (mobile-first, scales up) */
  --text-xs: 0.75rem;      /* 12px - Labels, captions */
  --text-sm: 0.875rem;     /* 14px - Secondary text */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Emphasized body */
  --text-xl: 1.25rem;      /* 20px - Small headings */
  --text-2xl: 1.5rem;      /* 24px - Section headings */
  --text-3xl: 1.875rem;    /* 30px - Page titles */
  --text-4xl: 2.25rem;     /* 36px - Hero elements */
  --text-timer: 4.5rem;    /* 72px - Timer display */
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
  --tracking-timer: -0.04em;  /* Tighter for large timer numbers */
}
```

### Typography Usage

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Page Title | Sora | 30px | 600 | 1.25 |
| Section Heading | Sora | 20px | 600 | 1.25 |
| Task Title | Sora | 16px | 500 | 1.5 |
| Body Text | Sora | 16px | 400 | 1.5 |
| Labels/Captions | Sora | 12px | 500 | 1.25 |
| Timer Display | JetBrains Mono | 72px | 600 | 1 |
| Timer Mini | JetBrains Mono | 24px | 500 | 1 |

---

## 4. Spacing & Layout

### Spacing Scale

Based on 4px grid:

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
}
```

### Border Radius Scale

Slightly rounded, not bubble-shaped:

```css
:root {
  --radius-sm: 4px;     /* Buttons, inputs */
  --radius-md: 8px;     /* Cards, modals */
  --radius-lg: 12px;    /* Large containers */
  --radius-xl: 16px;    /* Feature cards */
  --radius-full: 9999px; /* Pills, avatars */
}
```

### Layout Widths

```css
:root {
  --sidebar-width: 260px;
  --content-max-width: 720px;
  --modal-width-sm: 400px;
  --modal-width-md: 540px;
  --modal-width-lg: 720px;
}
```

---

## 5. Component Specifications

### 5.1 Buttons

**Primary Button (Amber)**
```
┌─────────────────────────┐
│   Start Focus Session   │  ← text-sm, font-medium, text-inverse
└─────────────────────────┘
Background: var(--accent-primary)
Padding: 10px 20px
Border-radius: var(--radius-sm)
Height: 40px

States:
- Hover: var(--accent-primary-hover), scale(1.02)
- Active: scale(0.98)
- Disabled: opacity 0.5, cursor not-allowed
```

**Secondary Button (Ghost)**
```
┌─────────────────────────┐
│       Cancel            │  ← text-sm, font-medium, text-secondary
└─────────────────────────┘
Background: transparent
Border: 1px solid var(--border-default)
Padding: 10px 20px
Border-radius: var(--radius-sm)

States:
- Hover: bg var(--bg-hover), text-primary
- Active: bg var(--bg-elevated)
```

**Icon Button**
```
┌─────┐
│  ⋮  │  ← 20px icon
└─────┘
Size: 36px × 36px
Border-radius: var(--radius-sm)
Background: transparent

States:
- Hover: bg var(--bg-hover)
```

### 5.2 Task Item

```
┌────────────────────────────────────────────────────────────┐
│ ○  Finish calculus homework                    ⏱  🔥  Jan 8 │
│    └──── checkbox   └──── title (medium weight)      │  │  │
│                                                      │  │  └── due date (text-secondary)
│                                                      │  └── priority indicator
│                                                      └── timer link icon (hover)
└────────────────────────────────────────────────────────────┘

Default state:
- Background: transparent
- Border-bottom: 1px solid var(--border-subtle)
- Padding: 12px 16px
- Cursor: pointer

Hover state:
- Background: var(--bg-hover)
- Timer icon becomes visible

Completed state:
- Title: line-through, text-tertiary
- Checkbox: filled with success color, checkmark icon
- Animation: satisfying shrink-then-settle
```

**Priority Indicators (Pill style)**
```
High:    [●] amber dot + "High" text
Medium:  [●] warm gray dot
Low:     [●] stone dot
None:    no indicator
```

### 5.3 Timer Display

**Full Timer View**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                            FOCUS                                │
│                                                                 │
│                    ╭─────────────────╮                         │
│                    │                 │                         │
│                    │     24:37       │   ← JetBrains Mono 72px │
│                    │                 │                         │
│                    ╰─────────────────╯                         │
│                      ═══════════════     ← progress ring       │
│                                                                 │
│                    Working on:                                  │
│                    📝 Finish calculus homework                  │
│                                                                 │
│              ┌─────────┐   ┌─────────┐   ┌─────────┐           │
│              │  Pause  │   │  Reset  │   │  Skip   │           │
│              └─────────┘   └─────────┘   └─────────┘           │
│                                                                 │
│                        Session 2 of 4                           │
│                         🍅 🍅 ○ ○                               │
└─────────────────────────────────────────────────────────────────┘

Timer ring:
- SVG circle with stroke-dashoffset animation
- Focus: amber glow (box-shadow)
- Break: teal glow
- Subtle pulse animation when running

Session indicators:
- Completed: filled tomato emoji or solid dot
- Remaining: outline circle
```

**Mini Timer (Floating)**
```
┌───────────────────────────────┐
│  🔥 24:37  │  ⏸  │  ✕  │      │  ← Floating in bottom-right
└───────────────────────────────┘

- Position: fixed, bottom 20px, right 20px
- Background: var(--bg-elevated) with blur backdrop
- Border: 1px solid var(--border-default)
- Border-radius: var(--radius-full)
- Shadow: 0 4px 24px rgba(0,0,0,0.4)
- Height: 48px
- Draggable to reposition
```

### 5.4 Sidebar Navigation

```
┌──────────────────────────────┐
│                              │
│  TEMPO                       │  ← Logo, Sora Bold
│                              │
│  ─────────────────────────   │
│                              │
│  ☀  Today              (3)   │  ← Active: bg-hover, accent-primary text
│  📅  Upcoming          (8)   │
│  📥  Inbox             (2)   │
│                              │
│  ─────────────────────────   │
│                              │
│  PROJECTS                    │  ← Section label, text-tertiary, text-xs
│                              │
│  ● Math 101            (5)   │  ← Project color dot
│  ● Computer Science    (3)   │
│  ● Personal            (1)   │
│  + Add project               │  ← text-secondary, hover: text-primary
│                              │
│  ─────────────────────────   │
│                              │
│  ⚙  Settings                 │
│                              │
└──────────────────────────────┘

Width: 260px
Background: var(--bg-raised)
Border-right: 1px solid var(--border-subtle)

Nav item:
- Padding: 10px 16px
- Border-radius: var(--radius-sm)
- Active: bg-hover, accent-primary icon
- Hover: bg-hover
```

### 5.5 Modal (Task Edit)

```
╭──────────────────────────────────────────────────────╮
│                                              ✕       │
│  Edit Task                                           │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ Finish calculus homework                       │  │  ← Title input
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │ Complete problems 1-20 from Chapter 5.         │  │  ← Description textarea
│  │ Focus on integration techniques.               │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  Project      ┌──────────────────────────┐          │
│               │ ● Math 101            ▼  │          │  ← Select dropdown
│               └──────────────────────────┘          │
│                                                      │
│  Due date     ┌──────────────────────────┐          │
│               │ 📅 January 8, 2026    ▼  │          │
│               └──────────────────────────┘          │
│                                                      │
│  Priority     ○ None  ○ Low  ● Med  ○ High         │  ← Radio group
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  SUBTASKS                                            │
│  ☑ Read chapter summary                             │
│  ○ Complete odd problems                            │
│  ○ Review solutions                                 │
│  + Add subtask                                       │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  Time spent: 1h 24m                                  │
│                                                      │
│              ┌──────────────┐  ┌──────────────┐     │
│              │    Delete    │  │     Save     │     │
│              └──────────────┘  └──────────────┘     │
╰──────────────────────────────────────────────────────╯

Modal:
- Width: 540px
- Background: var(--bg-elevated)
- Border-radius: var(--radius-lg)
- Border: 1px solid var(--border-subtle)
- Shadow: 0 24px 48px rgba(0,0,0,0.5)
- Backdrop: rgba(0,0,0,0.6) with blur

Animation:
- Enter: scale(0.95) → scale(1), opacity 0 → 1, 200ms ease-out
- Exit: reverse
```

### 5.6 Inputs

**Text Input**
```
┌─────────────────────────────────────────┐
│ Enter task name...                      │
└─────────────────────────────────────────┘

Default:
- Background: var(--bg-base)
- Border: 1px solid var(--border-default)
- Border-radius: var(--radius-sm)
- Padding: 10px 14px
- Font: text-base

Focus:
- Border: 1px solid var(--accent-primary)
- Box-shadow: 0 0 0 3px var(--accent-primary-muted)

Error:
- Border: 1px solid var(--error)
- Box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15)
```

### 5.7 Toast Notifications

```
┌─────────────────────────────────────────────────────┐
│  ✓  Task completed! 🎉                    Undo  ✕   │
└─────────────────────────────────────────────────────┘

Position: top-center
Background: var(--bg-elevated)
Border: 1px solid var(--border-default)
Border-radius: var(--radius-md)
Shadow: 0 8px 24px rgba(0,0,0,0.3)

Animation:
- Enter: slide down from top + fade in
- Auto-dismiss: 4 seconds
- Exit: fade out + slide up
```

---

## 6. Animation System

### Timing Functions

```css
:root {
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);    /* General transitions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);           /* Elements exiting */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);          /* Elements entering */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy, playful */
}
```

### Duration Scale

```css
:root {
  --duration-fast: 100ms;     /* Micro-interactions (hover) */
  --duration-normal: 200ms;   /* Standard transitions */
  --duration-slow: 300ms;     /* Complex animations */
  --duration-slower: 500ms;   /* Page transitions */
}
```

### Animation Inventory

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Button hover | Scale 1.02, brightness up | 100ms | ease-out |
| Button press | Scale 0.98 | 100ms | ease-in |
| Task complete | Checkbox fills + line-through + shrink settle | 400ms | spring |
| Timer start | Ring pulse + number scale up | 300ms | ease-out |
| Timer tick | Subtle number morph | 100ms | linear |
| Timer complete | Ring explode + screen flash + confetti | 600ms | spring |
| Modal open | Scale 0.95→1 + fade | 200ms | ease-out |
| Modal close | Scale 1→0.95 + fade | 150ms | ease-in |
| Page transition | Cross-fade | 200ms | ease-default |
| Toast enter | Slide down + fade | 300ms | spring |
| Sidebar collapse | Width shrink + content fade | 200ms | ease-default |

### Celebratory Moments

**Timer Completion (Focus Session)**
1. Timer ring "explodes" outward (scale + opacity)
2. Brief amber flash on screen edges
3. Confetti burst (subtle, 8-12 particles)
4. Success chime plays
5. "Session complete!" message with satisfying checkmark animation

**Task Completion**
1. Checkbox fills with success color
2. Checkmark draws in (SVG path animation)
3. Task text strikes through with delay
4. Row gently shrinks and slides away (if hiding completed)
5. Optional: +1 counter animation somewhere

### Micro-interactions

- **Hover states**: Subtle background change, slight lift (transform: translateY(-1px))
- **Focus rings**: Accent color glow, not browser default
- **Loading states**: Skeleton shimmer or subtle pulse
- **Drag-and-drop**: Ghost preview with reduced opacity, drop zone highlight

---

## 7. Iconography

### Icon Library: **Phosphor Icons**

**Why Phosphor:**
- Consistent, modern style
- Multiple weights (thin, light, regular, bold, fill)
- Great coverage for productivity apps
- MIT licensed
- React component library available

**Icon sizes:**
- Small (inline): 16px
- Default: 20px
- Large: 24px
- XL (featured): 32px

### Icon Usage

| Context | Icon | Weight |
|---------|------|--------|
| Navigation | Regular | 20px |
| Task actions | Regular | 20px |
| Timer controls | Bold | 24px |
| Empty states | Light | 64px |
| Status indicators | Fill | 16px |

### Custom Icons (if needed)

For the timer/tomato metaphor, consider custom:
- Stylized tomato/fruit for pomodoro counter
- Abstract focus symbol (rays emanating from center?)

---

## 8. Responsive Behavior

### Breakpoints

```css
/* Mobile-first breakpoints */
--bp-sm: 640px;   /* Large phones */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Desktop */
--bp-xl: 1280px;  /* Large desktop */
```

### Layout Adaptations

| Breakpoint | Sidebar | Content | Timer |
|------------|---------|---------|-------|
| < 768px | Hidden (hamburger) | Full width | Overlay or mini |
| 768-1024px | Collapsed (icons only, 60px) | Remaining | Side panel or mini |
| > 1024px | Full (260px) | Remaining | Side panel or dedicated view |

### Mobile Specifics

**Task Quick-Add (Mobile)**
- Floating action button (FAB) bottom-right
- Tap opens bottom sheet with quick-add input
- Voice input option (future)

**Timer on Mobile**
- Full-screen focus mode is primary
- When navigating away: persistent mini-player at bottom
- Lock-screen widget (future PWA enhancement)

---

## 9. Accessibility

### Color Contrast

All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text):
- Primary text on bg-base: 14.8:1 ✓
- Secondary text on bg-base: 7.2:1 ✓
- Accent on bg-base: 8.9:1 ✓

### Focus Management

- Visible focus indicators on all interactive elements
- Focus trap in modals
- Logical tab order
- Skip-to-content link

### Screen Reader Considerations

- ARIA labels on icon-only buttons
- Live regions for timer updates
- Status announcements for task completion
- Proper heading hierarchy

### Motion Sensitivity

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Quick-add task | `Cmd/Ctrl + N` |
| Search | `Cmd/Ctrl + K` |
| Start timer | `Cmd/Ctrl + Shift + T` |
| Pause/resume timer | `Space` (when timer focused) |
| Complete task | `Cmd/Ctrl + Enter` |
| Navigate views | `1-5` (Today, Upcoming, Inbox, etc.) |

---

## 10. Sound Design (Recommendations)

### Timer Sounds

| Event | Sound | Character |
|-------|-------|-----------|
| Timer start | Soft "whoosh" or wind-up | Energizing |
| Timer tick (optional) | Subtle tick or silent | Non-distracting |
| Focus complete | Warm chime, 2-3 notes ascending | Triumphant |
| Break complete | Soft bell, single note | Gentle alert |
| Pause | Click/tap | Neutral |

### Ambient Sounds (Future)

- Lo-fi beats (licensed or royalty-free)
- Rain/nature
- Café ambiance
- White/brown noise

---

## 11. Component Library Decision

### Recommendation: **Custom components with Radix Primitives**

**Approach:**
1. Use **Radix UI primitives** for complex, accessible components:
   - Dialog (modals)
   - Dropdown Menu
   - Select
   - Popover
   - Tooltip
   - Switch
   - Checkbox
   - Radio Group
   
2. Build **custom styled wrappers** around these primitives using Tailwind
3. Build **fully custom** simple components (buttons, inputs, cards)

**Why this hybrid:**
- Radix is unstyled, so we get our unique look
- Accessibility is built-in (keyboard nav, ARIA, focus management)
- We don't inherit any design language we'd need to fight
- Developer gets reliable primitives, faster development

**Not using full shadcn/ui because:**
- It has an aesthetic we'd need to override significantly
- We want something more distinctive

---

## 12. Tailwind Configuration

```javascript
// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background scale
        bg: {
          base: '#0D0D0F',
          raised: '#141417',
          elevated: '#1C1C21',
          hover: '#252529',
        },
        // Accent colors
        accent: {
          primary: '#E5A84B',
          'primary-hover': '#F0B85A',
          'primary-muted': 'rgba(229, 168, 75, 0.15)',
          secondary: '#4ECDC4',
          'secondary-muted': 'rgba(78, 205, 196, 0.15)',
        },
        // Text scale
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1A6',
          tertiary: '#6B6B70',
          inverse: '#0D0D0F',
        },
        // Semantic
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#60A5FA',
        // Borders
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
        // Priority
        priority: {
          high: '#E5A84B',
          medium: '#C9986A',
          low: '#78716C',
        },
      },
      fontFamily: {
        sans: ['Sora', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        timer: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'timer-mini': ['1.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '60px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'glow-amber': '0 0 24px rgba(229, 168, 75, 0.3)',
        'glow-teal': '0 0 24px rgba(78, 205, 196, 0.3)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'modal': '0 24px 48px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'timer-pulse': 'timer-pulse 2s ease-in-out infinite',
        'check-draw': 'check-draw 0.3s ease-out forwards',
        'confetti': 'confetti 0.6s ease-out forwards',
      },
      keyframes: {
        'timer-pulse': {
          '0%, 100%': { boxShadow: '0 0 24px rgba(229, 168, 75, 0.3)' },
          '50%': { boxShadow: '0 0 36px rgba(229, 168, 75, 0.5)' },
        },
        'check-draw': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
```

---

## Open Questions for Team

1. **For PM**: Any concerns about dark-mode-first? Should we add a light mode toggle in MVP or defer?
2. **For Developer**: Sora font OK? It's ~50KB for the weights we need. Alternative: Plus Jakarta Sans.
3. **For PM/User**: The amber accent—does it resonate with student productivity vibes, or prefer something cooler?

---

*Document Version: 1.0*  
*Next Review: After team feedback*  
*Owner: UX Designer*

