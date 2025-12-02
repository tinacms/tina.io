import { client } from 'tina/__generated__/client';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import WhatsNewTinaCMSPageLayout from './WhatsNewTinaCMSLayout';

export async function generateMetadata() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data } = await fetchWhatsNewData(vars);
  const _nodesData = data.WhatsNewTinaCMSConnection.edges.map(
    (edge: any) => edge.node,
  );

  // Use default SEO data since the new JSON structure doesn't include SEO fields
  const whatsNewSEOData = {
    title: "What's New in TinaCMS",
    description: 'Discover the latest updates and features in TinaCMS.',
    canonicalUrl: `${settings.siteUrl}/whats-new/tinacms`,
  };

  return getSeo(whatsNewSEOData);
}

export default async function TinaCMSPage() {
  const vars = { last: 10, sort: 'dateReleased' };

  const { data } = await fetchWhatsNewData(vars);

  return <WhatsNewTinaCMSPageLayout data={data} />;
}

const fetchWhatsNewData = async (vars = {}) => {
  const res = await client.queries.WhatsNewTinaCMSConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
