'use client';

import NotFoundClient from './not-found-client';

export const metadata = {
  title: 'Error Occurred | TinaCMS',
  description: "Sorry, we couldn't find what you were looking for.",
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <NotFoundClient />
        </div>
      </section>
    </div>
  );
}
