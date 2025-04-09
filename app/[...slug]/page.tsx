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
    <Link href="/conference" className="block w-full">
      <div className="relative w-full">
        <Image
          src="/img/TinaCon-desktop-banner.png"
          alt="TinaCon Conference Banner"
          width={1300}
          height={520}
          className="w-full h-auto sm:block hidden"
          priority
        />
        <Image
          src="/img/TinaCon-tablet-banner.png"
          alt="TinaCon Conference Banner"
          width={768}
          height={307}
          className="w-full h-auto sm:hidden block"
          priority
        />
      </div>
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
          <div className="max-w-[1300px] mx-auto mt-10 px-5 lg:px-10">
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
