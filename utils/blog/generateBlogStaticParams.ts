// utils/blog/generateBlogStaticParams.ts
import { notFound } from 'next/navigation';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import { fetchBlogSlugs } from './blogSlugs';

export async function generateBlogStaticParams(locale: Locale) {
  try {
    const slugs = await fetchBlogSlugs(locale);
    return slugs.map((slug) => ({ slug: [slug] }));
  } catch (error) {
    console.error('Error during static params generation:', error);
    notFound();
  }
}
