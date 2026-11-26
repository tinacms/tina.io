import type { ReactNode } from 'react';
import { SURFACE } from '@/component/styles/typography';

/**
 * The /design ground, a sky band. The site's sky wash shows behind the site
 * header, the title and the map, then fades into the plain page colour, so
 * the reference reads on a calm page in both modes.
 *
 * Two layers behind the page, full width, at the signed-off band's depth:
 * clear for two spacing.80 steps (640px) under the site header, a fade from
 * clear to the plain page over the third (just under the map), then the
 * plain page down to the footer.
 */
export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className={`${SURFACE.pagePlain} absolute inset-x-0 top-[calc(theme(spacing.80)*2)] -z-10 h-80 mask-t-from-0%`}
      />
      <div
        aria-hidden
        className={`${SURFACE.pagePlain} absolute inset-x-0 top-[calc(theme(spacing.80)*3)] bottom-0 -z-10`}
      />
      {children}
    </div>
  );
}
