import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { client } from 'tina/__generated__/client';
import WhatsNewTinaCMSPageLayout from './WhatsNewTinaCMSLayout';

export async function generateMetadata() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data } = await fetchWhatsNewData(vars);
  const nodesData = data.WhatsNewTinaCMSConnection.edges.map(
    (edge: any) => edge.node
  );
  const whatsNewSEOData = nodesData[0].seo || {
    title: "What's New in TinaCMS",
    description: 'Discover the latest updates and features in TinaCMS.',
  };

  if (whatsNewSEOData && !whatsNewSEOData?.canonicalUrl) {
    whatsNewSEOData.canonicalUrl = `${settings.siteUrl}/whats-new/tinacms`;
  }

  return getSeo(whatsNewSEOData);
}

export default async function TinaCMSPage() {
  const vars = { last: 10, sort: 'dateReleased' };

  const { data, query } = await fetchWhatsNewData(vars);

  return <WhatsNewTinaCMSPageLayout data={data} />;
}

const fetchWhatsNewData = async (vars = {}) => {
  const res = await client.queries.WhatsNewTinaCMSConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
