export function fileToUrl(filepath: string, base: string = null) {
  if (base) {
    filepath = filepath.split(`/${base}/`)[1]
  }
  return filepath
    .replace(/ /g, '-')
    .slice(0, -3)
    .trim()
}
