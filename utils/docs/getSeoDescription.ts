export function getSeoDescription(body) {
  let textSegments = []

  function extractText(node) {
    if (node.type === 'text') {
      return node.text
    } else if (node.children && node.children.length > 0) {
      return node.children.map(extractText).join(' ')
    }
    return ''
  }

  body.children.forEach((node) => {
    if (['h2', 'p', 'blockquote'].includes(node.type)) {
      textSegments.push(extractText(node))
    }
  })

  let description = textSegments.join(' ')

  if (description.length > 160) {
    description = description.substring(0, 157) + '...'
  }

  return description
}
