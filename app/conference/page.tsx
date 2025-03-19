import { client } from 'tina/__generated__/client';
import ConferenceClient from './ConferenceClient';

export default async function ConferencePage() {
  const vars = {
    relativePath: 'TinaCon2025.mdx',
  };

  const { data, query } = await fetchConference(vars);

  return <ConferenceClient query={query} data={data} vars={vars} />;
}

const fetchConference = async (vars = {}) => {
  const res = await client.queries.conference({
    relativePath: 'TinaCon2025.mdx',
  });
  return {
    data: res.data,
    query: res.query,
  };
};
