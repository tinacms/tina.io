import React, { useState, Suspense, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { FaCheck, FaChevronRight } from 'react-icons/fa'

const LazyGlobe = React.lazy(() => import('../ui/Globe'))

const Card = ({ cardItem, onHover }) => {
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const calculateDaysUntilEvent = (date) => {
    const eventDate = new Date(date)
    const currentDate = new Date()
    eventDate.setHours(0, 0, 0, 0)
    currentDate.setHours(0, 0, 0, 0)

    const timeDifference = eventDate.getTime() - currentDate.getTime()
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    return daysDifference
  }

  const isDateInRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const current = new Date()
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    current.setHours(0, 0, 0, 0)

    return current >= start && current <= end
  }

  const formatStartDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()}${getOrdinalSuffix(d.getDate())} ${format(d, 'MMM')}`
  }

  const formatDateRange = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDate.getDate()}${getOrdinalSuffix(
        startDate.getDate()
      )} - ${endDate.getDate()}${getOrdinalSuffix(endDate.getDate())} ${format(
        endDate,
        'MMM'
      )}`
    }
    return `${startDate.getDate()}${getOrdinalSuffix(
      startDate.getDate()
    )} ${format(startDate, 'MMM')} - ${endDate.getDate()}${getOrdinalSuffix(
      endDate.getDate()
    )} ${format(endDate, 'MMM')}`
  }

  const displayDate = () => {
    if (cardItem.startDate && cardItem.endDate) {
      return formatDateRange(cardItem.startDate, cardItem.endDate)
    } else if (cardItem.startDate) {
      return formatStartDate(cardItem.startDate)
    }
    return ''
  }

  const daysUntilEvent = calculateDaysUntilEvent(cardItem.startDate)
  const isPastEvent = daysUntilEvent < 0
  const isLiveEvent =
    cardItem.startDate &&
    cardItem.endDate &&
    isDateInRange(cardItem.startDate, cardItem.endDate)

  return (
    <div
      className="relative px-4 pt-4 mb-4 rounded-md group flex flex-col lg:flex-row bg-gradient-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md transform transition-transform duration-300 hover:scale-105 transform-origin-center overflow-hidden"
      onMouseEnter={() => onHover(cardItem.index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col lg:w-1/3">
        {cardItem.image && (
          <div className="relative h-36 w-full mb-3">
            <Image
              src={cardItem.image}
              alt={cardItem.headline}
              className="object-cover"
              layout="fill"
            />
          </div>
        )}
      </div>
      <div className="flex-grow flex flex-col pl-4 overflow-hidden py-4">
        <h3 className="font-tuner text-2xl mb-1 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          {cardItem.headline}
        </h3>
        <div className="flex items-center text-md">
          <p className="mr-2">{displayDate()}</p>
          {isLiveEvent ? (
            <span className="bg-teal-100 px-2 rounded text-sm text-teal-700 shadow-lg opacity-60">LIVE</span>
          ) : isPastEvent ? (
            <span className="bg-slate-200 px-2 rounded text-sm text-gray-700 shadow-lg opacity-60">DONE</span>
          ) : (
            <span className="bg-teal-100 px-2 rounded text-sm text-teal-700 shadow-lg opacity-60">
              {daysUntilEvent} DAY{daysUntilEvent > 1 ? 'S' : ''} TO GO
            </span>
          )}
        </div>
        <p className="text-gray-500 text-md">{cardItem.location}</p>
        <Link href={cardItem.link || '#'}>
          <p className="font-tuner pt-1 pr-4 text-md bg-gradient-to-br from-blue-700 via-blue-850 to-blue-1000 bg-clip-text text-transparent inline-flex items-center">
            Read more
            <FaChevronRight className="text-md text-blue-700 ml-1 mb-1" />
          </p>
        </Link>
      </div>
      <div className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  )
}

const EventsBlock = ({ data, index }) => {
  const [activeGlobeId, setActiveGlobeId] = useState(null)
  const [isGlobeVisible, setIsGlobeVisible] = useState(false)
  const globeContainerRef = useRef(null)

  if (!data || !data.cardItems) return null

  data.cardItems.forEach((cardItem, idx) => {
    cardItem.index = idx
  })

  useEffect(() => {
    //TODO: We are not sure why but without this the lazy loading gets hydration errors
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGlobeVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (globeContainerRef.current) {
      observer.observe(globeContainerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="md:px-18 lg:px-10 px-3 md:w-4/5 lg:w-5/6 w-full mx-auto pb-4 pt-8">
      <h1 className="pl-3 font-tuner flex items-center justify-center text-3xl lg:text-5xl lg:leading-tight bg-gradient-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-left mt-10 pb-12">
        {data.title}
      </h1>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div
          className="w-full hidden md:flex lg:w-1/2 flex justify-center items-center rounded-lg"
          ref={globeContainerRef}
        >
          {isGlobeVisible && (
            <Suspense
              fallback={
                <div className="font-tuner text-2xl">Loading Globe...</div>
              }
            >
              <LazyGlobe
                activeGlobeId={activeGlobeId}
                cardItems={data.cardItems}
              />
            </Suspense>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          {data.cardItems.map((cardItem, idx) => (
            <Card
              key={`${index}-${idx}`}
              cardItem={cardItem}
              onHover={setActiveGlobeId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { EventsBlock as VerticalCardsBlock }
