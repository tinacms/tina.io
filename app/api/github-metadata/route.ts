import type { GitHubCommit } from 'components/PageMetadata/type';
import { NextResponse } from 'next/server';

const CACHE_TTL = 300; // 5 minutes in seconds
export const revalidate = CACHE_TTL;

async function fetchGitHub<T>(
  url: string,
  headers: Record<string, string>,
): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: CACHE_TTL },
  });

  if (
    response.status === 403 &&
    response.headers.get('X-RateLimit-Remaining') === '0'
  ) {
    throw new Error('GitHub API rate limit exceeded');
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const path = searchParams.get('path')?.replace(/\\/g, '/');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo parameters' },
      { status: 400 },
    );
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'TinaCMS-Docs/1.0',
    ...(process.env.GITHUB_STAR_TOKEN && {
      Authorization: `Bearer ${process.env.GITHUB_STAR_TOKEN}`,
    }),
  };

  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const params = new URLSearchParams({ per_page: '1' });
  if (path) {
    params.append('path', path);
  }

  try {
    const [latestCommits, allCommits] = await Promise.all([
      fetchGitHub<GitHubCommit[]>(`${baseUrl}?${params}`, headers),
      path
        ? fetchGitHub<GitHubCommit[]>(
            `${baseUrl}?path=${path}&per_page=100`,
            headers,
          ).catch(() => [])
        : Promise.resolve([]),
    ]);

    if (!latestCommits.length) {
      return NextResponse.json({ error: 'No commits found' }, { status: 404 });
    }

    const latestCommit = latestCommits[0];
    const firstCommit = allCommits.length ? allCommits.at(-1)! : null;

    return NextResponse.json({
      latestCommit,
      firstCommit,
      historyUrl: path
        ? `https://github.com/${owner}/${repo}/commits/main/${path}`
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
