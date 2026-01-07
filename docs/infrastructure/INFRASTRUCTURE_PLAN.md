# Tempo Infrastructure Plan

**Author:** DevOps Engineer  
**Date:** January 7, 2026  
**Status:** Proposed  
**Version:** 1.0

---

## Executive Summary

This document outlines the infrastructure recommendations for Tempo MVP. Since MVP is a **static web application with local-only data storage**, the infrastructure requirements are minimal but should be set up correctly to support future growth.

| Area | Recommendation | Rationale |
|------|----------------|-----------|
| Hosting | Cloudflare Pages | Performance, free tier, future Workers support |
| CI/CD | GitHub Actions | Native integration, free for public repos |
| Analytics | Plausible | Privacy-focused, lightweight |
| Error Tracking | Sentry | Industry standard, free tier |
| Uptime | Better Uptime | Generous free tier, clean UI |

---

## 1. Hosting Recommendation

### Decision: **Cloudflare Pages**

### Alternatives Evaluated

| Platform | Pros | Cons |
|----------|------|------|
| **Cloudflare Pages** | Fastest edge network, unlimited bandwidth, Workers integration, great free tier | Newer platform, less community content |
| **Vercel** | Excellent DX, great preview deploys, Next.js native | Bandwidth limits on free tier, vendor lock-in risk |
| **Netlify** | Mature platform, good DX, forms/functions built-in | Build time limits, slower than CF edge |
| **GitHub Pages** | Free, simple, integrated with repo | No preview deploys, limited features, slower |

### Why Cloudflare Pages?

1. **Performance**: Cloudflare's edge network is the largest—200+ cities worldwide. Static assets served from the nearest edge location.

2. **Generous Free Tier**:
   - Unlimited sites
   - Unlimited bandwidth
   - 500 builds/month
   - Preview deployments included

3. **Future-Ready**: When Tempo adds backend features (Phase 3 sync), we can use **Cloudflare Workers** for serverless functions, **D1** for SQLite database, or **KV** for key-value storage—all on the same platform. Zero migration needed.

4. **Developer Experience**:
   - GitHub/GitLab integration with auto-deploys
   - Preview URLs for every PR
   - Instant rollbacks
   - Custom domains with automatic SSL

5. **PWA Support**: Native support for Service Workers when we want to add offline capabilities beyond IndexedDB.

### Setup Steps

```bash
# 1. Connect repo to Cloudflare Pages (via dashboard or CLI)
npx wrangler pages project create tempo

# 2. Configure build settings
#    Framework preset: Vite
#    Build command: npm run build
#    Build output directory: dist
#    Node version: 20.x

# 3. Set environment variables (if any)
#    Currently none needed for MVP

# 4. Configure custom domain when ready
#    tempo.app or similar
```

### Configuration File

```toml
# wrangler.toml (optional, for advanced config)
name = "tempo"
compatibility_date = "2026-01-07"

[site]
bucket = "./dist"

# Future: Add Workers for API routes
# [env.production]
# workers_dev = false
# route = "tempo.app/*"
```

---

## 2. CI/CD Pipeline

### Platform: **GitHub Actions**

GitHub Actions is the natural choice since the codebase lives on GitHub. Free for public repos, generous free tier for private.

