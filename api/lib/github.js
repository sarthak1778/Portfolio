// GitHub Integration Adapter (GitHubAdapter)
// Fetches profile metadata, repositories, and public events from official GitHub REST API v3.
// Normalizes activity into the unified portfolio activity schema.

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
function summarizeEvent(event, repoLookup = {}) {
  const repoFullName = event.repo ? event.repo.name : `${GH_USERNAME}/portfolio`;
  const repoName = repoFullName.replace(`${GH_USERNAME}/`, '');
  const repoMeta = repoLookup[repoName] || {};
  const repoUrl = event.repo ? `https://github.com/${event.repo.name}` : `https://github.com/${GH_USERNAME}`;
  const timestamp = event.created_at;

  const tech = [];
  if (repoMeta.language) tech.push(repoMeta.language);
  if (Array.isArray(repoMeta.topics)) tech.push(...repoMeta.topics.slice(0, 3));

  let title = `Updated ${repoName}`;
  let description = `Contributed code to ${repoName}.`;
  let type = 'commit';
  let priority = 60;

  switch (event.type) {
    case 'PushEvent': {
      const commitCount = event.payload?.size || event.payload?.commits?.length || 1;
      const branch = (event.payload?.ref || 'main').replace('refs/heads/', '');
      const commits = event.payload?.commits || [];
      const messages = commits.map(c => c.message.trim()).filter(Boolean);

      type = 'commit';
      priority = 65;
      title = `Updated ${repoName}`;
      if (messages.length > 0) {
        description = messages.slice(0, 2).join(' • ');
      } else {
        description = `Committed improvements to ${branch} branch in ${repoName}.`;
      }
      break;
    }
    case 'CreateEvent': {
      const refType = event.payload?.ref_type || 'repository';
      const refName = event.payload?.ref;
      if (refType === 'repository') {
        type = 'repository';
        priority = 80;
        title = `Created repository "${repoName}"`;
        description = event.payload?.description || `Initialized new public repository: ${repoName}.`;
      } else {
        type = 'commit';
        priority = 50;
        title = `Created ${refType} "${refName || 'main'}" in ${repoName}`;
        description = `Initialized branch for active development in ${repoName}.`;
      }
      break;
    }
    case 'WatchEvent': {
      type = 'star';
      priority = 40;
      title = `Starred ${repoName}`;
      description = `Marked ${repoName} as a tracked project on GitHub.`;
      break;
    }
    case 'ForkEvent': {
      type = 'fork';
      priority = 45;
      title = `Forked ${repoName}`;
      description = `Created personal fork for technical exploration.`;
      break;
    }
    case 'PullRequestEvent': {
      const action = event.payload?.action || 'updated';
      const prNumber = event.payload?.pull_request?.number;
      type = 'pull_request';
      priority = 75;
      title = `PR #${prNumber || ''} ${action} in ${repoName}`;
      description = event.payload?.pull_request?.title || `Pull request activity in ${repoName}.`;
      break;
    }
    case 'IssuesEvent': {
      const action = event.payload?.action || 'updated';
      type = 'issue';
      priority = 55;
      title = `Issue ${action} in ${repoName}`;
      description = event.payload?.issue?.title || `Issue tracking in ${repoName}.`;
      break;
    }
    case 'ReleaseEvent': {
      type = 'release';
      priority = 85;
      title = `Published release in ${repoName}`;
      description = event.payload?.release?.name || `Tagged release version for ${repoName}.`;
      break;
    }
    default: {
      type = 'commit';
      priority = 50;
      title = `Updated ${repoName}`;
      description = `Public activity registered on GitHub.`;
    }
  }

  return {
    source: 'github',
    sourceType: 'official-api',
    id: `gh-${event.id}`,
    type,
    priority,
    title,
    description,
    url: repoUrl,
    date: timestamp,
    timestamp,
    image: null,
    technologies: tech,
    metadata: {
      repo: repoName,
      branch: event.payload?.ref ? event.payload.ref.replace('refs/heads/', '') : 'main',
      commitsCount: event.payload?.commits?.length || 1
    }
  };
}

// Compute 12-week activity distribution matrix from recent events/pushes
function buildActivityMatrix(events, repos) {
  const now = new Date();
  const weeks = [];
  const dayCounts = {};

  events.forEach(e => {
    if (e.created_at) {
      const day = e.created_at.slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  });

  repos.forEach(r => {
    if (r.pushed_at) {
      const day = r.pushed_at.slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    }
  });

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

      days.push({ date: key, count, level });
    }
    weeks.push({ weekIndex: 11 - w, days });
  }

  return weeks;
}

