export interface SourceProviderConnection {
  forkFullName: string
  headBranch: string
  baseRepoFullName: string
}

export interface Response {
  accessToken: string
  sourceProviderConnection: SourceProviderConnection
}

export interface PreviewData {
  fork_full_name: string
  head_branch: string
  github_access_token: string
}

export const getGithubDataFromPreviewProps = (
  previewData?: PreviewData
): Response => {
  return previewData
    ? {
        sourceProviderConnection: {
          forkFullName: previewData.fork_full_name,
          headBranch: previewData.head_branch || 'master',
          baseRepoFullName: process.env.REPO_FULL_NAME,
        },
        accessToken: previewData.github_access_token,
      }
    : {
        sourceProviderConnection: null,
        accessToken: null,
      }
}
