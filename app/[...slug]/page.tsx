import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fileToUrl } from 'utils/urls';
import { client } from '../../tina/__generated__/client';
import ClientPage from './client-page';
const fg = require('fast-glob');
export const dynamicParams = false;

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const pages = await fg(`./content/blocksPages/**/*.json`);
  return pages.map((file) => ({
    slug: fileToUrl(file, 'blocksPages').split('/'),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const relativePath = `${slug.join('/')}.json`;

  const res = await client.queries.pageWithRecentPosts({
    relativePath,
  });

  const data = res.data.page;
  const { seo } = data;

  if (seo && !seo?.canonicalUrl) {
    data.seo.canonicalUrl = `${settings.siteUrl}${
      slug[0] === 'home' ? '' : '/' + slug.join('/')
    }`;
  }
  return getSeo(seo);
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const relativePath = `${slug.join('/')}.json`;
  try {
    const isZhPath = relativePath.startsWith('zh/');
    const queryFunction = isZhPath
      ? client.queries.pageZhWithRecentPosts
      : client.queries.pageWithRecentPosts;

    const res = await queryFunction({
      relativePath: relativePath,
    });
    return (
      <>
        <ClientPage
          query={res.query}
          data={res.data}
          variables={{ relativePath }}
        />
      </>
    );
  } catch {
    return notFound();
  }
}
