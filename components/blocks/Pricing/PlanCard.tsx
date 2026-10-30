'use client';

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
import {
  LuGauge,
  LuLayers,
  LuMousePointerClick,
  LuTerminal,
} from 'react-icons/lu';
import { SlLock } from 'react-icons/sl';
import { TbPlugConnected } from 'react-icons/tb';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import RenderButton from 'utils/renderButtonArrayHelper';
import { FOCUS_RING } from '@/component/styles/buttons';
import {
  BODY_MUTED,
  BODY_SMALL,
  CAPTION,
  CARD_TITLE,
  CARD_TITLE_FEATURED,
  LABEL,
  LINK,
} from '@/component/styles/typography';
import type { PageBlocksPricingPlans } from '../../../tina/__generated__/types';

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
  LuTerminal,
};

const comparisonComponents = {
  ...pricingComponents,
  a: ({ children }) => <>{children}</>,
};

const ITEM_GRID_CLASSES = 'grid grid-cols-[auto_1fr] items-center gap-x-2';

// In the 4-column row, every card spans the same 3 rows (header, buttons,
// features), so the buttons line up even when one card's price line wraps.
export const CARD_ROWS_CLASSES =
  'xl:row-span-3 xl:grid xl:grid-rows-subgrid xl:gap-y-0';

const DEFAULT_ANNUAL_BILLING_TEXT = '{total} billed annually (save {saving})';

const formatDollars = (amount: number) => `$${amount.toLocaleString('en-US')}`;

const CardItemName = ({ item }) =>
  item.link ? (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK}
    >
      {item.name}
    </Link>
  ) : (
    <span>{item.name}</span>
  );

