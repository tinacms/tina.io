// Shared brand SVG builders for the dynamic blog images (landscape OpenGraph +
// 4:5 Instagram): the orange S-curve panel, the dark clip overlay, and the dot
// grid. Pure (no filesystem) so the curve geometry is unit-testable — font and
// image loading lives in ./ogAssets.

export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// The S-curve dividing the dark side from the orange panel.
//   edge = nominal divider x · amp = how far the curve swings either side.
// The panel and the dark clip overlay reuse the same body so their edges line
// up exactly. The vertical control points are fractions of H, so the same
// shape scales to any canvas (landscape or portrait).
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

/** Orange brand-gradient panel from the curve to the right edge, with a faint
 *  highlight tracing the curve. */
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

/** Dark clip overlay from the left edge to the curve, painted over the subject
 *  so anything overflowing past the curve is hidden. */
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

/** Faint dot texture for the dark side (stops short of the curve at maxX). */
export function dotGridUri({
  W,
  H,
  maxX,
  step = 46,
}: {
  W: number;
  H: number;
  maxX: number;
  step?: number;
}): string {
  const dots: string[] = [];
  for (let y = 44; y < H; y += step) {
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
