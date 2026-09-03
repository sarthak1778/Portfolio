// GitHub API Integration & Activity Normalizer
// Handles data retrieval, caching, rate limiting, and intelligent event summarization

const cache = require('./cache');

const GH_USERNAME = 'sarthak1778';
const CACHE_TTL_SECONDS = 300; // 5 minutes

function getHeaders() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Sarthak-Portfolio-Engine'
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

// Convert raw GitHub event into a clean, human-readable activity item
function summarizeEvent(event) {
  const repoName = event.repo ? event.repo.name.replace(`${GH_USERNAME}/`, '') : 'Repository';
  const repoUrl = event.repo ? `https://github.com/${event.repo.name}` : `https://github.com/${GH_USERNAME}`;
  const timestamp = event.created_at;

  let title = `Activity in ${repoName}`;
  let description = `Contributed to ${repoName}`;
  let type = 'update';
  let category = 'github';

  switch (event.type) {
    case 'PushEvent': {
      const commitCount = event.payload?.size || event.payload?.commits?.length || 1;
      const branch = (event.payload?.ref || 'main').replace('refs/heads/', '');
      const commits = event.payload?.commits || [];
      const messages = commits.map(c => c.message.trim()).filter(Boolean);

      type = 'commit';
      title = `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}`;
      if (messages.length > 0) {
        description = messages.slice(0, 2).join(' • ');
      } else {
        description = `Committed improvements to branch ${branch} in ${repoName}.`;
      }
      break;
    }
    case 'CreateEvent': {
      const refType = event.payload?.ref_type || 'repository';
      const refName = event.payload?.ref;
      if (refType === 'repository') {
        type = 'create-repo';
        title = `Created repository "${repoName}"`;
        description = event.payload?.description || `Initialized a new public repository: ${repoName}.`;
      } else {
        type = 'create-branch';
        title = `Created ${refType} "${refName || 'feature'}" in ${repoName}`;
        description = `Branched for new development in ${repoName}.`;
      }
      break;
    }
    case 'WatchEvent': {
      type = 'star';
      title = `Starred ${repoName}`;
      description = `Marked ${repoName} as a tracked project on GitHub.`;
      break;
    }
    case 'ForkEvent': {
      type = 'fork';
      title = `Forked ${repoName}`;
      description = `Created personal fork for technical exploration.`;
      break;
    }
    case 'PullRequestEvent': {
      const action = event.payload?.action || 'updated';
      const prNumber = event.payload?.pull_request?.number;
      type = 'pull-request';
      title = `PR #${prNumber || ''} ${action} in ${repoName}`;
      description = event.payload?.pull_request?.title || `Pull request activity in ${repoName}.`;
      break;
    }
    case 'IssuesEvent': {
      const action = event.payload?.action || 'updated';
      type = 'issue';
      title = `Issue ${action} in ${repoName}`;
      description = event.payload?.issue?.title || `Issue tracking in ${repoName}.`;
      break;
    }
    case 'ReleaseEvent': {
      type = 'release';
      title = `Published release in ${repoName}`;
      description = event.payload?.release?.name || `Tagged release version for ${repoName}.`;
      break;
    }
    default: {
      type = 'activity';
      title = `Updated ${repoName}`;
      description = `Public activity registered on GitHub.`;
    }
  }

  return {
    id: `gh-${event.id}`,
    source: 'github',
    sourceType: 'official-api',
    type,
    category,
    title,
    description,
    timestamp,
    url: repoUrl,
    repoName,
    technologies: []
  };
}

// Compute 12-week activity distribution matrix from recent events/pushes
function buildActivityMatrix(events, repos) {
  const now = new Date();
  const weeks = [];
  const dayCounts = {};

  // Count events per YYYY-MM-DD
  events.forEach(e => {
    if (e.created_at) {
      const day = e.created_at.slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  });

  // Also factor in repo pushed_at dates
  repos.forEach(r => {
    if (r.pushed_at) {
      const day = r.pushed_at.slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  });

  // Generate past 12 weeks (84 days)
  for (let w = 11; w >= 0; w--) {
    const days = [];
    for (let d = 6; d >= 0; d--) {
      const target = new Date(now.getTime() - (w * 7 + d) * 86400000);
      const key = target.toISOString().slice(0, 10);
      const count = dayCounts[key] || 0;
      let level = 0;
      if (count >= 4) level = 4;
      else if (count >= 2) level = 3;
      else if (count >= 1) level = 2;
      else level = 0;

      days.push({
        date: key,
        count,
        level
      });
    }
    weeks.push({ weekIndex: 11 - w, days });
  }

  return weeks;
}

// Determine the project currently being built from the most recent active repo
function extractCurrentlyBuilding(repos) {
  if (!Array.isArray(repos) || repos.length === 0) return null;

  // Filter out forks, sort by pushed_at descending
  const candidates = repos
    .filter(r => !r.fork && r.name.toLowerCase() !== GH_USERNAME.toLowerCase())
    .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at));

  const active = candidates[0] || repos[0];
  if (!active) return null;

  const lastActivityDate = new Date(active.pushed_at || active.updated_at);
  const diffDays = Math.floor((Date.now() - lastActivityDate.getTime()) / 86400000);

  let status = 'IN DEVELOPMENT';
  if (diffDays <= 7) {
    status = 'ACTIVE';
  } else if (diffDays <= 30) {
    status = 'RECENTLY UPDATED';
  }

  return {
    name: active.name,
    description: active.description || 'Active software repository under development.',
    language: active.language || 'Code',
    topics: active.topics || [],
    stars: active.stargazers_count || 0,
    forks: active.forks_count || 0,
    url: active.html_url,
    pushedAt: active.pushed_at || active.updated_at,
    status,
    daysAgo: diffDays
  };
}

