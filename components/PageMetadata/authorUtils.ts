import type { GitHubCommit } from './type';

export interface CoAuthor {
  name: string;
  email: string;
}

// Matches `Co-authored-by: Name <email>` trailer lines in a commit message.
const CO_AUTHOR_RE = /^\s*Co-authored-by:\s*(.+?)\s*<([^>]*)>\s*$/gim;

/** Parse all `Co-authored-by:` trailers out of a commit message body. */
export function parseCoAuthors(message: string | undefined): CoAuthor[] {
  if (!message) {
    return [];
  }

  const coAuthors: CoAuthor[] = [];
  // Use exec in a loop (rather than matchAll iteration) to stay compatible
  // with the project's lower TS compile target under ts-jest.
  CO_AUTHOR_RE.lastIndex = 0;
  let match = CO_AUTHOR_RE.exec(message);
  while (match !== null) {
    coAuthors.push({ name: match[1], email: match[2] });
    match = CO_AUTHOR_RE.exec(message);
  }
  return coAuthors;
}

/**
 * GitHub bot accounts always carry a `[bot]` suffix on their author name
 * (e.g. `tinacloud-app[bot]`, `tina-cloud-app[bot]`). When one of our bots
 * authors a commit, the real human is recorded in a `Co-authored-by:` trailer,
 * so we surface that co-author instead of the bot.
 */
export function resolveDisplayAuthor(commit: GitHubCommit): string {
  const authorName = commit.commit.author.name;

  if (!authorName.endsWith('[bot]')) {
    return authorName;
  }

  const [coAuthor] = parseCoAuthors(commit.commit.message);
  return coAuthor?.name ?? authorName;
}
