// Structured LinkedIn Sync Endpoint & GitHub API Ingestor
// Path: /api/sync-linkedin
// Supports both automated webhook ingest (Zapier/Make/n8n) and 1-Click Quick-Sync UI

const fs = require('fs');
const path = require('path');
const cache = require('./lib/cache');

const DATA_FILE = path.join(__dirname, '..', 'data', 'linkedin-activity.json');
const GITHUB_REPO = process.env.GITHUB_REPO || 'sarthak1778/Portfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

/**
 * Commit updated file directly to GitHub repository via REST API
 */
async function commitToGitHub(filePath, updatedContent, commitMessage, token) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;
  const headers = {
    'Authorization': `Bearer ${token.trim()}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Sarthak-Portfolio-Sync/2.0'
  };

  // 1. Get current file sha
  const getRes = await fetch(url, { headers });
  if (!getRes.ok) {
    throw new Error(`GitHub get file failed (HTTP ${getRes.status}): ${await getRes.text()}`);
  }
  const fileData = await getRes.json();
  const sha = fileData.sha;

  // 2. Commit updated content
  const base64Content = Buffer.from(updatedContent, 'utf-8').toString('base64');
  const putRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: commitMessage,
      content: base64Content,
      sha,
      branch: GITHUB_BRANCH
    })
  });

  if (!putRes.ok) {
    throw new Error(`GitHub commit failed (HTTP ${putRes.status}): ${await putRes.text()}`);
  }

  return await putRes.json();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Sync-Secret');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // GET: Return current synced records and sync engine diagnostics
  if (req.method === 'GET') {
    try {
      let items = [];
      if (fs.existsSync(DATA_FILE)) {
        items = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.end(JSON.stringify({
        status: 'ok',
        count: items.length,
        githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN),
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH,
        lastSync: items.length > 0 ? items[0].date : new Date().toISOString(),
        items
      }, null, 2));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ status: 'error', message: err.message }));
    }
  }

  // POST: Ingest new LinkedIn update (from Webhook or Quick-Sync UI)
  if (req.method === 'POST') {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const syncSecret = req.headers['x-sync-secret'] || parsedUrl.searchParams.get('secret');
    const expectedSecret = process.env.SYNC_SECRET || 'sarthak-portfolio-sync-key';

    // Verify secret authentication
    if (syncSecret !== expectedSecret && process.env.NODE_ENV === 'production') {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ status: 'unauthorized', message: 'Invalid or missing sync secret' }));
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const update = payload.update || payload;

        const title = (update.title || update.headline || '').trim();
        const description = (update.description || update.text || update.content || '').trim();

        if (!title && !description) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ status: 'bad_request', message: 'Missing title or description' }));
        }

        // Parse technologies / tags
        let technologies = [];
        if (Array.isArray(update.technologies)) {
          technologies = update.technologies;
        } else if (typeof update.technologies === 'string') {
          technologies = update.technologies.split(',').map(s => s.trim()).filter(Boolean);
        } else if (typeof update.tags === 'string') {
          technologies = update.tags.split(',').map(s => s.trim()).filter(Boolean);
        }

        if (technologies.length === 0) {
          technologies = ['LinkedIn', 'Engineering'];
        }

        const nowIso = new Date().toISOString();
        let directUrl = (update.url || '').trim();
        if (!directUrl) {
          if (update.type === 'certification') {
            directUrl = 'https://www.linkedin.com/in/sarthak-choudhary-455098293/details/certifications/';
          } else if (update.type === 'milestone') {
            directUrl = 'https://www.linkedin.com/in/sarthak-choudhary-455098293/details/honors/';
          } else {
            directUrl = 'https://www.linkedin.com/in/sarthak-choudhary-455098293/recent-activity/all/';
          }
        }

        const newItem = {
          id: update.id || `li-${Date.now()}`,
          source: 'linkedin',
          sourceType: 'verified-feed',
          type: update.type || 'post',
          title: title || description.slice(0, 70) + '...',
          description: description || title,
          url: directUrl,
          date: update.date || nowIso,
          timestamp: update.date || nowIso,
          category: update.category || 'achievements',
          technologies,
          metadata: {
            author: 'Sarthak Choudhary',
            handle: '@sarthak-choudhary',
            engagement: update.engagement || (update.reactions ? { reactions: Number(update.reactions), comments: Number(update.comments || 0) } : null),
            source: update.source || 'hybrid-sync',
            syncedAt: nowIso
          }
        };

        // Load existing items
        let existing = [];
        if (fs.existsSync(DATA_FILE)) {
          try {
            existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
          } catch (e) {
            existing = [];
          }
        }

        // Deduplicate (check by exact URL or ID)
        existing = existing.filter(item => {
          if (update.url && item.url && item.url === update.url && item.url !== 'https://www.linkedin.com/in/sarthak-choudhary-455098293/') {
            return false;
          }
          if (item.id === newItem.id) return false;
          return true;
        });

        // Insert at beginning of feed
        existing.unshift(newItem);
        const formattedJson = JSON.stringify(existing, null, 2);

        let githubCommitted = false;
        let commitResult = null;

        // If GITHUB_TOKEN is available, commit directly to GitHub repository
        const token = process.env.GITHUB_TOKEN;
        if (token) {
          try {
            commitResult = await commitToGitHub(
              'data/linkedin-activity.json',
              formattedJson,
              `chore(feed): sync LinkedIn update: "${newItem.title.slice(0, 50)}"`,
              token
            );
            githubCommitted = true;
          } catch (ghErr) {
            console.error('[Sync Error] GitHub API commit failed:', ghErr.message);
          }
        }

        // Also write to local file if available
        try {
          fs.writeFileSync(DATA_FILE, formattedJson, 'utf-8');
        } catch (fileErr) {
          // If in read-only environment, ignore
        }

        // Invalidate in-memory caches
        cache.del('linkedin_activity');
        cache.del('all_activity_feed');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
          status: 'ok',
          message: githubCommitted
            ? 'LinkedIn update committed to GitHub repo; Vercel deployment triggered!'
            : 'LinkedIn update saved locally to data/linkedin-activity.json',
          githubCommitted,
          commitSha: commitResult?.commit?.sha || null,
          item: newItem,
          totalItems: existing.length
        }));
      } catch (err) {
        console.error('[Sync Error] Handler exception:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
  }
};
