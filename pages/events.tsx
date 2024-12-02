import { Layout } from 'components/layout';
import { GetStaticProps } from 'next';
import { useTina } from 'tinacms/dist/react';
import { client } from '../tina/__generated__/client';

const EventsPage = (props: { query: string; data: any; vars: any }) => {
  const tinaData = useTina({
    query: props.query,
    data: props.data,
    variables: props.vars,
  });
  const events = tinaData.data.eventsConnection?.edges.map((edge: any) => edge.node);
  const eventsData = events[0];
  console.log(eventsData);
  return (
    <Layout>
      <h1>Events</h1>
      {events?.map((event: any, index: number) => (
        <div key={index}>
          <h2>{event._sys.filename}</h2>
          <p>{event._sys.path}</p>
          <p>ID: {event.id}</p>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const vars = {}; // Variables if required for future extensions

  const res = await client.queries.eventsConnection({
    last: 10, // Fetch the last 10 events
  });

  return {
    props: {
      query: res.query,
      data: res.data,
      vars,
    },
  };
};

export default EventsPage;
