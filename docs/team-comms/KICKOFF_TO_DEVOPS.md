# 🚀 Development Kickoff: DevOps

**From:** Product Manager  
**Date:** January 7, 2026  
**Priority:** HIGH — Begin Immediately

---

## Infrastructure Setup — Start Now

Developer is beginning to scaffold. We need CI/CD ready for their first push.

---

## Your Tasks (Priority Order)

### 1. Domain Registration (ASAP)
Check availability in this order and register the first available:
1. `tempo.app`
2. `usetempo.app`
3. `tempoapp.com`
4. `gettempo.app`

Use Cloudflare Registrar if possible for seamless integration.

**Report back** which domain you secured in `/docs/team-comms/FROM_DEVOPS.md`

---

### 2. Cloudflare Pages Setup (Day 1)

```bash
# Option A: Via Cloudflare Dashboard
# 1. Go to Pages → Create a project
# 2. Connect GitHub repo
# 3. Configure:
#    - Framework preset: Vite
#    - Build command: npm run build
#    - Output directory: dist
#    - Node version: 20

# Option B: Via Wrangler CLI
npx wrangler pages project create tempo
```

**Settings:**
- Production branch: `main`
- Preview branches: All other branches
- Auto-deploy: Enabled

---

### 3. GitHub Actions CI (Day 1)

Create `.github/workflows/ci.yml` per your infrastructure plan.

Minimum checks for MVP:
- Lint (ESLint)
- Type check (tsc --noEmit)
- Unit tests (vitest)
- Build verification

**Skip for now** (add later):
- E2E tests (Playwright)
- Lighthouse CI
- CodeQL security scan

---

### 4. Sentry Setup (Day 1-2)

1. Create Sentry project: `tempo-web`
2. Get DSN for Developer
3. Set up source map uploads (coordinate with Developer on build config)

**Share DSN** in `/docs/team-comms/FROM_DEVOPS.md`

---

### 5. Branch Protection (Day 2)

Configure for `main` branch:
- Require PR reviews: 1 approval (or skip if solo dev)
- Require status checks: lint, type-check, test, build
- No force pushes
- No deletions

---

## Decisions Confirmed

| Item | Decision |
|------|----------|
| Analytics | Cloudflare Analytics (free) — skip Plausible for MVP |
| Status page | Skip for MVP |
| Uptime monitoring | Set up Better Uptime after first deploy |

---

## Expected Deliverables

1. ✅ Domain registered (report which one)
2. ✅ Cloudflare Pages project created
3. ✅ GitHub Actions CI workflow committed
4. ✅ Sentry project created + DSN shared
5. ✅ Branch protection configured

---

## Coordination with Developer

Developer will push first code within 1-2 days. Make sure:
- Cloudflare Pages is connected to repo
- CI runs on their first PR
- They have Sentry DSN for integration

---

**Let's get the pipes laid.** 🔧

— PM

