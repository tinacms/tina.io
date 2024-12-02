import { useEffect, useRef, useState } from 'react';
import { Layout } from 'components/layout';
import { GetStaticProps } from 'next';
import { useTina } from 'tinacms/dist/react';
import { client } from '../tina/__generated__/client';
import { Card } from 'components/blocks/Events/Events';

const EventsPageHeader = ({ title, byline }) => {
  return (
    <div className="text-center mx-auto">
      <h1 className="pt-20 pb-5 text-4xl font-tuner bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <div>
        <p className="text-gray-800 w-2/3 mx-auto break-words">{byline}</p>
      </div>
    </div>
  );
};

const EventsPage = (props: { query: string; data: any; vars: any }) => {
  const tinaData = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  });

  const events = tinaData.data.eventsConnection?.edges.map(
    (edge: any) => edge.node
  );
  const eventsData = events[0];

  const now = new Date();

  //Filtering and sorting by time to go (ASC)
  const upComingEvents = eventsData.cardItems
    .filter((event) => {
      const eventStartDate = new Date(event.startDate);
      return eventStartDate.getTime() >= now.getTime();
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

//Filter and sorting by time passed (ASC)
  const pastEvents = eventsData.cardItems
    .filter((event) => {
      const eventStartDate = new Date(event.startDate);
      return eventStartDate.getTime() < now.getTime();
    })
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
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
      threshold: 0.2, // Trigger animation when 20% of the card is visible
    });

    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [visibleCards]);

  return (
    <Layout>
      <div className="mx-auto mb-40">
        <EventsPageHeader title={eventsData.title} byline={eventsData.byLine} />
        <div className="px-10 pt-10">
          <div className="pb-5 font-bold bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent text-center">
            UPCOMING EVENTS
          </div>
          {upComingEvents.map((cardItem, index) => (
            <div
              key={index}
              data-id={`upcoming-${index}`}
              className={`event-card transform transition duration-500 ${
                visibleCards.includes(`upcoming-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card cardItem={{ ...cardItem }} onHover={() => {}} />
            </div>
          ))}
        </div>
        <div className="px-10 pt-10">
          <div className="pb-5 font-bold bg-gradient-to-br from-blue-600 via-blue-800 to-blue-1000 bg-clip-text text-transparent text-center">
            PAST EVENTS
          </div>
          {pastEvents.map((cardItem, index) => (
            <div
              key={index}
              data-id={`past-${index}`}
              className={`event-card transform transition duration-500 ${
                visibleCards.includes(`past-${index}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Card cardItem={{ ...cardItem }} onHover={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const vars = {};

  const res = await client.queries.eventsConnection({});

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  };
};

export default EventsPage;
