import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const SCRIPT = path.resolve(__dirname, 'create-release-notes.sh');

interface ChangeItem {
  changesDescription: string;
  pull_request_number?: string;
  pull_request_link?: string;
  commit_hash?: string;
  commit_link?: string;
  gitHubName?: string;
  gitHubLink?: string;
}

interface ChangesSection {
  changesTitle: string;
  changesList: ChangeItem[];
}

interface ReleaseNotes {
  versionNumber: string;
  dateReleased: string;
  changesObject: ChangesSection[];
}

function runScript(env: {
  PROJECT_NAME: string;
  VERSION_NUMBER: string;
  DATE_RELEASED: string;
  RELEASE_NOTES: string;
}): { releaseNotes: ReleaseNotes | null; exitCode: number; output: string } {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'release-notes-test-'));
  fs.mkdirSync(
    path.join(cwd, `content/whats-new-${env.PROJECT_NAME.toLowerCase()}`),
    { recursive: true },
  );

  let exitCode = 0;
  let output = '';
  try {
    output = execFileSync(SCRIPT, {
      cwd,
      env: { ...process.env, ...env },
      encoding: 'utf-8',
    });
  } catch (e: any) {
    exitCode = e.status ?? 1;
    output = `${e.stdout ?? ''}${e.stderr ?? ''}`;
  }

  const file = path.join(
    cwd,
    `content/whats-new-${env.PROJECT_NAME.toLowerCase()}`,
    `${env.VERSION_NUMBER.toLowerCase()}.json`,
  );
  const releaseNotes = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, 'utf-8'))
    : null;
  fs.rmSync(cwd, { recursive: true, force: true });
  return { releaseNotes, exitCode, output };
}

describe('create-release-notes.sh', () => {
  it('parses changeset bullets with a single space after the dash (v3.9.1 format)', () => {
    // Verbatim input from the v3.9.1 release that produced an empty page (PR #4612)
    const { releaseNotes, exitCode } = runScript({
      PROJECT_NAME: 'TinaCMS',
      VERSION_NUMBER: 'v3.9.1',
      DATE_RELEASED: '2026-06-05T06:46:13Z',
      RELEASE_NOTES: `### Patch Changes

- [#7028](https://github.com/tinacms/tinacms/pull/7028) [\`7b539b8\`](https://github.com/tinacms/tinacms/commit/7b539b8e7d7d9f4451b5fd36a04d26b734f7d78e) Thanks [@JackDevAU](https://github.com/JackDevAU)! - Skip the filesystem-backed response cache on edge runtimes (Cloudflare Workers, Vercel Edge) where Node's \`fs\` API is present but unusable, which could otherwise hang concurrent identical queries. Adds a \`cache\` option to \`createClient\` to force-disable the cache.`,
    });

    expect(exitCode).toBe(0);
    expect(releaseNotes?.versionNumber).toBe('3.9.1');
    expect(releaseNotes?.changesObject).toEqual([
      {
        changesTitle: 'Patch Changes',
        changesList: [
          expect.objectContaining({
            changesDescription: expect.stringContaining(
              'Skip the filesystem-backed response cache on edge runtimes',
            ),
            pull_request_number: '7028',
            pull_request_link: 'https://github.com/tinacms/tinacms/pull/7028',
            commit_hash: '7b539b8',
            gitHubName: 'JackDevAU',
            gitHubLink: 'https://github.com/JackDevAU',
          }),
        ],
      },
    ]);
  });

  it('still parses changeset bullets with three spaces after the dash (v3.9.0 format)', () => {
    const { releaseNotes, exitCode } = runScript({
      PROJECT_NAME: 'TinaCMS',
      VERSION_NUMBER: 'v3.9.0',
      DATE_RELEASED: '2026-06-03T02:27:22Z',
      RELEASE_NOTES: `### Minor Changes

-   [#7009](https://github.com/tinacms/tinacms/pull/7009) [\`a8dd9af\`](https://github.com/tinacms/tinacms/commit/a8dd9af056b17a8faeaa621bbf7722a62b396cf8) Thanks [@JackDevAU](https://github.com/JackDevAU)! - chore: remove deprecated code`,
    });

    expect(exitCode).toBe(0);
    expect(releaseNotes?.changesObject).toEqual([
      {
        changesTitle: 'Minor Changes',
        changesList: [
          expect.objectContaining({
            changesDescription: 'chore: remove deprecated code',
            pull_request_number: '7009',
          }),
        ],
      },
    ]);
  });

  it('parses single-space "Updated dependencies" bullets and their nested deps', () => {
    const { releaseNotes, exitCode } = runScript({
      PROJECT_NAME: 'TinaCMS',
      VERSION_NUMBER: 'v9.9.9',
      DATE_RELEASED: '2026-01-01T00:00:00Z',
      RELEASE_NOTES: `### Patch Changes

- Updated dependencies [[\`e27c017\`](https://github.com/tinacms/tinacms/commit/e27c017abc123)]:
  - @tinacms/cli@1.2.3
  - tinacms@2.3.4`,
    });

    expect(exitCode).toBe(0);
    expect(releaseNotes?.changesObject).toEqual([
      {
        changesTitle: 'Updated Dependencies',
        changesList: [
          expect.objectContaining({
            changesDescription: '@tinacms/cli@1.2.3',
            commit_hash: 'e27c017',
          }),
          expect.objectContaining({
            changesDescription: 'tinacms@2.3.4',
          }),
        ],
      },
    ]);
  });

  it('parses TinaCloud-style asterisk bullets', () => {
    const { releaseNotes, exitCode } = runScript({
      PROJECT_NAME: 'TinaCloud',
      VERSION_NUMBER: '2026.06.1',
      DATE_RELEASED: '2026-06-01T00:00:00Z',
      RELEASE_NOTES: `## What's Changed
### ✨ Features
* ✨ Add CLI Cognito app client (PKCE) to IdentityStack by @joshbermanssw`,
    });

    expect(exitCode).toBe(0);
    expect(releaseNotes?.changesObject).toEqual([
      {
        changesTitle: '✨ Features',
        changesList: [
          expect.objectContaining({
            changesDescription:
              '✨ Add CLI Cognito app client (PKCE) to IdentityStack',
            gitHubName: 'joshbermanssw',
          }),
        ],
      },
    ]);
  });

  it('fails loudly instead of writing a page with empty descriptions', () => {
    // Headers but no parseable bullet items at all
    const { exitCode } = runScript({
      PROJECT_NAME: 'TinaCMS',
      VERSION_NUMBER: 'v9.9.8',
      DATE_RELEASED: '2026-01-01T00:00:00Z',
      RELEASE_NOTES: `### Patch Changes

some prose that is not a list item`,
    });

    expect(exitCode).not.toBe(0);
  });
});
