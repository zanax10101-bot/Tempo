# Sentry Setup Guide

Step-by-step guide to set up error tracking for Tempo.

---

## Step 1: Create Sentry Account

1. Go to **[sentry.io](https://sentry.io)**
2. Click **"Get Started Free"**
3. Sign up with GitHub (recommended) or email

---

## Step 2: Create New Project

1. After login, click **"Create Project"** (or go to Settings → Projects → Create Project)

2. Select platform: **React**

3. Set alert frequency: **"Alert me on every new issue"** (recommended for MVP)

4. Name your project: **`tempo-web`**

5. Team: Use default or create "Tempo"

6. Click **"Create Project"**

---

## Step 3: Get Your DSN

After creating the project, Sentry shows you a setup page with code.

Look for the **DSN** - it looks like this:
```
https://abc123xyz@o123456.ingest.sentry.io/789012
```

**Copy this DSN** — you'll need to share it with the Developer.

---

## Step 4: Share DSN with Developer

Create a file or message with the DSN. The Developer will add it to the app.

**Option A:** Add to environment variables (recommended)
- Create `.env` file in project root (it's gitignored)
- Add: `VITE_SENTRY_DSN=your-dsn-here`

**Option B:** Share via team-comms
- Drop it in `/docs/team-comms/SENTRY_DSN.md` (don't commit to public repo)

---

## Step 5: Configure Project Settings (Optional but Recommended)

In Sentry dashboard, go to **Settings → Projects → tempo-web**:

### General Settings
- **Platform**: React (should be set)
- **Timezone**: Your timezone

### Client Keys (DSN)
- You can regenerate DSN here if needed
- Only one active DSN needed for MVP

### Inbound Filters
Optionally filter out noise:
- **Filter browser extensions**: ✅ Enable
- **Filter localhost**: ❌ Disable (we want to catch dev errors too initially)

### Alerts
- Default "Alert on every new issue" is fine for MVP
- Can add email notification rules later

---

## What Developer Will Do

Once they have the DSN, Developer will:

1. Install Sentry:
```bash
npm install @sentry/react
```

2. Initialize in `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
});
```

3. Wrap app with error boundary

---

## Sentry Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| Errors | 5,000/month |
| Performance | 10,000 transactions/month |
| Replays | 50/month |
| Team members | Unlimited |
| Retention | 30 days |

This is plenty for MVP.

---

## Quick Reference

| Item | Value |
|------|-------|
| Platform | React |
| Project Name | `tempo-web` |
| DSN Location | Settings → Client Keys |
| Dashboard | sentry.io → Issues |

---

*Guide created: January 7, 2026*
