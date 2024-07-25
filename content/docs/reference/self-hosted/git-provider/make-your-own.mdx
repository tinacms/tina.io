---
title: Custom Git Provider
id: '/docs/reference/self-hosted/git-provider/make-your-own'
prev: '/docs/reference/self-hosted/git-provider/github'
next: null
---

Implement a Git Provider is easy. It is a class or object that implements the [`GitProvider`](#gitprovider-interface) interface.

## GitProvider Interface

```ts
export interface GitProvider {
  onPut: (key: string, value: string) => Promise<void>
  onDelete: (key: string) => Promise<void>
}
```

### `onPut`

This is used to save content to Git. It is called whenever a value is saved in the CMS.

### `onDelete`

This is used to delete content from Git. It is called whenever a value is deleted in the CMS.

## Example

Here is the source code for the [GitHub Git Provider](/docs/reference/self-hosted/git-provider/github). It is a good example of how to implement the `GitProvider` interface.

```ts
import { Octokit } from '@octokit/rest'
import { Base64 } from 'js-base64'
import type { GitProvider } from '@tinacms/graphql'

type OctokitOptions = ConstructorParameters<typeof Octokit>[0]

export interface GitHubProviderOptions {
  owner: string
  repo: string
  token: string
  branch: string
  commitMessage?: string
  rootPath?: string
  octokitOptions?: OctokitOptions
}

export class MyGitHubProvider implements GitProvider {
  octokit: Octokit
  owner: string
  repo: string
  branch: string
  rootPath?: string
  commitMessage?: string

  constructor(args: GitHubProviderOptions) {
    this.owner = args.owner
    this.repo = args.repo
    this.branch = args.branch
    this.commitMessage = args.commitMessage
    this.rootPath = args.rootPath
    this.octokit = new Octokit({
      auth: args.token,
      ...(args.octokitOptions || {}),
    })
  }

  async onPut(key: string, value: string) {
    let sha
    const keyWithPath = this.rootPath ? `${this.rootPath}/${key}` : key
    try {
      const {
        // @ts-ignore
        data: { sha: existingSha },
      } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: keyWithPath,
        ref: this.branch,
      })
      sha = existingSha
    } catch (e) {}

    await this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: keyWithPath,
      message: this.commitMessage || 'Edited with TinaCMS',
      content: Base64.encode(value),
      branch: this.branch,
      sha,
    })
  }

  async onDelete(key: string) {
    let sha
    const keyWithPath = this.rootPath ? `${this.rootPath}/${key}` : key
    try {
      const {
        // @ts-ignore
        data: { sha: existingSha },
      } = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path: keyWithPath,
        ref: this.branch,
      })
      sha = existingSha
    } catch (e) {}

    if (sha) {
      await this.octokit.repos.deleteFile({
        owner: this.owner,
        repo: this.repo,
        path: keyWithPath,
        message: this.commitMessage || 'Edited with TinaCMS',
        branch: this.branch,
        sha,
      })
    } else {
      throw new Error(
        `Could not find file ${keyWithPath} in repo ${this.owner}/${this.repo}`
      )
    }
  }
}
```

## Adding your Git Provider

This can now be used as a prop to the `createDatabase` [function](/docs/reference/self-hosted/database-adapter/overview/#createdatabase-function).

database.{ts,js}

```ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { MyGitHubProvider } from './my-git-provider'
//...

export default isLocal ? createLocalDatabase() ? createDatabase({
    gitProvider: new MyGitHubProvider({
        //... Options
    }),
    // ...
})
```
