module.exports = {
  siteUrl: 'https://tina.io',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/api/*', '/github/*', '/rss.xml', '/blog/page/*'],
      },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://tina.io/tinadocs/sitemap.xml',
      'https://tina.io/tinadocs/doc/sitemap.xml',
      'https://tina.io/docs/sitemap.xml',
    ],
  },
  exclude: [
    '/api/*',
    '/github/*',
    '/rss.xml',
    '/blog/page/*',
    '/blog/og/*',
    '/blog/instagram/*',
    '/zh/blog/og/*',
    '/zh/blog/instagram/*',
    // Docs now live in a separate instance at tina.io/docs; see its own sitemap above.
    '/docs',
    '/docs/*',
    '/zh/docs',
    '/zh/docs/*',
  ],
  sitemapSize: 7000,
  transform: async (_config, path) => {
    const listOfMinorPaths = [
      '/privacy-notice',
      '/security',
      '/terms-of-service',
    ];
    if (listOfMinorPaths.includes(path)) {
      return {
        loc: path,
        priority: 0.3,
      };
    }
    if (path === '/home') {
      return {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
      };
    }
    if (path === '/zh/home') {
      return {
        loc: '/zh',
        changefreq: 'daily',
        priority: 1.0,
      };
    }
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
      };
    }
    if (path.indexOf('/guides/') > -1) {
      return {
        loc: path,
        priority: 0.5,
      };
    }
    if (path.indexOf('/blog/') > -1) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
      };
    }
    return {
      loc: path,
      priority: 0.7,
      changefreq: 'weekly',
    };
  },
};
