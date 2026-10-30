import type { KeyboardEvent } from 'react';

/**
 * A keydown handler for menus and popovers: Escape runs `close` while
 * the menu is open. `close` gets the event, so it can return focus to the
 * trigger.
 */
export const closeOnEscape =
  (isOpen: boolean, close: (event: KeyboardEvent<HTMLElement>) => void) =>
  (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && isOpen) {
      close(event);
    }
  };
