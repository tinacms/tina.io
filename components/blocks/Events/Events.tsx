import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import eventsData from '../../../content/events/master-events.json';

const LazyGlobe = React.lazy(() => import('../../ui/Globe'));

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

const shortDateFormat = (start, end?): string => {
  //Gets the start date in the event time, which is "UTC" from how it's stored
  const startDay = `${
    new Date(start).getDate() + getOrdinalSuffix(new Date(start).getDate())
  }`;
  const startMonth = format(new Date(start), 'MMM');
  //Gets the end date in the event time, which is "UTC" from how it's stored
  const endDateAndHyphen = end
    ? ` - ${
        new Date(end).getDate() + getOrdinalSuffix(new Date(end).getDate())
      }`
    : '';
  const endMonth = end ? format(new Date(end), 'MMM') : '';
  //Formats the dates into a single string
  return `${startDay} ${
    startMonth == endMonth ? '' : startMonth
  }${endDateAndHyphen} ${endMonth ?? startMonth}`;
};

const parseStartTime = (startTime: string | number): Date => {
  let startTimeDate = new Date(startTime);

  if (startTimeDate.toString() === 'Invalid Date') {
    if (typeof startTime === 'string' && startTime.includes(':')) {
      const [hours, minutes] = startTime.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        startTimeDate = new Date();
        startTimeDate.setHours(hours, minutes, 0, 0);
      }
    } else {
      startTimeDate = new Date(+startTime);
    }
  }

  return startTimeDate;
};

const calculateEventTimes = (
  cardItem: any,
  useLocalTimezone: boolean = true
) => {
  const startTimeDate = parseStartTime(cardItem.startTime);
  const startTime =
    startTimeDate.getUTCHours() + startTimeDate.getUTCMinutes() / 60;

  // Calculate start date in UTC
  const startDateUTC = new Date(Date.parse(cardItem.startDate));
  startDateUTC.setUTCMinutes(
    startDateUTC.getUTCMinutes() + cardItem.timezone * -60 + startTime * 60
  );

  // Calculate end date in UTC
  const endDateUTC = new Date(
    Date.parse(cardItem.endDate ?? cardItem.startDate)
  );
  endDateUTC.setUTCMinutes(
    endDateUTC.getUTCMinutes() + cardItem.timezone * -60 + 24 * 60
  );

  if (useLocalTimezone) {
    const userTimezone = getUserTimezoneOffset();
    const timezoneDiff = userTimezone - cardItem.timezone;

    // Convert start date to local timezone
    const localStartDate = new Date(startDateUTC);
    localStartDate.setHours(localStartDate.getHours() + timezoneDiff);

    // Convert end date to local timezone
    const localEndDate = new Date(endDateUTC);
    localEndDate.setHours(localEndDate.getHours() + timezoneDiff);

    return {
      startDateUTC: localStartDate,
      endDateUTC: localEndDate,
      originalStartDate: startDateUTC,
      originalEndDate: endDateUTC,
    };
  }

  return {
    startDateUTC,
    endDateUTC,
    originalStartDate: startDateUTC,
    originalEndDate: endDateUTC,
  };
};

const calculateEventStatus = (startDateUTC: Date, endDateUTC: Date) => {
  const hoursUntilEvent = Math.ceil(
    (startDateUTC.getTime() - new Date().getTime()) / 36e5
  );
  const hoursUntilEventEnd = Math.ceil(
    (endDateUTC.getTime() - new Date().getTime()) / 36e5
  );

  return {
    hoursUntilEvent,
    hoursUntilEventEnd,
    isLiveOrPastEvent: hoursUntilEvent < 0,
    isLiveEvent: hoursUntilEvent <= 0 && hoursUntilEventEnd > 0,
  };
};

const formatTimeString = (timeString: string): string => {
  if (timeString.includes('T')) {
    const timePart = timeString.split('T')[1].split(':').slice(0, 2).join(':');
    const [hours, minutes] = timePart.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  } else if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
  return '';
};

const formatLocalDateTime = (date: Date, timezone: number): string => {
  const localDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const localHours = date.getHours();
  const localMinutes = date.getMinutes();
  const localAmpm = localHours >= 12 ? 'PM' : 'AM';
  const localHours12 = localHours % 12 || 12;
  return `${localDate} ${localHours12}:${localMinutes
    .toString()
    .padStart(2, '0')} ${localAmpm}`;
};

const getUserTimezoneOffset = (): number => {
  return -new Date().getTimezoneOffset() / 60;
};

const convertToLocalTimezone = (date: Date, eventTimezone: number): Date => {
  const userTimezone = getUserTimezoneOffset();
  const timezoneDiff = userTimezone - eventTimezone;

  const localDate = new Date(date);
  localDate.setHours(localDate.getHours() + timezoneDiff);
  return localDate;
};

