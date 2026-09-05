# Sarthak Choudhary — Engineering Portfolio

High-performance, dynamic portfolio and ATS resume engine for **Sarthak Choudhary** (Electrical & Electronics Engineering | IoT, Embedded Systems & Software).

---

## Features

- **Live Activity Sync**: Real-time integration with GitHub repositories, recent commits, and curated LinkedIn activity feed.
- **Dynamic ATS Resume Export**: Client-side one-click generation of single-column, machine-readable ATS-compliant PDF resumes directly compiled from `PROFILE_DATA` using `html2pdf.js`.
- **System Theme Synchronizer**: Automatically shifts between Dark and Light mode matching OS preferences, with smooth interactive override toggle.
- **Interactive Project & Skills Matrix**: Cross-filtering connecting technical competencies (C++, Arduino, MATLAB, Python, JavaScript) to verified engineering projects.

---

## Deployment

### Setting up `GITHUB_TOKEN` on Vercel

To fix GitHub live sync from falling back to static cache due to 403 rate limits on Vercel:

1. Create a GitHub fine-grained Personal Access Token with read-only public-repo access (or Classic token with `public_repo` scope):
   - Go to **GitHub Settings** → **Developer Settings** → **Personal Access Tokens** → **Fine-grained tokens** (or **Tokens (classic)**).
   - Generate token with read-only public repository permissions.
2. Add it as `GITHUB_TOKEN` in **Vercel Project Settings** → **Environment Variables**:
   - **Key**: `GITHUB_TOKEN`
   - **Value**: `ghp_yourTokenHere...`
   - **Environment**: *Production*, *Preview*, and *Development*.
3. Click **Save** and trigger a **Redeploy** on Vercel.

> **Why this is required:**
> Without `GITHUB_TOKEN`, requests to `api.github.com` run unauthenticated and are capped at 60 req/hour per IP. Vercel's shared serverless IP pool exhausts that quickly, causing `403` rate limits and forcing fallback to cached data. Setting `GITHUB_TOKEN` grants 5,000 req/hour for uninterrupted live synchronization.

### Hybrid LinkedIn Synchronization Engine

The portfolio includes a built-in **Hybrid Synchronization Engine** (`/sync` and `/api/sync-linkedin`) that automatically persists updates to your GitHub repository and triggers Vercel deployments:

1. **1-Click Quick Sync & Bookmarklet (`/sync`)**:
   - Access `https://your-portfolio.vercel.app/sync` (protected by `SYNC_SECRET`).
   - Drag the `⚡ Sync to Portfolio` bookmarklet to your bookmarks bar.
   - When on any LinkedIn post or credential, click the bookmarklet to pre-fill the form, then click **"Sync to Live Portfolio & GitHub"**.
   - The endpoint uses `GITHUB_TOKEN` to commit the new update directly to `data/linkedin-activity.json` in your repository via the GitHub Contents API.
   - Vercel automatically detects the commit and redeploys your updated portfolio in ~30 seconds!

2. **Automated Webhook (Zapier / Make.com / n8n)**:
   - Configure a webhook trigger whenever you post on LinkedIn:
     - **Endpoint**: `https://your-portfolio.vercel.app/api/sync-linkedin`
     - **Method**: `POST`
     - **Headers**:
       - `Content-Type: application/json`
       - `x-sync-secret: <SYNC_SECRET>`
     - **Body**:
       ```json
       {
         "title": "Post Title or Headline",
         "description": "Post description or reflection",
         "url": "https://www.linkedin.com/posts/...",
         "type": "post",
         "technologies": ["IoT", "Embedded Systems"]
       }
       ```

3. **Environment Variables for Sync**:
   - `GITHUB_TOKEN`: Personal Access Token with repo write access to commit new items.
   - `SYNC_SECRET`: Secret passphrase for authenticating webhooks and quick-sync requests (defaults to `sarthak-portfolio-sync-key`).

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

---

## Deployment & Live Sync Configuration

To ensure live GitHub telemetry and activity sync without rate-limiting on Vercel's serverless edge:

1. **Create a GitHub Personal Access Token**:
   - Go to GitHub **Settings** → **Developer settings** → **Personal access tokens** → **Fine-grained tokens** (or Tokens classic).
   - Generate a token with read-only access to **Public Repositories** (or `public_repo` scope).
2. **Configure Vercel Environment Variables**:
   - Go to your portfolio project on the [Vercel Dashboard](https://vercel.com).
   - Navigate to **Project Settings** → **Environment Variables**.
   - Add:
     - **Key**: `GITHUB_TOKEN`
     - **Value**: `<your-github-personal-access-token>`
     - **Environments**: Production, Preview, and Development.
3. **Redeploy**:
   - Trigger a redeployment in Vercel (or push a commit to `main`).
   - The `/api/github` and `/api/activity` endpoints will now authenticate directly with GitHub's API (5,000 req/hr rate limit), resolving any 403 fallbacks.

