export interface SourceProviderConnection {
  forkFullName: string
  headBranch: string
  baseRepoFullName: string
}

interface Response {
  accessToken: string
  sourceProviderConnection: SourceProviderConnection
}

export const getGithubDataFromPreviewProps = (previewData?: any): Response => {
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
