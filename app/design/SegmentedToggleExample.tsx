'use client';

import { useState } from 'react';
import { SegmentedToggle } from '@/component/ui/SegmentedToggle';

/** A live SegmentedToggle for the style guide. */
export const SegmentedToggleExample = () => {
  const [period, setPeriod] = useState<'monthly' | 'annually'>('monthly');
  return (
    <SegmentedToggle
      label="Billing period"
      options={[
        { value: 'monthly', label: 'Monthly' },
        { value: 'annually', label: 'Annually' },
      ]}
      value={period}
      onChange={setPeriod}
    />
  );
};
