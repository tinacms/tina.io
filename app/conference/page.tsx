import type { Metadata } from 'next';
import { client } from 'tina/__generated__/client';
import ConferenceClient from './ConferenceClient';

export const metadata: Metadata = {
  title: 'TinaCon - The TinaCMS Conference',
  description:
    'Join us for a day of learning, networking and building with TinaCMS.',
};

export default async function ConferencePage() {
  const vars = {
    relativePath: 'TinaCon2025.mdx',
  };

  const { data, query } = await fetchConference();

  return <ConferenceClient query={query} data={data} vars={vars} />;
}

const fetchConference = async () => {
  const res = await client.queries.conference({
    relativePath: 'TinaCon2025.mdx',
  });
  return {
    data: res.data,
    query: res.query,
  };
};
