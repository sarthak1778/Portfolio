// Unified Activity Normalizer (ActivityNormalizer)
// Combines, ranks, filters, and standardizes activities from GitHubAdapter and LinkedInAdapter.

function normalizeActivities(githubResult, linkedinResult, options = {}) {
  const ghItems = githubResult?.activities || [];
  const liItems = linkedinResult?.activities || [];

  // 1. Combine
  let combined = [...ghItems, ...liItems];

  // 2. Filter if requested
  const filter = (options.filter || 'all').toLowerCase();
  if (filter !== 'all') {
    combined = combined.filter(item => {
      if (filter === 'github') return item.source === 'github';
      if (filter === 'linkedin') return item.source === 'linkedin';
      if (filter === 'projects') {
        return item.type === 'project' || item.type === 'repository' || item.type === 'launch';
      }
      if (filter === 'code') {
        return item.type === 'commit' || item.type === 'pull_request' || item.type === 'release';
      }
      if (filter === 'achievements') {
        return item.type === 'milestone' || item.type === 'announcement' || item.category === 'achievements';
      }
      if (filter === 'posts') {
        return item.source === 'linkedin' || item.type === 'post';
      }
      return true;
    });
  }

  // 3. Chronological sorting with priority tie-breaker
  combined.sort((a, b) => {
    const timeA = new Date(a.date || a.timestamp).getTime();
    const timeB = new Date(b.date || b.timestamp).getTime();
    const diff = timeB - timeA;
    // If within 12 hours of each other, prioritize higher weight
    if (Math.abs(diff) < 12 * 3600 * 1000 && (b.priority || 50) !== (a.priority || 50)) {
      return (b.priority || 50) - (a.priority || 50);
    }
    return diff;
  });

  const limit = options.limit || 20;
  const limitedActivities = combined.slice(0, limit);

  // 4. Extract "Latest Update" (Most recent meaningful LinkedIn post)
  const liSorted = [...liItems].sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
  const latestLinkedInUpdate = liSorted[0] || null;

  // 5. Extract "Latest Build" (Most recent meaningful GitHub commit/push)
  const ghCommits = ghItems
    .filter(item => item.type === 'commit' || item.type === 'repository')
    .sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
  const latestGithubBuild = ghCommits[0] || null;

  // 6. Latest activity ticker message
  let tickerText = 'Synchronized with public activity';
  let tickerTimestamp = null;
  let tickerSource = 'github';
  let tickerTitle = 'Activity Update';
  let tickerDescription = 'Synchronized with public activity';

  if (combined.length > 0) {
    const top = combined[0];
    tickerTimestamp = top.date || top.timestamp;
    tickerSource = top.source;
    const platform = top.source === 'linkedin' ? 'LinkedIn' : 'GitHub';
    tickerTitle = top.title || `${platform} Update`;
    tickerDescription = top.description || top.title || 'Recent update synchronized.';
    tickerText = `${platform}: ${tickerTitle}`;
  }

  return {
    activities: limitedActivities,
    totalCount: combined.length,
    latestLinkedInUpdate,
    latestGithubBuild,
    ticker: {
      text: tickerText,
      title: tickerTitle,
      description: tickerDescription,
      timestamp: tickerTimestamp,
      source: tickerSource
    }
  };
}

module.exports = {
  normalizeActivities
};
