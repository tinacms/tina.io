import { formatPublishedDate } from './formatPublishedDate';

describe('formatPublishedDate', () => {
  it('formats an ISO date as month-day-year in en-US', () => {
    expect(formatPublishedDate('2024-11-20T14:23:45.123Z')).toEqual(
      'Nov 20, 2024',
    );
  });

  it('returns an empty string for undefined input', () => {
    expect(formatPublishedDate(undefined)).toEqual('');
  });

  it('returns an empty string for invalid input', () => {
    expect(formatPublishedDate('not-a-date')).toEqual('');
  });
});
