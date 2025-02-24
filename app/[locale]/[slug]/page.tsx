import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fileToUrl } from 'utils/urls';
import { SUPPORTED_LOCALES } from '../../../middleware';
import { client } from '../../../tina/__generated__/client';

import ClientPage from './client-page';

const fg = require('fast-glob');

export const dynamicParams = false;

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  //Files with different language should have different metadata
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = params;

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
  const pages = await fg(`./content/blocksPages/**/*.json`);
  return pages.map((file) => {
    const fullSlug = fileToUrl(file, 'blocksPages');
    const parts = fullSlug.split('/');
    if (parts.length > 1) {
      return {
        locale: parts[0],
        slug: parts[1],
      };
    }
    return {
      locale: 'en',
      slug: fullSlug,
    };
  });
}
export default async function Page({ params }: PageProps) {
  const { locale, slug } = params;
  const relativePath =
    locale === 'en' ? `${slug}.json` : `${locale}/${slug}.json`;
  const vars = { relativePath: relativePath };

  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath,
    });

    return <ClientPage query={res.query} data={res.data} variables={vars} />;
  } catch (error) {
    notFound();
  }
}