### Pipeline Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                         CI/CD PIPELINE                                  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  On Pull Request:                                                       │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐  │
│  │ Install │ → │  Lint   │ → │  Type   │ → │  Test   │ → │ Preview │  │
│  │  deps   │   │         │   │  Check  │   │  (unit) │   │ Deploy  │  │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘  │
│                                                                         │
│  On Merge to main:                                                      │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────────────────────┐ │
│  │ Install │ → │  Build  │ → │  Test   │ → │  Deploy to Production   │ │
│  │  deps   │   │  (prod) │   │  (e2e)  │   │   (Cloudflare Pages)    │ │
│  └─────────┘   └─────────┘   └─────────┘   └─────────────────────────┘ │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Workflow Configuration

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint-and-type-check:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript check
        run: npx tsc --noEmit

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --run --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: github.event_name == 'push'
        with:
          token: ${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7

  # Cloudflare Pages handles deployment automatically via GitHub integration
  # This job is for visibility and can trigger additional post-deploy tasks
  deploy-status:
    name: Deployment Status
    runs-on: ubuntu-latest
    needs: [lint-and-type-check, test, build]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      - name: Deployment triggered
        run: |
          echo "✅ All checks passed!"
          echo "📦 Cloudflare Pages will deploy automatically"
          echo "🔗 Production: https://tempo.pages.dev"
```

### E2E Tests (Optional for MVP)

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  # Run on schedule to catch issues early
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM UTC

jobs:
  e2e:
    name: Playwright Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

### Branch Protection Rules

Configure in GitHub repo settings:

```yaml
# Recommended branch protection for 'main'
required_status_checks:
  strict: true
  contexts:
    - "Lint & Type Check"
    - "Unit Tests"
    - "Build"

required_pull_request_reviews:
  required_approving_review_count: 1
  dismiss_stale_reviews: true

enforce_admins: false  # Allow admins to bypass in emergencies
allow_force_pushes: false
allow_deletions: false
```

---

## 3. Domain Strategy

### Recommendation: Register via Cloudflare Registrar

**Why Cloudflare Registrar?**
- At-cost pricing (no markup)
- Free WHOIS privacy
- Seamless integration with Pages
- Automatic SSL

### Domain Options to Consider

| Domain | Availability | Notes |
|--------|--------------|-------|
| tempo.app | Check | Premium TLD, memorable |
| tempoapp.com | Check | Safe choice |
| usetempo.com | Check | Common pattern |
| gettempo.app | Check | Action-oriented |

### DNS Configuration

```
# Once domain is registered and connected:

# Root domain
tempo.app          CNAME   tempo.pages.dev

# www redirect (handled by Cloudflare page rules)
www.tempo.app      CNAME   tempo.pages.dev
```

### SSL/TLS

Cloudflare provides automatic SSL with:
- Full (strict) mode
- TLS 1.3
- Automatic HTTPS redirects
- HTTP/3 support

No configuration needed—it just works.

---

## 4. Monitoring & Observability

### 4.1 Analytics: **Plausible**

**Why Plausible?**
- Privacy-friendly (GDPR compliant, no cookies)
- Lightweight script (~1KB)
- Clean, focused dashboard
- Aligns with student-focused, ethical product values

**Setup:**

```html
<!-- Add to index.html head -->
<script
  defer
  data-domain="tempo.app"
  src="https://plausible.io/js/script.js"
></script>
```

**Cost:** $9/month for 10K pageviews (or self-host for free)

**Metrics We Care About:**
- Daily/weekly active users
- Feature usage (track timer starts, task completions as custom events)
- Browser/device breakdown
- Referral sources

### 4.2 Error Tracking: **Sentry**

**Why Sentry?**
- Industry standard
- Excellent source map support
- Free tier: 5K errors/month
- Performance monitoring included

**Setup:**

```typescript
// src/lib/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxx@o123.ingest.sentry.io/456",
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance monitoring
  tracesSampleRate: 0.1,  // 10% of transactions
  // Session replay for debugging
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Export for error boundary
export { Sentry };
```

```typescript
// src/main.tsx
import "./lib/sentry";  // Initialize early
import { Sentry } from "./lib/sentry";

// Wrap App with error boundary
<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</Sentry.ErrorBoundary>
```

**Vite Config for Source Maps:**

```typescript
// vite.config.ts
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    sentryVitePlugin({
      org: "tempo",
      project: "tempo-web",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
```

### 4.3 Uptime Monitoring: **Better Uptime**

**Why Better Uptime?**
- Free tier: 10 monitors
- 3-minute check intervals
- Status page included
- Slack/email alerts

**Monitors to Set Up:**
1. `https://tempo.app` - Homepage availability
2. `https://tempo.app/health` - Health endpoint (if we add one)

**Alternative:** UptimeRobot (also good, 5-minute intervals on free tier)

### 4.4 Performance Monitoring

**Lighthouse CI** in GitHub Actions:

```yaml
# Add to ci.yml
lighthouse:
  name: Lighthouse
  runs-on: ubuntu-latest
  needs: build
  steps:
    - uses: actions/checkout@v4

    - name: Download build
      uses: actions/download-artifact@v4
      with:
        name: dist
        path: dist/

    - name: Run Lighthouse
      uses: treosh/lighthouse-ci-action@v10
      with:
        uploadArtifacts: true
        temporaryPublicStorage: true
        configPath: ./lighthouserc.json
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

---

## 5. Security

### 5.1 HTTP Security Headers

Configure in Cloudflare or via `_headers` file:

```
# public/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' https://plausible.io; connect-src 'self' https://*.sentry.io https://plausible.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; frame-ancestors 'none'
```

### 5.2 Dependency Security

```yaml
# .github/workflows/security.yml
name: Security

on:
  schedule:
    - cron: '0 8 * * 1'  # Weekly on Mondays
  push:
    branches: [main]

jobs:
  audit:
    name: Dependency Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Audit dependencies
        run: npm audit --audit-level=high

  codeql:
    name: CodeQL Analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript

      - name: Autobuild
        uses: github/codeql-action/autobuild@v3

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

---

## 6. Cost Estimation

### MVP Phase (Current)

| Service | Tier | Cost/Month |
|---------|------|------------|
| Cloudflare Pages | Free | $0 |
| GitHub Actions | Free (2,000 mins) | $0 |
| Sentry | Free (5K errors) | $0 |
| Plausible | Starter | $9 |
| Better Uptime | Free | $0 |
| Domain | .app | ~$14/year |

**Total: ~$10/month**

### Growth Phase (Future with Backend)

| Service | Tier | Cost/Month |
|---------|------|------------|
| Cloudflare Workers | Paid | $5+ |
| Cloudflare D1 | Paid | $5+ |
| Sentry | Team | $26+ |
| Plausible | Growth | $19+ |

**Estimated: ~$60-100/month** (scales with usage)

---

## 7. Future Considerations

### When Adding Backend (Phase 3 Sync)

The current setup is designed to scale without major changes:

1. **API Layer**: Add Cloudflare Workers functions alongside Pages
2. **Database**: Use Cloudflare D1 (SQLite at edge) or connect to external PostgreSQL
3. **Auth**: Integrate Clerk, Auth0, or Cloudflare Access
4. **Payments**: Stripe (works anywhere)

```
Current:
┌────────────┐
│  Browser   │ ←→ Cloudflare Pages (static)
└────────────┘

Future:
┌────────────┐     ┌─────────────────────────────────────┐
│  Browser   │ ←→  │       Cloudflare Edge               │
└────────────┘     │  ┌─────────┐  ┌─────────────────┐  │
                   │  │  Pages  │  │     Workers     │  │
                   │  │ (static)│  │ (API functions) │  │
                   │  └─────────┘  └────────┬────────┘  │
                   └────────────────────────┼───────────┘
                                            │
                   ┌────────────────────────┼───────────┐
                   │       External          │          │
                   │  ┌─────────┐  ┌────────▼───────┐  │
                   │  │  Stripe │  │   PostgreSQL   │  │
                   │  │   API   │  │   (Neon/Supabase)│ │
                   │  └─────────┘  └────────────────┘  │
                   └────────────────────────────────────┘
```

---

## 8. Action Items

### Immediate (Before MVP Launch)

- [ ] Create Cloudflare account and connect to GitHub repo
- [ ] Set up GitHub Actions workflows
- [ ] Register domain
- [ ] Set up Sentry project
- [ ] Set up Plausible account
- [ ] Configure branch protection rules
- [ ] Add security headers

### Before Launch

- [ ] Set up Better Uptime monitoring
- [ ] Configure Lighthouse CI
- [ ] Run security audit
- [ ] Document deployment process in README

### Post-MVP

- [ ] Set up Dependabot for dependency updates
- [ ] Add bundle size monitoring
- [ ] Create incident response runbook
- [ ] Evaluate need for CDN asset caching (already provided by Cloudflare)

---

## 9. Runbooks

### Rollback Procedure

Cloudflare Pages keeps deployment history. To rollback:

1. Go to Cloudflare Dashboard → Pages → tempo
2. Click "Deployments" tab
3. Find the last working deployment
4. Click "..." → "Rollback to this deployment"

**Time to rollback: < 30 seconds**

### Incident Response

1. **Detection**: Better Uptime alerts → Slack/Email
2. **Triage**: Check Sentry for errors, Cloudflare analytics for traffic
3. **Response**:
   - If deployment issue → Rollback
   - If Cloudflare issue → Check status.cloudflare.com
   - If code issue → Fix and redeploy
4. **Communication**: Update status page if user-facing
5. **Post-mortem**: Document in `/docs/incidents/`

---

## Open Questions

1. **For PM**: Domain name preference? Budget for domain?
2. **For Developer**: Any CI/CD preferences or past experience with these tools?
3. **For All**: Do we need a status page from day one?

---

*Document Version: 1.0*  
*Next Review: After initial setup complete*

