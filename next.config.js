const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const redirects = require('./content/settings/config.json')?.redirects || [];
const withSvgr = require('next-svgr');

require('dotenv').config();

const isStatic = process.env.EXPORT_MODE === 'static';

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

      // =========================
      // DOCS (tina-docs-red)
      // Build expects:
      //   basePath = /tinadocs
      //   assetPrefix = /tinadocs/docsassets
      //   images.path = /tinadocs/docsassets/_next/image
      // =========================

      // Docs pages
      {
        source: '/tinadocs/docs',
        destination: 'https://tina-docs-red.vercel.app/tinadocs/docs',
      },
      {
        source: '/tinadocs/docs/:path*',
        destination: 'https://tina-docs-red.vercel.app/tinadocs/docs/:path*',
      },

      // Docs static assets (chunks/css/fonts)
      {
        source: '/tinadocs/docsassets/_next/:path*',
        destination:
          'https://tina-docs-red.vercel.app/tinadocs/docsassets/_next/:path*',
      },

      // Docs image optimizer
      {
        source: '/tinadocs/docsassets/_next/image',
        destination:
          'https://tina-docs-red.vercel.app/tinadocs/docsassets/_next/image',
      },

      // =========================
      // LANDING (tina-docs-landing)
      // Build expects:
      //   basePath = '' (none)
      //   assetPrefix = /tinadocs/landing
      //   images.path = /tinadocs/landing/_next/image
      // NOTE: Without basePath, the child serves:
      //   pages at `/` and `/:path*`
      //   static at `/_next/*`
      //   image optimizer at `/tinadocs/landing/_next/image` (explicit path)
      // =========================

      // Landing static assets (browser asks under assetPrefix; child serves /_next/*)
      {
        source: '/tinadocs/landing/_next/:path*',
        destination: 'https://tina-docs-landing.vercel.app/_next/:path*',
      },

      // Landing image optimizer (served exactly at this path in the child)
      {
        source: '/tinadocs/landing/_next/image',
        destination:
          'https://tina-docs-landing.vercel.app/tinadocs/landing/_next/image',
      },

      // Landing pages (no basePath in child → map /tinadocs → child root)
      {
        source: '/tinadocs',
        destination: 'https://tina-docs-landing.vercel.app/',
      },
      {
        source: '/tinadocs/:path*',
        destination: 'https://tina-docs-landing.vercel.app/:path*',
      },

      // Optional: pass-through for favicon while proxied
      {
        source: '/tinadocs/favicon.svg',
        destination: 'https://tina-docs-landing.vercel.app/favicon.svg',
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
