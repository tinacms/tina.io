// Single source of truth for the locale-per-domain setup.
//
// English is served from tina.io with unprefixed paths. Chinese is served from
// tinaio.cn, also with unprefixed paths: middleware rewrites `/pricing` to the
// physical route `/zh/pricing` so the `/zh` segment never appears in the URL.
//
// The `/zh` prefix remains a valid physical path everywhere. It is only
// collapsed to the prefix-free form in production on the Chinese domain, so
// that localhost (a single origin with no Chinese hostname) can still reach
// Chinese pages directly at `/zh/...`.

// Deliberately dependency-free: middleware.ts imports this module, so pulling
// anything from `next/server` back in here would drag the Edge runtime into
// every consumer (and into unit tests).
const EN: 'en' = 'en';
const ZH: 'zh' = 'zh';

export const EN_ORIGIN = 'https://tina.io';
export const ZH_ORIGIN = 'https://tinaio.cn';

/** Hostnames that serve the Chinese site. Compared lowercase, without port. */
export const ZH_HOSTS: ReadonlySet<string> = new Set([
  'tinaio.cn',
  'www.tinaio.cn',
]);

/** Hostnames that serve the English site. Compared lowercase, without port. */
export const EN_HOSTS: ReadonlySet<string> = new Set([
  'tina.io',
  'www.tina.io',
]);

/** Strip the port and normalise case so `TINAIO.CN:3000` matches. */
export function normaliseHost(rawHost: string | null | undefined): string {
  return (rawHost ?? '').split(':')[0].toLowerCase();
}

/**
 * Whether a raw Host/X-Forwarded-Host value belongs to the Chinese site.
 * Anything unrecognised (preview deployments, localhost, a missing header)
 * counts as English, so the English path is the safe default.
 */
export function isZhHost(rawHost: string | null | undefined): boolean {
  return ZH_HOSTS.has(normaliseHost(rawHost));
}

/**
 * Whether a raw Host value belongs to the English site. Unlike isZhHost this
 * is not a locale decision — it answers "is this one of the two public
 * sites?", which is what cross-domain navigation needs to know.
 */
export function isEnHost(rawHost: string | null | undefined): boolean {
  return EN_HOSTS.has(normaliseHost(rawHost));
}

/**
 * Locale for a request host. Behind the China reverse proxy the real hostname
 * arrives in X-Forwarded-Host, so callers should prefer that over Host.
 */
export function localeForHost(
  rawHost: string | null | undefined,
): typeof EN | typeof ZH {
  return isZhHost(rawHost) ? ZH : EN;
}

/** Absolute origin for a locale — used for cross-domain navigation. */
export function originForLocale(locale: string): string {
  return locale === ZH ? ZH_ORIGIN : EN_ORIGIN;
}

/**
 * True when `pathname` carries the `/zh` prefix as a whole segment.
 * Guards against paths that merely start with those characters, e.g.
 * `/zhuanti`, which must not be treated as prefixed.
 */
export function hasZhPrefix(pathname: string): boolean {
  return pathname === '/zh' || pathname.startsWith('/zh/');
}

/** Remove a leading `/zh` segment, keeping the result rooted at `/`. */
export function stripZhPrefix(pathname: string): string {
  if (!hasZhPrefix(pathname)) {
    return pathname;
  }
  return pathname.slice('/zh'.length) || '/';
}
