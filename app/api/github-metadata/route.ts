import type { GitHubCommit } from 'components/PageMetadata/type';
import { NextResponse } from 'next/server';

// Cache interface
interface CacheEntry {
  data: GitHubCommit[];
  timestamp: number;
}

// In-memory cache with 5-minute TTL
const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper function to check if cache entry is valid
function isCacheValid(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_TTL;
}

// Helper function to clean up expired cache entries
function cleanupCache(): void {
  const keysToDelete: string[] = [];
  cache.forEach((entry, key) => {
    if (!isCacheValid(entry)) {
      keysToDelete.push(key);
    }
  });

  for (let i = 0; i < keysToDelete.length; i++) {
    cache.delete(keysToDelete[i]);
  }
}

// Helper function to get cached data or fetch new data
async function fetchWithCache(
  url: string,
  headers: Record<string, string>,
): Promise<GitHubCommit[]> {
  const cacheKey = url;
  const cachedEntry = cache.get(cacheKey);

  // Return cached data if it's still valid
  if (cachedEntry && isCacheValid(cachedEntry)) {
    console.log('Using cached data for:', url);
    return cachedEntry.data;
  }

  // Clean up expired entries before fetching new data
  cleanupCache();

  // Fetch new data
  console.log('Fetching fresh data for:', url);
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data: GitHubCommit[] = await response.json();

  // Cache the new data
  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });

  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const path = searchParams.get('path');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo parameters' },
      { status: 400 },
    );
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'TinaCMS-Docs/1.0',
    };

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const filePath = path ? path.replace(/\\/g, '/') : null;

    // Build the API URL for latest commit
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
    if (filePath) {
      apiUrl += `?path=${filePath}`;
    }
    apiUrl += filePath ? '&' : '?';
    apiUrl += 'per_page=1';

    // Fetch latest commit
    const commits: GitHubCommit[] = await fetchWithCache(apiUrl, headers);

    if (commits.length === 0) {
      return NextResponse.json({ error: 'No commits found' }, { status: 404 });
    }

    const latestCommit = commits[0];
    let firstCommit: GitHubCommit | null = null;

    // Fetch the first commit (oldest) for creation date if path is provided
    if (filePath) {
      try {
        const allCommitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=100`;
        const allCommits: GitHubCommit[] = await fetchWithCache(
          allCommitsUrl,
          headers,
        );

        if (allCommits.length > 0) {
          // The last commit in the array is the oldest
          firstCommit = allCommits[allCommits.length - 1];
        }
      } catch (err) {
        console.warn('Could not fetch first commit:', err);
      }
    }

    // Return structured data
    return NextResponse.json({
      latestCommit,
      firstCommit,
      historyUrl: filePath
        ? `https://github.com/${owner}/${repo}/commits/main/${filePath}`
        : `https://github.com/${owner}/${repo}/commits/main`,
    });
  } catch (error) {
    console.error('Error fetching GitHub metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub metadata' },
      { status: 500 },
    );
  }
}
