// Covers the fail-loud asset loading. A genuinely-absent optional asset (404)
// resolves to null so the caller can fall back (llama), while a transient load
// failure (any non-404 / network error) rejects — so the render 500s and isn't
// ISR-cached, instead of silently shipping a degraded image that sticks for the
// life of the deployment. The module memoizes at module scope and derives its
// fetch origin from env at import, so each case runs in an isolated registry.
//
// Paths under /__missing__ don't exist in public/ on disk, so loadPublic falls
// through to the (mocked) origin fetch — no fs mock needed.

function loadOgAssets() {
  // jest 25 doesn't recognise `node:`-prefixed builtins as core modules, so the
  // real fs/path can't resolve under test. doMock both (non-hoisted, so ts-jest
  // 25 doesn't choke on the hoist transform) before the module loads, so
  // readFileSync always misses and every load goes through the origin fetch.
  jest.doMock('node:fs', () => ({
    readFileSync: () => {
      throw new Error('ENOENT');
    },
  }));
  jest.doMock('node:path', () => ({ join: (...p: string[]) => p.join('/') }));
  // Set the production alias so the origin-fetch fallback is enabled.
  process.env.VERCEL_PROJECT_PRODUCTION_URL = 'tina.io';
  let mod: typeof import('./ogAssets');
  jest.isolateModules(() => {
    mod = require('./ogAssets');
  });
  return mod;
}

// AbortSignal.timeout exists on the Vercel runtime (Node 20+) but not jest 25's
// env; the mocked fetch ignores the signal anyway, so a no-op stub is enough.
beforeAll(() => {
  if (typeof AbortSignal.timeout !== 'function') {
    (AbortSignal as unknown as { timeout: () => AbortSignal }).timeout = () =>
      new AbortController().signal;
  }
});

afterEach(() => {
  jest.resetModules();
  global.fetch = undefined as unknown as typeof fetch;
});

describe('asset loading fail-loud semantics', () => {
  it('resolves null for a genuinely-absent asset (404) so the caller can fall back', async () => {
    global.fetch = jest.fn(
      async () => ({ ok: false, status: 404 }) as Response,
    );
    const { pngDataUri } = loadOgAssets();
    await expect(pngDataUri('/__missing__/nobody.png')).resolves.toBeNull();
  });

  it('rejects on a transient (non-404) fetch failure rather than degrading silently', async () => {
    global.fetch = jest.fn(
      async () => ({ ok: false, status: 503 }) as Response,
    );
    const { pngDataUri } = loadOgAssets();
    await expect(pngDataUri('/__missing__/blip.png')).rejects.toThrow(
      /asset fetch failed/i,
    );
  });
});
