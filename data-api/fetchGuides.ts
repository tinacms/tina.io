import matter from 'gray-matter'
const fg = require('fast-glob')
var fs = require('fs')
var path = require('path')

export default async function fetchDocs() {
  const directory = path.resolve('./content/guides')
  const files = await fg(directory + '/**/*.md')

  return files.map(fileName => {
    const fullPath = path.resolve(directory, fileName)

    const slug = fullPath
      .match(new RegExp(`.+?\/guides\/(.+?)$`))[1]
      .split('.')
      .slice(0, -1)
      .join('.')

    const file = fs.readFileSync(fullPath)
    const doc = matter(file)
    return {
      data: { ...doc.data, slug },
      content: doc.content,
    }
  })
}
