# 🚀 Development Kickoff: Developer

**From:** Product Manager  
**Date:** January 7, 2026  
**Priority:** HIGH — Begin Immediately

---

## You Are Unblocked — Start Building

All dependencies are resolved. Architecture is approved. Designs are ready. Let's go.

---

## Your First Sprint: Foundation (Days 1-4)

### Day 1-2: Project Scaffold
```bash
# Create the project
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install zustand dexie dexie-react-hooks date-fns clsx framer-motion

# Install Radix primitives
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-popover \
  @radix-ui/react-tooltip @radix-ui/react-switch

# Install dev dependencies  
npm install -D tailwindcss postcss autoprefixer @types/node
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Initialize Tailwind
npx tailwindcss init -p
```

### Day 2-3: Configure Design System
- Copy Tailwind config from `/docs/design/DESIGN_SYSTEM.md` (Section 12)
- Set up CSS variables for theme switching
- Add Sora and JetBrains Mono fonts
- Create base component shells (Button, Input, Modal)

### Day 3-4: Data Layer
- Implement Dexie schema from `/docs/architecture/DATA_SCHEMA.md`
- Create repository pattern for Tasks, Projects, TimerSessions
- Set up Zustand stores with persistence middleware
- Test data persistence (create → refresh → verify)

---

## Project Structure to Follow

From Architect's spec (`/docs/architecture/PROJECT_STRUCTURE.md`):

```
src/
├── components/          # Shared UI components
│   ├── ui/             # Primitives (Button, Input, Modal)
│   └── layout/         # Layout components (Sidebar, Header)
├── features/           # Feature modules
│   ├── tasks/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── types.ts
│   ├── timer/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── stores/
│   │   └── types.ts
│   └── projects/
├── db/                 # Dexie database
│   ├── index.ts       # DB instance
│   ├── schema.ts      # Type definitions
│   └── repositories/  # Data access layer
├── hooks/             # Shared hooks
├── lib/               # Utilities
├── pages/             # Route components
└── styles/            # Global styles
```

---

## Key Design Tokens (For Quick Reference)

```css
/* Colors */
--bg-base: #0D0D0F
--bg-raised: #141417
--accent-primary: #E5A84B (amber - focus)
--accent-secondary: #4ECDC4 (teal - break)
--text-primary: #F5F5F7

/* Fonts */
font-sans: 'Sora'
font-mono: 'JetBrains Mono'

/* Timer display */
font-size: 4.5rem (72px)
letter-spacing: -0.04em
```

---

## Questions Answered (From Your Earlier Message)

| Your Question | My Decision |
|---------------|-------------|
| P2 features in MVP? | NO — Focus on P0/P1 only |
| Notification timing? | Prompt on first timer start |
| Data import? | YES — Include JSON import |

---

## Resources

- **Architecture**: `/docs/architecture/`
- **Design System**: `/docs/design/DESIGN_SYSTEM.md`
- **Wireframes**: `/docs/design/WIREFRAMES.md`
- **Data Schema**: `/docs/architecture/DATA_SCHEMA.md`

---

## Communication

- **Blocked?** Message me immediately in `/docs/team-comms/`
- **Design questions?** Check with UX Designer
- **Architecture questions?** Check with Architect
- **Daily updates**: Drop progress in `/docs/team-comms/FROM_DEVELOPER_DAILY.md`

---

## Definition of Done (Foundation Phase)

- [ ] Project runs with `npm run dev`
- [ ] Tailwind configured with Tempo design tokens
- [ ] Fonts loading correctly (Sora, JetBrains Mono)
- [ ] Dexie database initialized with schema
- [ ] Can create/read a task via console/test
- [ ] Basic routing works (/, /timer, /settings)
- [ ] ESLint + Prettier configured
- [ ] First deployment to Cloudflare Pages works

---

**You've got this. Build something beautiful.** 🍅

— PM

