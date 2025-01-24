import { BlocksPage } from 'components/blocks/BlocksPage';
import { useTina } from 'tinacms/dist/react';
import { fileToUrl } from 'utils/urls';
import { client } from '../../tina/__generated__/client';
import fg from 'fast-glob';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug || 'home';
  const res = await client.queries.pageWithRecentPosts({
    relativePath: `${slug}.json`,
  });

  const data = res.data.page;
  
  if (!data.seo) {
    return {};
  }

  return {
    title: data.seo.hasCustomSuffix ? data.seo.title : `${data.seo.title} | Tina`,
    description: data.seo.description,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug || 'home';
  const vars = { relativePath: `${slug}.json` };

  const res = await client.queries.pageWithRecentPosts({
    relativePath: vars.relativePath,
  });

  const tinaData = {
    query: res.query,
    data: res.data,
    vars,
  };

  const data = tinaData.data.page;

  return <BlocksPage data={data} recentPosts={tinaData.data.recentPosts} />;
}

export async function generateStaticParams() {
  const pages = await fg(`./content/blocksPages/*.json`);
  const paths = pages.map((file) => {
    const slug = fileToUrl(file, 'blocksPages');
    return { slug };
  });

  return paths;
}
