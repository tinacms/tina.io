export interface SourceProviderConnection {
  forkFullName: string
  headBranch: string
  accessToken: string
  baseRepoFullName: string
}

export const getGithubDataFromPreviewProps = (
  previewData?: any
): SourceProviderConnection => {
  return previewData
    ? {
        forkFullName: previewData.fork_full_name,
        headBranch: previewData.head_branch || 'master',
        accessToken: previewData.github_access_token,
        baseRepoFullName: process.env.REPO_FULL_NAME,
      }
    : null
}
