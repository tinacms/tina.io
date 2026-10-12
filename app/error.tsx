'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Global Error:', error);
    router.replace('/not-found');
  }, [error, router]);

  return null;
}
