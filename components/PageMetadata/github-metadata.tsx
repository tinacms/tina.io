'use client';

import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { getRelativeTime } from './timeUtils';
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
  const relativeTime = getRelativeTime(lastUpdatedDate);

  // Create GitHub history URL
  const historyUrl = filePath
    ? `https://github.com/${owner}/${repo}/commits/main/${filePath}`
    : `https://github.com/${owner}/${repo}/commits/main`;

  return (
    <div className={`text-slate-500 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span>
          Last updated by{' '}
          <span className="font-bold">{commit.commit.author.name}</span>
          {` ${relativeTime}.`}
        </span>
        <a
          href={historyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-800 underline flex flex-row items-center gap-2"
        >
          See history
          <FaHistory className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
