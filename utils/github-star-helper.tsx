'use client';

// async middleman for getting stars from github api
export async function getGitHubStarCount(
  owner: string,
  repo: string,
): Promise<number> {
  try {
    const response = await fetch(`/api/githubstar?owner=${owner}&repo=${repo}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();

    return data.stars;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return 0;
  }
}
