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
    HUBSPOT_FORM_ID: process.env.NEXT_HUBSPOT_FORM_ID,
    HUBSPOT_PORTAL_ID: process.env.NEXT_HUBSPOT_PORTAL_ID,
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const routes = {
      '/': { page: '/' },
      '/community': { page: '/community' },
      '/teams': { page: '/teams' },
    }

    /*
     ** Export blog routes
     */
    //get all .md files in the blogs dir
    const blogs = glob.sync('content/blog/**/*.md')

    // create pagination for the blog index
    const postsPerPage = 8
    const numPages = Math.ceil(blogs.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      const path = i === 0 ? `/blog` : `/blog/page/${i + 1}`
      routes[path] = {
        page: '/blog/index',
        query: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      }
    })

    //remove path and extension to leave filename only
    const blogSlugs = blogs.map(file =>
      file
        .split('/')[2]
        .replace(/ /g, '-')
        .slice(0, -3)
        .trim()
    )

    //add each blog to the routes obj
    blogSlugs.forEach(blog => {
      routes[`/blog/${blog}`] = { page: '/blog/[slug]', query: { slug: blog } }
    })

    // TODO: Add docs routes
    return routes
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
})
