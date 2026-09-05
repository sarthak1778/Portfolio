# Sarthak Choudhary — Engineering Portfolio

High-performance, dynamic portfolio and ATS resume engine for **Sarthak Choudhary** (Electrical & Electronics Engineering | IoT, Embedded Systems & Software).

---

## Features

- **Live Activity Sync**: Real-time integration with GitHub repositories, recent commits, and curated LinkedIn activity feed.
- **Dynamic ATS Resume Export**: Client-side one-click generation of single-column, machine-readable ATS-compliant PDF resumes directly compiled from `PROFILE_DATA` using `html2pdf.js`.
- **System Theme Synchronizer**: Automatically shifts between Dark and Light mode matching OS preferences, with smooth interactive override toggle.
- **Interactive Project & Skills Matrix**: Cross-filtering connecting technical competencies (C++, Arduino, MATLAB, Python, JavaScript) to verified engineering projects.

---

## Deployment & Environment Variables

### Setting up `GITHUB_TOKEN` on Vercel

To ensure reliable live GitHub activity feeds without encountering API rate limits, configure a personal access token in Vercel:

1. Go to your **GitHub Settings** -> **Developer Settings** -> **Personal access tokens** -> **Tokens (classic)** (or Fine-Grained Tokens).
2. Generate a token with read-only permissions (`public_repo` scope or fine-grained read-only access to public repositories).
3. Open your **Vercel Dashboard** -> select your portfolio project.
4. Navigate to **Settings** -> **Environment Variables**.
5. Add a new variable:
   - **Key**: `GITHUB_TOKEN`
   - **Value**: `ghp_yourGeneratedTokenHere...`
   - **Environment**: Select *Production*, *Preview*, and *Development*.
6. Click **Save** and trigger a redeployment.

> **Important Rate Limit Notice:**
> Without `GITHUB_TOKEN`, GitHub API requests run unauthenticated, which enforces a strict limit of 60 requests/hour per Vercel edge IP shared across serverless invocations. Under traffic, unauthenticated calls quickly exhaust this quota and cause GitHub API 403 errors, falling back to static cache data. Supplying `GITHUB_TOKEN` provides 5,000 requests/hour.

### LinkedIn Activity Feed Management

- The LinkedIn activity feed adapter (`api/lib/linkedin.js`) is backed by `data/linkedin-activity.json` as a verified, curated record of posts, certifications, and milestones.
- Due to LinkedIn's official OAuth restrictions and anti-scraping policies, live public scraping is avoided to protect service stability.
- To publish new LinkedIn milestones or posts to the feed, add entries to `data/linkedin-activity.json` and push to your repository (or trigger a redeploy on Vercel).

---

## Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/sarthak1778/Portfolio.git
   cd Portfolio
   ```
2. Install dependencies (optional if running lightweight Node server):
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   node server.js
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Master Data Configuration

All portfolio content, education records, verified certifications, achievements, and project showcases are driven from a single source of truth:
- `data/profile-data.js`: Updating items here immediately reflects across the website UI, the interactive skills cross-filter, and the ATS resume export sheet (`#resume-sheet`).
