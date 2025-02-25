import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { fileToUrl } from 'utils/urls';
import { SUPPORTED_LOCALES } from '../../../middleware';
import { client } from '../../../tina/__generated__/client';

import ClientPage from './client-page';

const fg = require('fast-glob');

export const dynamicParams = true;

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const relativePath =
    locale === 'en' ? `${slug}.json` : `${locale}/${slug}.json`;
  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath,
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

  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath,
    });

    return (
      <ClientPage
        query={res.query}
        data={res.data}
        variables={{ relativePath }}
      />
    );
  } catch {
    if (locale !== 'en') {
      const enPageExists = await checkEnglishPageExists(slug);
      if (enPageExists) {
        redirect(`/en/${slug}`);
      }
    }
    return notFound();
  }
}

async function checkEnglishPageExists(slug: string): Promise<boolean> {
  try {
    await client.queries.pageWithRecentPosts({
      relativePath: `${slug}.json`,
    });
    return true;
  } catch {
    return false;
  }
}
