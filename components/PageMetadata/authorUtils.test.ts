import { parseCoAuthors, resolveDisplayAuthor } from './authorUtils';
import type { GitHubCommit } from './type';

const makeCommit = (authorName: string, message: string): GitHubCommit => ({
  sha: 'abc123',
  commit: {
    author: { name: authorName, email: 'a@example.com', date: '2026-06-01' },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      date: '2026-06-01',
    },
    message,
  },
  author: null,
  committer: null,
});

const BOT_MESSAGE =
  '📝 Docs - Add troubleshooting section\n\n' +
  'Co-authored-by: Eli Kent [SSW] <69125238+kulesy@users.noreply.github.com>';

describe('parseCoAuthors', () => {
  it('extracts a single co-author trailer', () => {
    expect(parseCoAuthors(BOT_MESSAGE)).toEqual([
      {
        name: 'Eli Kent [SSW]',
        email: '69125238+kulesy@users.noreply.github.com',
      },
    ]);
  });

  it('extracts multiple co-author trailers', () => {
    const message =
      'Some change\n\n' +
      'Co-authored-by: Alice <alice@example.com>\n' +
      'Co-authored-by: Bob <bob@example.com>';
    expect(parseCoAuthors(message)).toEqual([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);
  });

  it('returns an empty array when there are no trailers', () => {
    expect(parseCoAuthors('just a normal commit message')).toEqual([]);
  });

  it('returns an empty array for an undefined message', () => {
    expect(parseCoAuthors(undefined)).toEqual([]);
  });
});

describe('resolveDisplayAuthor', () => {
  it('substitutes the co-author when the author is a bot', () => {
    expect(
      resolveDisplayAuthor(makeCommit('tinacloud-app[bot]', BOT_MESSAGE)),
    ).toBe('Eli Kent [SSW]');
  });

  it('handles the dashed bot name variant', () => {
    expect(
      resolveDisplayAuthor(makeCommit('tina-cloud-app[bot]', BOT_MESSAGE)),
    ).toBe('Eli Kent [SSW]');
  });

  it('keeps a human author and ignores any co-author trailer', () => {
    expect(
      resolveDisplayAuthor(makeCommit('Eli Kent [SSW]', BOT_MESSAGE)),
    ).toBe('Eli Kent [SSW]');
  });

  it('falls back to the bot name when a bot commit has no co-author', () => {
    expect(
      resolveDisplayAuthor(makeCommit('tinacloud-app[bot]', 'no trailer here')),
    ).toBe('tinacloud-app[bot]');
  });
});
