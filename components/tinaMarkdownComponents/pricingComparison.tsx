'use client';

import { PlanCard } from 'components/blocks/Pricing/PlanCard';
import { useState } from 'react';
import type { PageBlocksPricingPlans } from '../../tina/__generated__/types';

type ComparisonPlan = Omit<
  PageBlocksPricingPlans,
  '__typename' | 'buttons' | 'addOn'
>;

type Props = { before?: ComparisonPlan[]; after?: ComparisonPlan[] };

const buttonClasses =
  'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

export function PricingComparison({ before, after }: Props) {
  const [version, setVersion] = useState<'before' | 'after'>('before');
  const [isMonthly, setIsMonthly] = useState(false);
  const plans = (version === 'before' ? before : after) ?? [];

  return (
    <section
      aria-label="Before and after pricing"
      className="my-8 w-full max-w-full"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <fieldset
          aria-label="Pricing version"
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
              {value === 'before' ? 'Before' : 'After'}
            </button>
          ))}
        </fieldset>
        <fieldset
          aria-label="Billing period"
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
              {monthly ? 'Monthly' : 'Annually'}
            </button>
          ))}
        </fieldset>
      </div>
      <p className="mb-4 text-sm text-gray-600">
        All prices in USD. When annual billing is selected, prices are shown as
        rounded monthly equivalents, with the yearly total below.
      </p>
      <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={`${version}-${plan.name}`}
            data={plan}
            isMonthly={isMonthly}
            comparison
          />
        ))}
      </div>
    </section>
  );
}
