import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import path from 'path';
import { fileToUrl } from 'utils/urls';
import { client } from '../../tina/__generated__/client';
import ClientPage from './client-page';

const fg = require('fast-glob');

export const dynamicParams = false;

interface PageProps {
  params: {
    slug?: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params?.slug || 'home';

  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath: slug + '.json',
    });

    const data = res.data.page;

    if (!data.seo) {
      return {};
    }

    return {
      title: `${data.seo.title} | TinaCMS`,
      description: data.seo.description,
      openGraph: {
        title: data.seo.title,
        description: data.seo.description,
      },
    };
  } catch (error) {
    return {};
  }
}

export async function generateStaticParams() {
  const pages = await fg(`./content/blocksPages/*.json`);
  return pages.map((file) => ({
    slug: fileToUrl(file, 'blocksPages'),
  }));
}

export default async function Page({ params }: PageProps) {
  const slug = params?.slug || 'home';
  const vars = { relativePath: slug + '.json' };

  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath: slug + '.json',
    });

    return <ClientPage query={res.query} data={res.data} variables={vars} />;
  } catch (error) {
    notFound();
  }
}
