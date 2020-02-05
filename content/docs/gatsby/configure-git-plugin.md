---
title: Configure Git plugin
id: /docs/gatsby/configure-git-plugin
prev: /docs/gatsby/json
next: /docs/gatsby/custom-fields
consumes:
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Describes GitRouterConfig interface
  - file: /packages/gatsby-tinacms-git/gatsby-node.ts
    details: Expects gatsby-tinacms-git to pass options directly to git router
---

The Git plugin provides some options that can be adjusted.

## Example

**gatsby-config.js**

```javascript
const path = require("path")
const REPO_ABSOLUTE_PATH = path.join(process.cwd(), "../..")

module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          'gatsby-tinacms-json',
          'gatsby-tinacms-remark',
          {
            resolve: 'gatsby-tinacms-git',
            options: {
              pathToRepo: REPO_ABSOLUTE_PATH,
              pathToContent: 'packages/demo-gatsby',
              defaultCommitMessage: 'Edited with TinaCMS',
              defaultCommitName: 'TinaCMS',
              defaultCommitEmail: 'git@tinacms.org',
              pushOnCommit: false,
            },
          },
        ],
      },
    },
    // ...
  ],
}
```

## Options

- `pathToRepo`: The base-path to the repository where the content is stored in. Default: The repository root.
- `pathToContent`: The directory to the root of your app within the repository. Default: The repository root. This can be useful for monorepos, when you have multiple sites within one repository.
- `defaultCommitMessage`: The default commit message. Default: 'Edited with TinaCMS'
- `defaultCommitName`: The default git user name.
- `defaultCommitEmail`: The default git user email.
- `pushOnCommit`: Indicates if every commit should also be pushed automatically. Default: true.
