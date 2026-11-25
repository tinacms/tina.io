/**
 * Light and dark mode for /design only, where the whole page turns dark. The mode is the `dark`
 * class on <html>: a stored choice wins, otherwise the system setting, live.
 * The root layout runs MODE_SCRIPT in <head> so the first paint is right;
 * ModeToggle keeps it in step after that.
 */

export type Mode = 'light' | 'dark';

export const MODE_STORAGE_KEY = 'tina-design-mode';
export const DARK_CLASS = 'dark';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

/** /design, with or without a trailing slash, and nothing else. */
const DESIGN_PATH = /^\/design\/?$/;

const isMode = (value: unknown): value is Mode =>
  value === 'light' || value === 'dark';

/** A choice made while storage is blocked lasts for the visit. */
let unstoredChoice: Mode | null = null;
const listeners = new Set<() => void>();

const storedMode = (): Mode | null => {
  try {
    const value = window.localStorage.getItem(MODE_STORAGE_KEY);
    return isMode(value) ? value : null;
  } catch {
    return null;
  }
};

const systemMode = (): Mode =>
  window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';

/** The mode to show now: the stored choice, else the system setting. */
export const currentMode = (): Mode =>
  storedMode() ?? unstoredChoice ?? systemMode();

export const applyMode = (mode: Mode) => {
  document.documentElement.classList.toggle(DARK_CLASS, mode === 'dark');
};

export const clearMode = () => {
  document.documentElement.classList.remove(DARK_CLASS);
};

/** Stores a choice; it beats the system setting from now on, in every tab. */
export const chooseMode = (mode: Mode) => {
  try {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    unstoredChoice = mode;
  }
  listeners.forEach((listener) => {
    listener();
  });
};

/** For useSyncExternalStore: the system setting, other tabs and choices. */
export const subscribeToMode = (onChange: () => void) => {
  const query = window.matchMedia(DARK_QUERY);
  const onStorage = (event: StorageEvent) => {
    if (event.key === MODE_STORAGE_KEY || event.key === null) {
      onChange();
    }
  };
  query.addEventListener('change', onChange);
  window.addEventListener('storage', onStorage);
  listeners.add(onChange);
  return () => {
    query.removeEventListener('change', onChange);
    window.removeEventListener('storage', onStorage);
    listeners.delete(onChange);
  };
};

/**
 * Runs in <head> before the first paint. Sets the dark class on /design only;
 * if storage is blocked it falls back to the system setting, with no error.
 */
export const MODE_SCRIPT = `(function(){try{if(!${DESIGN_PATH}.test(location.pathname))return;var m=null;try{m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)})}catch(e){}if(m!=='light'&&m!=='dark'){m=matchMedia(${JSON.stringify(DARK_QUERY)}).matches?'dark':'light'}if(m==='dark')document.documentElement.classList.add(${JSON.stringify(DARK_CLASS)})}catch(e){}})();`;
