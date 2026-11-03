'use client';

import { PlanCard } from 'components/blocks/Pricing/PlanCard';
import { useState } from 'react';
import { BODY_MUTED } from '@/component/styles/typography';
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

// Segmented toggles are button controls: out of scope for the type roles (#4964).
const buttonClasses =
  'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

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
        <fieldset
          aria-label={label('version')}
          className="flex rounded-full bg-white/60 p-1 shadow-sm"
        >
          {(['before', 'after'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={version === value}
              className={`${buttonClasses} ${version === value ? 'bg-blue-600 text-white' : 'text-blue-800'}`}
              onClick={() => setVersion(value)}
            >
              {label(value)}
            </button>
          ))}
        </fieldset>
        <fieldset
          aria-label={label('billingPeriod')}
          className="flex rounded-full bg-white/60 p-1 shadow-sm"
        >
          {[true, false].map((monthly) => (
            <button
              key={String(monthly)}
              type="button"
              aria-pressed={isMonthly === monthly}
              className={`${buttonClasses} ${isMonthly === monthly ? 'bg-blue-600 text-white' : 'text-blue-800'}`}
              onClick={() => setIsMonthly(monthly)}
            >
              {label(monthly ? 'monthly' : 'annually')}
            </button>
          ))}
        </fieldset>
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
