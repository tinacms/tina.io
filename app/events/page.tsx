import { client } from 'tina/__generated__/client';
import EventsClient from './EventsClient';

export async function generateMetadata() {
  const vars = {};
  const { data } = await fetchEvents(vars);
  const nodesData = data.eventsConnection.edges.map((edge: any) => edge.node)
  const eventsSEOData = nodesData[0].seo
  
  return {
    title: eventsSEOData.title,
    description: eventsSEOData.description,
    openGrah: {
      title: eventsSEOData.title,
      description: eventsSEOData.description,
      type: 'website',
      locale: 'en_CA',
      site_name: 'https://tina.io/events',
      images: [
        {
          url: 'https://tina.io/img/tina-og.png',
          width: 1200,
          height: 628,
          alt: `Tina - The Markdown CMS`,
        },
      ],
    }
  }
}

export default async function EventsPage() {
  const vars = {};

  const { data, query } = await fetchEvents(vars);

  return <EventsClient query={query} data={data} vars={vars} />;
}

const fetchEvents = async (vars = {}) => {
  const res = await client.queries.eventsConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
