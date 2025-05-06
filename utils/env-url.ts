import settings from '@/content/settings/config.json';
const isDev = process.env.NODE_ENV === 'development';

export const envUrl = (url: string | URL | null | undefined) => {
  if (!url) return '';

  if (isDev) {
    if (url.toString().startsWith('http')) {
      return url.toString().replace(settings.siteUrl, 'http://localhost:3000');
    }
    return `http://localhost:3000${url.toString()}`;
  }
  return url.toString();
};
