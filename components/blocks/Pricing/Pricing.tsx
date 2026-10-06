import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { pricingComponents } from 'components/tinaMarkdownComponents/pricingComponents';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiBadge, BiSupport } from 'react-icons/bi';
import { CgCrown } from 'react-icons/cg';
import {
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCloudDownloadAlt,
  FaCodeBranch,
  FaDatabase,
  FaFileAlt,
  FaGithub,
  FaHandPointer,
  FaMarkdown,
  FaPuzzlePiece,
  FaStar,
  FaUnlock,
} from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { LuGauge, LuLayers, LuMousePointerClick } from 'react-icons/lu';
import { SlLock } from 'react-icons/sl';
import { TbPlugConnected } from 'react-icons/tb';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import RenderButton from 'utils/renderButtonArrayHelper';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import TableBox, { LINK_CLASSES } from '../Table/table';

const icons = {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
  AiOutlineUser,
  BiBadge,
  BiSupport,
  AiOutlineUsergroupAdd,
  CgCrown,
  HiOutlineSparkles,
  TbPlugConnected,
  SlLock,
  FaDatabase,
  FaHandPointer,
  GoPeople,
  LuMousePointerClick,
  LuLayers,
  LuGauge,
};

// Icon in the first column, label and its grey sub-line in the second, so the
// sub-line always starts exactly under the label text.
const ITEM_GRID_CLASSES = 'grid grid-cols-[auto_1fr] items-center gap-x-2';

const formatDollars = (amount: number) => `$${amount.toLocaleString('en-US')}`;

// Adds `amount` to the first dollar figure in `text`: "$249" becomes "$429",
// and "$2,990 billed annually (save $598)" becomes "$5,150 billed annually
// (save $598)". Text without a dollar figure, such as "Custom", is unchanged.
const addToDollarAmount = (text: string, amount: number) => {
  if (!text || !amount) {
    return text;
  }
  return text.replace(/\$([\d,]+)/, (_match, digits: string) =>
    formatDollars(Number(digits.replace(/,/g, '')) + amount),
  );
};

const CardItemName = ({ item }) =>
  item.link ? (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_CLASSES}
    >
      {item.name}
    </Link>
  ) : (
    <span>{item.name}</span>
  );

