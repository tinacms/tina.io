export const getExcerpt = (
  body: { children: any[] },
  excerptLength: number
) => {
  return body.children
    .filter((c) => c.type == 'p')
    .reduce(function (excerpt, child) {
      // combine all of child's text nodes into a single string
      excerpt +=
        (excerpt ? ' ' : '') +
        child.children
          .filter((c) => c.type == 'text')
          .reduce(function (text, child) {
            return text + (text ? ' ' : '') + child.text
          }, '')
      // if the combined text is too long, truncate it
      if (excerpt.length > excerptLength) {
        excerpt = excerpt.substring(0, excerptLength) + '...'
      }

      return excerpt
    }, '')
}
