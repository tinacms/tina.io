'use client';

import { Card } from 'components/blocks/Events/Events';
import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';

const EventsPageHeader = ({
  title,
  byline,
}: {
  title: string;
  byline: string;
}) => {
  return (
    <div className="text-center mx-auto py-10">
      <h1 className={`${H1_HEADINGS_SIZE} font-ibm-plex `}>{title}</h1>

      <p className="text-gray-800 w-2/3 mx-auto break-words py-6">{byline}</p>
    </div>
  );
};

export default function EventsClient({
  query,
  data,
  vars,
}: {
  query: string;
  data: any;
  vars: any;
}) {
  const tinaData = useTina({
    query,
    data,
    variables: vars,
  });

  const now = new Date();

  // Extract events data
  const events = tinaData.data.eventsConnection.edges.map(
    (edge: any) => edge.node,
  );
  const eventsData = events[0];

  // Filter and sort upcoming events
  const upComingEvents = eventsData.cardItems
    .filter((event) => new Date(event.startDate).getTime() >= now.getTime())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

  // Filter and sort past events
  const pastEvents = eventsData.cardItems
    .filter((event) => new Date(event.startDate).getTime() < now.getTime())
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );

  const [visibleCards, setVisibleCards] = useState<string[]>([]);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-id');
        if (id && !visibleCards.includes(id)) {
          setVisibleCards((prev) => [...prev, id]);
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO>
  }, [handleIntersection]);

  return (
    <div className="mx-auto mb-40">
      <EventsPageHeader title={eventsData.title} byline={eventsData.byLine} />
      <div className="px-10 pt-10">
        <div className="pb-5 font-bold bg-linear-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent text-center">
          UPCOMING EVENTS
        </div>
        {upComingEvents.map((cardItem, index) => (
          <div
            key={cardItem.title}
            data-id={`upcoming-${index}`}
            className={`event-card transform transition duration-500 ${
              visibleCards.includes(`upcoming-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Card cardItem={{ ...cardItem }} onHover={() => {}} />
          </div>
        ))}
      </div>
      <div className="px-10 pt-10">
        <div className="pb-5 font-bold bg-linear-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent text-center">
          PAST EVENTS
        </div>
        {pastEvents.map((cardItem, index) => (
          <div
            key={cardItem.title}
            data-id={`past-${index}`}
            className={`event-card transform transition duration-500 ${
              visibleCards.includes(`past-${index}`)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Card cardItem={{ ...cardItem }} onHover={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
