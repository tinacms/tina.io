import { DEFAULT_SEO } from './metadata/defaultSeo';

const isDev = process.env.NODE_ENV === 'development';

export const envUrl = (url: string | URL | null | undefined) => {
  if (!url) return '';

  if (isDev) {
    if (url.toString().startsWith('http')) {
      return url
        .toString()
        .replace(
          DEFAULT_SEO.metadataBase?.toString() || '',
          'http://localhost:3000'
        );
    }
    return `http://localhost:3000${url.toString()}`;
  }
  return url.toString();
};
