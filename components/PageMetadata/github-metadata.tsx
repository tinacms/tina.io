'use client';

import { formatDate } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { fetchWithCache } from './fetch-github-meta';

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
  const [firstCommit, setFirstCommit] = useState<GitHubCommit | null>(null);
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

        const commits: GitHubCommit[] = await fetchWithCache(apiUrl, headers);

        if (commits.length > 0) {
          setCommit(commits[0]);

          // Fetch the first commit (oldest) for creation date
          if (filePath) {
            try {
              // Get all commits for the file to find the oldest one
              const allCommitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=100`;
              const allCommits: GitHubCommit[] = await fetchWithCache(
                allCommitsUrl,
                headers,
              );

              if (allCommits.length > 0) {
                // The last commit in the array is the oldest
                setFirstCommit(allCommits[allCommits.length - 1]);
              }
            } catch (err) {
              console.warn('Could not fetch first commit:', err);
            }
          }
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
  const createdDate = firstCommit?.commit.author.date;
  const createdTime = createdDate
    ? formatDate(createdDate, 'd MMM yyyy')
    : null;

  // Create GitHub history URL
  const historyUrl = filePath
    ? `https://github.com/${owner}/${repo}/commits/main/${filePath}`
    : `https://github.com/${owner}/${repo}/commits/main`;

  // Create tooltip content
  const tooltipContent = createdTime
    ? `Created ${createdTime}\nLast updated ${formatDate(lastUpdatedDate, 'dd MMM yyyy')}`
    : `Last updated ${formatDate(lastUpdatedDate, 'dd MMM yyyy')}`;

  return (
    <div className={`text-slate-500 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span>
          Last updated by{' '}
          <span className="font-bold text-black">
            {commit.commit.author.name}
          </span>
          {` ${relativeTime}.`}
        </span>
        <div className="relative group">
          <a
            href={historyUrl}
            target="_blank"
            title={tooltipContent}
            rel="noopener noreferrer"
            className="text-black hover:text-red-500 underline flex flex-row items-center gap-2"
          >
            See history
            <FaHistory className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
