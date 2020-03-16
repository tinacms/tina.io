export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateB - dateA
  }
  return posts.slice().sort(sortByDate)
}

const captureNewlines = /(\r\n|\n|\r)/gm

async function stripMarkdown(content): Promise<string> {
  const remark = require('remark')
  const strip = require('strip-markdown')
  return new Promise((resolve, reject) => {
    remark()
      .use(strip)
      .process(content, (err, processedContent) => {
        if (err) reject(err)
        resolve(String(processedContent))
      })
  })
}

export async function formatExcerpt(content) {
  const plain = await stripMarkdown(content)
  const plainTextExcerpt = plain
    .substring(0, 200)
    .replace(captureNewlines, ' ')
    .trimEnd()

  return `${plainTextExcerpt}...`
}

export function formatDate(fullDate) {
  let date = new Date(fullDate)
  // normalizes UTC with local timezone
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
  const dateOptions = {
    formatMatcher: 'best fit',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', dateOptions)
}