async function fetchGithubData() {
  const cached = cache.get('github_data');
  if (cached) return cached;

  try {
    const headers = getHeaders();

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GH_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
      fetch(`https://api.github.com/users/${GH_USERNAME}/events/public?per_page=30`, { headers })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API returned user=${userRes.status}, repos=${reposRes.status}`);
    }

    const user = await userRes.json();
    const repos = await reposRes.json();
    const rawEvents = eventsRes.ok ? await eventsRes.json() : [];

    // Calculate total stars
    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;

    // Calculate languages
    const langCount = {};
    if (Array.isArray(repos)) {
      repos.forEach(r => {
        if (r.language) {
          langCount[r.language] = (langCount[r.language] || 0) + 1;
        }
      });
    }
    const topLanguages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));

    // Map events
    const activities = Array.isArray(rawEvents)
      ? rawEvents.slice(0, 15).map(summarizeEvent)
      : [];

    // Currently building
    const currentlyBuilding = extractCurrentlyBuilding(repos);

    // Contribution Matrix
    const activityMatrix = buildActivityMatrix(Array.isArray(rawEvents) ? rawEvents : [], Array.isArray(repos) ? repos : []);

    // Recent repos for cards
    const recentRepos = Array.isArray(repos)
      ? repos
          .filter(r => !r.fork)
          .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
          .slice(0, 6)
          .map(r => ({
            name: r.name,
            description: r.description || 'Public engineering repository.',
            language: r.language,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            updatedAt: r.pushed_at || r.updated_at,
            url: r.html_url
          }))
      : [];

    const result = {
      status: 'ok',
      user: {
        login: user.login,
        name: user.name || 'Sarthak Choudhary',
        bio: user.bio,
        avatarUrl: user.avatar_url,
        publicRepos: user.public_repos || repos.length || 9,
        followers: user.followers || 0,
        following: user.following || 0,
        createdAt: user.created_at,
        stars: totalStars
      },
      topLanguages,
      recentRepos,
      activities,
      currentlyBuilding,
      activityMatrix,
      fetchedAt: new Date().toISOString()
    };

    cache.set('github_data', result, CACHE_TTL_SECONDS);
    return result;

  } catch (err) {
    console.error('GitHub API fetch error:', err.message);

    // Return structured graceful fallback if offline or rate limited
    return {
      status: 'fallback',
      error: err.message,
      user: {
        login: GH_USERNAME,
        name: 'Sarthak Choudhary',
        bio: 'Electrical & Electronics Engineering undergraduate building IoT, embedded systems, and AI tools.',
        avatarUrl: 'https://avatars.githubusercontent.com/u/87663705?v=4',
        publicRepos: 9,
        followers: 0,
        createdAt: '2021-07-19T16:20:27Z',
        stars: 0
      },
      topLanguages: [
        { name: 'TypeScript', count: 3 },
        { name: 'Python', count: 2 },
        { name: 'HTML', count: 1 }
      ],
      recentRepos: [
        {
          name: 'Colourselector',
          description: 'Color selection and visualization utility',
          language: 'TypeScript',
          stars: 0,
          forks: 0,
          updatedAt: '2026-08-30T18:29:27Z',
          url: 'https://github.com/sarthak1778/Colourselector'
        },
        {
          name: 'DocMind-AI',
          description: 'Transform documents into actionable intelligence using LLMs.',
          language: 'Python',
          stars: 0,
          forks: 0,
          updatedAt: '2026-08-07T17:45:30Z',
          url: 'https://github.com/sarthak1778/DocMind-AI'
        },
        {
          name: 'Portfolio',
          description: 'Personal engineer portfolio and living telemetry profile.',
          language: 'HTML',
          stars: 0,
          forks: 0,
          updatedAt: '2026-08-17T18:24:09Z',
          url: 'https://github.com/sarthak1778/Portfolio'
        }
      ],
      activities: [
        {
          id: 'gh-fallback-1',
          source: 'github',
          sourceType: 'cached',
          type: 'commit',
          category: 'github',
          title: 'Pushed updates to Colourselector',
          description: 'Updated color palette tools and reactive state.',
          timestamp: '2026-08-30T18:29:28Z',
          url: 'https://github.com/sarthak1778/Colourselector',
          repoName: 'Colourselector'
        },
        {
          id: 'gh-fallback-2',
          source: 'github',
          sourceType: 'cached',
          type: 'commit',
          category: 'github',
          title: 'Pushed commits to DocMind-AI',
          description: 'Document intelligence pipeline optimizations and prompt structuring.',
          timestamp: '2026-08-07T17:45:30Z',
          url: 'https://github.com/sarthak1778/DocMind-AI',
          repoName: 'DocMind-AI'
        }
      ],
      currentlyBuilding: {
        name: 'Colourselector',
        description: 'Color selection and reactive visual tool.',
        language: 'TypeScript',
        topics: [],
        stars: 0,
        forks: 0,
        url: 'https://github.com/sarthak1778/Colourselector',
        pushedAt: '2026-08-30T18:29:28Z',
        status: 'ACTIVE',
        daysAgo: 4
      },
      activityMatrix: [],
      fetchedAt: new Date().toISOString()
    };
  }
}

module.exports = {
  fetchGithubData,
  summarizeEvent,
  GH_USERNAME
};
