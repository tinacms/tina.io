import Image from 'next/image';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  LABEL,
  SECTION_TITLE,
  SURFACE,
} from '@/component/styles/typography';
import { TextLink } from '@/component/ui/TextLink';
import eventsData from '../../../content/events/master-events.json';
import {
  calculateEventStatus,
  calculateEventTimes,
  calculateEventYear,
  formatEventDate,
} from './dates-calculations';

const EVENT_CHIP = `${LABEL} border px-2 mb-1.5 rounded shadow-lg w-fit`;

const LazyGlobe = React.lazy(() => import('../../ui/Globe'));

const GlobeFallback = () => (
  <div
    style={{ width: '100%', height: '700px' }}
    className="flex items-center justify-center"
  >
    <Image
      src="/img/tina-404-not-found.webp"
      alt="Tina events around the world"
      width={500}
      height={500}
      style={{ objectFit: 'contain' }}
    />
  </div>
);

class GlobeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <GlobeFallback />;
    }
    return this.props.children;
  }
}

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
          <span className={`${SURFACE.info} ${EVENT_CHIP}`}>Event Started</span>
        ) : isLiveOrPastEvent ? (
          <span className={`${SURFACE.neutralSolid} ${EVENT_CHIP}`}>
            Event Finished
          </span>
        ) : (
          <span className={`${SURFACE.info} ${EVENT_CHIP}`}>
            {hoursUntilEvent >= 24
              ? `${Math.floor(hoursUntilEvent / 24)} Day${
                  hoursUntilEvent >= 48 ? 's' : ''
                } to go`
              : `${hoursUntilEvent} Hour${
                  hoursUntilEvent > 1 ? 's' : ''
                } to go`}
          </span>
        )}
        <h3 className={`${CARD_TITLE} mb-1`}>{cardItem.headline}</h3>
        <div className="flex items-center">
          <p className={`${BODY_MUTED} mr-2`}>
            {formattedDate} {endYear}
          </p>
        </div>
        <p className={BODY_SMALL}>{cardItem.location}</p>
        <TextLink href={cardItem.link} className="self-start">
          Read more
          <span className="sr-only">about {cardItem.headline}</span>
        </TextLink>
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
      <h2 className={`${SECTION_TITLE} inline-block text-center`}>
        {eventsData.title}
      </h2>
      <div className="max-w-[62ch] mx-auto">
        <p className={`${BODY} text-center`}>{eventsData.byLine}</p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div
          className="w-full hidden md:flex lg:w-1/2 justify-center items-center rounded-lg"
          ref={globeContainerRef}
        >
          {isGlobeVisible && (
            <GlobeErrorBoundary>
              <Suspense
                fallback={<div className={BODY_MUTED}>Loading Globe...</div>}
              >
                <LazyGlobe
                  activeGlobeId={activeGlobeId}
                  cardItems={filteredEvents}
                />
              </Suspense>
            </GlobeErrorBoundary>
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

          <TextLink href="/events" className="pl-4 pt-10">
            See all events
          </TextLink>
        </div>
      </div>
    </div>
  );
};

export { EventsBlock as VerticalCardsBlock };
