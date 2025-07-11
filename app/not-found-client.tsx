'use client';

import enLocale from 'content/not-found/en.json';
import zhLocale from 'content/not-found/zh.json';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
          <h2 className="font-ibm-plex text-6xl leading-tight text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600 via-orange-500 inline-block">
            {title}
          </h2>
          <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
          <p className="text-lg lg:text-xl lg:leading-normal block bg-linear-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-1">
            {description}
          </p>
        </div>
        {children}
      </div>
      <div className="max-w-[65vw] mx-auto md:max-w-none">
        <div className="relative rounded-3xl overflow-hidden">
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

type RouteInfo = {
  type: string;
  queryFunction: (params: any) => Promise<any>;
  getRedirectPath: (path: string) => string;
  getRelativePath: (path: string) => string;
  fileExtension: string;
  checkExists?: (response: any) => boolean;
};

const responseCheckers = {
  docs: (response) => !!response?.data?.doc,
  blog: (response) => !!response?.data?.post,
  blogPagination: (response) => !!response?.data?.postConnection?.edges?.length,
  community: (response) => !!response?.data?.page,
  examples: (response) => !!response?.data?.examples,
  conference: (response) => !!response?.data?.conference,
  events: (response) => !!response?.data?.eventsConnection?.edges?.length,
  whatsNew: (response) =>
    !!response?.data?.WhatsNewTinaCMSConnection?.edges?.length,
  page: (response) => !!response?.data?.page,
  default: (response) => !!response,
};

const routeConfig: Record<string, RouteInfo> = {
  docs: {
    type: 'docs',
    queryFunction: async (params) => {
      return await client.queries.doc({
        relativePath: params,
      });
    },
    getRedirectPath: (path) => {
      return path === 'index' || path === '' ? '/docs' : `/docs/${path}`;
    },
    getRelativePath: (path) => `${path || 'index'}.mdx`,
    fileExtension: '.mdx',
    checkExists: responseCheckers.docs,
  },
  blog: {
    type: 'blog',
    queryFunction: async (params) => {
      return await client.queries.getExpandedPostDocument({
        relativePath: params,
      });
    },
    getRedirectPath: (path) => `/blog/${path}`,
    getRelativePath: (path) => `${path}.mdx`,
    fileExtension: '.mdx',
    checkExists: responseCheckers.blog,
  },
  'blog/page': {
    type: 'blogPagination',
    queryFunction: async () => {
      return await client.queries.postConnection();
    },
    getRedirectPath: (path) => {
      const pageNumber = path.split('/')[1] || '1';
      return pageNumber === '1' ? '/blog' : `/blog/page/${pageNumber}`;
    },
    getRelativePath: () => '',
    fileExtension: '',
    checkExists: responseCheckers.blogPagination,
  },
  community: {
    type: 'community',
    queryFunction: async (params) => {
      return await client.queries.page({
        relativePath: params,
      });
    },
    getRedirectPath: () => '/community',
    getRelativePath: () => 'community.json',
    fileExtension: '.json',
    checkExists: responseCheckers.community,
  },
  conference: {
    type: 'conference',
    queryFunction: async (params) => {
      return await client.queries.conference({
        relativePath: params,
      });
    },
    getRedirectPath: () => '/conference',
    getRelativePath: () => 'TinaCon2025.mdx',
    fileExtension: '.mdx',
    checkExists: responseCheckers.conference,
  },
  events: {
    type: 'events',
    queryFunction: async () => {
      return await client.queries.eventsConnection();
    },
    getRedirectPath: () => '/events',
    getRelativePath: () => '',
    fileExtension: '',
    checkExists: responseCheckers.events,
  },
  examples: {
    type: 'examples',
    queryFunction: async (params) => {
      return await client.queries.examples({
        relativePath: params,
      });
    },
    getRedirectPath: () => '/examples',
    getRelativePath: () => 'index.json',
    fileExtension: '.json',
    checkExists: responseCheckers.examples,
  },
  'whats-new': {
    type: 'whatsNew',
    queryFunction: async () => {
      return await client.queries.WhatsNewTinaCMSConnection();
    },
    getRedirectPath: () => '/whats-new/tinacms',
    getRelativePath: () => '',
    fileExtension: '',
    checkExists: responseCheckers.whatsNew,
  },
  default: {
    type: 'page',
    queryFunction: async (params) => {
      console.log('[debug] Default route query params:', params);
      return await client.queries.pageWithRecentPosts({
        relativePath: typeof params === 'string' ? params : 'index.json',
      });
    },
    getRedirectPath: (path) => {
      if (path === 'index' || path === '') {
        return '/';
      }
      return `/${path}`;
    },
    getRelativePath: (path) => {
      console.log('[debug] Default route getRelativePath path:', path);
      return path ? `${path}.json` : 'index.json';
    },
    fileExtension: '.json',
    checkExists: responseCheckers.page,
  },
};

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

const queryPage = async (pathInfo: {
  routeKey: string;
  pathWithoutPrefix: string;
}) => {
  try {
    const { routeKey, pathWithoutPrefix } = pathInfo;
    const config = routeConfig[routeKey] || routeConfig.default;
    const isDefaultRoute = config.type === 'page';

    try {
      const path = isDefaultRoute ? routeKey : pathWithoutPrefix;
      const relativePath = config.getRelativePath(path);

      console.log(`[debug] Route info:`, {
        routeKey,
        pathWithoutPrefix,
        relativePath,
        configType: config.type,
      });

      const response = relativePath
        ? await config.queryFunction(relativePath)
        : await config.queryFunction({});

      const redirectPath = config.getRedirectPath(path);

      console.log(`[debug] Response info:`, {
        redirectPath,
        hasResponse: !!response,
        dataKeys: response?.data ? Object.keys(response.data) : [],
      });

      const exists = config.checkExists?.(response) ?? !!response;

      return { exists, redirectPath };
    } catch (error) {
      console.error(`Error checking ${routeKey} existence:`, error);
      return { exists: false };
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
        const result = await queryPage({
          routeKey: pathInfo.routeKey,
          pathWithoutPrefix: pathInfo.pathWithoutPrefix,
        });
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
