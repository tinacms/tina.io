import type { BadgeColor } from './Badge';

export type BadgeOption = {
  label: string;
  value: BadgeColor;
};

export const BADGE_COLOR_OPTIONS: BadgeOption[] = [
  { label: 'Blue', value: 'blue' },
  { label: 'Ghost Blue', value: 'ghostBlue' },
  { label: 'Orange', value: 'orange' },
  { label: 'Ghost Orange', value: 'ghostOrange' },
  { label: 'Blue Secondary', value: 'blueSecondary' },
];
