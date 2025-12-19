'use server';

import client from '../../tina/__generated__/client';

type RouteInfo = {
  type: string;
  queryFunction: (params: any) => Promise<any>;
  getRedirectPath: (path: string) => string;
  getRelativePath: (path: string) => string;
  fileExtension: string;
  checkExists?: (response: any) => boolean;
};

const responseCheckers = {
  docs: (response: any) => !!response?.data?.doc,
  blog: (response: any) => !!response?.data?.post,
  blogPagination: (response: any) =>
    !!response?.data?.postConnection?.edges?.length,
  community: (response: any) => !!response?.data?.page,
  examples: (response: any) => !!response?.data?.examples,
  conference: (response: any) => !!response?.data?.conference,
  events: (response: any) => !!response?.data?.eventsConnection?.edges?.length,
  whatsNew: (response: any) =>
    !!response?.data?.WhatsNewTinaCMSConnection?.edges?.length,
  page: (response: any) => !!response?.data?.page,
  default: (response: any) => !!response,
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

export async function checkPageExists(
  routeKey: string,
  pathWithoutPrefix: string,
): Promise<{ exists: boolean; redirectPath?: string }> {
  try {
    const config = routeConfig[routeKey] || routeConfig.default;
    const isDefaultRoute = config.type === 'page';

    try {
      const path = isDefaultRoute ? routeKey : pathWithoutPrefix;
      const relativePath = config.getRelativePath(path);

      const response = relativePath
        ? await config.queryFunction(relativePath)
        : await config.queryFunction({});

      const redirectPath = config.getRedirectPath(path);
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
}
