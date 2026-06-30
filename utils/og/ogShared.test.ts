import { buildCurve, dotGridUri, svgDataUri } from './ogShared';

describe('buildCurve', () => {
  it('swings the curve symmetrically either side of the divider', () => {
    const { topX, botX } = buildCurve({ W: 1200, H: 630, edge: 696, amp: 70 });
    expect(topX).toBeGreaterThan(696); // top starts right of the divider
    expect(botX).toBeLessThan(696); // bottom ends left of it
    expect(topX - 696).toBeCloseTo(696 - botX);
  });

  it('produces two cubic segments ending at the bottom-left point', () => {
    const { botX, body } = buildCurve({ W: 1080, H: 1350, edge: 562, amp: 104 });
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
});
