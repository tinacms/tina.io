import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import eventsData from '../../../content/events/master-events.json';
import {
  calculateEventStatus,
  calculateEventTimes,
  calculateEventYear,
  formatEventDate,
} from './dates-calculations';

const LazyGlobe = React.lazy(() => import('../../ui/Globe'));

export const Card = ({ cardItem, onHover }) => {
  // By default, dates are shown in the client's timezone.
  // To display dates in the stored timezone instead, pass `false` as the parameter
  // i.e  const { startDate, endDate } = calculateEventTimes(cardItem, false);
  const { startDate, endDate } = calculateEventTimes(cardItem);
  const {
    hoursUntilEvent,
    hoursUntilEventEnd,
    isLiveOrPastEvent,
    isLiveEvent,
  } = calculateEventStatus(startDate, endDate);

  const endYear = calculateEventYear(startDate, endDate);

  return (
    <div
      className="relative px-4 py-4 rounded-md group flex flex-col lg:gap-8 lg:flex-row bg-linear-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md transform transition-transform duration-300 hover:scale-105 transform-origin-center overflow-hidden"
      onMouseEnter={() => onHover(cardItem.index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col lg:w-2/5">
        {cardItem.image && (
          <div className="relative h-40 w-full mb-1.5 rounded-xl">
            <Image
              src={cardItem.image}
              alt={cardItem.headline}
              className="object-cover rounded-lg"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/events/default.jpg';
              }}
            />
          </div>
        )}
      </div>
      <div className="grow flex flex-col overflow-hidden py-2">
        {isLiveEvent ? (
          <span className="bg-[#0574E4] px-2 mb-1.5 rounded text-sm text-white font-semibold shadow-lg w-fit ">
            Event Started
          </span>
        ) : isLiveOrPastEvent ? (
          <span className="bg-slate-500 px-2 mb-1.5 rounded text-sm text-white font-semibold shadow-lg w-fit">
            Event Finished
          </span>
        ) : (
          <span className="bg-[#0574E4] px-2 mb-1.5 rounded text-sm text-white font-semibold shadow-lg w-fit">
            {hoursUntilEvent >= 24
              ? `${Math.floor(hoursUntilEvent / 24)} Day${
                  hoursUntilEvent >= 48 ? 's' : ''
                } to go`
              : `${hoursUntilEvent} Hour${
                  hoursUntilEvent > 1 ? 's' : ''
                } to go`}
          </span>
        )}
        <h3 className={`font-ibm-plex text-2xl mb-1 ${isLiveOrPastEvent ? 'text-black' : 'bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent'}`}>
          {cardItem.headline}
        </h3>
        <div className={`flex items-center text-md ${isLiveOrPastEvent ? 'text-gray-500' : 'text-black'}`}>
          <p className="mr-2">
            {/* By default, dates are shown in the client's timezone.
            To display dates in the stored timezone instead, pass `false` as the parameter 
            i.e  formatEventDate(cardItem, false) */}
            {formatEventDate(cardItem)} {endYear}
          </p>
        </div>
        <p className={`text-md ${isLiveOrPastEvent ? 'text-gray-500' : 'text-black'}`}>{cardItem.location}</p>
        <Link href={cardItem.link || '#'} className="flex items-center gap-1 pt-1">
          <p className="font-ibm-plex text-md bg-linear-to-br from-blue-700 via-blue-850 to-blue-1000 bg-clip-text text-transparent inline-flex items-center">
            Read more
          </p>
          <FaChevronRight className="text-sm text-blue-700" />
        </Link>
      </div>
      <div className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

const EventsBlock = () => {
  const [activeGlobeId, setActiveGlobeId] = useState(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const globeContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGlobeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (globeContainerRef.current) observer.observe(globeContainerRef.current);

    return () => observer.disconnect();
  }, []);

  const now = new Date();

  // Filter and sort the events
  let filteredEvents = eventsData.cardItems
    .filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(
        event.endDate?.split('T')[0] ?? event.startDate.split('T')[0]
      );
      return (
        startDate >= now || // Upcoming events
        (startDate <= now && endDate >= now) // Currently ongoing events
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    ) // Sort by start date
    .slice(0, 3); // Take only the first 3 events

  // If there are no events planned - show last 3
  if (filteredEvents.length === 0 && eventsData?.cardItems?.length > 3) {
    filteredEvents = eventsData.cardItems.slice(
      eventsData?.cardItems?.length - 3,
      eventsData?.cardItems?.length
    );
  }


  return (
    <div className="max-w-[1500px] md:px-18 lg:px-10 px-3 md:w-4/5 lg:w-5/6 w-full mx-auto pb-4 pt-8">
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div
          className="w-full hidden md:flex lg:w-1/2 justify-center items-center rounded-lg"
          ref={globeContainerRef}
        >
          {isGlobeVisible && (
            <Suspense
              fallback={
                <div className="font-ibm-plex text-2xl">Loading Globe...</div>
              }
            >
              <LazyGlobe
                activeGlobeId={activeGlobeId}
                cardItems={filteredEvents}
              />
            </Suspense>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/2 justify-start">
          <h2 className="pb-6 pl-3 font-ibm-plex inline w-fit m-auto lg:m-0 text-3xl lg:text-5xl lg:leading-tight bg-linear-to-br from-blue-600/80 via-blue-800/80 to-blue-1000 bg-clip-text text-transparent text-balance text-center mt-10">
            {eventsData.title}
          </h2>
          <div className="flex flex-col gap-4">
            {filteredEvents.map((cardItem, index) => (
              <Card
                key={index}
                cardItem={{ ...cardItem, index }}
                onHover={setActiveGlobeId}
              />
            ))}
          </div>

          <Link
            href="/events"
            className="pt-10 font-bold flex items-center justify-end gap-2"
          >
            <span className="bg-linear-to-br text-md from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-700 hover:to-orange-800  bg-clip-text text-transparent">
              SEE ALL EVENTS
            </span>
            <FaArrowRight className="text-orange-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { EventsBlock as VerticalCardsBlock };