// Determine the project currently being built from the most recent active repo
function extractCurrentlyBuilding(repos) {
  if (!Array.isArray(repos) || repos.length === 0) return null;

  const candidates = repos
    .filter(r => !r.fork && r.name.toLowerCase() !== GH_USERNAME.toLowerCase())
    .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at));

  const active = candidates[0] || repos[0];
  if (!active) return null;

  const lastActivityDate = new Date(active.pushed_at || active.updated_at);
  const diffDays = Math.floor((Date.now() - lastActivityDate.getTime()) / 86400000);

  let status = 'IN DEVELOPMENT';
  if (diffDays <= 7) status = 'ACTIVE';
  else if (diffDays <= 30) status = 'RECENTLY UPDATED';

  return {
    name: active.name,
    description: active.description || 'Active software repository under development.',
    language: active.language || 'Code',
    technologies: [active.language].filter(Boolean).concat(active.topics || []),
    topics: active.topics || [],
    stars: active.stargazers_count || 0,
    forks: active.forks_count || 0,
    url: active.html_url,
    pushedAt: active.pushed_at || active.updated_at,
    date: active.pushed_at || active.updated_at,
    status,
    daysAgo: diffDays
  };
}

async function fetchGithubActivity(forceRefresh = false) {
  if (!forceRefresh) {
    const cached = cache.get('github_activity');
    if (cached) return cached;
  }

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

    // Create repo lookup for metadata & technologies
    const repoLookup = {};
    if (Array.isArray(repos)) {
      repos.forEach(r => { repoLookup[r.name] = r; });
    }

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;

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

    // Map events using repoLookup for rich tech tags
    const activities = Array.isArray(rawEvents)
      ? rawEvents.slice(0, 15).map(e => summarizeEvent(e, repoLookup))
      : [];

    const currentlyBuilding = extractCurrentlyBuilding(repos);
    const activityMatrix = buildActivityMatrix(Array.isArray(rawEvents) ? rawEvents : [], Array.isArray(repos) ? repos : []);

    const result = {
      status: 'ok',
      sourceType: 'official-api',
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
      activities,
      currentlyBuilding,
      activityMatrix,
      fetchedAt: new Date().toISOString()
    };

    cache.set('github_activity', result, CACHE_TTL_SECONDS);
    return result;

  } catch (err) {
    console.error('GitHubAdapter: fetch error:', err.message);

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
      activities: [
        {
          source: 'github',
          sourceType: 'cached-fallback',
          id: 'gh-fallback-1',
          type: 'commit',
          priority: 60,
          title: 'Updated Colourselector',
          description: 'Updated color palette tools and reactive state.',
          url: 'https://github.com/sarthak1778/Colourselector',
          date: '2026-08-30T18:29:28Z',
          timestamp: '2026-08-30T18:29:28Z',
          technologies: ['TypeScript'],
          metadata: { repo: 'Colourselector' }
        },
        {
          source: 'github',
          sourceType: 'cached-fallback',
          id: 'gh-fallback-2',
          type: 'commit',
          priority: 65,
          title: 'Updated DocMind-AI',
          description: 'Document intelligence pipeline optimizations and prompt structuring.',
          url: 'https://github.com/sarthak1778/DocMind-AI',
          date: '2026-08-07T17:45:30Z',
          timestamp: '2026-08-07T17:45:30Z',
          technologies: ['Python', 'LLM'],
          metadata: { repo: 'DocMind-AI' }
        }
      ],
      currentlyBuilding: {
        name: 'Colourselector',
        description: 'Color selection and reactive visual tool.',
        language: 'TypeScript',
        technologies: ['TypeScript'],
        topics: [],
        stars: 0,
        forks: 0,
        url: 'https://github.com/sarthak1778/Colourselector',
        pushedAt: '2026-08-30T18:29:28Z',
        date: '2026-08-30T18:29:28Z',
        status: 'ACTIVE',
        daysAgo: 4
      },
      activityMatrix: [],
      fetchedAt: new Date().toISOString()
    };
  }
}

const GitHubAdapter = {
  fetchActivity: fetchGithubActivity,
  getUsername: () => GH_USERNAME
};

module.exports = {
  GitHubAdapter,
  fetchGithubData: fetchGithubActivity,
  GH_USERNAME
};
