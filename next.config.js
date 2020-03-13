const withSvgr = require('next-svgr')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231251&amp;id=0asd21t12e1'

module.exports = withSvgr({
  env: {
    MAILCHIMP_ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? process.env.MAILCHIMP_ENDPOINT
        : dummyMailchimpEndpoint,
    HUBSPOT_TEAMS_FORM_ID: process.env.HUBSPOT_TEAMS_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
    GTM_ID: process.env.GTM_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    return {}
  },
  webpack(config, { dev }) {
    if (dev) {
      // const pathToTina = '../tinacms'
      const pathToTinaPackages = '../tinacms/packages'
      config.resolve.alias['react'] = path.resolve('./node_modules/react')
      config.resolve.alias['react-dom'] = path.resolve(
        './node_modules/react-dom'
      )
      config.resolve.alias['styled'] = path.resolve('./node_modules/styled')
      fs.readdir(pathToTinaPackages, (err, files) => {
        console.log(files)
        files.forEach(packageBase => {
          config.resolve.alias[packageBase] = path.resolve(
            `${pathToTinaPackages}/${packageBase}`
          )
        })
      })
    }

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
