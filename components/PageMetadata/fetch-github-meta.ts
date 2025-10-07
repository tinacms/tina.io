'use server';
// Cache interface
import type { GitHubCommit } from './type';

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

export async function fetchWithCache(
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
