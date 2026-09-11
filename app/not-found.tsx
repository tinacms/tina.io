import { headers } from 'next/headers';
import { localeForHost } from '../utils/i18n/domains';
import NotFoundClient from './not-found-client';

export const metadata = {
  title: '404 - Page Not Found | TinaCMS',
  description: "We couldn't find your baby llama, check pen 404.",
};

export default function NotFound() {
  // The Chinese site serves prefix-free URLs, so the pathname no longer says
  // which locale this is — the hostname does.
  const headerList = headers();
  const locale = localeForHost(
    headerList.get('x-forwarded-host') ?? headerList.get('host'),
  );

  return (
    <div className="container mx-auto px-4">
      <NotFoundClient locale={locale} />
    </div>
  );
}
