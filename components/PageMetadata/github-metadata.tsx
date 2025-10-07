'use client';

import { formatDate } from 'date-fns';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { getRelativeTime } from './timeUtils';
import type { GitHubMetadataProps, GitHubMetadataResponse } from './type';

export default function GitHubMetadata({
  owner = 'tinacms',
  repo = 'tina.io',
  path,
  className = '',
}: GitHubMetadataProps) {
  const [data, setData] = useState<GitHubMetadataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          owner,
          repo,
        });

        if (path) {
          params.append('path', path);
        }

        const response = await fetch(
          `/api/github-metadata?${params.toString()}`,
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result: GitHubMetadataResponse = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching GitHub metadata:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch commit data',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubMetadata();
  }, [owner, repo, path]);

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

  if (!data) {
    return null;
  }

  const { latestCommit, firstCommit, historyUrl } = data;
  const lastUpdatedDate = latestCommit.commit.author.date;
  const lastUpdateInRelativeTime = getRelativeTime(lastUpdatedDate);
  const lastUpdateInAbsoluteTime = formatDate(lastUpdatedDate, 'dd MMM yyyy');
  const createdDate = firstCommit?.commit.author.date;
  const createdTime = createdDate
    ? formatDate(createdDate, 'd MMM yyyy')
    : null;

  const tooltipContent = createdTime
    ? `Created ${createdTime}\nLast updated ${lastUpdateInAbsoluteTime}`
    : `Last updated ${lastUpdateInAbsoluteTime}`;

  return (
    <div className={`text-slate-500 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <span>
          Last updated by{' '}
          <span className="font-bold text-black">
            {latestCommit.commit.author.name}
          </span>
          {` ${lastUpdateInRelativeTime}.`}
        </span>
        <div className="relative group">
          <Link
            href={historyUrl}
            target="_blank"
            title={tooltipContent}
            rel="noopener noreferrer"
            className="text-black hover:text-orange-600 underline flex flex-row items-center gap-2"
          >
            See history
            <FaHistory className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
