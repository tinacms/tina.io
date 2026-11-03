import type { BadgeColor } from './Badge';

export type BadgeOption = {
  label: string;
  value: BadgeColor;
};

// Blue, Ghost Blue and Blue Secondary looked the same, so there is one "Blue"
// option. It keeps the blueSecondary value because existing content uses it;
// Badge still renders the retired blue and ghostBlue values.
export const BADGE_COLOR_OPTIONS: BadgeOption[] = [
  { label: 'Blue', value: 'blueSecondary' },
  { label: 'Orange', value: 'orange' },
  { label: 'Ghost Orange', value: 'ghostOrange' },
];
