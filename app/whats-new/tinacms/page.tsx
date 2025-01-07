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

  return {
    title: whatsNewSEOData.title,
    description: whatsNewSEOData.description,
    openGraph: {
      title: whatsNewSEOData.title,
      description: whatsNewSEOData.description,
      type: 'website',
      locale: 'en_CA',
      site_name: 'https://tina.io/whats-new',
      images: [
        {
          url: 'https://tina.io/img/tina-og.png',
          width: 1200,
          height: 628,
          alt: `Tina - The Markdown CMS`,
        },
      ],
    },
  };
}

export default async function TinaCMSPage() {
  const vars = { last: 10, sort: 'dateReleased' };

  const { data, query } = await fetchWhatsNewData(vars);

  console.log(data);
  // return <div> banana</div>
  return <WhatsNewTinaCMSPageLayout data={data} />;
}

const fetchWhatsNewData = async (vars = {}) => {
  const res = await client.queries.WhatsNewTinaCMSConnection(vars);
  return {
    data: res.data,
    query: res.query,
  };
};
