const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withSvgr = require('next-svgr');

require('dotenv').config();

const isStatic = process.env.EXPORT_MODE === 'static';

/**
 * @type {import('next').NextConfig}
 */
let extraConfig = {};

if (isStatic) {
  console.log('Exporting static site');
  extraConfig.output = 'export';
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231252&amp;id=0asd21t12e1';

const config = {
  ...extraConfig,
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    styledComponents: true,
  },
  outputFileTracing: false,
  images: {
    unoptimized: process.env.UNOPTIMIZED_IMAGES === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/forestry-demo/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/:locale(en|zh)',
        destination: '/:locale/home',
      },
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
  env: {
    MAILCHIMP_ADDRESS: process.env.MAILCHIMP_ADDRESS || dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
    SSW_GTM_ID: process.env.SSW_GTM_ID,
  },
  //avoiding CORS error, more here: https://vercel.com/support/articles/how-to-enable-cors
  async headers() {
    const headers = [
      {
        key: 'Access-Control-Allow-Origin',
        value: '*',
      },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value: 'Accept, Content-Length, Content-Type',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        key: 'X-Robots-Tag',
        value: 'noindex',
      });
    }

    return [
      {
        source: '/:path*',
        headers,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/conf',
        destination: '/conference',
        permanent: true,
      },
      {
        source: '/early-access',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/tinacms-context',
        destination: '/docs/contextual-editing/overview',
        permanent: true,
      },
      {
        source: '/tinasaurus',
        destination: '/blog/tinasaurus-docusaurus-starter/',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/connecting-site',
        destination: '/docs/tina-cloud/overview',
        permanent: true,
      },
      {
        source: '/docs/errors/faq/:path*',
        destination: '/docs/introduction/faq/#common-tinacloud-errors',
        permanent: true,
      },
      {
        source: '/faq/:path*',
        destination: '/docs/introduction/faq',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/faq/:path*',
        destination: '/docs/introduction/faq',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/faq/:path*',
        destination: '/docs/introduction/faq',
        permanent: true,
      },
      {
        source: '/docs/drafts/editorial-workflow',
        destination: '/docs/tina-cloud/editorial-workflow',
        permanent: true,
      },
      {
        source: '/cloud',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/extending-tina/customizing-forms',
        destination: '/docs/extending-tina/overview/',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/alpha-faq/:path*',
        destination: '/docs/tina-cloud/faq',
        permanent: true,
      },
      {
        source: '/blog/first',
        destination: '/blog/announcing-tinacms',
        permanent: true,
      },
      {
        source: '/blog/introducing-tina-grande-%F0%9F%8E%89',
        destination: '/blog/introducing-tina-grande',
        permanent: true,
      },
      {
        source: '/jamstack-conf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/smashing-conf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/concepts/sidebar',
        destination: '/docs/cms',
        permanent: true,
      },
      {
        source: '/docs/concepts/forms',
        destination: '/docs/forms',
        permanent: true,
      },
      {
        source: '/docs/plugins/forms',
        destination: '/docs/forms',
        permanent: true,
      },
      {
        source: '/docs/concepts/fields',
        destination: '/docs/fields',
        permanent: true,
      },
      {
        source: '/docs/cms/apis',
        destination: '/docs/apis',
        permanent: true,
      },
      {
        source: '/docs/ui',
        destination: '/docs/sidebar-toolbar',
        permanent: true,
      },
      {
        source: '/docs/cms/ui',
        destination: '/docs/sidebar-toolbar',
        permanent: true,
      },
      {
        source: '/docs/cms/alerts',
        destination: '/docs/ui/alerts',
        permanent: true,
      },
      {
        source: '/docs/cms/events',
        destination: '/docs/events',
        permanent: true,
      },
      {
        source: '/docs/cms/plugins',
        destination: '/docs/plugins',
        permanent: true,
      },
      {
        source: '/docs/plugins/fields',
        destination: '/docs/reference/fields',
        permanent: true,
      },
      {
        source: '/docs/concepts/backends/',
        destination: '/docs/cms',
        permanent: true,
      },
      {
        source: '/docs/concepts/plugins',
        destination: '/docs/cms',
        permanent: true,
      },
      {
        source: '/docs/getting-started/how-tina-works',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/getting-started/overview',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/getting-started/introduction',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/getting-started/cms-set-up',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/getting-started/edit-content',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/getting-started/backends',
        destination: '/docs/setup-overview',
        permanent: true,
      },
      {
        source: '/docs/inline-editing',
        destination: '/docs/ui/inline-editing',
        permanent: true,
      },
      {
        source: '/docs/nextjs/inline-editing',
        destination: '/docs/ui/inline-editing',
        permanent: true,
      },
      {
        source: '/guides/nextjs/github-open-authoring/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/docs/gatsby/inline-editing',
        destination: '/docs/ui/inline-editing',
        permanent: true,
      },
      {
        source: '/docs/inline-blocks',
        destination: '/docs/ui/inline-editing/inline-blocks',
        permanent: true,
      },
      {
        source: '/docs/inline-editing/inline-blocks',
        destination: '/docs/ui/inline-editing/inline-blocks',
        permanent: true,
      },
      {
        source: '/docs/inline-blocks/block-text',
        destination: '/docs/ui/inline-editing/inline-text',
        permanent: true,
      },
      {
        source: '/docs/inline-blocks/block-textarea',
        destination: '/docs/ui/inline-editing/inline-textarea',
        permanent: true,
      },
      {
        source: '/docs/inline-blocks/block-image',
        destination: '/docs/ui/inline-editing/inline-image',
        permanent: true,
      },
      {
        source: '/docs/nextjs/bootstrapping',
        destination: '/guides/nextjs/git/getting-started',
        permanent: true,
      },
      {
        source: '/docs/nextjs/adding-backends',
        destination: '/docs/reference/self-hosted/tina-backend/nextjs',
        permanent: true,
      },
      {
        source: '/docs/nextjs/creating-forms',
        destination: '/guides/nextjs/git/creating-git-forms',
        permanent: true,
      },
      {
        source: '/docs/nextjs/markdown',
        destination: '/docs/editing/markdown',
        permanent: true,
      },
      {
        source: '/teams',
        destination: '/',
        permanent: true,
      },
      {
        source: '/docs/gatsby/quickstart',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      {
        source: '/docs/gatsby/manual-setup',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      {
        source: '/docs/gatsby/markdown',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      {
        source: '/guides/general/inline-editing',
        destination: '/guides/experimental/inline-editing',
        permanent: true,
      },
      {
        source: '/docs/gatsby/json',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      {
        source: '/docs/git/',
        destination: '/docs/reference/self-hosted/git-provider/github',
        permanent: true,
      },
      {
        source: '/docs/gatsby/configure-git-plugin',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      {
        source: '/docs/gatsby/custom-field',
        destination: '/docs/guides/converting-gatsby-to-tina',
        permanent: true,
      },
      // Release notes redirects
      {
        source: '/blog/2020-03-09-release-notes',
        destination: '/docs/releases/2020-03-09',
        permanent: true,
      },
      {
        source: '/blog/2020-03-16-release-notes',
        destination: '/docs/releases/2020-03-16',
        permanent: true,
      },
      {
        source: '/blog/2020-03-23-release-notes',
        destination: '/docs/releases/2020-03-23',
        permanent: true,
      },
      {
        source: '/blog/2020-03-30-release-notes',
        destination: '/docs/releases/2020-03-30',
        permanent: true,
      },
      {
        source: '/blog/2020-04-06-release-notes',
        destination: '/docs/releases/2020-04-06',
        permanent: true,
      },
      {
        source: '/blog/2020-04-27-release-notes',
        destination: '/docs/releases/2020-04-27',
        permanent: true,
      },
      {
        source: '/blog/2020-05-04-release-notes',
        destination: '/docs/releases/2020-05-04',
        permanent: true,
      },
      {
        source: '/blog/2020-05-11-release-notes',
        destination: '/docs/releases/2020-05-11',
        permanent: true,
      },
      {
        source: '/blog/2020-05-19-release-notes',
        destination: '/docs/releases/2020-05-19',
        permanent: true,
      },
      {
        source: '/blog/2020-05-25-release-notes',
        destination: '/docs/releases/2020-05-25',
        permanent: true,
      },
      {
        source: '/blog/2020-06-07-release-notes',
        destination: '/docs/releases/2020-07-07',
        permanent: true,
      },
      {
        source: '/blog/2020-06-08-release-notes',
        destination: '/docs/releases/2020-06-08',
        permanent: true,
      },
      {
        source: '/blog/2020-06-15-release-notes',
        destination: '/docs/releases/2020-06-15',
        permanent: true,
      },
      {
        source: '/blog/2020-06-23-release-notes',
        destination: '/docs/releases/2020-06-23',
        permanent: true,
      },
      {
        source: '/blog/2020-06-29-release-notes',
        destination: '/docs/releases/2020-06-29',
        permanent: true,
      },
      {
        source: '/blog/2020-07-27-release-notes',
        destination: '/docs/releases/2020-07-27',
        permanent: true,
      },
      {
        source: '/docs/nextjs/next-tinacms-github',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/nextjs/next-tinacms-json',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/nextjs/next-tinacms-markdown',
        destination: '/docs/editing/markdown',
        permanent: true,
      },
      {
        source: '/beta-docs',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/beta-faq/:path*',
        destination: '/docs/tina-cloud/alpha-faq',
        permanent: true,
      },
      {
        source: '/guides/tina-cloud/getting-started/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/guides/tina-cloud/existing-site/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/client',
        destination: '/docs/tinacms-context',
        permanent: true,
      },
      {
        source: '/guides/nextjs/github/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/guides/nextjs/tina-with-strapi/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/cli',
        destination: '/docs/cli-overview',
        permanent: true,
      },
      {
        source: '/guides/nextjs/adding-tina/(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/packages/(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/tinacms-context-advanced',
        destination: '/docs/tinacms-context',
        permanent: true,
      },
      {
        source: '/docs/tinacms-reference',
        destination: '/docs/tinacms-context',
        permanent: true,
      },
      {
        source: '/docs/toolkit',
        destination: '/docs/reference/toolkit/cms',
        permanent: true,
      },
      {
        source: '/docs/content-management',
        destination: '/docs/reference/toolkit/overview',
        permanent: true,
      },
      {
        source: '/docs/cms',
        destination: '/docs/reference/toolkit/cms',
        permanent: true,
      },
      {
        source: '/docs/forms',
        destination: '/docs/reference/toolkit/forms',
        permanent: true,
      },
      {
        source: '/docs/fields/:path*',
        destination: '/docs/reference/toolkit/fields/:path*',
        permanent: true,
      },
      {
        source: '/docs/fields/custom-fields',
        destination: '/docs/advanced/configuring-field-plugin',
        permanent: true,
      },
      {
        source: '/docs/reference/toolkit/fields/custom-fields',
        destination: '/docs/advanced/configuring-field-plugin',
        permanent: true,
      },
      {
        source: '/docs/plugins/content-creators',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/media',
        destination: '/docs/reference/media',
        permanent: true,
      },
      {
        source: '/docs/apis',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/user-interface',
        destination: '/docs/advanced/extending-tina',
        permanent: true,
      },
      {
        source: '/docs/sidebar-toolbar',
        destination: '/docs/advanced/extending-tina',
        permanent: true,
      },
      {
        source: '/docs/extending-tina',
        destination: '/docs/advanced/extending-tina',
        permanent: true,
      },
      {
        source: '/docs/events',
        destination: '/docs/advanced/extending-tina',
        permanent: true,
      },
      {
        source: '/docs/plugins(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/ui/(.*)',
        destination: '/docs/advanced/extending-tina/',
        permanent: true,
      },
      {
        source: '/docs/getting-started/faq/:path*',
        destination: '/docs/tina-cloud/faq/',
        permanent: true,
      },
      {
        source: '/docs/integrations(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/guides/experimental(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/guides/gatsby(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/guides/general(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/guides/nextjs(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/guides/tina-cloud(.*)',
        destination: '/docs/guides/',
        permanent: true,
      },
      {
        source: '/docs/features/extending-tina',
        destination: '/docs/advanced/extending-tina',
        permanent: true,
      },
      {
        source: '/docs/mdx',
        destination: '/docs/editing/markdown',
        permanent: true,
      },
      {
        source: '/docs/tinacms-package',
        destination: '/docs/tinacms-context',
        permanent: true,
      },
      {
        source: '/docs/cli',
        destination: '/docs/cli-overview',
        permanent: true,
      },
      {
        source: '/docs/schema-advanced',
        destination: '/docs/graphql/',
        permanent: true,
      },
      {
        source: '/docs/graphql',
        destination: '/docs/graphql/overview',
        permanent: true,
      },
      {
        source: '/docs/releases(.*)',
        destination: '/docs/legacy-redirect',
        permanent: true,
      },
      {
        source: '/docs/advanced/extending-tina',
        destination: '/docs/extending-tina/overview',
        permanent: true,
      },
      {
        source: '/docs/advanced/configuring-field-plugin',
        destination: '/docs/extending-tina/custom-field-components',
        permanent: true,
      },
      {
        source: '/docs/advanced/extending-field-plugin',
        destination: '/docs/extending-tina/advanced/extending-field-plugin',
        permanent: true,
      },
      {
        source: '/docs/advanced/creating-field-component',
        destination: '/docs/extending-tina/advanced/creating-field-component',
        permanent: true,
      },
      {
        source: '/docs/advanced/customizing-forms',
        destination: '/docs/extending-tina/customizing-forms',
        permanent: true,
      },
      {
        source: '/docs/advanced/edit-state',
        destination: '/docs/extending-tina/edit-state',
        permanent: true,
      },
      {
        source: '/docs/media-cloudinary/:path*',
        destination: '/docs/reference/media/external/cloudinary',
        permanent: true,
      },
      {
        source: '/docs/tina-cloud/data-layer',
        destination: '/docs/reference/content-api/data-layer',
        permanent: true,
      },
      {
        source: '/guides/tinacms/gatsby-data-fetching/guide',
        destination: '/docs/integration/frameworks',
        permanent: true,
      },
      {
        source: '/guides/tinacms/non-react-based-ssg/guide/:path*',
        destination: '/docs/frameworks/other',
        permanent: true,
      },
      {
        source: '/docs/editing/active-field-indicator/:path*',
        destination:
          '/docs/contextual-editing/react/#click-to-edit-experimental',
        permanent: true,
      },
      {
        source: '/guides/tinacms/nextjs-internationalization/guide/:path*',
        destination: '/docs/guides/nextjs-internationalization',
        permanent: true,
      },
      {
        source: '/faq/:path*',
        destination: '/docs/introduction/faq',
        permanent: true,
      },
      {
        source: '/guides/:path*',
        destination: '/docs/guides',
        permanent: true,
      },
      {
        source: '/guides/next-js/internationalization/:path*',
        destination: '/docs/guides/nextjs-internationalization',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    config.resolve.fallback = { ...config.resolve.fallback, fs: 'empty' };

    config.plugins.push(new MomentLocalesPlugin());

    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript', 'html', 'css', 'json'],
        filename: 'static/[name].worker.js',
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(withSvgr(config));
