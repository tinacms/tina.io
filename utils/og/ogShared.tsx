export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export type SubjectLayout = { width: number; bottom: number; right: number };

export function pickFontSize(
  len: number,
  tiers: ReadonlyArray<[number, number]>,
  fallback: number,
): number {
  for (const [maxLen, size] of tiers) {
    if (len <= maxLen) {
      return size;
    }
  }
  return fallback;
}

export function truncateTitle(title: string, cap: number): string {
  if (title.length <= cap) {
    return title;
  }
  const cut = title.slice(0, cap);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export interface CurveSpec {
  W: number;
  H: number;
  edge: number;
  amp: number;
}

export function buildCurve({ H, edge, amp }: CurveSpec) {
  const topX = edge + amp * 0.55;
  const botX = edge - amp * 0.55;
  const body =
    `C ${topX - amp * 1.9} ${H * 0.3}, ${edge - amp * 1.2} ${H * 0.34}, ${edge - amp * 0.15} ${H * 0.5} ` +
    `C ${edge + amp * 0.9} ${H * 0.66}, ${botX + amp * 1.7} ${H * 0.7}, ${botX} ${H}`;
  return { topX, botX, body };
}

export function orangePanelUri(spec: CurveSpec): string {
  const { W, H, edge, amp } = spec;
  const { topX, botX, body } = buildCurve(spec);
  return svgDataUri(
    `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="o" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF724B"/><stop offset="1" stop-color="#D13F13"/>
      </linearGradient>
      <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="0.12" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M ${topX} 0 ${body} L ${W} ${H} L ${W} 0 Z" fill="url(#o)"/>
    <path d="M ${topX} 0 ${body} L ${botX + 80} ${H} C ${edge + amp * 0.9 + 80} ${H * 0.66}, ${edge - amp * 0.15 + 80} ${H * 0.34}, ${topX + 80} 0 Z" fill="url(#hl)"/>
  </svg>`,
  );
}

export function darkOverlayUri(spec: CurveSpec): string {
  const { W, H } = spec;
  const { topX, body } = buildCurve(spec);
  return svgDataUri(
    `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1b1a1f"/><stop offset="0.55" stop-color="#0a0a0b"/><stop offset="1" stop-color="#050505"/>
      </linearGradient>
    </defs>
    <path d="M 0 0 L ${topX} 0 ${body} L 0 ${H} Z" fill="url(#d)"/>
  </svg>`,
  );
}

export function dotGridUri({
  W,
  H,
  maxX,
  maxY = H,
  step = 46,
}: {
  W: number;
  H: number;
  maxX: number;
  maxY?: number;
  step?: number;
}): string {
  const dots: string[] = [];
  for (let y = 44; y < maxY; y += step) {
    for (let x = 44; x < maxX; x += step) {
      dots.push(
        `<circle cx="${x}" cy="${y}" r="1.6" fill="#ffffff" fill-opacity="0.05"/>`,
      );
    }
  }
  return svgDataUri(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${dots.join('')}</svg>`,
  );
}

export interface SweepSpec {
  W: number;
  H: number;
  cy: number;
}

function sweepCurve({ W, cy }: SweepSpec): string {
  return `C ${W * 0.3} ${cy + 100}, ${W * 0.52} ${cy - 130}, ${W} ${cy - 55}`;
}

export function orangeSweepUri(spec: SweepSpec): string {
  const { W, H, cy } = spec;
  const curve = sweepCurve(spec);
  return svgDataUri(
    `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="o" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF724B"/><stop offset="1" stop-color="#D13F13"/>
      </linearGradient>
    </defs>
    <path d="M 0 ${H} L 0 ${cy + 70} ${curve} L ${W} ${H} Z" fill="url(#o)"/>
    <path d="M 0 ${cy + 70} ${curve}" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="3"/>
  </svg>`,
  );
}
