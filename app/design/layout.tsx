import type { ReactNode } from 'react';
import { SURFACE } from '@/component/styles/typography';

/**
 * The /design ground, a sky band. The site's sky wash shows behind the site
 * header, the title and the map, then fades into the plain page colour, so
 * the reference reads on a calm page in both modes.
 *
 * Two layers behind the page, full width: a fade that turns from clear at its
 * top to the plain page at its bottom (top-160 to top-240, the band's foot
 * just under the map), then the plain page down to the footer.
 */
export default function DesignLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className={`${SURFACE.pagePlain} absolute inset-x-0 top-160 -z-10 h-80 mask-t-from-0`}
      />
      <div
        aria-hidden
        className={`${SURFACE.pagePlain} absolute inset-x-0 top-240 bottom-0 -z-10`}
      />
      {children}
    </div>
  );
}
