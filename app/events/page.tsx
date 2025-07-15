import { client } from 'tina/__generated__/client';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import EventsClient from './EventsClient';

export async function generateMetadata() {
  const vars = {};
  const { data } = await fetchEvents(vars);
  const nodesData = data.eventsConnection.edges.map((edge: any) => edge.node);
  const seo = nodesData[0].seo;

  if (seo && !seo?.canonicalUrl) {
    seo.canonicalUrl = `${settings.siteUrl}/events`;
  }

  return getSeo(seo);
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
