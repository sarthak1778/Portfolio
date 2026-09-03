// Unified Live Activity API Route (/api/activity)
// Handles data acquisition via GitHubAdapter & LinkedInAdapter,
// processes normalization via ActivityNormalizer, synchronizes certifications, and supports on-demand refresh.

const { GitHubAdapter } = require('./lib/github');
const { LinkedInAdapter } = require('./lib/linkedin');
const { normalizeActivities } = require('./lib/normalizer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const limit = parseInt(url.searchParams.get('limit') || '25', 10);
    const filter = url.searchParams.get('filter') || 'all';
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    // Parallel fetch from modular adapters: GitHub, LinkedIn activity, and LinkedIn certifications
    const [githubResult, linkedinResult, certsResult] = await Promise.all([
      GitHubAdapter.fetchActivity(forceRefresh),
      LinkedInAdapter.fetchActivity(forceRefresh),
      LinkedInAdapter.fetchCertifications(forceRefresh)
    ]);

    // Data normalization & ranking
    const normalized = normalizeActivities(githubResult, linkedinResult, { limit, filter });

    const payload = {
      status: 'ok',
      generatedAt: new Date().toISOString(),
      latestActivity: normalized.ticker,
      latestLinkedInUpdate: normalized.latestLinkedInUpdate,
      latestGithubBuild: normalized.latestGithubBuild,
      currentlyBuilding: githubResult.currentlyBuilding || null,
      certifications: certsResult.certifications || [],
      sources: {
        github: githubResult.status === 'ok' ? 'ok' : 'fallback',
        githubSourceType: githubResult.sourceType,
        linkedin: linkedinResult.status === 'ok' ? 'ok' : 'fallback',
        linkedinSourceType: linkedinResult.sourceType,
        linkedinProfileUrl: LinkedInAdapter.getProfileUrl(),
        linkedinHandle: LinkedInAdapter.getHandle(),
        certificationsSource: certsResult.sourceType
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
        activityMatrix: githubResult.activityMatrix || []
      },
      activities: normalized.activities,
      totalCount: normalized.totalCount
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
