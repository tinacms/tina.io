import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import eventsData from '../../../content/events/master-events.json';
import {
  calculateEventStatus,
  calculateEventTimes,
  calculateEventYear,
  formatEventDate,
} from './dates-calculations';

const LazyGlobe = React.lazy(() => import('../../ui/Globe'));

export const Card = ({ cardItem, onHover }) => {
  const [formattedDate, setFormattedDate] = useState('');
  // By default, dates are shown in the client's timezone.
  // To display dates in the stored timezone instead, pass `false` as the parameter
  // i.e  const { startDate, endDate } = calculateEventTimes(cardItem, false);
  const { startDate, endDate } = calculateEventTimes(cardItem);
  const { hoursUntilEvent, isLiveOrPastEvent, isLiveEvent } =
    calculateEventStatus(startDate, endDate);

  const endYear = calculateEventYear(startDate, endDate);

  useEffect(() => {
    setFormattedDate(formatEventDate(cardItem));
  }, [cardItem]);

  return (
    <div
      className="relative px-4 py-4 rounded-xl group flex flex-col lg:gap-8 lg:flex-row bg-linear-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md transform transition-transform duration-300 hover:scale-105 transform-origin-center overflow-hidden"
      onMouseEnter={() => onHover(cardItem.index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col lg:w-2/5">
        {cardItem.image && (
          <div className="relative h-40 w-full mb-1.5 rounded-xl">
            <Image
              src={cardItem.image}
              alt={cardItem.headline}
              className="object-cover rounded-xl"
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 240px"
              quality={60}
              priority={false}
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
        <h3 className="font-ibm-plex text-2xl mb-1 text-black">
          {cardItem.headline}
        </h3>
        <div
          className={`flex items-center text-md ${
            isLiveOrPastEvent ? 'text-gray-500' : 'text-black'
          }`}
        >
          <p className="mr-2">
            {formattedDate} {endYear}
          </p>
        </div>
        <p
          className={`text-md ${
            isLiveOrPastEvent ? 'text-gray-500' : 'text-black'
          }`}
        >
          {cardItem.location}
        </p>
        <Link
          href={cardItem.link}
          className="flex gap-2 pt-2 items-center text-black hover:text-blue-600"
        >
          READ MORE
          <FaArrowRightLong className="text-black hover:text-blue-600 pr-1" />
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
      { threshold: 0.1 },
    );

    if (globeContainerRef.current) {
      observer.observe(globeContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const now = new Date();

  let filteredEvents = eventsData.cardItems
    .filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(
        event.endDate?.split('T')[0] ?? event.startDate.split('T')[0],
      );
      return startDate >= now || (startDate <= now && endDate >= now);
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    ) // Sort by start date
    .slice(0, 3); // Take only the first 3 events

  // If there are no events planned - show last 3
  if (filteredEvents.length === 0 && eventsData?.cardItems?.length > 3) {
    filteredEvents = eventsData.cardItems.slice(
      eventsData?.cardItems?.length - 3,
      eventsData?.cardItems?.length,
    );
  }

  // If there are only 1 or 2 upcoming/live events, add the most recently finished event(s) to make up to 3
  if (filteredEvents.length < 3 && eventsData?.cardItems?.length > 3) {
    // Find past events, sort by endDate descending (most recent first)
    const pastEvents = eventsData.cardItems
      .filter((event) => {
        const endDate = new Date(
          event.endDate?.split('T')[0] ?? event.startDate.split('T')[0],
        );
        return endDate < now;
      })
      .sort(
        (a, b) =>
          new Date(b.endDate ?? b.startDate).getTime() -
          new Date(a.endDate ?? a.startDate).getTime(),
      );

    // Add as many as needed to reach 3
    const needed = 3 - filteredEvents.length;
    filteredEvents = [...filteredEvents, ...pastEvents.slice(0, needed)];
  }

  return (
    <div className="max-w-[1500px] md:px-18 lg:px-10 px-3 md:w-4/5 lg:w-5/6 w-full mx-auto pb-4 pt-8 flex flex-col gap-8">
      <h2
        className={`${H1_HEADINGS_SIZE} font-ibm-plex inline-block lg:leading-tight text-black text-balance text-center`}
      >
        {eventsData.title}
      </h2>
      <div className="max-w-[62ch] mx-auto">
        <p className="text-center text-neutral-text-secondary font-light leading-relaxed text-lg">
          {eventsData.byLine}
        </p>
      </div>

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
          <div className="flex flex-col gap-4">
            {filteredEvents.map((cardItem, index) => (
              <Card
                key={cardItem.headline}
                cardItem={{ ...cardItem, index }}
                onHover={setActiveGlobeId}
              />
            ))}
          </div>

          <Link
            href="/events"
            className="self-end pt-10 font-bold flex items-center w-fit justify-end gap-2 group pr-1"
          >
            <span className="text-black group-hover:text-blue-600">
              SEE ALL EVENTS
            </span>
            <FaArrowRightLong className="text-black group-hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { EventsBlock as VerticalCardsBlock };
