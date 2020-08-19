import toc from 'markdown-toc'

export default function getTocContent(markdown, options) {
  const tocItems = toc(markdown, options)
  
  const content = tocItems.json.map( item => {

    // strip out links if present
    const links = Array.from(item.content.matchAll(/\[(.*?)\)/g)).map( link => link[0] || null )
    links.forEach(link => {
      // replace markdown link with link's text
      item.content = item.content.replace(link, /(?<=\[)(.*?)(?=\])/.exec(link)[0])
    })

    
    return `${'  '.repeat(item.lvl - 2)}- [${item.content}](#${item.slug})\n`
  }).join('')
  

  return content
}