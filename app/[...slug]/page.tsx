import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fileToUrl } from 'utils/urls';
import { extractYouTubeId } from '@/component/blocks/VideoEmbed/utils';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { getChannelVideos } from '@/utils/youtube/getChannelVideos';
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
  const pages = await fg(`./content/main/**/*.json`);
  return pages.map((file) => ({
    slug: fileToUrl(file, 'main').split('/'),
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
      slug[0] === 'home' ? '' : `/${slug.join('/')}`
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

    // Only pages that actually render the "Recent Videos" block need the live
    // YouTube feed, so we avoid an extra fetch on every other statically
    // generated page.
    const recentPostsBlock = res.data.page.blocks?.find(
      (block) => block.__typename === 'PageBlocksRecentPosts',
    );
    let latestVideos = [];
    if (recentPostsBlock) {
      // Exclude the editorially chosen featured video so it never appears twice.
      const featuredId = extractYouTubeId(recentPostsBlock.featuredPost?.url);
      latestVideos = await getChannelVideos(
        2,
        undefined,
        featuredId ? [featuredId] : [],
      );
    }

    return (
      <ClientPage
        query={res.query}
        data={res.data}
        variables={{ relativePath }}
        latestVideos={latestVideos}
      />
    );
  } catch {
    return notFound();
  }
}
