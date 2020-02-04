import { NextPageContext } from 'next'
import matter from 'gray-matter'

import { formatExcerpt, orderPosts } from '../utils'

export default function FeedPage() {
  // xml is passed to the browser and written via getInitialProps
}

const blogPostsRssXml = blogPosts => {
  let latestPostDate: string = ''
  let rssItemsXml = ''
  blogPosts.forEach(post => {
    const postDate = Date.parse(post.data.date)
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.createdAt
    }
    rssItemsXml += `<item>
      <title>${post.data.title}</title>
      <link>https://tinacms.org/blog/${post.data.slug}</link>
      <pubDate>${post.data.date}</pubDate>
      <description><![CDATA[${post.content}]]>
      </description>
    </item>`
  })
  return {
    rssItemsXml,
    latestPostDate,
  }
}

const getRssXml = blogPosts => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts)
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>TinaCMS Blog RSS Feed</title>
      <link>https://tinacms.org/</link>
      <description>A site editor for the modern web</description>
      <language>en</language>
      <lastBuildDate>${latestPostDate}</lastBuildDate>
      ${rssItemsXml}
    </channel>
  </rss>`
}

FeedPage.getInitialProps = async function({ res }: NextPageContext) {
  if (!res) {
    return
  }
  const blogPosts = (context => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key: string, index: number) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const post = matter(value.default)
      const formattedContent = formatExcerpt(post.content)
      return {
        data: { ...post.data, slug },
        content: formattedContent,
      }
    })

    return orderPosts(data)
  })((require as any).context('../content/blog', true, /\.md$/))
  res.setHeader('Content-Type', 'text/xml')
  res.write(getRssXml(blogPosts))
  res.end()
}
