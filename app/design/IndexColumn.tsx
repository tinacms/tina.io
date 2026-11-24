import { ModeToggle } from './ModeToggle';
import { OUTLINE } from './outline';
import { SectionIndex } from './SectionIndex';

/**
 * The /design left column from lg up (D47): the mode toggle at the top and the
 * sticky index under it, which scrolls itself. Below lg it is display: none,
 * so the toggle stays mounted and keeps following the system setting (D51).
 */
export const IndexColumn = () => (
  <aside className="max-lg:hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:gap-6 lg:py-4 xl:top-24 xl:max-h-[calc(100vh-theme(spacing.24))]">
    <ModeToggle className="self-start" />
    <SectionIndex outline={OUTLINE} className="min-h-0 overflow-y-auto" />
  </aside>
);
