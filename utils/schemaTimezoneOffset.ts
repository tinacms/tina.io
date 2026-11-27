// Schema labels must not change between indexing and builds across DST transitions.
// City hints use a fixed January reference; event values remain explicit UTC offsets.
export const getSchemaUtcOffsetHours = (ianaName: string): number => {
  const formatted = new Date('2026-01-01T00:00:00Z').toLocaleString('en-US', {
    timeZone: ianaName,
    timeZoneName: 'shortOffset',
  });
  const match = formatted.match(/GMT([+-]?\d+(?::(\d+))?)?$/);
  if (!match) {
    return 0;
  }
  if (!match[1]) {
    return 0;
  } // "GMT" with no offset = UTC
  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return hours + (hours < 0 ? -minutes : minutes) / 60;
};
