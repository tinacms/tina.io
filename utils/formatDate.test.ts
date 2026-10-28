import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a date as day, short month and year', () => {
    expect(formatDate('2026-10-23')).toEqual('23 Oct 2026');
  });

  it('reads the day in UTC', () => {
    expect(formatDate('2024-11-20T23:59:00.000Z')).toEqual('20 Nov 2024');
  });

  it('accepts a Date', () => {
    expect(formatDate(new Date('2025-01-05T00:00:00.000Z'))).toEqual(
      '5 Jan 2025',
    );
  });

  it('returns an empty string for missing or invalid input', () => {
    expect(formatDate(undefined)).toEqual('');
    expect(formatDate(null)).toEqual('');
    expect(formatDate('not-a-date')).toEqual('');
  });
});
