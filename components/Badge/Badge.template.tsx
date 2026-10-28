import type { BadgeColor } from './Badge';

export type BadgeOption = {
  label: string;
  value: BadgeColor;
};

// Three looks, one option each (picked by design, Oct 2026). Blue, Ghost Blue
// and Blue Secondary looked the same, so they're one "Blue" option now. It
// keeps the blueSecondary value because existing content uses it; Badge still
// renders the retired blue and ghostBlue values for older content.
export const BADGE_COLOR_OPTIONS: BadgeOption[] = [
  { label: 'Blue', value: 'blueSecondary' },
  { label: 'Orange', value: 'orange' },
  { label: 'Ghost Orange', value: 'ghostOrange' },
];
