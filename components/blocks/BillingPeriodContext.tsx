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
  // Blocks rendered outside BlocksPage keep working with their own toggle state.
  return (
    context ?? { isMonthly: localIsMonthly, setIsMonthly: setLocalIsMonthly }
  );
};
