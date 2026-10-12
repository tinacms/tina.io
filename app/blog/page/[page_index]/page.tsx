import BlogIndexPageClient from 'components/blog/BlogIndexPageClient';
import {
  getBlogIndexPosts,
  getBlogIndexStaticParams,
} from 'utils/blog/getBlogIndexPosts';
import { getUiStrings } from 'utils/i18n/uiStrings';

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogIndexStaticParams('en');
}

export function generateMetadata({
  params,
}: {
  params: { page_index: string };
}) {
  const pageIndex = parseInt(params.page_index, 10) || 1;
  const strings = getUiStrings('en');
  const title = strings.blogIndex.metaTitle(pageIndex);
  const description = strings.blogIndex.metaDescription;
  const url = `https://tina.io/blog/page/${params.page_index}`;
  return {
    title,
    description,
    openGraph: { title, description, url },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const { pageIndex, numPages, posts } = await getBlogIndexPosts(
    'en',
    params.page_index,
  );
  return (
    <BlogIndexPageClient
      currentPageIndexNumber={pageIndex}
      postsForPageIndex={posts}
      numberOfPages={numPages}
      locale="en"
    />
  );
}
