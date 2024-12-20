// app/events/page.tsx
import { client } from 'tina/__generated__/client';
import EventsClient from './EventsClient';

export default async function EventsPage() {
  const vars = {};

  const res = await client.queries.eventsConnection(vars);
  const { query, data } = res;

  return <EventsClient query={query} data={data} vars={vars} />;
}
