import matter from 'gray-matter'
import { isRelevantPost } from 'utils'
const fg = require('fast-glob')
var fs = require('fs')
var path = require('path')

export async function fetchBlogs() {
  const directory = path.resolve('./content/blog')
  const files = await fg(directory + '/**/*.md')

  return files.map(fileName => {
    const fullPath = path.resolve(directory, fileName)

    const slug = fullPath
      .match(new RegExp(`.+?\/blog\/(.+?)$`))[1]
      .split('.')
      .slice(0, -1)
      .join('.')

    const file = fs.readFileSync(fullPath)
    const post = matter(file)
    return {
      data: { ...post.data, slug },
      content: post.content,
    }
  })
}

export async function fetchRelevantBlogs() {
  const blogs = await fetchBlogs()
  return blogs.filter(post => isRelevantPost(post.data))
}
