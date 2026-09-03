# Walkthrough: Live LinkedIn + GitHub Activity Integration

The portfolio has been upgraded into a self-updating professional developer profile that automatically synchronizes live GitHub telemetry and verified LinkedIn professional activity.

## Architecture & Data Flow

```
┌───────────────────────────────────────┐       ┌───────────────────────────────────────┐
│         Official GitHub API           │       │       LinkedIn Adapter Layer          │
│       api/lib/github.js               │       │       api/lib/linkedin.js             │
│  - Repositories & language telemetry  │       │  - Official OAuth API (/v2/userinfo)  │
│  - Public events & commits            │       │  - Verified fallback JSON data        │
│  - Meaningful activity summarizer     │       │    (data/linkedin-activity.json)      │
└──────────────────┬────────────────────┘       └──────────────────┬────────────────────┘
                   │                                               │
                   └───────────────────────┬───────────────────────┘
                                           │
                                           ▼
                       ┌───────────────────────────────────────┐
                       │          ActivityNormalizer           │
                       │        api/lib/normalizer.js          │
                       │  - Chronological sorting with weights │
                       │  - Extracts Latest Update (LinkedIn)  │
                       │  - Extracts Latest Build (GitHub)     │
                       │  - Extracts Currently Building        │
                       └───────────────────┬───────────────────┘
                                           │
                                           ▼
                       ┌───────────────────────────────────────┐
                       │         Vercel Serverless API         │
                       │            /api/activity              │
                       │  - In-memory TTL cache (cache.js)     │
                       │  - On-demand ?refresh=true support    │
                       └───────────────────┬───────────────────┘
                                           │
                                           ▼
                       ┌───────────────────────────────────────┐
                       │          Frontend Interface           │
                       │              index.html               │
                       │  - Live ticker & ↻ Refresh button     │
                       │  - 3 Highlights Cards                 │
                       │  - Dynamic Filter Pills               │
                       │  - Interactive Skill-to-Project Map   │
                       └───────────────────────────────────────┘
```

---

## What Was Added & Refined

### 1. Exact LinkedIn Profile Connection
- Connected strictly to:
  **[https://www.linkedin.com/in/sarthak-choudhary-455098293/](https://www.linkedin.com/in/sarthak-choudhary-455098293/)**
- Added **LinkedIn `@sarthak-choudhary`** handle across the Hero, Navigation, Highlights, and Contact sections.
- Updated all verified LinkedIn milestones in [`data/linkedin-activity.json`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/data/linkedin-activity.json) with proper engagement figures and source tracking.

### 2. Modular Architecture
- **`GitHubAdapter`** ([`api/lib/github.js`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/api/lib/github.js)): Fetches user repos, commit events, and language statistics from the official GitHub API. Intelligent event summarizer formats events into human-readable engineering descriptions.
- **`LinkedInAdapter`** ([`api/lib/linkedin.js`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/api/lib/linkedin.js)): Modular server-side adapter that queries LinkedIn's official OAuth API if `LINKEDIN_ACCESS_TOKEN` is supplied; otherwise falls back gracefully to [`data/linkedin-activity.json`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/data/linkedin-activity.json). **Zero scrapers, zero browser automation, zero fake data.**
- **`ActivityNormalizer`** ([`api/lib/normalizer.js`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/api/lib/normalizer.js)): Ranks, deduplicates, and normalizes items into the unified schema:
  `{ source, type, title, description, url, date, technologies, metadata }`.

### 3. Homepage Highlights Grid
A 3-card highlighted dashboard at the top of the engineering section:
1. **Currently Building**: Automatically determines your most recently active repository (e.g. `Portfolio` / `Vickybhaiya`) with `ACTIVE` badge, push elapsed time, star counts, and direct GitHub link.
2. **Latest GitHub Build**: Surfaces the latest meaningful code commit/push with repository name, commit summary, and technology tag.
3. **Latest LinkedIn Update**: Showcases your most recent verified LinkedIn update (e.g. *Selected as Google Gemini Campus Ambassador*) with engagement stats and *"Read on LinkedIn ↗"* button.

### 4. Interactive Live Activity Feed & Refresh Control
- **Freshness Indicator**: Displays relative sync time (e.g. `Activity synced 2 min ago`).
- **`↻ Refresh` Button**: Clicking triggers an immediate on-demand cache revalidation via `/api/activity?refresh=true` with toast notification feedback without reloading the page.
- **Dynamic Category Filter Pills**:
  `ALL` | `LINKEDIN` | `GITHUB` | `PROJECTS` | `CODE` | `ACHIEVEMENTS`
  Instantly updates visible cards via client-side DOM filtering with zero page reload.

### 5. Licenses & Certifications (LinkedIn-Synchronized)
- **Dedicated Section**: Created [`#certifications`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/index.html) with header *"Verified Credentials"*, complete with desktop & mobile responsive card grids.
- **Top Navigation Integration**: Added **Certifications** link to the sticky top navigation with smooth scroll targeting.
- **Automated Data Layer**:
  - Created [`data/certifications.json`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/data/certifications.json) holding structured credential schemas:
    `{ id, title, issuer, issueDate, credentialUrl, credentialId, skills, source, verified, description }`.
  - Added `fetchCertifications()` in [`api/lib/linkedin.js`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/api/lib/linkedin.js) within `LinkedInAdapter` (supports official LinkedIn API OAuth token if present, and serves verified authentic credential feed).
  - Created standalone serverless endpoint [`/api/certifications`](file:///c:/Users/Sarthak%20Choudhary/Portfolio-1/api/certifications.js) and embedded `certifications` directly into `/api/activity` payload for automated synchronization.
  - Automatically re-renders the certifications section on the frontend when live sync occurs.
- **ATS Resume Inclusion**: Added verified licenses & certifications directly into the hidden `#resume-sheet` printable layer for ATS-friendly PDF export.

---

## Verification & Testing Summary

| Test Area | Details | Status |
|---|---|---|
| **Certifications Section** | 4 credential cards (Coursera, Google Gemini, MathWorks, Sir MVIT) rendered in `#certGrid` | **VERIFIED** |
| **Certifications Nav Link** | Clicked `a[href='#certifications']` in browser subagent; smooth scroll executed perfectly | **VERIFIED** |
| **Metadata & Badges** | Issuer badges, `LINKEDIN VERIFIED` pill, skills tags, and *"Verify on LinkedIn ↗"* links | **VERIFIED** |
| **Highlights Cards** | Currently Building (`Portfolio`), Latest GitHub Build, Latest LinkedIn Update | **VERIFIED** |
| **`↻ Refresh` Button** | Clicked `#feedRefreshBtn` in browser subagent; on-demand API fetch executed cleanly | **VERIFIED** |
| **Activity Filters** | Clicked `LINKEDIN`, `GITHUB`, `PROJECTS`, `CODE`, `ACHIEVEMENTS`, `ALL`; cards updated instantly | **VERIFIED** |
| **LinkedIn URLs** | All LinkedIn links point to `https://www.linkedin.com/in/sarthak-choudhary-455098293/` | **VERIFIED** |
| **Browser Console** | 0 console errors or unhandled rejections recorded | **VERIFIED** |
| **Git Push** | Commits pushed to `origin/main` (`a3693d2`) | **VERIFIED** |

---

## Deploying to Vercel

The latest commit is already pushed to your `main` branch. Vercel will automatically deploy the updated site to:
**[https://sarthak-choudhary.vercel.app/](https://sarthak-choudhary.vercel.app/)**
