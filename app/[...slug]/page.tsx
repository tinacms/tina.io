import { Container } from 'components/blocks/Container';
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

function ExperimentalBanner() {
  return (
    <Link href="/conference">
      <Image
        src="/img/TinaCon-desktop-banner.png"
        alt="tinaconMobileBanner"
        width={5000}
        height={5000}
        className="sm:block hidden px-5 lg:px-10"
      />
      <Image
        src="/img/TinaCon-tablet-banner.png"
        alt="tinaconMobileBanner"
        width={2000}
        height={2000}
        className="sm:hidden block"
      />
    </Link>
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const relativePath = `${slug.join('/')}.json`;
  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath: relativePath,
    });
    return (
      <>
        {/* TODO: Remove once TinaCon is over */}
        {slug[0] === 'home' && (
          <div className="max-w-[1300px] mx-auto mt-10">
            <ExperimentalBanner />
          </div>
        )}
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
