import { getSchemaUtcOffsetHours } from './schemaTimezoneOffset';

describe('schema timezone city hints', () => {
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });

  it('keeps labels stable across the November daylight-saving transition', () => {
    const offsets = ['2026-10-31T12:00:00Z', '2026-11-03T12:00:00Z'].map(
      (now) => {
        global.Date = jest.fn(
          (value?: string) => new RealDate(value ?? now),
        ) as unknown as DateConstructor;
        return [
          'America/New_York',
          'America/Chicago',
          'America/Los_Angeles',
        ].map(getSchemaUtcOffsetHours);
      },
    );
    expect(offsets).toEqual([
      [-5, -6, -8],
      [-5, -6, -8],
    ]);
  });

  it('preserves UTC, positive and half-hour offsets', () => {
    expect(getSchemaUtcOffsetHours('UTC')).toBe(0);
    expect(getSchemaUtcOffsetHours('Australia/Sydney')).toBe(11);
    expect(getSchemaUtcOffsetHours('Asia/Kolkata')).toBe(5.5);
    expect(getSchemaUtcOffsetHours('America/St_Johns')).toBe(-3.5);
  });
});
