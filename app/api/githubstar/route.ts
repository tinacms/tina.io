import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Missing owner or repo' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          // Token
          Authorization: `Bearer ${process.env.GITHUB_STAR_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ stars: data.stargazers_count });
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch star count' },
      { status: 500 },
    );
  }
}
