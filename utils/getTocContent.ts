import toc from 'markdown-toc'
import matchAll from 'match-all'

export default function getTocContent(markdown, options) {
  const tocItems = toc(markdown, options)
  
  const content = tocItems.json.map( item => {
    const itemContent = stripMarkdownLinks(item.content)

    return `${'  '.repeat(item.lvl - 1)}- [${itemContent}](#${item.slug})\n`
  }).join('')
  

  return content
}

export function stripMarkdownLinks(markdown) {

  // strip out links if present
  // have to use match-all package because string.matchAll is only supported in node version 12.0.0+
  // also, for some reason this package is dropping the first and last characters of the match
  const links = matchAll(markdown, /\[(.*?)\)/g).toArray().map(link => `[${link})`)
    
  links.forEach(link => {
    // replace markdown link with link's text
    markdown = markdown.replace(link, /(?<=\[)(.*?)(?=\])/.exec(link)[0])
  })

  return markdown
}