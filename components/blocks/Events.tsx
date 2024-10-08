import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import { start } from 'repl';

const LazyGlobe = React.lazy(() => import('../ui/Globe'));

const Card = ({ cardItem, onHover }) => {
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
    startTimeDate = new Date(+cardItem.startTime)
  }

  const startTime = startTimeDate.getUTCHours() + (startTimeDate.getUTCMinutes() / 60);

  //Gets the accurate start date-time in UTC, by applying the offset and event start time.
  //Note that getting UTC minutes is actually getting the time in the event timezone, based on how the values are being stored.
  const startDateUTC = new Date(Date.parse(cardItem.startDate));
  startDateUTC.setUTCMinutes(
    startDateUTC.getUTCMinutes() +
      cardItem.timezone * -60 +
      startTime * 60
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
          <p className="font-tuner pt-1 pr-4 text-md bg-gradient-to-br from-blue-700 via-blue-850 to-blue-1000 bg-clip-text text-transparent inline-flex items-center">
            Read more
            <FaChevronRight className="text-md text-blue-700 ml-1 mb-1" />
          </p>
        </Link>
      </div>
      <div className="absolute inset-0 rounded-md z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

const EventsBlock = ({ data, index }) => {
  const [activeGlobeId, setActiveGlobeId] = useState(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const globeContainerRef = useRef(null);

  if (!data || !data.cardItems) return null;

  data.cardItems.forEach((cardItem, idx) => {
    cardItem.index = idx;
  });

  useEffect(() => {
    //TODO: We are not sure why but without this the lazy loading gets hydration errors
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsGlobeVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (globeContainerRef.current) {
      observer.observe(globeContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
  );
};

export { EventsBlock as VerticalCardsBlock };
