import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { useState } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PAGE_TITLE, SECTION_TITLE } from '@/component/styles/typography';
import { SegmentedToggle } from '@/component/ui/SegmentedToggle';
import TableBox from '../Table/table';
import { CARD_ROWS_CLASSES, PlanCard } from './PlanCard';

export function PillSwitch({
  isMonthly,
  setIsMonthly,
  visibleText,
  toggleText,
}) {
  return (
    <div className="flex justify-center md:justify-start pt-10">
      <div className="flex flex-col sm:space-y-4 md:flex-row md:items-center">
        <SegmentedToggle
          label="Billing period"
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'annually', label: 'Annually' },
          ]}
          value={isMonthly ? 'monthly' : 'annually'}
          onChange={(period) => setIsMonthly(period === 'monthly')}
        />
        <div className="flex flex-col md:flex-row md:items-center pt-4 pb-8">
          <div className="flex items-start md:items-center md:pt-0 justify-center md:justify-start pl-1 md:pl-10">
            <TinaMarkdown
              components={docAndBlogComponents}
              content={visibleText}
            />
          </div>
          {isMonthly && (
            <div className="flex items-center pl-1 md:pt-0 transition-opacity justify-center duration-500 ease-in-out opacity-100">
              <TinaMarkdown
                components={docAndBlogComponents}
                content={toggleText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PricingBlock({ data }) {
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <div className="max-w-7xl w-full px-8 mx-auto">
      {/* The schema has no isHeadingOne field and this block is always first
          on its page, so default to the h1. */}
      {data.isHeadingOne !== false ? (
        <h1 className={`${PAGE_TITLE} text-center justify-center`}>
          {data.headline}
        </h1>
      ) : (
        <h2 className={`${SECTION_TITLE} text-center justify-center`}>
          {data.headline}
        </h2>
      )}

      <PillSwitch
        isMonthly={isMonthly}
        setIsMonthly={setIsMonthly}
        visibleText={data.pillSwitchVisibileText}
        toggleText={data.pillSwitchToggleText}
      />
      <div className="grid grid-cols-1 auto-rows-min items-start gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
        {data.plans?.map((plan, index) => (
          <div
            key={`${plan.name}-${index}`}
            className={`flex flex-col ${CARD_ROWS_CLASSES}`}
          >
            <PlanCard
              data={plan}
              isMonthly={isMonthly}
              annualBillingText={data.annualBillingText}
            />
          </div>
        ))}
      </div>
      {data.comparisonTable && (
        <div className="pt-20">
          <TableBox data={data.comparisonTable} isMonthly={isMonthly} />
        </div>
      )}
    </div>
  );
}