const formatEventDate = (
  cardItem: any,
  useLocalTimezone: boolean = true
): string => {
  if (!cardItem.startDate) return '';

  let timeString = '';
  let localDateTimeString = '';
  let localEndDateTimeString = '';

  if (cardItem.startTime) {
    timeString = formatTimeString(cardItem.startTime);

    // Convert start time to local time
    const eventDate = new Date(cardItem.startDate);
    const [hours, minutes] = cardItem.startTime.includes('T')
      ? cardItem.startTime.split('T')[1].split(':').map(Number)
      : cardItem.startTime.split(':').map(Number);

    // Set the time in the event's timezone
    eventDate.setUTCHours(hours - cardItem.timezone, minutes, 0, 0);

    // Convert to user's local timezone if requested
    const displayDate = useLocalTimezone
      ? convertToLocalTimezone(eventDate, cardItem.timezone)
      : eventDate;

    localDateTimeString = formatLocalDateTime(displayDate, cardItem.timezone);

    // Convert end date to local time if end date exists
    if (cardItem.endDate) {
      const endDate = new Date(cardItem.endDate);
      endDate.setUTCHours(23 - cardItem.timezone, 59, 0, 0);

      // Convert to user's local timezone if requested
      const displayEndDate = useLocalTimezone
        ? convertToLocalTimezone(endDate, cardItem.timezone)
        : endDate;

      localEndDateTimeString = formatLocalDateTime(
        displayEndDate,
        cardItem.timezone
      );
    }
  }

  return shortDateFormat(localDateTimeString, localEndDateTimeString);
};

const calculateEventYear = (
  cardItem: any,
  useLocalTimezone: boolean = true
): number => {
  const startDate = new Date(cardItem.startDate);
  const startYear = startDate.getFullYear();

  if (!cardItem.endDate) {
    return startYear;
  }

  const endDate = new Date(cardItem.endDate);

  if (useLocalTimezone) {
    // Convert to user's local timezone
    const userTimezone = getUserTimezoneOffset();
    const timezoneDiff = userTimezone - cardItem.timezone;

    const localEndDate = new Date(endDate);
    localEndDate.setHours(localEndDate.getHours() + timezoneDiff);
    return localEndDate.getFullYear();
  }

  return endDate.getFullYear();
};

export const Card = ({ cardItem, onHover }) => {
  const { startDateUTC, endDateUTC } = calculateEventTimes(cardItem);
  const {
    hoursUntilEvent,
    hoursUntilEventEnd,
    isLiveOrPastEvent,
    isLiveEvent,
  } = calculateEventStatus(startDateUTC, endDateUTC);

  const startDate = new Date(startDateUTC);
  const startYear = startDate.getFullYear();
  const endYear = calculateEventYear(cardItem);

  return (
    <div
      className="relative px-4 pt-4 mb-4 rounded-md group flex flex-col lg:flex-row bg-linear-to-br from-white/25 via-white/50 to-white/75 break-inside-avoid shadow-md transform transition-transform duration-300 hover:scale-105 transform-origin-center overflow-hidden"
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
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/events/default.jpg';
              }}
            />
          </div>
        )}
      </div>
      <div className="grow flex flex-col pl-4 overflow-hidden py-4">
        <h3 className="font-ibm-plex text-2xl mb-1 bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          {cardItem.headline}
        </h3>
        <div className="flex items-center text-md">
          <p className="mr-2">
            {formatEventDate(cardItem)} {endYear}
          </p>
          {isLiveEvent ? (
            <span className="bg-teal-100 px-2 rounded text-sm text-teal-700 shadow-lg opacity-60">
              LIVE
            </span>
          ) : isLiveOrPastEvent ? (
            <span className="bg-slate-200 px-2 rounded text-sm text-gray-700 shadow-lg opacity-60">
              DONE
            </span>
          ) : (
            <span className="bg-teal-100 px-2 rounded text-sm text-teal-700 shadow-lg opacity-60">
              {hoursUntilEvent >= 24
                ? `${Math.floor(hoursUntilEvent / 24)} DAY${
                    hoursUntilEvent >= 48 ? 'S' : ''
                  } TO GO`
                : `${hoursUntilEvent} HOUR${
                    hoursUntilEvent > 1 ? 'S' : ''
                  } TO GO`}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-md">{cardItem.location}</p>
        <Link href={cardItem.link || '#'}>
          <p className="font-ibm-plex pt-1 pr-4 text-md bg-linear-to-br from-blue-700 via-blue-850 to-blue-1000 bg-clip-text text-transparent inline-flex items-center">
            Read more
            <FaChevronRight className="text-md text-blue-700 ml-1 mb-1" />
          </p>
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
          {filteredEvents.map((cardItem, index) => (
            <Card
              key={index}
              cardItem={{ ...cardItem, index }}
              onHover={setActiveGlobeId}
            />
          ))}
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
