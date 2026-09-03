// Unified Activity & Telemetry API Handler
// Path: /api/activity
// Deployed as a Vercel Serverless Function

const { fetchGithubData } = require('./lib/github');
const { fetchLinkedInData } = require('./lib/linkedin');

module.exports = async function handler(req, res) {
  // CORS & Cache-Control headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const filter = url.searchParams.get('filter') || 'all';

    // Parallel fetch from data layers
    const [githubResult, linkedinResult] = await Promise.all([
      fetchGithubData(),
      fetchLinkedInData()
    ]);

    // Merge activities
    const ghActivities = githubResult.activities || [];
    const liActivities = linkedinResult.activities || [];

    let combined = [...ghActivities, ...liActivities];

    // Filter if requested via query param
    if (filter !== 'all') {
      combined = combined.filter(item => {
        if (filter === 'github') return item.source === 'github';
        if (filter === 'linkedin') return item.source === 'linkedin';
        if (filter === 'projects') return item.type === 'project' || item.type === 'launch' || item.type === 'create-repo';
        if (filter === 'achievements') return item.type === 'milestone' || item.type === 'announcement';
        return true;
      });
    }

    // Sort chronologically descending
    combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Limit items
    const limitedActivities = combined.slice(0, limit);

    // Compute latest activity ticker
    let latestActivityText = 'Synchronized with public profiles';
    let latestActivityTimestamp = null;

    if (combined.length > 0) {
      const top = combined[0];
      latestActivityTimestamp = top.timestamp;
      const platform = top.source === 'linkedin' ? 'LinkedIn' : 'GitHub';
      latestActivityText = `${platform}: ${top.title}`;
    }

    const payload = {
      status: 'ok',
      generatedAt: new Date().toISOString(),
      latestActivity: {
        text: latestActivityText,
        timestamp: latestActivityTimestamp,
        source: combined[0]?.source || 'github'
      },
      sources: {
        github: githubResult.status === 'ok' ? 'ok' : 'fallback',
        githubSourceType: githubResult.status === 'ok' ? 'official-api' : 'fallback-cache',
        linkedin: linkedinResult.status === 'ok' ? 'ok' : 'fallback',
        linkedinSourceType: linkedinResult.sourceType
      },
      githubTelemetry: {
        username: githubResult.user?.login || 'sarthak1778',
        name: githubResult.user?.name || 'Sarthak Choudhary',
        avatarUrl: githubResult.user?.avatarUrl,
        repositories: githubResult.user?.publicRepos || 0,
        followers: githubResult.user?.followers || 0,
        stars: githubResult.user?.stars || 0,
        githubSince: githubResult.user?.createdAt,
        topLanguages: githubResult.topLanguages || [],
        recentRepos: githubResult.recentRepos || [],
        activityMatrix: githubResult.activityMatrix || []
      },
      currentlyBuilding: githubResult.currentlyBuilding || null,
      activities: limitedActivities,
      totalActivities: combined.length
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(payload, null, 2));

  } catch (err) {
    console.error('API Error in /api/activity:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      message: 'Failed to synchronize live activity. The rest of the portfolio remains operational.',
      error: err.message,
      generatedAt: new Date().toISOString()
    }));
  }
};
