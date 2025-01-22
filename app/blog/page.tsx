import BlogPaginationPage from './page/[page_index]/page';

export async function generateMetadata(){

  const title = 'TinaCMS Blog';
  const description = 'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development';
  return{
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://tinacms.org/blog',
    }
  }
}

export default async function BlogPage() {
  const params = { page_index: '1' }; 
  return await BlogPaginationPage({ params });
}
