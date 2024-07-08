import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronRight } from 'react-icons/fa'

const BookingCard = ({ cardItem }) => {
  const isValidImage = (url) => {
    return url && (url.startsWith('http') || url.startsWith('/'))
  }

  return (
    <Link href={cardItem.url || '#'}>
      <div className="relative p-2 pl-8 mb-4 rounded-md group flex flex-col md:flex-row lg:flex-row w-full h-full items-center justify-between rounded-lg border border-input bg-background p-4 shadow transition transform duration-200 hover:scale-105 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-blue-800 hover:text-blue-700">
        {isValidImage(cardItem.image) && (
          <Image
            src={cardItem.image}
            alt={`${cardItem.name} Portrait`}
            className="hidden md:block w-24 h-24 rounded-full mr-4"
            width={72}
            height={72}
          />
        )}
        <div className="flex-grow text-center md:text-left lg:pl-4 lg:text-left">
          <div className="font-medium text-3xl">{cardItem.name}</div>
          <div className="text-muted-foreground text-md">
            {cardItem.description}
          </div>
        </div>
        <div className="flex-shrink-0">
          <FaChevronRight className="h-10 w-10 text-muted-foreground pr-6" />
        </div>
      </div>
    </Link>
  )
}

const BookingBlock = ({  data, index } ) => {
  const [activeCardId, setActiveCardId] = useState(null)

  if (!data || !data.bookingCard) return null

  data.bookingCard.forEach((cardItem, idx) => {
    cardItem.index = idx
  })

  return (
    <div className="flex justify-center">
      <div className="my-18 w-1/2 p-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <div className="step-indicator flex items-center">
              <div className="step flex flex-col items-center relative z-10">
                <div className="step-icon w-6 h-6 border-2 border-orange-300 flex items-center justify-center rounded-full"></div>
                <p className="text-center absolute bottom-[-20px] text-xs whitespace-nowrap">
                  CHOOSE LOCATION
                </p>
              </div>
              <div className="indicator-line h-0.5 w-40 bg-gray-300"></div>
              <div className="step flex flex-col items-center relative z-10">
                <div className="step-icon w-6 h-6 bg-none border-2 border-gray-300 text-white flex items-center justify-center rounded-full"></div>
                <p className="text-center absolute bottom-[-20px] text-xs whitespace-nowrap">
                  CHOOSE TIME
                </p>
              </div>
              <div className="indicator-line h-0.5 w-40 bg-gray-300"></div>
              <div className="step flex flex-col items-center relative z-10">
                <div className="step-icon w-6 h-6 bg-none border-2 border-gray-300 flex items-center justify-center rounded-full"></div>
                <p className="text-center absolute bottom-[-20px] text-xs whitespace-nowrap">
                  YOUR INFO
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-3 my-16 px-12 py-12 bg-gradient-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md rounded-lg">
            <h1 className="w-full text-center inline-block m-0 md:text-4xl font-tuner lg:text-4xl md:text-2xl whitespace-nowrap lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Choose Your Location
            </h1>
            <h3 className="w-full text-center mb-6 inline-block m-0 pb-4 text-lg whitespace-nowrap lg:leading-tight text-black">
              Book a meeting with a 🦙TinaCMS expert in your timezone{' '}
            </h3>
            {data.bookingCard.map((cardItem, idx) => (
              <BookingCard
                key={idx}
                cardItem={cardItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { BookingBlock }
