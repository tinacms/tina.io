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
      {
        source: '/tina-docs/:path*',
        destination: 'https://tina-docs-landing.vercel.app/:path*',
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
    return redirects.map((redirect) => ({
      source: redirect.source,
      destination: redirect.destination,
      permanent: redirect.permanent,
    }));
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
      }),
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(withSvgr(config));
