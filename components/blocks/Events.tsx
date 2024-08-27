import React, { useState, Suspense, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

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

  return (
    <div
      className="relative p-4 mb-4 rounded-md group flex flex-col lg:flex-row bg-gradient-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md transform transition-transform duration-300 hover:scale-105 transform-origin-center"
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
      <div className="flex-grow flex flex-col pl-4">
        <h3 className="font-bold text-2xl mb-1">{cardItem.headline}</h3>
        <p className="text-gray-500 text-sm">{displayDate()}</p>
        <p className="text-gray-500 text-sm">{cardItem.location}</p>
        <Link href={cardItem.link || '#'}>
          <p className="text-orange-500 underline pt-1 pr-4 text-sm">
            Read more
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
    <div className="md:px-18 lg:px-18 px-3 md:w-4/5 lg:w-5/6 w-full mx-auto pb-4 pt-8">
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
