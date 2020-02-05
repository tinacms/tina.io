const withSvgr = require('next-svgr')
const glob = require('glob')
require('dotenv').config()

const isProd = process.env.environment == 'production'
const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231251&amp;id=0asd21t12e1'

module.exports = withSvgr({
  env: {
    MAILCHIMP_ENDPOINT: isProd
      ? process.env.MAILCHIMP_ENDPOINT
      : dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const routes = {
      '/': { page: '/' },
      '/community': { page: '/community' },
      '/teams': { page: '/teams' },
    }

    // TODO: Add docs routes
    return routes
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    config.node = {
      fs: 'empty',
    }

    return config
  },
})
