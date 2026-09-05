# Task for Antigravity: Fix live-sync and resume auto-update on portfolio

Repo: https://github.com/sarthak1778/Portfolio.git
Live site: https://sarthak-choudhary.vercel.app/
Stack: vanilla HTML/JS frontend (`index.html`) + Vercel serverless functions (`/api`), single source of truth in `data/profile-data.js`.

## Problem 1 — GitHub/LinkedIn "Live Activity" sections don't reflect real updates

`api/lib/github.js` calls `api.github.com` server-side. If no `GITHUB_TOKEN` env var is set on Vercel, requests are unauthenticated and capped at 60 req/hour, shared across Vercel's IP pool — so it gets rate-limited fast and silently falls back to the hardcoded stale object at the bottom of `fetchGithubActivity()` in that file (dates like "2026-08-30"). This looks like "not auto-updating" but is really a missing/rate-limited credential, not a logic bug.

Do this:
1. Confirm `api/lib/github.js` already supports `process.env.GITHUB_TOKEN` in `getHeaders()` — it does. Do not change the request logic.
2. Add a check: if `GITHUB_TOKEN` is missing, log a clear warning (not just a silent catch) so this is diagnosable in Vercel's function logs going forward.
3. In the README, add a short "Deployment" section documenting that `GITHUB_TOKEN` (a GitHub PAT with public read access, fine-grained, no special scopes needed) must be set in Vercel Project Settings → Environment Variables for live GitHub sync to work reliably. This can't be done by editing code — flag it back to me as a manual step to verify in the Vercel dashboard.
4. Leave the LinkedIn adapter (`api/lib/linkedin.js`) as-is — it correctly reads `data/linkedin-activity.json` as a manually-curated "verified feed" since LinkedIn has no public API for a personal activity feed. Auto-scraping LinkedIn is not an acceptable fix. Just make sure the "Refresh" button and 5-minute polling in `index.html` handle this gracefully (no console errors) when the JSON file hasn't changed.

## Problem 2 — Resume PDF (html2pdf.js export) doesn't reflect current projects/skills

Already fixed in the version below — apply this pattern if working from an older copy of `index.html`:
- The `#resume-sheet` div must NOT contain hand-written static HTML. It should be an empty container: `<div id="resume-sheet" aria-hidden="true"></div>`.
- Add a `renderResumeSheet()` function (called from `renderStaticSections()`, alongside the other `PROFILE_DATA`-driven renders) that builds the resume HTML entirely from `PROFILE_DATA` (`data/profile-data.js`): `personal` (name, contact, `resumeObjective`), `education`, `projects` (filter `featured: true`), `skillsGrouped`, `certifications`, `achievements`.
- Add a `resumeObjective` string field to `PROFILE_DATA.personal` in `data/profile-data.js` (currently missing) so the objective paragraph is also data-driven instead of hardcoded.
- Verify: editing any project/cert/education entry in `profile-data.js` and regenerating the PDF via the "Download ATS Resume (PDF)" button reflects the change with no other file edits needed.

## Acceptance criteria
- [ ] `GITHUB_TOKEN` requirement documented in README; missing-token case logs a clear warning server-side.
- [ ] `#resume-sheet` is generated at runtime from `PROFILE_DATA`, not hardcoded.
- [ ] Adding a test project to `PROFILE_DATA.projects` with `featured: true` shows up both on the live page and in the exported resume PDF after a rebuild, with no manual duplication.
- [ ] No new console errors on page load or on PDF export.
- [ ] Commit with a clear message (e.g. `fix: make resume PDF auto-sync from PROFILE_DATA; document GITHUB_TOKEN requirement for live sync`) and push.

Report back which parts you completed vs. which need my manual action (e.g. setting the Vercel env var, since that requires dashboard access you don't have).
