'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react';
import {
  FOCUS_RING,
  ICON_BUTTON,
  MODE_ICON_DARK,
  MODE_ICON_LIGHT,
} from '@/component/styles/buttons';
import {
  applyMode,
  chooseMode,
  clearMode,
  currentMode,
  type Mode,
  subscribeToMode,
} from './mode';

/** useLayoutEffect in the browser, so the mode lands before paint; no SSR warning. */
const useBrowserLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** The server can't know the visitor's mode; the head script already set it. */
const serverMode = (): Mode | null => null;

/**
 * The /design light/dark toggle: one icon button named "Dark mode",
 * pressed when dark. The moon and sun swap by CSS, so the right one paints
 * before hydration. The page shows one at each width (the index column's
 * from lg, the phone navigation's below it); both stay mounted, so the page
 * keeps following the system setting at every width.
 */
export const ModeToggle = ({ className = '' }: { className?: string }) => {
  const mode = useSyncExternalStore(subscribeToMode, currentMode, serverMode);

  useBrowserLayoutEffect(() => {
    if (mode) {
      applyMode(mode);
    }
  }, [mode]);

  // Leaving /design leaves nothing dark: only /design has a mode.
  useBrowserLayoutEffect(() => clearMode, []);

  return (
    <button
      type="button"
      className={`${ICON_BUTTON} ${FOCUS_RING} ${className}`}
      aria-label="Dark mode"
      aria-pressed={mode === 'dark'}
      onClick={() => chooseMode(mode === 'dark' ? 'light' : 'dark')}
    >
      <Moon className={MODE_ICON_LIGHT} aria-hidden="true" />
      <Sun className={MODE_ICON_DARK} aria-hidden="true" />
    </button>
  );
};
