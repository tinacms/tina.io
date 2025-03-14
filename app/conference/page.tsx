import { client } from 'tina/__generated__/client';
import ConferenceClient from './ConferenceClient';

export default async function EventsPage() {
  const vars = {};

  const { data, query } = await fetchEvents(vars);

  return <ConferenceClient query={query} data={data} vars={vars} />;
}

const fetchEvents = async (vars = {}) => {
  const res = await client.queries.eventsConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
