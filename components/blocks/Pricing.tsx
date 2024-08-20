import { TinaMarkdown } from 'tinacms/dist/rich-text'
import RenderButton from 'utils/renderButtonArrayHelper'
import {
  FaClock,
  FaUnlock,
  FaCodeBranch,
  FaCloudDownloadAlt,
  FaPuzzlePiece,
  FaMarkdown,
  FaGithub,
  FaFileAlt,
} from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import { BiBadge } from 'react-icons/bi'
import { BiSupport } from 'react-icons/bi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { CgCrown } from 'react-icons/cg'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { TbPlugConnected } from 'react-icons/tb'
import { SlLock } from 'react-icons/sl'
import { FaStar } from 'react-icons/fa'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useState } from 'react'

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
}

const pricingComponents = {
  p: (props) => <p className="text-xl" {...props} />,
  strong: (props) => <strong className="font-bold text-xl" {...props} />,
}

const FreeTier = ({ data }) => {
  return (
    <div
      className="shadow-xl rounded-xl w-full p-10 transform transition-transform duration-300 border border-transparent hover:scale-105"
      style={popInStyle}
    >
      {data.freeTier && (
        <div className="flex flex-col sm:flex-row justify-between pb-2">
          <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {data.freeTier.name}
          </h2>
          <div className="flex items-baseline mt-2 sm:mt-0">
            <h2 className="font-tuner text-3xl bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier.price}
            </h2>
            <span className="text-lg ml-2 bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
              {data.freeTier.interval}
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between">
        <TinaMarkdown
          content={data.freeTier.description}
          components={pricingComponents}
        />
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-start">
          {data.freeTier.buttons &&
            data.freeTier.buttons.map((button, index) => (
              <RenderButton key={index} button={button} index={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

const PaidTier = ({ data }) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false)

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen)
  }

  return (
    <div
      className="relative p-10 rounded-xl shadow-2xl transform transition-transform duration-300 border border-transparent hover:scale-105 overflow-hidden"
      style={popInStyle}
    >
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
      <TinaMarkdown content={data.description} components={pricingComponents} />
      <div className="pt-10">
        <span className="text-3xl font-tuner bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
          {data.price}
        </span>{' '}
        {data.interval && (
          <span className="pl-2 text-lg bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent">
            {data.interval}
          </span>
        )}
      </div>
      <div className="pt-6 flex">
        {data.buttons &&
          data.buttons.map((button, index) => (
            <RenderButton key={index} button={button} index={index} />
          ))}
      </div>
      <div className="pt-6">
        <div className="sm:block md:block lg:hidden xl:hidden">
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
                  const Icon = icons[item.icon]
                  return (
                    <div key={index} className="flex flex-col items-start mt-2">
                      <div className="flex items-center">
                        {Icon && <Icon className="mr-2" />}
                        <span>{item.name}</span>
                      </div>
                      {item.description && (
                        <div className="my-1 ml-5 text-sm text-gray-600/70">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )}
        </div>

        <div className="hidden lg:block xl:block">
          <p className="font-semibold">Includes:</p>
          <div className="pl-2">
            {data.cardItem &&
              data.cardItem.map((item, index) => {
                const Icon = icons[item.icon]
                return (
                  <div key={index} className="flex flex-col items-start mt-2">
                    <div className="flex items-center">
                      {Icon && <Icon className="mr-2" />}
                      <span>{item.name}</span>
                    </div>
                    {item.description && (
                      <div className="my-1 ml-5 text-sm text-gray-600/70">
                        {item.description}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
export function PricingBlock({ data }) {
  console.log(data.intro)
  return (
    <div className="p-6">
      <style>{style}</style>
      <div className="py-12 lg:py-16 last:pb-20 last:lg:pb-32 max-w-7xl mx-auto">
        <h1
          className="text-center justify-center font-tuner text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-600 to-orange-700 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent"
          style={popInStyle}
        >
          {data.headline}
        </h1>
        <div className="py-2 max-w-4xl mx-auto flex justify-center">
          {/* <FreeTier data={data} /> */}
        </div>
        <div className="pt-10 px-4 pb-6 text-center">
          <TinaMarkdown content={data.intro} components={pricingComponents} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 auto-rows-min">
          {data.plans &&
            data.plans.map((plan, index) => (
              <div key={index} className="flex flex-col">
                <PaidTier data={plan} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

const popInStyle = {
  animation: 'popIn 0.5s ease-out forwards',
}

const style = `
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
`
