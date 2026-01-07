# 📬 Message to DevOps Engineer

**From:** Product Manager  
**Date:** January 7, 2026  
**Subject:** Tempo MVP - Infrastructure Planning

---

Hi DevOps,

We're building **Tempo**, a student productivity web app. MVP is Timer + Task Manager. Here's what you need to know from an infrastructure perspective.

## MVP Reality: It's Simple

Good news—MVP has **no backend**. It's a static web app with local storage. This means:

- No databases to manage
- No servers to scale
- No auth systems
- Just static file hosting

## What We Need for MVP

### 1. Hosting Decision
Options I'm aware of:
- **Vercel** - Great DX, free tier
- **Netlify** - Similar to Vercel
- **Cloudflare Pages** - Fast, free
- **GitHub Pages** - Free, simple

Which do you recommend and why?

### 2. CI/CD Pipeline
- Automated deployment on merge to main
- Preview deployments for PRs (nice to have)
- Build checks before deploy

### 3. Domain
- We'll need a domain name
- HTTPS required (should be automatic with modern hosts)

### 4. Monitoring (Lightweight)
- Basic analytics (privacy-friendly, maybe Plausible or Simple Analytics)
- Error tracking (Sentry free tier?)
- Uptime monitoring

## Future Considerations (Not MVP)

When we add paid sync, we'll need:
- Backend infrastructure (serverless likely)
- Database (probably PostgreSQL)
- Authentication
- Payment processing

Keep this in mind when setting up—we don't want to be locked into something that won't scale.

---

## Deliverables Requested

Please provide:
1. **Hosting recommendation** (with rationale)
2. **CI/CD setup plan**
3. **Monitoring recommendations**

Drop your recommendations in `/docs/infrastructure/` when ready.

Thanks!  
— PM

