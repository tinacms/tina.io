export const getCachedFormData = (fileRelativePath: string) => {
  if (typeof localStorage === 'undefined') {
    return {}
  }
  return JSON.parse(localStorage.getItem(fileRelativePath) || '{}')
}

export const setCachedFormData = (
  fileRelativePath: string,
  data: { sha: string }
) => {
  if (typeof localStorage === 'undefined') {
    return
  }
  localStorage.setItem(fileRelativePath, JSON.stringify(data))
}
