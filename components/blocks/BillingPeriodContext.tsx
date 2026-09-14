'use client';

import { createContext, useContext, useState } from 'react';

// Shared by the pricing cards and the plan comparison table so the
// monthly/annual toggle drives both, even though they are separate blocks.
const BillingPeriodContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (isMonthly: boolean) => void;
} | null>(null);

export const BillingPeriodProvider = ({ children }) => {
  const [isMonthly, setIsMonthly] = useState(false);
  return (
    <BillingPeriodContext.Provider value={{ isMonthly, setIsMonthly }}>
      {children}
    </BillingPeriodContext.Provider>
  );
};

export const useBillingPeriod = () => {
  const context = useContext(BillingPeriodContext);
  const [localIsMonthly, setLocalIsMonthly] = useState(false);
  // Only pages with a pricing block get a provider; elsewhere a block keeps its own state.
  return (
    context ?? { isMonthly: localIsMonthly, setIsMonthly: setLocalIsMonthly }
  );
};
