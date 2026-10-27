import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { useState } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PAGE_TITLE, SECTION_TITLE } from '@/component/styles/typography';
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
        <div className="bg-linear-to-br font-ibm-plex from-white/25 via-white/50 to-white/75 shadow-md rounded-full gap-16 relative w-max">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-linear-to-br from-blue-300 via-blue-500 to-blue-700 rounded-full transition-transform duration-500 ease-in-out border-4 border-white  ${
              isMonthly
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
          ></div>
          <div className="relative leading-none flex z-10">
            <button
              type="button"
              className={`px-10 py-4 w-1/2 z-20 transition-colors  duration-500 ${
                isMonthly ? 'text-white' : 'text-blue-500'
              }`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`px-10 py-2 w-1/2 z-20 transition-colors  duration-500 ${
                !isMonthly ? 'text-white' : 'text-blue-500'
              }`}
              onClick={() => setIsMonthly(false)}
            >
              Annually
            </button>
          </div>
        </div>
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
      {/* The block's schema has no isHeadingOne field, so this was always
          undefined and the page shipped without an h1. It is only ever the
          first block on its page, so default to the page title. */}
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
