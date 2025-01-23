import NotFoundClient from './not-found-client';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | TinaCMS</title>
        <meta
          name="description"
          content="Sorry, we couldn't find what you were looking for."
        />
      </Head>
      <div className="container mx-auto px-4">
        <NotFoundClient />
      </div>
    </>
  );
}
