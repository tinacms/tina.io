import { client } from '../../tina/__generated__/client';
import ClientPage from './client-page';
import { fileToUrl } from 'utils/urls';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import path from 'path';

const fg = require('fast-glob');

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
      title: {
        default: data.seo.title,
        template: data.seo.hasCustomSuffix ? '%s' : '%s | Tina',
      },
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
  return pages
    .filter((file) => {
      const filename = path.basename(file);
      return !filename.includes('_400x400') && !filename.endsWith('.jpg.json');
    })
    .map((file) => ({
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
