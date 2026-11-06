/**
 * Determines if a link should be prefetched by Next.js.
 * Returns false for external zones in the Next.js zone cluster to prevent 404s.
 *
 * @param href - The URL to check
 * @returns false if prefetch should be disabled, undefined otherwise
 */
export function shouldPrefetchLink(href: string): boolean | undefined {
  // Disable prefetching for external zones that are handled by separate Next.js apps
  const externalZones = ['/tinadocs'];

  const isExternalZone = externalZones.some((zone) => href.startsWith(zone));

  return isExternalZone ? false : undefined;
}
