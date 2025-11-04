/**
 * Converts a date string to a human-readable relative time format
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 hours ago", "3 days ago", "1 month ago")
 */
export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the future, return "just now"
  if (diffInSeconds < 0) {
    return 'just now';
  }

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? '1 minute ago'
      : `${diffInMinutes} minutes ago`;
  }

  // Less than 1 day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }

  // Less than 1 month (30 days)
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }

  // Less than 1 year (365 days)
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }

  // 1 year or more
  const diffInYears = Math.floor(diffInDays / 365);
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
}

/**
 * Gets a more precise relative time for recent updates (within 7 days)
 * @param dateString - ISO date string
 * @returns More precise relative time string
 */
export function getPreciseRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the date is in the future, return "just now"
  if (diffInSeconds < 0) {
    return 'just now';
  }

  // Less than 1 minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than 1 hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? '1 minute ago'
      : `${diffInMinutes} minutes ago`;
  }

  // Less than 1 day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }

  // Less than 1 week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }

  // For older dates, fall back to the regular relative time
  return getRelativeTime(dateString);
}
