import removeMarkdown from 'remove-markdown'

export function orderPosts(posts) {
  function sortByDate(a, b) {
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
    return dateA < dateB ? 1 : -1
  }
  return posts.sort(sortByDate)
}

export function formatExcerpt(content) {
  const plainTextExcerpt = removeMarkdown(content, {
    stripListLeaders: true,
    listUnicodeChar: '',
    gfm: true,
    useImgAltText: false,
  })
    .replace(/(\r\n|\n|\r)/gm, '')
    .substring(0, 200)
    .trimEnd()

  return `${plainTextExcerpt}...`
}

export function formatDate(fullDate) {
  const date = new Date(fullDate)
  const dateOptions = {
    formatMatcher: 'best fit',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', dateOptions)
}
