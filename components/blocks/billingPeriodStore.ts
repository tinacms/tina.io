import { useSyncExternalStore } from 'react';

// One toggle shared by the pricing cards and the plan comparison table,
// which are separate blocks on the same page.
let isMonthly = false;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const setIsMonthly = (next: boolean) => {
  isMonthly = next;
  for (const listener of listeners) {
    listener();
  }
};

export const useBillingPeriod = () => ({
  isMonthly: useSyncExternalStore(
    subscribe,
    () => isMonthly,
    () => false,
  ),
  setIsMonthly,
});
