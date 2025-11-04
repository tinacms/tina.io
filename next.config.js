const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const redirects = require('./content/settings/config.json')?.redirects || [];
const withSvgr = require('next-svgr');

require('dotenv').config();

const isStatic = process.env.EXPORT_MODE === 'static';

const TINA_DOCS_URL = 'https://tina-docs-red.vercel.app';
const TINA_DOCS_LANDING_URL = 'https://tina-docs-landing.vercel.app';

/**
 * @type {import('next').NextConfig}
 */
const extraConfig = {};

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
      // Your existing site routes
      { source: '/', destination: '/home' },
      { source: '/:locale(en|zh)', destination: '/:locale/home' },

      // Docs
      {
        source: '/tinadocs/docs',
        destination: `${TINA_DOCS_URL}/tinadocs/docs`,
      },
      {
        source: '/tinadocs/docs/:path*',
        destination: `${TINA_DOCS_URL}/tinadocs/docs/:path*`,
      },
      {
        source: '/tinadocs/docsassets/:path*',
        destination: `${TINA_DOCS_URL}/tinadocs/docsassets/:path*`,
      },
      // Docs - Search functionality - Pagefind
      {
        source: '/tinadocs/_next/static/pagefind/:path*',
        destination: `${TINA_DOCS_URL}/tinadocs/_next/static/pagefind/:path*`,
      },
      // Docs - Sitemap
      {
        source: '/tinadocs/doc/sitemap.xml',
        destination: `${TINA_DOCS_URL}/tinadocs/doc/sitemap.xml`,
      },

      // Landing Page - Specific patterns first
      {
        source: '/tinadocs',
        destination: `${TINA_DOCS_LANDING_URL}/tinadocs`,
      },
      {
        source: '/tinadocs/landing/:path*',
        destination: `${TINA_DOCS_LANDING_URL}/tinadocs/landing/:path*`,
      },
      // Catch-all for remaining tinadocs paths
      {
        source: '/tinadocs/:path*',
        destination: `${TINA_DOCS_LANDING_URL}/tinadocs/:path*`,
      },

      // Admin passthrough (yours)
      { source: '/admin', destination: '/admin/index.html' },
    ];
  },

  env: {
    MAILCHIMP_ADDRESS: process.env.MAILCHIMP_ADDRESS || dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
    SSW_GTM_ID: process.env.SSW_GTM_ID,
  },

  // Avoiding CORS error, more here: https://vercel.com/support/articles/how-to-enable-cors
  async headers() {
    const headers = [
      { key: 'Access-Control-Allow-Origin', value: '*' },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value: 'Accept, Content-Length, Content-Type',
      },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
    ];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({ key: 'X-Robots-Tag', value: 'noindex' });
    }

    return [{ source: '/:path*', headers }];
  },

  async redirects() {
    return [
      // keep URLs clean
      { source: '/home', destination: '/', permanent: true },
      {
        source: '/:locale(en|zh)/home',
        destination: '/:locale',
        permanent: true,
      },

      // existing redirects from JSON
      ...redirects.map((redirect) => ({
        source: redirect.source,
        destination: redirect.destination,
        permanent: redirect.permanent,
      })),
    ];
  },

  webpack(config) {
    config.module.rules.push({ test: /\.md$/, use: 'raw-loader' });
    config.resolve.fallback = { ...config.resolve.fallback, fs: 'empty' };

    config.plugins.push(new MomentLocalesPlugin());

    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript', 'html', 'css', 'json'],
        filename: 'static/[name].worker.js',
      }),
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(withSvgr(config));
