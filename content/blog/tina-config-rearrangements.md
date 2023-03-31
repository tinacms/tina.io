---
title: Tina Config Rearrangements
date: '2023-03-27T07:00:00.000Z'
last_edited: '2023-03-27T07:00:00.000Z'
author: Jeff See
---

Tina's latest release adds support for a new config folder at `<root>/tina`.

## TL;DR

- The Tina config is now at `tina/config.{ts,tsx,js,jsx}`. `.tina` configs will continue to work.
- You can migrate your config with the codemod: `tinacms codemod move-tina-folder`
- When you run `tinacms build` or `tinacms dev`, a `tina-lock.json` file will be generated. This should be committed to your repository.
- The entire `tina/__generated__` folder can safely be Git-ignored. A `tina/.gitignore` file will be created automatically when you use the codemod.
- You will need to manually update any client or type imports in your codebase. Eg. `import { client } from '../tina/__generated__/client'`

### Why the change?

Previously, this was at `<root>/.tina` but this was problematic for a few reasons. Folders that start with a dot are usually hidden automatically by file managers, and some build tools like `eslint` ignore them out of the box.

There was also often confusion around what files get committed to Git, and which should be ignored. Previously, the `.tina/__generated__` folder had 3 files in it that needed to be committed to your Git repo: `_schema.json`, `_lookup.json`, and `_graphql.json`. These files, and the entire `tina/__generated__` folder can now be safely ignored. Instead, when you run `tinacms dev` or `tinacms build` you'll see a generated `tina/tina-lock.json` file. **This file should be committed to git**.

Previous config:

```
- .tina
  - __generated__
    - _graphql.json // needed to be in Git
    - _lookup.json  // needed to be in Git
    - _schema.json  // needed to be in Git
    - ...           // other files which could be Git-ignored
  - config.ts
  - queries
      - frags.gql   // custom frags
      - queries.gql // custom queries
```

Updated config

```
- tina
  - .gitignore
  - __generated__   // gitignored
  - config.ts
  - tina-lock.json  // replaces _schema, _lookup, _graphql
  - queries
      - frags.gql   // custom frags
      - queries.gql // custom queries
```
