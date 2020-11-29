const { aliasTinaDev } = require('@tinacms/webpack-helpers')

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const withSvgr = require('next-svgr')

require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231252&amp;id=0asd21t12e1'

const config = {
  env: {
    MAILCHIMP_ADDRESS: process.env.MAILCHIMP_ADDRESS || dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    BASE_REPO_FULL_NAME: process.env.BASE_REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  trailingSlash: true,
  exportPathMap: async function() {
    return {}
  },
  webpack(config) {
    if (process.env.TINA) {
      let watch
      if (process.env.TINA_WATCH) {
        watch = process.env.TINA_WATCH.split(',')
      }
      aliasTinaDev(config, process.env.TINA, watch)
    }

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    config.node = {
      fs: 'empty',
    }

    config.plugins.push(new MomentLocalesPlugin())

    return config
  },
}

module.exports = withBundleAnalyzer(withSvgr(config))
