'use client';

import enLocale from 'content/not-found/en.json';
import zhLocale from 'content/not-found/zh.json';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui';
import { DynamicLink } from '../components/ui/DynamicLink';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../middleware';
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

const NotFoundContent = ({ content }) => (
  <PageLayout
    title={content.notFound.title}
    description={content.notFound.description}
  >
    <div className="flex flex-wrap gap-4">
      <DynamicLink href="/docs" passHref>
        <Button>{content.notFound.buttons.documentation}</Button>
      </DynamicLink>
      <DynamicLink href="/docs/guides" passHref>
        <Button>{content.notFound.buttons.guides}</Button>
      </DynamicLink>
      <DynamicLink href="/" passHref>
        <Button>{content.notFound.buttons.home}</Button>
      </DynamicLink>
    </div>
  </PageLayout>
);

const RedirectPage = ({ redirectPath, content }) => (
  <PageLayout
    title={content.notTranslated.title}
    description={content.notTranslated.description}
  >
    <div className="flex flex-wrap gap-4">
      <DynamicLink href={redirectPath} passHref>
        <Button>{content.notTranslated.buttons.continue}</Button>
      </DynamicLink>
    </div>
  </PageLayout>
);

const LoadingPage = ({ content }) => (
  <PageLayout
    title={content.loading.title}
    description={content.loading.description}
  ></PageLayout>
);

const parsePath = (pathname: string, localeList: string[]) => {
  const segments = pathname.split('/').filter(Boolean);
  const hasLocalePrefix =
    segments.length > 0 && localeList.includes(segments[0]);
  const locale = hasLocalePrefix ? segments[0] : DEFAULT_LOCALE;

  if (!hasLocalePrefix || segments.length === 1) {
    return { needsQuery: false, locale };
  }

  const routeType = segments[1];
  const isBlogPagination =
    routeType === 'blog' && segments.length > 2 && segments[2] === 'page';
  const isBlogRoot = routeType === 'blog' && segments.length === 2;

  const routeKey = isBlogPagination || isBlogRoot ? 'blog/page' : routeType;
  const pathWithoutPrefix = ((_type: string, segs: string[]) => {
    if (isBlogPagination) {
      return segs.slice(2).join('/');
    }
    if (isBlogRoot) {
      return 'page/1';
    }
    if (segs.length === 2) {
      return '';
    }
    return segs.slice(2).join('/');
  })(routeType, segments);

  console.log(
    `[debug] pathname: ${pathname}, segments: ${segments}, routeKey: ${routeKey}, pathWithoutPrefix: ${pathWithoutPrefix}`,
  );

  return {
    needsQuery: true,
    locale,
    routeKey,
    pathWithoutPrefix,
  };
};

export default function NotFoundClient() {
  const pathname = usePathname();
  const localeList = SUPPORTED_LOCALES;
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const pathInfo = parsePath(pathname, localeList);
  const content = localeContent[pathInfo.locale] || localeContent.en;

  useEffect(() => {
    async function checkPage() {
      try {
        const result = await checkPageExists(
          pathInfo.routeKey,
          pathInfo.pathWithoutPrefix,
        );
        setPageExists(result.exists);
        if (result.exists && result.redirectPath) {
          setRedirectPath(result.redirectPath);
        }
      } finally {
        setLoading(false);
      }
    }

    checkPage();
  }, [pathInfo]);

  if (!pathInfo.needsQuery) {
    return <NotFoundContent content={content} />;
  }

  if (loading) {
    return <LoadingPage content={content} />;
  }

  return pageExists ? (
    <RedirectPage redirectPath={redirectPath} content={content} />
  ) : (
    <NotFoundContent content={content} />
  );
}
