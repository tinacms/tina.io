import { ModeToggle } from './ModeToggle';
import { OUTLINE_CATEGORIES } from './outline';
import { SectionIndex } from './SectionIndex';

/**
 * The /design left column from lg up: the mode toggle at the top and the
 * sticky index under it, which scrolls itself, no taller than the visible
 * viewport. Below lg it is display: none and the header's phone navigation,
 * with its own toggle, takes its place.
 */
export const IndexColumn = () => (
  <aside className="hidden lg:sticky lg:top-0 lg:flex lg:max-h-dvh lg:w-64 lg:shrink-0 lg:flex-col lg:gap-6 lg:py-4 xl:top-24 xl:max-h-[calc(100dvh-theme(spacing.24))]">
    <ModeToggle className="self-start" />
    <SectionIndex
      categories={OUTLINE_CATEGORIES}
      className="min-h-0 overflow-y-auto"
    />
  </aside>
);
