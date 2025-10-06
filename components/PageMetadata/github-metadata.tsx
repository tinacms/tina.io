'use client';

import { formatDate } from 'components/AppRouterMigrationComponents/utils/formatDate';
import { useEffect, useState } from 'react';
import type { GitHubCommit, GitHubMetadataProps } from './type';
export default function GitHubMetadata({
  owner = 'tinacms',
  repo = 'tina.io',
  path,
  className = '',
}: GitHubMetadataProps) {
  const filePath = path ? path.replace(/\\/g, '/') : null;
  const [commit, setCommit] = useState<GitHubCommit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastCommit = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the API URL
        let apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
        if (filePath) {
          apiUrl += `?path=${filePath}`;
        }
        apiUrl += filePath ? '&' : '?';
        apiUrl += 'per_page=1';

        const headers: Record<string, string> = {
          Accept: 'application/vnd.github.v3+json',
        };

        // Add GitHub token if available
        if (process.env.GITHUB_STAR_TOKEN) {
          headers.Authorization = `Bearer ${process.env.GITHUB_STAR_TOKEN}`;
        }

        let response = null;
        try {
          response = await fetch(apiUrl, { headers });
        } catch (error) {
          console.error('Error fetching GitHub commit:', error);
        }
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const commits: GitHubCommit[] = await response.json();

        if (commits.length > 0) {
          setCommit(commits[0]);
        }
      } catch (err) {
        console.error('Error fetching GitHub commit:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch commit data',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLastCommit();
  }, [owner, repo, filePath]);

  if (loading) {
    return (
      <div className={`text-slate-500 text-sm ${className}`}>
        Loading last updated info...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-slate-400 text-sm ${className}`}>
        Unable to load last updated info
      </div>
    );
  }

  if (!commit) {
    return null;
  }

  const lastUpdatedDate = commit.commit.author.date;
  const formattedDate = formatDate(lastUpdatedDate);

  return (
    <div className={`text-slate-500 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span>
          Last updated by{' '}
          <span className="text-slate-600">
            <span className="!text-semibold">{commit.commit.author.name}</span>
          </span>
          {formattedDate && ` on ${formattedDate}`}
        </span>
      </div>
    </div>
  );
}
