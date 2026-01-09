# GitHub Branch Protection Setup Guide

Step-by-step guide to protect the `main` branch.

---

## Why Branch Protection?

- Prevents accidental pushes directly to `main`
- Ensures all code passes CI checks before merging
- Requires code review (optional for solo dev)
- Creates audit trail of all changes

---

## Step 1: Navigate to Branch Settings

1. Go to your GitHub repository: `github.com/YOUR_USERNAME/Tempo`

2. Click **Settings** (tab at the top, needs repo admin access)

3. In left sidebar, click **Branches** (under "Code and automation")

---

## Step 2: Add Branch Protection Rule

1. Click **"Add branch protection rule"** (or "Add rule")

2. In **"Branch name pattern"**, enter: `main`

---

## Step 3: Configure Protection Settings

Check the following options:

### ✅ Require a pull request before merging

This prevents direct pushes to main.

- **Require approvals**: 
  - For solo dev: Set to `0` (or leave unchecked)
  - For team: Set to `1`
  
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
  - Re-review needed if code changes after approval

- ❌ **Require review from Code Owners** (skip for MVP)

### ✅ Require status checks to pass before merging

This ensures CI passes before merge.

1. Check **"Require status checks to pass before merging"**

2. Check **"Require branches to be up to date before merging"**

3. **Search and add these status checks:**
   - `Lint & Type Check` (or whatever your CI job is named)
   - `Unit Tests`
   - `Build`

   > **Note:** Status checks only appear after they've run at least once. 
   > If you don't see them, push a PR first, let CI run, then come back.

### ❌ Require conversation resolution before merging (optional)

Skip for MVP — nice to have but not essential.

### ❌ Require signed commits (optional)

Skip for MVP — adds complexity.

### ❌ Require linear history (optional)

Skip for MVP — allows merge commits, which is fine.

### ✅ Do not allow bypassing the above settings (recommended)

Even admins must follow the rules.

### ❌ Restrict who can push to matching branches (skip)

Not needed for small team.

### ✅ Block force pushes

Prevents rewriting history on main.

### ✅ Block deletions

Prevents accidental branch deletion.

---

## Step 4: Save

Click **"Create"** (or "Save changes")

---

## Quick Settings Summary

| Setting | Value |
|---------|-------|
| Branch pattern | `main` |
| Require PR | ✅ Yes |
| Required approvals | 0 (solo) or 1 (team) |
| Require status checks | ✅ Yes |
| Required checks | Lint, Tests, Build |
| Up to date before merge | ✅ Yes |
| Block force push | ✅ Yes |
| Block deletion | ✅ Yes |

---

## What Happens After Setup

### When pushing to `main` directly:
```
! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs
```
You'll need to create a PR instead.

### PR workflow:
1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes, commit, push
3. Open PR on GitHub
4. CI runs automatically
5. Once checks pass (green), merge button becomes available
6. Merge PR → deploys to Cloudflare Pages

---

## If Status Checks Don't Appear

Status checks only show up after running once. If the search box is empty:

1. Create a dummy PR (even just a README change)
2. Let GitHub Actions run
3. Close the PR
4. Go back to branch protection settings
5. Now the status checks should appear in the search

---

## Troubleshooting

### "I need to push directly to main for an emergency"

Option 1: Temporarily disable branch protection (Settings → Branches → Edit rule)

Option 2: Create a quick PR, get it reviewed (if required), merge fast

### "CI is failing but I need to merge"

Don't bypass CI. Fix the failing tests/lint. The protection exists for good reasons.

### "I'm the only developer, do I really need this?"

Yes! Protects against:
- Accidental pushes of broken code
- Force-push disasters
- Ensures you don't skip CI "just this once"

---

*Guide created: January 7, 2026*
