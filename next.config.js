const withSvgr = require('next-svgr')
const glob = require('glob')

module.exports = withSvgr({
  exportTrailingSlash: true,
  exportPathMap: async function() {
    // TODO: test if the docs and blog routes grab the index file
    const routes = {
      '/': { page: '/' },
      '/community': { page: '/community' },
      '/teams': { page: '/teams' },
      '/blog': { page: '/blog' },
      '/docs': { page: '/docs' },
    }
    //get all .md files in the blogs dir
    const blogs = glob.sync('content/blog/**/*.md')

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
