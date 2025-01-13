import BlogPaginationPage from './page/[page_index]/page';

export default async function BlogPage() {
  const params = { page_index: '1' }; 
  return await BlogPaginationPage({ params });
}
