import { SourceProviderConnection } from 'github-tinacms-content'

interface Response {
  accessToken: string | null
  sourceProviderConnection: SourceProviderConnection | null
}

interface PreviewData {
  fork_full_name: string
  head_branch: string
  github_access_token: string
}

export const getGithubDataFromPreviewProps = (
  previewData?: PreviewData
): Response => {
  if (!previewData) {
    return {
      sourceProviderConnection: null,
      accessToken: null,
    }
  }

  return {
    accessToken: previewData.github_access_token,
    sourceProviderConnection: {
      forkFullName: previewData.fork_full_name,
      headBranch: previewData.head_branch || 'master',
    },
  }
}
