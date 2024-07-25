require('dotenv').config()

import { fetchRelevantBlogs } from '../data-api/fetchBlogs'
import { formatExcerpt, orderPosts } from '../utils/blog_helpers'
const fs = require('fs')

const formatTitle = title => title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')


const blogPostsRssXml = async blogPosts => {
  let rssItemsXml = ''
  for (let post of blogPosts) {
    const postDate = new Date(post.data.date).toUTCString();
    const excerpt = await formatExcerpt(post.content, 1000, '…')
    const title = formatTitle(post.data.title);
    rssItemsXml += `<item>
      <title>${title}</title>
      <link>https://tina.io/blog/${post.data.slug}</link>
      <guid>https://tina.io/blog/${post.data.slug}</guid>
      <pubDate>${postDate}</pubDate>
      <description><![CDATA[${excerpt}]]>
      </description>
    </item>\n`
  }
  return rssItemsXml
}

const getRssXml = async blogPosts => {
  const rssItemsXml = await blogPostsRssXml(blogPosts)
  const now = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>TinaCMS Blog RSS Feed</title>
      <link>https://tina.io/</link>
      <description>TinaCMS is a fully open-source headless CMS that supports Git</description>
      <language>en</language>
      <lastBuildDate>${now}</lastBuildDate>
      <atom:link href="https://tina.io/rss.xml" rel="self" type="application/rss+xml" />
      ${rssItemsXml}
    </channel>
  </rss>`
}

const geerateRss = async () => {
  const relevantPosts = await fetchRelevantBlogs()
  fs.writeFileSync('public/rss.xml', await getRssXml(orderPosts(relevantPosts)))
}

try {
  geerateRss()
} catch (e) {
  console.error(e)
  process.kill(1)
}
