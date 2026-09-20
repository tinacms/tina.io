'use client';

import enLocale from 'content/not-found/en.json';
import zhLocale from 'content/not-found/zh.json';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui';
import { DynamicLink } from '../components/ui/DynamicLink';
import { DEFAULT_LOCALE, SupportedLocales } from '../middleware';
import { EN_ORIGIN, hasZhPrefix, isZhHost } from '../utils/i18n/domains';
import { checkPageExists } from './actions/not-found-actions';

const localeContent = {
  en: enLocale,
  zh: zhLocale,
};

const PageLayout = ({
  title,
  description,
  children = null,
  imageAlt = '404 Llama',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24 items-center">
      <div className="flex flex-col">
        <div className="mb-7">
          <h1 className="font-ibm-plex text-6xl leading-tight">{title}</h1>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
          <p className="text-lg lg:text-xl lg:leading-normal block -mb-1">
            {description}
          </p>
        </div>
        {children}
      </div>
      <div className="max-w-[65vw] mx-auto md:max-w-none">
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src="/img/tina-404-not-found.webp"
            alt={imageAlt}
            width={500}
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

// Links stay on the site the visitor is already on. On the Chinese site the
// URLs are prefix-free in production, but keep the /zh prefix during local
// development where there is no Chinese hostname to rewrite from.
const localePath = (path: string, locale: string) => {
  if (locale !== SupportedLocales.ZH) {
    return path;
  }
  const needsPrefix =
    typeof window !== 'undefined' && !isZhHost(window.location.host);
  return needsPrefix ? `/zh${path === '/' ? '' : path}` || '/' : path;
};

const NotFoundContent = ({ content, locale }) => (
  <PageLayout
    title={content.notFound.title}
    description={content.notFound.description}
  >
    <div className="flex flex-wrap gap-4">
      <DynamicLink href={localePath('/docs', locale)} passHref>
        <Button>{content.notFound.buttons.documentation}</Button>
      </DynamicLink>
      <DynamicLink href={localePath('/docs/guides', locale)} passHref>
        <Button>{content.notFound.buttons.guides}</Button>
      </DynamicLink>
      <DynamicLink href={localePath('/', locale)} passHref>
        <Button>{content.notFound.buttons.home}</Button>
      </DynamicLink>
    </div>
  </PageLayout>
);

// Crosses to the English site, so this is a full-page navigation to another
// origin rather than a client-side route change.
const RedirectPage = ({ redirectPath, content }) => (
  <PageLayout
    title={content.notTranslated.title}
    description={content.notTranslated.description}
  >
    <div className="flex flex-wrap gap-4">
      <a href={redirectPath} className="cursor-pointer">
        <Button>{content.notTranslated.buttons.continue}</Button>
      </a>
    </div>
  </PageLayout>
);

const LoadingPage = ({ content }) => (
  <PageLayout
    title={content.loading.title}
    description={content.loading.description}
  ></PageLayout>
);

/**
 * Work out which English document this missing page corresponds to.
 *
 * The locale comes from the hostname, not from the path: on the Chinese site
 * URLs are prefix-free. A `/zh` prefix may still be present when browsing
 * Chinese pages directly in local development, so it is tolerated and stripped
 * here.
 *
 * Only the Chinese site asks the "does an English original exist?" question —
 * on the English site a missing page is simply missing.
 */
const parsePath = (pathname: string, locale: string) => {
  if (locale !== SupportedLocales.ZH) {
    return { needsQuery: false as const };
  }

  const segments = pathname.split('/').filter(Boolean);
  // Tolerate an explicit /zh prefix (local development).
  if (segments[0] === SupportedLocales.ZH) {
    segments.shift();
  }

  if (segments.length === 0) {
    return { needsQuery: false as const };
  }

  const routeType = segments[0];
  const isBlogPagination =
    routeType === 'blog' && segments.length > 1 && segments[1] === 'page';
  const isBlogRoot = routeType === 'blog' && segments.length === 1;

  const routeKey = isBlogPagination || isBlogRoot ? 'blog/page' : routeType;
  const pathWithoutPrefix = (() => {
    if (isBlogPagination) {
      return segments.slice(1).join('/');
    }
    if (isBlogRoot) {
      return 'page/1';
    }
    if (segments.length === 1) {
      return '';
    }
    return segments.slice(1).join('/');
  })();

  return {
    needsQuery: true as const,
    routeKey,
    pathWithoutPrefix,
  };
};

export default function NotFoundClient() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  // The locale is read here rather than passed in from the server: this page
  // backs the global not-found boundary, which Next prerenders statically, so
  // reading request headers on the server would break that prerender. It stays
  // null until the client knows, so the Chinese site does not flash an English
  // 404 before the check for an English original has run.
  const [locale, setLocale] = useState<string | null>(null);

  useEffect(() => {
    const isChinese =
      isZhHost(window.location.host) || hasZhPrefix(pathname ?? '');
    setLocale(isChinese ? SupportedLocales.ZH : DEFAULT_LOCALE);
  }, [pathname]);

  const content = localeContent[locale ?? DEFAULT_LOCALE] || localeContent.en;
  const { needsQuery, routeKey, pathWithoutPrefix } = parsePath(
    pathname,
    locale ?? '',
  );

  useEffect(() => {
    if (locale === null) {
      return;
    }
    if (!needsQuery) {
      setLoading(false);
      return;
    }

    async function checkPage() {
      try {
        const result = await checkPageExists(routeKey, pathWithoutPrefix);
        setPageExists(result.exists);
        if (result.exists && result.redirectPath) {
          setRedirectPath(result.redirectPath);
        }
      } finally {
        setLoading(false);
      }
    }

    checkPage();
  }, [locale, needsQuery, routeKey, pathWithoutPrefix]);

  // Until the client has resolved the locale there is nothing meaningful to
  // show: the wrong language would flash before the real answer arrives.
  if (locale === null || loading) {
    return <LoadingPage content={content} />;
  }

  if (!needsQuery) {
    return <NotFoundContent content={content} locale={locale} />;
  }

  // The English original exists but has no translation yet: offer to cross over
  // to the English site rather than dead-ending on a 404.
  return pageExists ? (
    <RedirectPage
      redirectPath={`${EN_ORIGIN}${redirectPath}`}
      content={content}
    />
  ) : (
    <NotFoundContent content={content} locale={locale} />
  );
}
