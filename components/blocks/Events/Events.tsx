import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import eventsData from '../../../content/events/master-events.json';

const LazyGlobe = React.lazy(() => import('../../ui/Globe'));

export const Card = ({ cardItem, onHover }) => {
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const dateFormat = (start, end?): string => {
    //Gets the start date in the event time, which is "UTC" from how it's stored
    const startDay = `${
      new Date(start).getUTCDate() +
      getOrdinalSuffix(new Date(start).getUTCDate())
    }`;
    const startMonth = format(new Date(start), 'MMM');
    //Gets the end date in the event time, which is "UTC" from how it's stored
    const endDateAndHyphen = end
      ? ` - ${
          new Date(end).getUTCDate() +
          getOrdinalSuffix(new Date(end).getUTCDate())
        }`
      : '';
    const endMonth = end ? format(new Date(end), 'MMM') : '';
    //Formats the dates into a single string
    return `${startDay} ${
      startMonth == endMonth ? '' : startMonth
    }${endDateAndHyphen} ${endMonth ?? startMonth}`;
  };

  const displayDate = () => {
    if (cardItem.startDate) {
      return dateFormat(cardItem.startDate, cardItem.endDate);
    }
    return '';
  };

  let startTimeDate = new Date(cardItem.startTime);
  //This is to debug an issue with interaction between react-datetime (time picker) and tina.
  //The date is locally stored as a number (timestamp), even when the saved value in /content is the expected (i.e. a string).
  //This is to handle the local case until the user refreshes.
  if (startTimeDate.toString() === 'Invalid Date') {
    startTimeDate = new Date(+cardItem.startTime);
  }

  const startTime =
    startTimeDate.getUTCHours() + startTimeDate.getUTCMinutes() / 60;

  //Gets the accurate start date-time in UTC, by applying the offset and event start time.
  //Note that getting UTC minutes is actually getting the time in the event timezone, based on how the values are being stored.
  const startDateUTC = new Date(Date.parse(cardItem.startDate));
  startDateUTC.setUTCMinutes(
    startDateUTC.getUTCMinutes() + cardItem.timezone * -60 + startTime * 60
  );
  //Gets the provided end date at midnight in UTC, or for one day events the start date is re-used.
  const endDateUTC = new Date(
    Date.parse(cardItem.endDate ?? cardItem.startDate)
  );
  endDateUTC.setUTCMinutes(
    endDateUTC.getUTCMinutes() + cardItem.timezone * -60 + 24 * 60
  );
  //Calculate the hours until the event/event end by subtracting start and end dates (in UTC) against the current local time (in UTC).
  const hoursUntilEvent = Math.ceil(
    (startDateUTC.getTime() - new Date().getTime()) / 36e5
  );
  const hoursUntilEventEnd = Math.ceil(
    (endDateUTC.getTime() - new Date().getTime()) / 36e5
  );

  const isLiveOrPastEvent = hoursUntilEvent < 0;
  const isLiveEvent = hoursUntilEvent <= 0 && hoursUntilEventEnd > 0;
  const startDate = new Date(cardItem.startDate);
  const startYear = startDate.getFullYear();

  const endYear = cardItem.endDate
    ? new Date(cardItem.endDate).getFullYear()
    : startYear;

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
            {displayDate()} {endYear}
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
      const endDate = new Date(event.endDate ?? event.startDate);
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
