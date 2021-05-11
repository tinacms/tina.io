export function fileToUrl(filepath: string, base: string = null) {
  if (base) {
    filepath = filepath.split(`/${base}/`)[1]
  }
  return filepath
    .replace(/ /g, '-')
    .slice(0, -3)
    .trim()
}

const everythingExceptTheTrailingSlash = /(.*)\/$/

export function removeTrailingSlash(url: string) {
  if (!url) return url
  return url.replace(everythingExceptTheTrailingSlash, '$1')
}