const PlanCard = ({ data, isMonthly }) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [isAddOnSelected, setAddOnSelected] = useState(false);

  const toggleAccordion = () => setAccordionOpen(!isAccordionOpen);

  const addOnMonthlyPrice = isAddOnSelected ? data.addOn?.monthlyPrice : 0;
  const price = addToDollarAmount(
    isMonthly ? data.price : (data.annualPrice ?? data.price),
    addOnMonthlyPrice,
  );
  const annualDescription = addToDollarAmount(
    data.annualDescription,
    addOnMonthlyPrice * 12,
  );
  const featuresHeading = data.featuresHeading || 'Includes:';

  return (
    <span className="animate-pop-in">
      <div
        className={`hover:scale-[1.03] hover:bg-linear-to-br from-transparent via-cyan-50/50 to-cyan-100 relative px-8 py-10 rounded-xl transform transition-transform duration-300 border border-transparent overflow-hidden ${
          data.isMuted
            ? 'grayscale bg-gray-50/70 text-gray-600 shadow-lg'
            : 'shadow-2xl'
        }`}
      >
        {data.isStarred && (
          <div className="absolute top-0 right-0 flex justify-center items-center w-24 h-24 transform translate-x-12 -translate-y-12">
            <div className="w-24 h-24 bg-orange-400 transform rotate-45"></div>
            <FaStar className="text-lg text-white absolute -translate-x-5 translate-y-5" />
          </div>
        )}
        <h2
          className={`font-ibm-plex text-3xl bg-linear-to-br bg-clip-text text-transparent ${
            data.isStarred
              ? 'from-orange-400 via-orange-600 to-orange-800'
              : 'from-blue-600 via-blue-800 to-blue-1000'
          }`}
        >
          {data.name}
        </h2>
        <TinaMarkdown
          content={data.description}
          components={pricingComponents}
        />
        <div className="pt-10" aria-live="polite">
          <span className="text-3xl font-ibm-plex bg-linear-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {price}
          </span>
          {data.interval && (
            <span className="pl-2 text-lg bg-linear-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.interval}
            </span>
          )}
        </div>
        <div
          className={`py-1 text-stone-600 text-sm transition-all duration-500 ${
            isMonthly
              ? 'animate-fadeOut opacity-0'
              : 'animate-fadeIn opacity-100'
          } ${!annualDescription ? 'mt-5' : ''}`}
        >
          {annualDescription}{' '}
        </div>
        <div className="pt-3 flex">
          {data.buttons?.map((button, _index) => (
            <RenderButton key={button.label} button={button} />
          ))}
        </div>
        <div className="pt-6">
          <div className="accordion-content">
            <div
              className="flex justify-between items-center font-semibold cursor-pointer"
              onClick={toggleAccordion}
            >
              <p className="flex text-xl items-center">{featuresHeading}</p>
              <span className="ml-2">
                {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {isAccordionOpen && (
              <div className="pl-2">
                {data.cardItem?.map((item) => {
                  const Icon = icons[item.icon];
                  return (
                    <div
                      key={item.name}
                      className={`${ITEM_GRID_CLASSES} mt-2 text-lg`}
                    >
                      {Icon ? <Icon /> : <span />}
                      <CardItemName item={item} />
                      {item.description && (
                        <div className="col-start-2 my-1 text-md text-gray-600/70">
                          {!isMonthly
                            ? (item.annualDescription ?? item.description)
                            : item.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="non-accordion-content">
            <p className="font-semibold">{featuresHeading}</p>
            <div className="pl-2">
              {data.cardItem?.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <div key={item.name} className={`${ITEM_GRID_CLASSES} mt-2`}>
                    {Icon ? <Icon /> : <span />}
                    <CardItemName item={item} />
                    {item.description && (
                      <div className="col-start-2 my-1 text-sm text-gray-600/70">
                        {!isMonthly
                          ? (item.annualDescription ?? item.description)
                          : item.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {data.addOn?.name && (
          <label className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              className="size-4 accent-orange-500 cursor-pointer"
              checked={isAddOnSelected}
              onChange={(event) => setAddOnSelected(event.target.checked)}
            />
            <span className="font-semibold">{data.addOn.name}</span>
            {data.addOn.monthlyPrice > 0 && (
              <span className="ml-auto font-semibold whitespace-nowrap">
                +{formatDollars(data.addOn.monthlyPrice)}/month
              </span>
            )}
          </label>
        )}

        <style jsx>{`
          @media (min-width: 0px) and (max-width: 1250px) {
            .accordion-content {
              display: block;
            }
            .non-accordion-content {
              display: none;
            }
          }

          @media (min-width: 1250px) {
            .accordion-content {
              display: none;
            }
            .non-accordion-content {
              display: block;
            }
          }
        `}</style>
      </div>
    </span>
  );
};

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
            <div className="flex items-center pl-1 md:pt-0 transition-opacity justify-center duration-500 ease-in-out text-black opacity-100">
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
  const plans = [data.freeTier, ...(data.plans ?? [])].filter(Boolean);

  return (
    <div className="max-w-7xl w-full px-8 mx-auto">
      {data.isHeadingOne ? (
        <h1
          className={`${H1_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}
        >
          {data.headline}
        </h1>
      ) : (
        <h2
          className={`${H1_HEADINGS_SIZE} font-ibm-plex text-center justify-center lg:leading-tight text-black`}
        >
          {data.headline}
        </h2>
      )}

      <PillSwitch
        isMonthly={isMonthly}
        setIsMonthly={setIsMonthly}
        visibleText={data.pillSwitchVisibileText}
        toggleText={data.pillSwitchToggleText}
      />
      <div className="responsive-grid">
        {plans.map((plan) => (
          <div key={plan.name} className="flex flex-col">
            <PlanCard data={plan} isMonthly={isMonthly} />
          </div>
        ))}
      </div>
      {data.comparisonTable && (
        <div className="pt-20">
          <TableBox data={data.comparisonTable} isMonthly={isMonthly} />
        </div>
      )}
      <style jsx>{`
        .responsive-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1rem;
          grid-auto-rows: min-content;
        }

        @media (min-width: 768px) {
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1250px) {
          .responsive-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