const CardItems = ({
  items,
  isMonthly,
  isLarge = false,
  comparison = false,
}) => (
  <div className="pl-2">
    {items?.map((item, index) => {
      const Icon = icons[item.icon];
      return (
        <div
          key={`${item.name}-${index}`}
          className={`${ITEM_GRID_CLASSES} ${BODY_SMALL} mt-2`}
        >
          {Icon ? <Icon /> : <span />}
          {comparison ? <span>{item.name}</span> : <CardItemName item={item} />}
          {item.description && (
            <div className={`${CAPTION} col-start-2 my-1`}>
              {!isMonthly
                ? (item.annualDescription ?? item.description)
                : item.description}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

type Props = {
  data: PageBlocksPricingPlans;
  isMonthly: boolean;
  annualBillingText?: string;
  comparison?: boolean;
};

export const PlanCard = ({
  data,
  isMonthly,
  annualBillingText = undefined,
  comparison = false,
}: Props) => {
  const cardRows = comparison ? '' : CARD_ROWS_CLASSES;
  const Heading = comparison ? 'h3' : 'h2';
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [isAddOnSelected, setAddOnSelected] = useState(false);

  const toggleAccordion = () => setAccordionOpen(!isAccordionOpen);

  const addOnPrice =
    !comparison && data.addOn?.isEnabled && isAddOnSelected
      ? (data.addOn?.monthlyPrice ?? 0)
      : 0;
  const hasPrice = typeof data.monthlyPrice === 'number';
  const monthlyPrice = data.monthlyPrice + addOnPrice;
  const yearlyPrice =
    hasPrice && typeof data.yearlyPrice === 'number'
      ? data.yearlyPrice + addOnPrice * 12
      : null;

  let price = data.customPrice;
  if (hasPrice) {
    price = formatDollars(
      !isMonthly && yearlyPrice !== null
        ? Math.round(yearlyPrice / 12)
        : monthlyPrice,
    );
  }
  const annualDescription =
    yearlyPrice === null
      ? null
      : (annualBillingText || DEFAULT_ANNUAL_BILLING_TEXT)
          .replace('{total}', formatDollars(yearlyPrice))
          .replace('{saving}', formatDollars(monthlyPrice * 12 - yearlyPrice));
  const featuresHeading = data.featuresHeading || 'Includes:';
  const titleRole = data.isStarred ? CARD_TITLE_FEATURED : CARD_TITLE;

  return (
    <span className={`animate-pop-in block h-full ${cardRows}`}>
      <div
        className={`h-full ${comparison ? '' : 'hover:scale-[1.03]'} hover:bg-linear-to-br from-transparent via-cyan-50/50 to-cyan-100 relative px-8 py-10 rounded-xl transform transition-transform duration-300 border border-transparent overflow-hidden ${cardRows} ${
          data.isMuted
            ? 'grayscale bg-gray-50/70 opacity-75 shadow-lg'
            : 'shadow-2xl'
        }`}
      >
        {data.isStarred && (
          <div className="absolute top-0 right-0 flex justify-center items-center w-24 h-24 transform translate-x-12 -translate-y-12">
            <div className="w-24 h-24 bg-orange-400 transform rotate-45"></div>
            <FaStar className="text-lg text-white absolute -translate-x-5 translate-y-5" />
          </div>
        )}
        <div>
          {/* The recommended (starred) plan is the one agreed exception:
              its name and price use the brand orange gradient. */}
          <Heading className={titleRole}>{data.name}</Heading>
          <TinaMarkdown
            content={data.description}
            components={comparison ? comparisonComponents : pricingComponents}
          />
          <div className="pt-10" aria-live="polite">
            <span className={titleRole}>{price}</span>
            {data.interval && (
              <span className={`${BODY_MUTED} pl-2`}>{data.interval}</span>
            )}
          </div>
          <div
            className={`${CAPTION} py-1 transition-all duration-500 ${
              isMonthly
                ? 'animate-fadeOut opacity-0'
                : 'animate-fadeIn opacity-100'
            } ${!annualDescription ? 'mt-5' : ''}`}
            aria-live="polite"
            aria-hidden={isMonthly}
          >
            {annualDescription}{' '}
          </div>
        </div>
        {!comparison && (
          <div className="pt-3 flex">
            {data.buttons?.map((button, index) => (
              <RenderButton key={`${button.label}-${index}`} button={button} />
            ))}
          </div>
        )}
        <div>
          {data.cardItem?.length > 0 && (
            <div className="pt-6">
              {/* The comparison card is read-only, so it has no toggle. */}
              {!comparison && (
                <div className="accordion-content block xl:hidden">
                  <button
                    type="button"
                    aria-expanded={isAccordionOpen}
                    className={`flex w-full justify-between items-center cursor-pointer text-left rounded-md ${FOCUS_RING}`}
                    onClick={toggleAccordion}
                  >
                    <span className={`${LABEL} flex items-center`}>
                      {featuresHeading}
                    </span>
                    <span className="ml-2" aria-hidden="true">
                      {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>
                  {isAccordionOpen && (
                    <CardItems
                      items={data.cardItem}
                      isMonthly={isMonthly}
                      isLarge
                      comparison={comparison}
                    />
                  )}
                </div>
              )}
              <div
                className={
                  comparison ? 'block' : 'non-accordion-content hidden xl:block'
                }
              >
                <p className={LABEL}>{featuresHeading}</p>
                <CardItems
                  items={data.cardItem}
                  isMonthly={isMonthly}
                  comparison={comparison}
                />
              </div>
            </div>
          )}

          {!comparison && data.addOn?.isEnabled && data.addOn?.name && (
            <label className="mt-6 flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white cursor-pointer select-none">
              <input
                type="checkbox"
                className="size-4 accent-orange-500 cursor-pointer"
                checked={isAddOnSelected}
                onChange={(event) => setAddOnSelected(event.target.checked)}
              />
              <span className={LABEL}>{data.addOn.name}</span>
              {data.addOn.monthlyPrice > 0 && (
                <span className={`${LABEL} ml-auto whitespace-nowrap`}>
                  +{formatDollars(data.addOn.monthlyPrice)}
                  {data.addOn.interval || '/month'}
                </span>
              )}
            </label>
          )}
        </div>
      </div>
    </span>
  );
};
