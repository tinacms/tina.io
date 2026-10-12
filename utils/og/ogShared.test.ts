import {
  buildCurve,
  dotGridUri,
  orangeSweepUri,
  pickFontSize,
  svgDataUri,
  truncateTitle,
} from './ogShared';

describe('buildCurve', () => {
  it('swings the curve symmetrically either side of the divider', () => {
    const { topX, botX } = buildCurve({ W: 1200, H: 630, edge: 696, amp: 70 });
    expect(topX).toBeGreaterThan(696);
    expect(botX).toBeLessThan(696);
    expect(topX - 696).toBeCloseTo(696 - botX);
  });

  it('produces two cubic segments ending at the bottom-left point', () => {
    const { botX, body } = buildCurve({
      W: 1080,
      H: 1350,
      edge: 562,
      amp: 104,
    });
    expect(body.match(/C /g)).toHaveLength(2);
    expect(body.trim().endsWith(`${botX} 1350`)).toBe(true);
  });
});

describe('svgDataUri', () => {
  it('base64-encodes an svg as a data uri', () => {
    const uri = svgDataUri('<svg/>');
    expect(uri.startsWith('data:image/svg+xml;base64,')).toBe(true);
    expect(Buffer.from(uri.split(',')[1], 'base64').toString()).toBe('<svg/>');
  });
});

describe('orangeSweepUri', () => {
  it('builds an svg data uri with the orange gradient and a rim stroke', () => {
    const svg = Buffer.from(
      orangeSweepUri({ W: 1080, H: 1350, cy: 700 }).split(',')[1],
      'base64',
    ).toString();
    expect(svg).toContain('#FF724B');
    expect(svg).toContain('stroke');
    expect(svg).toContain('C ');
  });
});

describe('pickFontSize', () => {
  const tiers: ReadonlyArray<[number, number]> = [
    [30, 88],
    [55, 76],
    [78, 58],
  ];

  it('returns the first tier whose maxLength the title fits', () => {
    expect(pickFontSize(10, tiers, 42)).toBe(88);
    expect(pickFontSize(30, tiers, 42)).toBe(88);
    expect(pickFontSize(31, tiers, 42)).toBe(76);
    expect(pickFontSize(78, tiers, 42)).toBe(58);
  });

  it('returns the fallback when longer than every tier', () => {
    expect(pickFontSize(120, tiers, 42)).toBe(42);
  });
});

describe('truncateTitle', () => {
  it('leaves a title at or under the cap unchanged', () => {
    expect(truncateTitle('Short title', 86)).toBe('Short title');
    expect(truncateTitle('x'.repeat(86), 86)).toBe('x'.repeat(86));
  });

  it('truncates at the last word boundary with an ellipsis', () => {
    const out = truncateTitle('one two three four five', 12);
    expect(out).toBe('one two…');
    expect(out.length).toBeLessThanOrEqual(13);
  });

  it('hard-cuts a single over-long word (no space to break on)', () => {
    expect(truncateTitle('supercalifragilistic', 8)).toBe('supercal…');
  });
});

describe('dotGridUri', () => {
  it('renders dots and stops short of maxX', () => {
    const svg = Buffer.from(
      dotGridUri({ W: 1200, H: 630, maxX: 200 }).split(',')[1],
      'base64',
    ).toString();
    const xs = (svg.match(/cx="(\d+)"/g) || []).map((m) =>
      Number(m.replace(/\D/g, '')),
    );
    expect(xs.length).toBeGreaterThan(0);
    expect(Math.max(...xs)).toBeLessThan(200);
  });

  it('stops short of maxY when given (portrait top zone)', () => {
    const svg = Buffer.from(
      dotGridUri({ W: 1080, H: 1350, maxX: 1080, maxY: 400 }).split(',')[1],
      'base64',
    ).toString();
    const ys = (svg.match(/cy="(\d+)"/g) || []).map((m) =>
      Number(m.replace(/\D/g, '')),
    );
    expect(ys.length).toBeGreaterThan(0);
    expect(Math.max(...ys)).toBeLessThan(400);
  });
});
