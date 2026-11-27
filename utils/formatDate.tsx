/**
 * Every date on the site (post cards, the blog feed and post page, release
 * dates, testimonials, /versions): "23 Oct 2026". Read in UTC so the server
 * and the browser always agree on the day.
 * Event times are the one exception: they show in the reader's own time
 * zone, so they keep their own formatter in Events/dates-calculations.ts.
 */
export function formatDate(fullDate?: string | Date | null): string {
  if (!fullDate) {
    return '';
  }
  const date = new Date(fullDate);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const month = date.toLocaleString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });
  return `${date.getUTCDate()} ${month} ${date.getUTCFullYear()}`;
}
