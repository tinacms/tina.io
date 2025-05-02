import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { pricingComponents } from 'components/tinaMarkdownComponents/pricingComponents';
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
  FaFileAlt,
  FaGithub,
  FaMarkdown,
  FaPuzzlePiece,
  FaStar,
  FaUnlock,
} from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { SlLock } from 'react-icons/sl';
import { TbPlugConnected } from 'react-icons/tb';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import RenderButton from 'utils/renderButtonArrayHelper';

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
};

const FreeTier = ({ data }) => (
  <span className="animate-pop-in w-full">
    <div className="shadow-xl rounded-xl w-full p-10 transform transition-transform duration-300 border border-transparent hover:scale-[1.03] hover:bg-gradient-to-br from-transparent via-cyan-50/40 to-cyan-100">
      {data.freeTier && (
        <div className="flex flex-col sm:flex-row justify-between pb-2">
          <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {data.freeTier?.name}
          </h2>
          <div className="flex items-baseline mt-2 sm:mt-0">
            <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier?.price}
            </h2>
            <span className="text-lg ml-2 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier?.interval}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between">
        <TinaMarkdown
          content={data.freeTier?.description}
          components={pricingComponents}
        />
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-start">
          {data.freeTier?.buttons &&
            data.freeTier?.buttons.map((button, index) => (
              <RenderButton key={index} button={button} index={index} />
            ))}
        </div>
      </div>
    </div>
  </span>
);

const PaidTier = ({ data, isMonthly }) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = () => setAccordionOpen(!isAccordionOpen);

  return (
    <span className="animate-pop-in">
      <div className="hover:scale-[1.03] hover:bg-gradient-to-br from-transparent via-cyan-50/50 to-cyan-100 relative p-10 rounded-xl shadow-2xl transform transition-transform duration-300 border border-transparent overflow-hidden">
        {data.isStarred && (
          <div className="absolute top-0 right-0 flex justify-center items-center w-24 h-24 transform translate-x-12 -translate-y-12">
            <div className="w-24 h-24 bg-orange-400 transform rotate-45"></div>
            <FaStar className="text-lg text-white absolute -translate-x-5 translate-y-5" />
          </div>
        )}
        <h2
          className={`font-tuner text-3xl bg-gradient-to-br bg-clip-text text-transparent ${
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
        <div className="pt-10">
          <span className="text-3xl font-tuner bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {isMonthly ? data.price : data.annualPrice}
          </span>
          {data.interval && (
            <span className="pl-2 text-lg bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.interval}
            </span>
          )}
        </div>
        <div
          className={`py-1 text-stone-600 text-sm transition-all duration-500 ${
            isMonthly
              ? 'animate-fadeOut opacity-0'
              : 'animate-fadeIn opacity-100'
          } ${!data.annualDescription ? 'mt-5' : ''}`}
        >
          {data.annualDescription}{' '}
        </div>
        <div className="pt-3 flex">
          {data.buttons &&
            data.buttons.map((button, index) => (
              <RenderButton key={index} button={button} index={index} />
            ))}
        </div>
        <div className="pt-6">
          <div className="accordion-content">
            <div
              className="flex justify-between items-center font-semibold cursor-pointer"
              onClick={toggleAccordion}
            >
              <p className="flex text-xl items-center">Includes:</p>
              <span className="ml-2">
                {isAccordionOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {isAccordionOpen && (
              <div className="pl-2">
                {data.cardItem &&
                  data.cardItem.map((item, index) => {
                    const Icon = icons[item.icon];
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-start mt-2"
                      >
                        <div className="flex items-center text-lg">
                          {Icon && <Icon className="mr-2" />}
                          <span>{item.name}</span>
                        </div>
                        {item.description && (
                          <div className="my-1 ml-5 text-md text-gray-600/70">
                            {!isMonthly
                              ? item.annualDescription ?? item.description
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
            <p className="font-semibold">Includes:</p>
            <div className="pl-2">
              {data.cardItem &&
                data.cardItem.map((item, index) => {
                  const Icon = icons[item.icon];
                  return (
                    <div key={index} className="flex flex-col items-start mt-2">
                      <div className="flex items-center">
                        {Icon && <Icon className="mr-2" />}
                        <span>{item.name}</span>
                      </div>
                      {item.description && (
                        <div className="my-1 ml-5 text-sm text-gray-600/70">
                          {!isMonthly
                            ? item.annualDescription ?? item.description
                            : item.description}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

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
        <div className="bg-gradient-to-br font-tuner from-white/25 via-white/50 to-white/75 shadow-md rounded-full gap-16 relative w-max">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 rounded-full transition-transform duration-500 ease-in-out border-4 border-white  ${
              isMonthly
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
          ></div>
          <div className="relative leading-none flex z-10">
            <button
              className={`px-10 py-4 w-1/2 z-20 transition-colors  duration-500 ${
                isMonthly ? 'text-white' : 'text-blue-500'
              }`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </button>
            <button
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

  return (
    <div className="max-w-7xl w-full px-8 mx-auto">
      <h1 className="text-center justify-center font-tuner text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
        {data.headline}
      </h1>

      <div className="pt-2 max-w-7xl mx-auto flex justify-center">
        <FreeTier data={data} />
      </div>
      <PillSwitch
        isMonthly={isMonthly}
        setIsMonthly={setIsMonthly}
        visibleText={data.pillSwitchVisibileText}
        toggleText={data.pillSwitchToggleText}
      />
      <div className="responsive-grid">
        {data.plans &&
          data.plans.map((plan, index) => (
            <div key={index} className="flex flex-col">
              <PaidTier data={plan} isMonthly={isMonthly} />
            </div>
          ))}
      </div>
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
