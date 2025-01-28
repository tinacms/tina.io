export function formatDate(fullDate) {
  const date = fullDate === null ? null : new Date(fullDate);
  const formattedDate = date
    ? date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

    return formattedDate;
}