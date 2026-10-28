/**
 * Post dates, wherever they appear (homepage cards, the featured post, the
 * blog feed and the post page): "23 Oct 2026". Read in UTC so the server and
 * the browser always agree on the day. Picked by design (Oct 2026).
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
