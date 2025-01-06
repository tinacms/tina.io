import { client } from 'tina/__generated__/client';
import WhatsNewTinaCloudPageLayout from './WhatsNewTinaCloudPageLayout';

export async function generateMetadata() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data } = await fetchTinaCloudData(vars);
  const nodesData = data.WhatsNewTinaCloudConnection.edges.map(
    (edge) => edge.node
  );
  const seoData = (nodesData[0] as { seo?: any })?.seo || {
    title: "What's New in TinaCloud",
    description:
      'Stay updated with the latest improvements and features in TinaCloud.',
  };

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: 'website',
      locale: 'en_CA',
      site_name: 'https://tina.io/tinacloud',
      images: [
        {
          url: 'https://tina.io/img/tina-og.png',
          width: 1200,
          height: 628,
          alt: 'Tina - The Markdown CMS',
        },
      ],
    },
  };
}

export default async function TinaCloudPage() {
  const vars = { last: 10, sort: 'dateReleased' };
  const { data, query } = await fetchTinaCloudData(vars);

  return <WhatsNewTinaCloudPageLayout data={data} />;
}

const fetchTinaCloudData = async (vars = {}) => {
  const res = await client.queries.WhatsNewTinaCloudConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
