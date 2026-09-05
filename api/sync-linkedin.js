// Structured LinkedIn Sync Endpoint / Webhook Ingestor
// Path: /api/sync-linkedin

const fs = require('fs');
const path = require('path');
const cache = require('./lib/cache');

const DATA_FILE = path.join(__dirname, '..', 'data', 'linkedin-activity.json');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Sync-Secret');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // GET: Return current synchronized LinkedIn records & status
  if (req.method === 'GET') {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const items = JSON.parse(raw);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        return res.end(JSON.stringify({
          status: 'ok',
          count: items.length,
          lastSync: new Date().toISOString(),
          items
        }, null, 2));
      }
      res.statusCode = 200;
      return res.end(JSON.stringify({ status: 'ok', count: 0, items: [] }));
    } catch (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ status: 'error', message: err.message }));
    }
  }

  // POST: Ingest new LinkedIn update or milestone via webhook
  if (req.method === 'POST') {
    const syncSecret = req.headers['x-sync-secret'] || (new URL(req.url, `http://${req.headers.host}`).searchParams.get('secret'));
    const expectedSecret = process.env.SYNC_SECRET || 'sarthak-portfolio-sync-key';

    if (syncSecret !== expectedSecret && process.env.NODE_ENV === 'production') {
      res.statusCode = 401;
      return res.end(JSON.stringify({ status: 'unauthorized', message: 'Invalid sync secret' }));
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const update = payload.update || payload;

        if (!update.title && !update.description) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ status: 'bad_request', message: 'Missing title or description' }));
        }

        let existing = [];
        if (fs.existsSync(DATA_FILE)) {
          existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        }

        const newItem = {
          id: update.id || `li-${Date.now()}`,
          type: update.type || 'milestone',
          title: update.title,
          description: update.description,
          url: update.url || 'https://www.linkedin.com/in/sarthak-choudhary-455098293/',
          date: update.date || new Date().toISOString(),
          technologies: update.technologies || ['Leadership', 'Engineering'],
          category: update.category || 'milestone',
          metadata: {
            engagement: update.engagement || null,
            source: 'webhook-ingest',
            syncedAt: new Date().toISOString()
          }
        };

        // Prepend to maintain newest first
        existing.unshift(newItem);
        fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), 'utf-8');

        // Invalidate cache
        cache.del('linkedin_activity');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
          status: 'ok',
          message: 'LinkedIn update successfully ingested into timeline',
          item: newItem,
          total: existing.length
        }));
      } catch (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ status: 'error', message: err.message }));
      }
    });
  }
};
