export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  committer: {
    login: string;
    avatar_url: string;
  } | null;
}

export interface GitHubMetadataProps {
  /** GitHub repository owner (e.g., 'tinacms') */
  owner?: string;
  /** GitHub repository name (e.g., 'tina.io') */
  repo?: string;
  /** Optional path to a specific file in the repository */
  path?: string;
  /** Additional CSS classes to apply to the component */
  className?: string;
}

export interface GitHubMetadataResponse {
  latestCommit: GitHubCommit;
  firstCommit: GitHubCommit | null;
  historyUrl: string;
}
