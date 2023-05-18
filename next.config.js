const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const withSvgr = require('next-svgr')

require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231252&amp;id=0asd21t12e1'

const config = {
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs/editing/quick-editing',
        destination: '/docs/contextual-editing/react',
        permanent: true,
      },
      {
        source: '/docs/editing/click-to-edit',
        destination: '/docs/contextual-editing/react',
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
    ]
  },
  env: {
    MAILCHIMP_ADDRESS: process.env.MAILCHIMP_ADDRESS || dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
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
    ]
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        key: 'X-Robots-Tag',
        value: 'noindex',
      })
    }

    return [
      {
        source: '/:path*',
        headers,
      },
    ]
  },
  trailingSlash: true,
  exportPathMap: async function () {
    return {}
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    config.resolve.fallback = { ...config.resolve.fallback, fs: 'empty' }

    config.plugins.push(new MomentLocalesPlugin())

    return config
  },
}

module.exports = withBundleAnalyzer(withSvgr(config))
