import toc from 'markdown-toc'
const captureEmphasis = /(.*)_([^\\]+)_(.*)/

export const slugifyTocHeading = heading => {
  const captured = captureEmphasis.exec(heading)
  const strippedHeading = captured ? captured.slice(1).join('') : heading
  return toc.slugify(strippedHeading)
}
