import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPaginationPage from './page/[page_index]/page';

export async function generateMetadata() {
  return getSeo({
    title: 'TinaCMS Blog',
    description:
      'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    canonicalUrl: `${settings.siteUrl}/blog`,
  });
}

export default async function BlogPage() {
  const params = { page_index: '1' };
  return await BlogPaginationPage({ params });
}
