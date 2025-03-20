'use client';

import enLocale from 'content/not-found/en.json';
import zhLocale from 'content/not-found/zh.json';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui';
import { DynamicLink } from '../components/ui/DynamicLink';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../middleware';
import client from '../tina/__generated__/client';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch py-24">
      <div className="flex flex-col">
        <div className="mb-7">
          <h2 className="font-tuner text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 via-orange-500 inline-block">
            {title}
          </h2>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
          <p className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-1">
            {description}
          </p>
        </div>
        {children}
      </div>
      <div className="max-w-[65vw] mx-auto md:max-w-none">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
          <Image
            src="/img/rico-replacement.jpg"
            alt={imageAlt}
            className="object-cover"
            width={364}
            height={364}
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

const parsePath = (pathname, localeList) => {
  const segments = pathname.split('/').filter(Boolean);
  const hasLocalePrefix =
    segments.length > 0 && localeList.includes(segments[0]);
  const locale = hasLocalePrefix ? segments[0] : DEFAULT_LOCALE;

  if (!hasLocalePrefix) {
    return { needsQuery: false, locale };
  }

  const isDocsPage = segments.length > 1 && segments[1] === 'docs';
  const pathWithoutPrefix = isDocsPage
    ? segments.slice(2).join('/')
    : segments.slice(1).join('/');

  return {
    needsQuery: true,
    locale,
    isDocsPage,
    pathWithoutPrefix,
  };
};

const queryPage = async (isDocsPage, path) => {
  try {
    if (isDocsPage) {
      const docPath = path || 'index';
      const response = await client.queries.doc({
        relativePath: `${docPath}.mdx`,
      });

      const redirectPath =
        docPath === 'index' || docPath === '' ? '/docs' : `/docs/${docPath}`;

      return {
        exists: !!response?.data?.doc,
        redirectPath,
      };
    } else {
      const pagePath = path || 'index';
      const redirectPath = pagePath === 'index' ? '/' : `/${pagePath}`;

      try {
        const response = await client.queries.pageWithRecentPosts({
          relativePath: `${pagePath}.json`,
        });
        return {
          exists: !!response,
          redirectPath,
        };
      } catch (error) {
        console.error('Error checking page existence:', error);
        return { exists: false };
      }
    }
  } catch (error) {
    console.error('Error querying page:', error);
    return { exists: false };
  }
};

export default function NotFoundClient() {
  const pathname = usePathname();
  const localeList = SUPPORTED_LOCALES;
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  const pathInfo = parsePath(pathname, localeList);
  const content = localeContent[pathInfo.locale] || localeContent.en;

  if (!pathInfo.needsQuery) {
    return <NotFoundContent content={content} />;
  }

  useEffect(() => {
    async function checkPageExists() {
      try {
        const result = await queryPage(
          pathInfo.isDocsPage,
          pathInfo.pathWithoutPrefix
        );

        setPageExists(result.exists);
        if (result.exists) {
          setRedirectPath(result.redirectPath);
        }
      } finally {
        setLoading(false);
      }
    }

    checkPageExists();
  }, [pathInfo]);

  if (loading) {
    return <LoadingPage content={content} />;
  }

  return pageExists ? (
    <RedirectPage redirectPath={redirectPath} content={content} />
  ) : (
    <NotFoundContent content={content} />
  );
}
