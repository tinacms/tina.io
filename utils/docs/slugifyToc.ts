import toc from 'markdown-toc'
import { stripMarkdownLinks } from '../getTocContent'
const captureEmphasis = /(.*)(?<!\\)_(.*)(?<!\\)_(.*)/

export const slugifyTocHeading = heading => {
  heading = stripMarkdownLinks(heading)
  const captured = captureEmphasis.exec(heading)
  const strippedHeading = captured ? captured.slice(1).join('') : heading
  return toc.slugify(strippedHeading)
}
