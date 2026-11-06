'use client';

import { PlanCard } from 'components/blocks/Pricing/PlanCard';
import { useState } from 'react';
import { BODY_MUTED } from '@/component/styles/typography';
import { SegmentedToggle } from '@/component/ui/SegmentedToggle';
import type { PageBlocksPricingPlans } from '../../tina/__generated__/types';

type ComparisonPlan = Omit<
  PageBlocksPricingPlans,
  '__typename' | 'buttons' | 'addOn'
>;

const defaultLabels = {
  comparison: 'Before and after pricing',
  version: 'Pricing version',
  billingPeriod: 'Billing period',
  before: 'Before',
  after: 'After',
  monthly: 'Monthly',
  annually: 'Annually',
  note: 'All prices in USD. When annual billing is selected, prices are shown as rounded monthly equivalents, with the yearly total below.',
};

type Props = {
  before?: ComparisonPlan[];
  after?: ComparisonPlan[];
  labels?: Partial<typeof defaultLabels> & { annualBillingText?: string };
};

export function PricingComparison({ before, after, labels }: Props) {
  const label = (key: keyof typeof defaultLabels) =>
    labels?.[key] || defaultLabels[key];
  const [version, setVersion] = useState<'before' | 'after'>('before');
  const [isMonthly, setIsMonthly] = useState(true);
  const plans = (version === 'before' ? before : after) ?? [];

  return (
    <section
      aria-label={label('comparison')}
      className="my-8 w-full max-w-full"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <SegmentedToggle
          label={label('version')}
          options={[
            { value: 'before', label: label('before') },
            { value: 'after', label: label('after') },
          ]}
          value={version}
          onChange={setVersion}
        />
        <SegmentedToggle
          label={label('billingPeriod')}
          options={[
            { value: 'monthly', label: label('monthly') },
            { value: 'annually', label: label('annually') },
          ]}
          value={isMonthly ? 'monthly' : 'annually'}
          onChange={(period) => setIsMonthly(period === 'monthly')}
        />
      </div>
      <p className={`${BODY_MUTED} mb-4`}>{label('note')}</p>
      <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {plans.map((plan, index) => (
          <PlanCard
            key={`${version}-${plan.name}-${index}`}
            data={plan}
            isMonthly={isMonthly}
            annualBillingText={labels?.annualBillingText}
            comparison
          />
        ))}
      </div>
    </section>
  );
}
