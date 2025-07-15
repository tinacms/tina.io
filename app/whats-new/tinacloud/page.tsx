import { client } from 'tina/__generated__/client';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import WhatsNewTinaCloudPageLayout from './WhatsNewTinaCloudPageLayout';

export async function generateMetadata() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data } = await fetchTinaCloudData(vars);
  const nodesData = data.WhatsNewTinaCloudConnection.edges.map(
    (edge) => edge.node,
  );
  const seoData = (nodesData[0] as { seo?: any })?.seo || {
    title: "What's New in TinaCloud",
    description:
      'Stay updated with the latest improvements and features in TinaCloud.',
  };

  if (seoData && !seoData?.canonicalUrl) {
    seoData.canonicalUrl = `${settings.siteUrl}/whats-new/tinacloud`;
  }

  return getSeo(seoData);
}

export default async function TinaCloudPage() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data } = await fetchTinaCloudData(vars);

  return <WhatsNewTinaCloudPageLayout data={data} />;
}

const fetchTinaCloudData = async (vars = {}) => {
  const res = await client.queries.WhatsNewTinaCloudConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
